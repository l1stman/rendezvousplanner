import React from 'react';
import { Link } from 'react-router-dom';
import { FaBookOpen } from 'react-icons/fa';
import { Button, Timeline, Footer } from 'flowbite-react';
import { HiArrowNarrowRight } from 'react-icons/hi';
const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <div className="flex items-center justify-center mt-8 sm:mt-16 lg:mt-32 animate-in">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl text-white font-mybold">Book Smarter, Live Better</h1>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-mybold text-secondary">RendezVous for effortless appointments</h1>
            <p className="text-white mt-2 sm:mt-6 lg:mt-8 mx-4 sm:mx-16 lg:mx-96 font-medium">
              Seamless scheduling for all! Discover a world where anyone can effortlessly book appointments with event creators. Simplify your life with RendezVous – Your Time, Your Way.
            </p>
            <div className='flex items-center justify-center space-x-4 mt-8'>
              <button className="p-1 rounded-lg w-48 h-10 bg-secondary text-white text-md font-semibold border-2 hover:ring-4 border-green-700 hover:ring-green-800">
                Start your appointment
              </button>
              <Link to='/explore'>
                <button className="p-1 rounded-lg w-48 h-10 text-white text-center text-md font-semibold border-2 border-gray-700 hover:border-gray-800 flex items-center justify-center">
                  <FaBookOpen className="w-1/6" /> 
                  <span className='w-1/2'>
                    Explore
                  </span>
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-16 px-4">
          <h2 className="text-3xl font-mybold text-center text-white">Features</h2>
          <TimelineComponent />
        </div>
      </div>

      <FooterComponent />
    </div>
  );
};


function TimelineComponent() {
  return (
    <Timeline className="animate-in">
      <Timeline.Item>
        <Timeline.Point />
        <Timeline.Content>
          <Timeline.Title className='text-secondary'>Getting Started</Timeline.Title>
          <Timeline.Body>
            To get started with our application, simply sign up and create your profile. This will give you access to all the features we offer.
          </Timeline.Body>
          <Link to='/auth'>
          <Button color="gray">
            Sign Up
            <HiArrowNarrowRight className="ml-2 h-3 w-3" />
          </Button>
          </Link>
        </Timeline.Content>
      </Timeline.Item>
      <Timeline.Item>
        <Timeline.Point />
        <Timeline.Content>
          <Timeline.Title className='text-secondary'>Using the Dashboard</Timeline.Title>
          <Timeline.Body>
            Once you're logged in, you can use the dashboard to manage your account, view your stats, and access other features.
          </Timeline.Body>
        </Timeline.Content>
      </Timeline.Item>
      <Timeline.Item>
        <Timeline.Point />
        <Timeline.Content>
          <Timeline.Title className='text-secondary'>Advanced Features</Timeline.Title>
          <Timeline.Body>
            Our application also offers advanced features such as downloadable RendezVous pdf, access to joiners information by serial, and Manage all appointments. You can access these from the dashboard.
          </Timeline.Body>
        </Timeline.Content>
      </Timeline.Item>
    </Timeline>
  );
}

function FooterComponent() {
  return (
    <Footer container className='bg-primary'>
      <div className="w-full text-center">
        <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
          <Footer.Brand
            src="/logo.png"
            alt="Flowbite Logo"
            name="Flowbite"
          />
          <Footer.LinkGroup className='space-x-4'>
            <Link to='/explore'>
            <Footer.Link >Explore</Footer.Link>
            </Link>
            <Link to='/dashboard'>
            <Footer.Link >Dashboard</Footer.Link>
            </Link>
            <Link to='/auth'>
            <Footer.Link >Sign Up</Footer.Link>
            </Link>
          </Footer.LinkGroup>
        </div>
        <Footer.Divider />
        <Footer.Copyright href="https://github.com/l1stman" by="l1stman™" year={new Date().getFullYear().toString()} />
      </div>
    </Footer>
  );
}

export default Home;