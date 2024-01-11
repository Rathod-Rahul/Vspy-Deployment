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
- **DB_HOST:** localhost
- **DB_USER:** root
- **DB_PORT:** 3306
- **DB_PASSWORD:** ""
- **DB_DATABASE:** [Your Database Name]
- **SESSION_SECRET:** [Your Secret]
- **SESSION_NAME:** [Your Session Name]
- **SESSION_LIFETIME:** [Session Lifetime in milliseconds]
- **EMAIL_ADDRESS:** [Your Email Address]
- **EMAIL_PASSWORD:** [Your Email Password]
- 
Note: If using XAMPP, the default root user with an empty password and port 3306 is assumed. Ensure you create the main_log database and a user table with columns: id, username, password, email, and reset_token.


5. Start the application:
6. ```bash
     npm start
7. Open your web browser and visit http://localhost:3000 to access the Vspy dashboard.

# Features of Vspy Keylogger 🌟

## 1. Password Harvesting Module 🔐

- Easily retrieve and manage stored passwords from Google Chrome, making it simpler to access and organize login credentials.

## 2. Cookie Surveillance Engine 🍪

- Safeguard your online accounts by capturing and securely logging Chrome cookies, ensuring a secure and hassle-free online experience.

## 3. Real-time Keystroke Logger ⌨️

- Monitor and record keystrokes in real-time, providing insights into user behavior without compromising data privacy.

## 4. Clipboard Data Interceptor 📋

- Retrieve clipboard content in real-time, streamlining workflows and enabling quick access to copied information.

## 5. Location Intelligence Module 🌐

- Facilitate targeted actions and monitor movements responsibly with location information features.

## 6. Browser History Scraper 🕵️‍♀️

- Easily review and analyze your entire browsing history, gaining insights into online activities and preferences.

## 7. Application Tracking System 📊

- Understand your software usage patterns by identifying and logging all running applications on your computer.

## 8. Download Surveillance Module 📥

- Track recent downloads, empowering you to manage acquired files and stay vigilant against potential security threats.



