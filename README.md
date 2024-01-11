# Vspy Windows Based Keylogger v1.0 🕵️‍♂️

## Overview 🎯

Welcome to Vspy, a demonstration keylogger built for educational purposes. This tool showcases keylogging functionalities and is intended solely for ethical and educational use. Please read this README file carefully before deploying the application.

## GitHub Repository 🌐

Visit our GitHub repository for the latest updates and source code: [Vspy GitHub](https://github.com/Rathod-Rahul/Vspy-Deployment.git)

## Prerequisites 🛠️

- Node.js installed
- XAMPP or a local server for the database

## Installation 🚀

1. Clone the repository:
   ```bash
   git clone https://github.com/Rathod-Rahul/Vspy-Deployment.git
2. ```bash
   cd Vspy-Deployment
3. ```bash
   npm install
4. Configure the database:
 Create a .env file in the project root and add the following variables:
DB_HOST=localhost
DB_USER=root
DB_PORT=3306
DB_PASSWORD=""
DB_DATABASE=
SESSION_SECRET=
SESSION_NAME=
SESSION_LIFETIME=
EMAIL_ADDRESS=
EMAIL_PASSWORD=
Note: If using XAMPP, the default root user with an empty password and port 3306 is assumed. Ensure you create the main_log database and a users table with columns: id, username, password, email, and reset_token.
5.Start the application:
```bash
npm start
6. Open your web browser and visit http://localhost:3000 to access the Vspy dashboard.


