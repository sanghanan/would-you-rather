# Would You Rather? Voting System
![Project Logo](/readme_images/logo.png)
> Created by DALL.E3
## SWEN.755 - Assignment 4
## Teammates - Group 6
- Sam Singh Anantha
- Avinash Amudala
- Haotian Zhang
- Utkarsh Sharma
## Overview
*Would You Rather?* is a web-based voting system where users can participate in polls to choose between two options. This application is built with secure session management and offers distinct functionalities for admin and general users.

## Features
- **User Authentication**: Secure login and registration system.
- **Poll Participation**: Users can vote on active polls.
- **Admin Controls**: Admin users can open or close polls and view detailed vote counts.
- **Responsive Design**: Accessible on various devices with a user-friendly interface.

## To Run the Application

### Prepare the Environmrnt

Follow the instructions [here](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) to install the latest version of **npm** and **node.js**.

### Set up the application

To get the application running on your local machine, follow these steps:

1. **Clone the Repository**:
```bash
git clone https://github.com/sanghanan/would-you-rather.git
   ```
2. **Navigate to the Project Directory**:
```bash
cd would-you-rather
   ```
3. **Install Dependencies**: 
```bash
npm install
```
4. **Run the Seed Script**: 
```bash 
node seed.js 
```

## Starting the Application
Run the application using the following command:
```bash
node index.js
```
The application will automatically open in your default web browser at `http://localhost:3000/`.

## Run the Tests
Run the tests for architecture breakers using:

```bash
npm test
```
Results will show in the console.

## Technologies Used
- **Frontend**: EJS, Bootstrap
- **Backend**: Node.js, Express
- **Database**: SQLite3 (with Sequelize ORM)
- **Authentication**: Passport.js
- **Security**: bcrypt for password hashing

## User Roles
- **General User**: Can vote in polls and view results of closed polls.
- **Admin**: Can create polls, open/close polls, and view vote counts at any time.

## Architecture Diagrams
### Layers
![Layers](/readme_images/Architecture.png)
### Components
![Components](/readme_images/Class.png)