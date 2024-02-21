import React from "react";
import { Link } from 'react-router-dom';
const Box = ({ plan, index }) => {
    function isEven(number) {
        var arr = [0, 4, 8, 9, 14, 18];
        return arr.includes(number);
      }
    return (
      <>
      <Link to={`/plans/${plan._id}`} className={`${isEven(index) ? `md:col-span-2 col-span-1`: null}`}>
        <div
          className={"bg-white shadow-md rounded-lg overflow-hidden " }
          >
         <div className="relative">
  <img
    src={plan.thumbnail ? plan.thumbnail : "https://images.unsplash.com/photo-1554629947-334ff61d85dc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1024&h=1280&q=80"}
    alt="Thumbnail"
    className="w-full h-32 object-cover object-center"
  />
  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/8 text-white font-bold bg-black bg-opacity-25 rounded-md p-2">
    {new Date(plan.date).toLocaleDateString()} {/* Replace with your date */}
  </div>
</div>
          <div className="p-4">
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {plan.title}
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        {plan.description.length > 100 ? plan.description.substring(0, 100) + "..." : plan.description}
      </p>
          </div>
        </div>
      </Link>
      </>
    );
  
}

const BoxSkeleton = ({ index }) => {
  function isEven(number) {
      var arr = [0, 4, 8, 9, 14, 18];
      return arr.includes(number);
    }
  return (
    <>
      <div
        className={`bg-white shadow-md rounded-lg overflow-hidden animate-pulse ${
          isEven(index) ? `md:col-span-2 col-span-1` : null
        }`}
      >
        <div className="w-full h-24 bg-gray-400 flex items-center justify-center opacity-25">
          <svg
            className="w-full h-16 text-gray-200 dark:text-gray-600"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 18"
          >
            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
          </svg>
        </div>
        <div className="p-4">
          <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4 "></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5 "></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5 "></div>
        </div>
      </div>
    </>
  );

}

export {Box, BoxSkeleton};