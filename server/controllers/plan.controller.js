import isImageUrl from "is-image-url";
import randtoken from "rand-token";
import planSchema from "../models/plan.schema.js";
import rendezvousSchema from "../models/rendezvous.schema.js";
import profileSchema from "../models/profile.schema.js";
import loadash from "lodash";
const id = async (req, res, next) => {
    const { id } = req.params;
  if (!id) return res.json({ success: false, message: "Invalid id!" });
    try {
        let plan = await planSchema.findById(id).populate({
            path: "owner",
            select: "-password",
          });
        if(!plan) return res.json({ success: false, message: "Invalid plan id!" });
        const profile = await profileSchema.findOne({ owner: plan.owner });
        if(profile) plan._doc = {
            ...plan._doc,
            profile
        };
        req.plan = plan;
        next()
    } catch (error) {
        console.log(error)
        return res.json({ success: false, message: "Internal server error!" });
    }

}

const get = (req, res) => {
    if(!req.plan) return res.json({ success: false });
    return res.send(req.plan);
}

const create = (req, res) => {
    const { title, description, date, thumbnail } = req.body;
    if(!title || !description || !date) return res.json({ success: false, message: "Nothing provided!" })
    if(thumbnail && !isImageUrl(thumbnail)) return res.json({ success: false, message: "Invalid Image URL" })
    const data = {
        owner: req.session.account._id,
        title : title,
        description : description,
        date: new Date(date),
        thumbnail : thumbnail ? thumbnail : null
    }
    const plan = new planSchema(data);
    plan.save();
    return res.json({ succes: true, plan: plan });
}

const edit = (req, res) => {
    let reqPlan = { ...req.plan };
    const { title, description, date, thumbnail } = req.body;
    if(thumbnail && !isImageUrl(thumbnail)) return res.json({ success: false, message: "Invalid Image URL" });
        let plan = req.plan;
        let updates = {
            title: title ? title : reqPlan.title,
            description: description ? description : reqPlan.description,
            thumbnail: thumbnail ? thumbnail : reqPlan.thumbnail,
            date: date ? new Date(date) : reqPlan.date
        }
        plan = loadash.extend(plan, updates);
        plan.save();
    return res.json({ success: true, plan: plan })
}

const remove = async (req, res) => {
    try {
        const plan = await planSchema.findByIdAndDelete(req.plan._id)
        if(!plan) return res.json({ success: false, message: "Invalid Plan id!" })
        req.plan = undefined;
    return res.json({ success: true, plan: plan })
    } catch (error) {
        return res.json({ success: false, message: "Internal server error!" })
    }
}

const list = async (req, res) => {
    try {
        const plans = await planSchema.find();
        if (plans.length === 0) {
            return res.json({ success: false, message: "No plans found." });
        }

        return res.json({ success: true, plans: plans })
    } catch (error) {
        return res.json({ success: false, message: "Internal server error!"})
    }
}
const listLength = async (req, res) => {
    try {
        const length = await planSchema.countDocuments({});
        return res.json({ success: true, length: length })
    } catch (error) {
        return res.json({ success: false, message: "Internal server error!"})
    }
}
const listByPage = async (req, res) => {
    try {
        const { page = 1, limit = 9 } = req.query;
        const plans = await planSchema.find().limit(limit * 1).skip((page - 1) * limit).exec();
        if (plans.length === 0) {
            return res.json({ success: false, message: "No plans found." });
        }

        return res.json({ success: true, plans: plans })
    } catch (error) {
        return res.json({ success: false, message: "Internal server error!"})
    }
}

const listByOwner = async (req, res) => {
    const { owner } = req.params;
    if(!owner) return res.json({ success: false, message: "Invalid id!" })
    try {
        const plans = await planSchema.find({ owner: owner });
        if (plans.length === 0) {
            return res.json({ success: false, message: "No plans found for this owner." });
        }

        return res.json({ success: true, plans: plans })
    } catch (error) {
        return res.json({ success: false, message: "Internal server error!" })
    }
}

const listByDate = async (req, res) => {
    const { date } = req.params;
    if(!date) return res.json({ success: false, message: "Invalid date!" })
    try {
        const targetDate = new Date(date);
        const day = targetDate.getDate();
        const month = targetDate.getMonth() + 1; 
        const year = targetDate.getFullYear();
        const plans = await planSchema.find({
            $expr: {
                $and: [
                    { $eq: [{ $dayOfMonth: "$date" }, day] },
                    { $eq: [{ $month: "$date" }, month] },
                    { $eq: [{ $year: "$date" }, year] }
                ]
            }
        });

        if (plans.length === 0) {
            return res.json({ success: false, message: "No plans found for this date." });
        }

        return res.json({ success: true, plans: plans });
    } catch (error) {
        return res.json({ success: false, message: "Internal server error!" });
    }
}

const reserve = async (req, res) => {
    const { name, cin, email } = req.body;
    if (!name || !cin || !email) return res.json({ success: false, message: "Nothing provided!" });
    if(!req.plan) return res.json({ success: false })
    const data = {
        plan: req.plan,
        serial: generateSerial(),
        email,
        name,
        cin
    }
    var rendezvous = new rendezvousSchema(data)
    var updatedPlan = await planSchema.findByIdAndUpdate(req.plan._id, {
        $push: {
            serials: data.serial
        }
    });
    rendezvous.save()
    updatedPlan.save()
    
    fetch('https://us1.pdfgeneratorapi.com/api/v4/documents/generate', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJjOGFhMmJiMjUzYmI2ZDE0MWI3NjllZTdiZjc2NjY4ZDk3YTgwMWI3MDNmMmM1ZWUxZTcwYTE2NjMwMzM5YTgwIiwic3ViIjoiZGVtby5leGFtcGxlQGFjdHVhbHJlcG9ydHMuY29tIiwiZXhwIjoxNTg2MTEyNjM5fQ.ARDFr-BJ3jv9WRQPXpkU30QBYFVjS5jjOmdjMEBTmZg',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "template": {
            "id": "985092",
            "data": {
                "name": rendezvous.name,
                "cin": rendezvous.cin,
                "email": rendezvous.email,
                "serial": rendezvous.serial,
                "title": rendezvous.plan.title,
                "description": rendezvous.plan.description,
                "date": formatDate(rendezvous.plan.date),
                "time": formatTime(rendezvous.plan.date),
                "datenow": formatDate(new Date())
            }
          },
          "format": "pdf",
          "output": "url",
          "name": "RendezVous inscription"
        })
      })
      .then(response => response.json())
      .then(data => {
        return res.json({ success: true, rendezvous, link: data.response })
    })
      .catch((error) => console.error('Error:', error));

}


const serial = async (req, res, next) => {
    const { serial } = req.params;
    if (!serial)
      return res.json({ success: false, message: "Invalid Serial!" });

    try {
        var rendezvous = await rendezvousSchema
          .findOne({ serial: serial })
          .populate({ path: "plan" });

        if (!rendezvous)
          return res.json({
            success: false,
            message: "Invalid Rendez-vous serial!",
          });
        if (!rendezvous.plan.serials.includes(serial))
          return res.json({
            success: false,
            message: "Invalid Rendez-vous serial!",
          });
    
          req.rendezvous = rendezvous;
          next();
    } catch (error) {
        return res.json({ success: false, message: "Interal server error!" })
    }
}

const getRendezvous = (req, res) => {
    if(!req.rendezvous) return res.json({ success: false, message: "Invalid Rendez-vous" });
    return res.send(req.rendezvous)
}

function generateSerial() {
    // Generate the first two uppercase letters
    const letters = randtoken.generate(2, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ');
    // Generate the next seven digits
    const numbers = randtoken.generate(7, '0123456789');
    // Combine the letters and numbers to create the code
    const code = letters + numbers;
    return code;
  }

  function formatDate(date) {
    let day = date.getDate();
    let month = date.getMonth() + 1; // Months are zero based
    let year = date.getFullYear();
  
    // Pad the day and month with leading zeros if necessary
    day = day < 10 ? '0' + day : day;
    month = month < 10 ? '0' + month : month;
  
    return day + '/' + month + '/' + year;
  }
  function formatTime(date) {
        let hours = date.getHours();
        let minutes = date.getMinutes();
      
        // Pad the hours and minutes with leading zeros if necessary
        hours = hours < 10 ? '0' + hours : hours;
        minutes = minutes < 10 ? '0' + minutes : minutes;
      
        return hours + ':' + minutes;
    }

export default { id, get, create, edit, remove, list, listByOwner, listByDate, listByPage, listLength, reserve, serial, getRendezvous }