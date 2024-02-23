import React, { useState, useEffect } from 'react';
import axios from 'axios';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { FaAngleLeft, FaCircleCheck  } from "react-icons/fa6";
import { useParams } from "react-router-dom";
const PlanReserve = () => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    
    const [plan, setPlan] = useState({})
    var { id } = useParams();
    
  const fetchPlan = async () => {
    try {
        setLoading(true);
      axios.get(`http://localhost:4000/plan/${id}`).then((response) => {
        if (response.data.success == false) return;
        setPlan(response.data);
        console.log(response.data)
        setLoading(false);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPlan();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { name, cin, email } = e.target;
    
    try {
        const response = await axios.post(`http://localhost:4000/plan/${id}/reserve`, {
            name: name.value,
            cin: cin.value,
            email: email.value
        });
        
        if (response.data.success) {
            setSuccess(true);
            setLoading(false);
            console.log(response.data.rendezvous)
            // Generate and download PDF
            // generatePDF(name.value,cin.value,email.value);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const generatePDF = (name, cin, email) => {
    const content = `
    <div class="p-4 bg-gray-100 border border-gray-300 rounded-lg">
      <h2 class="text-2xl font-bold mb-2" style="color: black;">${plan.title}</h2>
      <div class="grid grid-cols-2 gap-2 mb-4">
        <div class="text-sm" style="color: black;">
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>CIN:</strong> ${cin}</p>
          <p><strong>Email:</strong> ${email}</p>
        </div>
        <div class="text-sm" style="color: black;">
          <p><strong>Date:</strong> ${formatDate(new Date(plan.date))}</p>
          <p><strong>Time:</strong> ${formatTime(new Date(plan.date))}</p>
        </div>
      </div>
    </div>
  `;

  
    const pdf = new jsPDF();
    pdf.html(content, {
      callback: () => {
        pdf.save('user_information.pdf');
      }
    });
  };
  
  
  return (
    <div className="min-h-screen flex flex-col sm:flex-row">
    <div id="pdf-content" className="w-full sm:w-1/2 bg-cover flex flex-col items-start justify-start p-4" style={{backgroundImage: `url('${plan.thumbnail ? plan.thumbnail : "https://source.unsplash.com/random"}')`}}>
        <button onClick={() => window.history.back()} className="text-white p-2 rounded-md bg-primary text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl border border-white"><FaAngleLeft /></button>
        {/* Add more content for the left half here if needed */}
    </div>
    <div className="w-auto mx-4 sm:w-1/2 bg-primary flex items-center justify-center">
        {success ? (
            <div className="flex flex-col items-center justify-center space-y-4">
                <FaCircleCheck className="text-secondary text-9xl" />
                <h2 className="text-white text-3xl font-extrabold">Success</h2>
                <p className="text-white text-center">
    Your appointment has been reserved successfully
    <br />
    <span className='text-center text-sm'>
        Please check your mail box for confirmation
    </span>
</p>
            </div>
        ) : 
        <div className="max-w-md w-full space-y-8">
            <div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
                    {plan.title} 
                </h2>
            </div>
            <form className="mt-8 space-y-6"  onSubmit={handleSubmit}>
                <div className="rounded-md shadow-sm -space-y-px">
                    <div>
                        <label htmlFor="name" className="text-white">Full name</label>
                        <input id="name" name="name" type="text" required className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:z-10 sm:text-sm" placeholder="Name" />
                    </div>
                    <div>
                        <label htmlFor="cin" className="text-white">National ID card or password number</label>
                        <input id="cin" name="cin" type="text" required className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:z-10 sm:text-sm" placeholder="ID" />
                    </div>
                    <div>
                        <label htmlFor="email" className="text-white">Email</label>
                        <input id="email" name="email" type="email" required className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:z-10 sm:text-sm" placeholder="Email" />
                    </div>
                    <div>
                        <input id="date" name="date" type="date" value={formatDate(new Date(plan.date))} className="appearance-none rounded-none rounded-t-md cursor-not-allowed relative block w-full px-3 py-2 mt-4 border border-gray-300 placeholder-gray-500 text-gray-900 outline-none sm:text-sm text-center" placeholder="Date" readOnly/>
                        <input id="time" name="time" type="time" value={formatTime(new Date(plan.date))} className="appearance-none rounded-none rounded-b-md cursor-not-allowed relative block w-full px-3 py-2  border border-gray-300 placeholder-gray-500 text-gray-900 outline-none sm:text-sm text-center" placeholder="time" readOnly/>
                    </div>
                </div>
                <div>
                    <p className='text-white'>  <input type="checkbox" className="form-checkbox h-5 w-5 text-secondary border rounded-md outline-none" />  I agree to the terms and conditions</p>
                    <button type="submit" className="group relative w-full flex justify-center py-2 px-4 mt-1 border border-transparent text-sm font-medium rounded-md text-white bg-secondary hover:ring-secondary outline-none hover:ring-2">
                        {loading ? "loading..." : "Reserve"}
                    </button>
                </div>
            </form>
        </div>
        }
    </div>
</div>
  );
};

function formatDate(date) {
    let day = date.getDate();
    let month = date.getMonth() + 1; // Months are zero based
    let year = date.getFullYear();
  
    // Pad the day and month with leading zeros if necessary
    day = day < 10 ? '0' + day : day;
    month = month < 10 ? '0' + month : month;
  
    return year + '-' + month + '-' + day;
  }
  function formatTime(date) {
        let hours = date.getHours();
        let minutes = date.getMinutes();
      
        // Pad the hours and minutes with leading zeros if necessary
        hours = hours < 10 ? '0' + hours : hours;
        minutes = minutes < 10 ? '0' + minutes : minutes;
      
        return hours + ':' + minutes;
    }

  export default PlanReserve;
  