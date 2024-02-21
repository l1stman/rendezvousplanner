# Rendezvous Planner

Rendezvous Planner is a web application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) that allows users to schedule and manage appointments.

## Features

- User authentication: Users can sign up, log in, and log out.
- Appointment creation: Users can create new appointments by providing details such as date, time, location, and description.
- Appointment management: Users can view, edit, and delete their appointments.
- Notifications: Users can receive notifications for upcoming appointments.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/l1stman/rendezvousplanner.git
   ```
   
2. Install packages in ./server and ./rendezvousplanner (client)

3. Create .env file:
    in ./server/ create .env file and write
    ```
        PORT=4000
        MONGO_URI=mongodb+srv://admin:anypasswordrendezvousplanner@cluster0.owpfifr.mongodb.net/data
    ```