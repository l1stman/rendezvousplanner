import _ from 'lodash'
import profileSchema from "../models/profile.schema.js";
import isImageUrl from "is-image-url"
const id = async (req, res, next) => {
  const { id } = req.params;
  if (!id) return res.json({ success: false, message: "Invalid id!" });
  try {
    var profile = await profileSchema.findOne({ _id: id }).populate({
        path: "owner",
        select: "-password",
      });
      if (!profile) return res.json({ success: false, message: "Invalid profile id!" });
      req.profile = profile;
      next();
  } catch (err) {
    return res.json({ success: false, message: "Internal server error!" });
  }
};

const accountid = async (req, res, next) => {
  const { accountid } = req.params;
  if (!accountid) return res.json({ success: false, message: "Invalid id!" });
  try {
  var profile = await profileSchema.findOne({ owner: accountid }).populate({
    path: "owner",
    select: "-password",
  });
  if (!profile) return res.json({ success: false, message: "Invalid account id!" });
  req.profile = profile;
  next();
} catch (err) {
    return res.json({ success: false, message: "Internal server error!" });
  }
};

const get = (req, res) => {
    if(!req.profile) return res.json({ success: false });
        return res.send(req.profile);
}

const create = async (req, res) => {
    const { owner, name, mobile, avatar_url, bio } = req.body;
    if(avatar_url && !isImageUrl(avatar_url)) return res.json({ success: false, message: "Invalid Image URL" });
    try {
        const profile = new profileSchema({
            name,
            mobile,
            avatar_url,
            bio,
            owner: req?.session?.account?._id || owner
        })
        await profile.save()
        return res.json({ success: true, profile: profile })
    } catch (error) {
      console.log(error);
        return res.json({ success: false, message: "Internal server error!" });
    }

}

const edit = (req, res) => {
    let reqProfile = { ...req.profile };
    const { name, mobile, avatar_url, bio } = req.body;
    if(avatar_url && !isImageUrl(avatar_url)) return res.json({ success: false, message: "Invalid Image URL" });
        let profile = req.profile;
        let updates = {
            name: name ? name : reqProfile.name,
            mobile: mobile ? mobile : reqProfile.mobile,
            avatar_url: avatar_url ? avatar_url : reqProfile.avatar_url,
            bio: bio ? bio : reqProfile.bio
        }
        profile = _.extend(profile, updates)

        profile.save()
        return res.json({ succes: true, profile: profile })
    }

export default { id, accountid, get, edit, create };
