import React, { useState, useEffect } from 'react';
import axios from "axios"
import { Datepicker, Flowbite, Pagination, Alert } from 'flowbite-react';
import {Box, BoxSkeleton} from '../components/exploreComp/Box';
import { HiInformationCircle } from 'react-icons/hi';

const customTheme = {
 pagination: {
  "pages": {
    "selector": {
      "base": "w-12 border border-gray-300 bg-white py-2 leading-tight text-gray-500 enabled:hover:bg-gray-100 enabled:hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 enabled:dark:hover:bg-gray-700 enabled:dark:hover:text-white",
      "active": "bg-gray-300 text-primary hover:bg-cyan-100 hover:text-cyan-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white",
      "disabled": "opacity-50 cursor-normal"
    }
  }
 }
};



const Explore = () => {

  var query = new URLSearchParams(document.location.search)
  
  const [plans, setPlans] = useState([]);
  const [page, setPage] = useState(query.get('page') || 1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const pageSize = 9;
  

  const fetchPosts = async () => {
    try {
      setLoading(true);
      
      axios.get(import.meta.env.VITE_BASE_URL + `/plan/list/length`).then((response) => {
        if (response.data.success) {
          setTotalPages(Math.ceil(response.data.length / pageSize));
          axios
            .get(
              import.meta.env.VITE_BASE_URL +`/plan/list/explore?page=${page}&limit=${pageSize}`
            )
            .then( (response) => {
              if (response.data.success) {
                setPlans(response.data.plans);
                setLoading(false);
              }
            });
        }
      });

    } catch (error) {
      console.log(error)
    }
};

const fetchPostsByDate = async (date) => {
  try {
    setError("");
    setLoading(true);
        axios
          .get(
            import.meta.env.VITE_BASE_URL +`/plan/list/date/${date}`
          )
          .then( (response) => {
            if (response.data.success) {
              setPlans(response.data.plans);
              setLoading(false);
            } else if(response.data.message) {
              setError(response.data.message)
            }
          });
  } catch (error) {
    console.log(error)
  }
};

useEffect(() => {
  fetchPosts();
}, [page, pageSize]);

useEffect(() => {
  setPlans(plans);
}, [plans]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.history.pushState({}, '', `?page=${newPage}`);
  };

  const handleDate = (e) => {
    fetchPostsByDate(e)
  }

    return (
      <>
        <h2 className="text-white font-mybold text-3xl m-8">
          Explore Appointments
        </h2>
        <div className="flex items-center justify-center">
          <div className="rounded-md w-full h-28 mx-[10%] border-2 border-gray-700 flex">
            <div className="w-1/7 flex flex-col justify-center m-10 ">
              <h2 className="text-white font-semibold text-lg uppercase">
                Rendez
              </h2>
              <h3 className="text-white font-bold text-3xl uppercase">Vous</h3>
            </div>
            <div className="border-r-2 border-gray-700 h-[70%] self-center"></div>

            <div className="w-full justify-items-center items-center grid gap-4 grid-cols-1 md:grid-cols-2">
              <div className="w-1/7 flex justify-center items-center">
                <Datepicker
                  onSelectedDateChanged={handleDate}
                  className="outline-none w-auto px-4 py-1"
                  title="Search By Date"
                  weekStart={1} // Monday
                />
              </div>
              <div className="w-1/7 flex justify-center items-center">
                <input
                  type="text"
                  disabled
                  className="cursor-not-allowed outline-none focus:border-secondary w-full px-4 py-1 bg-white text-black rounded-md"
                  placeholder="Search"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-12">
            {error ? (
              <Alert color="failure" icon={HiInformationCircle}>
                <span className="font-medium">Info alert!</span> {error}
              </Alert>
            ) : (
              <div className="grid md:grid-cols-4 grid-cols-2 gap-4 md:w-[80%] w-[95%]">
             { loading ? (
              [0, 1, 2, 3, 4, 5, 6, 7, 8].map((num, index) => (
                <BoxSkeleton key={index} index={index} />
              ))
            ) : (
              plans.map((plan, index) => (
                <Box key={index} index={index} plan={plan} />
              ))
            )   } 
                  </div>
            )}
        </div>
        <div className="w-full p-4 flex justify-center">
          <nav>
            <Flowbite theme={{ theme: customTheme }}>
              <Pagination
                showIcons
                currentPage={page}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </Flowbite>
          </nav>
        </div>
      </>
    );
  };
  
  export default Explore;