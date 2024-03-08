import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Card } from 'flowbite-react';
import { useParams } from "react-router-dom";
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

const Plan = () => {

  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState({})
  var { id } = useParams();

  const fetchPlan = async () => {
    try {
      setLoading(true);
      axios.get(`http://localhost:4000/plan/${id}`).then((response) => {
        if (response.data.success == false) return;
        setPlan(response.data);
        setLoading(false);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPlan();
  }, [id]);

 

  return (
    <> 
      <div className="flex md:flex-row flex-col animate-in">
        <div className="w-full">
          <h2 className="text-white font-mybold text-3xl m-8">{plan.title}</h2>
          <div className="flex items-center flex-col">
            <img
              src={plan.thumbnail ? plan.thumbnail : "https://images.unsplash.com/photo-1554629947-334ff61d85dc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1024&h=1280&q=80"}
              alt="Thumbnail"
              className="w-[80%] h-72 object-cover object-center rounded-md"
            />

            <h2 className="text-white font-mybold text-3xl mt-8">
              Description
            </h2>
            <p className="items-center w-[90%] text-white mx-8">
              {plan.description}
            </p>
          </div>
        </div>
        <div className="basis-2/4">
          <div className="flex items-center flex-col">
            <Link to={`/plans/${plan._id}/reserve`} className="bg-secondary rounded-2xl text-center text-white text-3xl font-mybold w-[40%] p-2 m-8 hover:w-[41%]">
              Reserve
              </Link>
            <Card className="max-w-sm">
              <div className="flex justify-end px-2 pt-1"></div>
              <div className="flex flex-col items-center pb-2">
                <img
                  alt="User image"
                  src={plan.profile?.avatar_url ? plan.profile.avatar_url : "https://images.unsplash.com/photo-1554629947-334ff61d85dc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1024&h=1280&q=80"}
                  className="mb-2 rounded-full shadow-lg h-24 w-24"
                />
                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                  {plan.profile?.name}
                </h5>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {plan.profile?.bio}
                </span>
                <div className="mt-2 flex space-x-3 lg:mt-6">
                  <a
                    href="#"
                    className="inline-flex items-center rounded-lg bg-secondary px-4 py-2 text-center text-sm font-medium text-white focus:outline-none "
                  >
                    Visit Profile
                  </a>
                  <a
                    href="#"
                    className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                  >
                    Message
                  </a>
                </div>
              </div>
            </Card>
            <DayPicker className="w-auto bg-white border rounded-md" selected={new Date(plan.date)} month={plan.date} modifiers={{ booked: new Date(plan.date)  }} modifiersStyles={{ booked: { border: '2px', backgroundColor: "#34C083" } }} ISOWeek disabled />
          </div>
        </div>
      </div>
    </>
  );
};

export default Plan;
