
# Avinashi Rotary Club - Official Website 🌐

## Project Overview
This is the official website of **Avinashi Rotary Club**, built to showcase its members, initiatives, events, and social activities. It is a full-stack web application developed using **ReactJS** (frontend), **Node.js + Express.js** (backend), and **MySQL** (database).

---

## Features
- Dynamic Admin Panel (CRUD operations)
- Member Directory with Role-Based Access
- Event Management & Announcements
- Image Gallery Integration
- Contact Form with Backend Handling
- Responsive UI for all screen sizes

---

## Tech Stack

### 🖥️ Frontend
- ReactJS
- Axios
- Tailwind CSS / Bootstrap (whichever used)

### ⚙️ Backend
- Node.js
- Express.js
- REST API

### 🗄️ Database
- MySQL

---

## Installation

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-username/avinashi-rotary-website.git
   cd avinashi-rotary-website
   ```

2. **Install Backend Dependencies:**
   ```bash
   cd server
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file inside the `server` directory:
   ```env
   PORT=5000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=rotary_db
   ```

4. **Run the Backend Server:**
   ```bash
   npm start
   ```

5. **Install Frontend Dependencies:**
   ```bash
   cd ../client
   npm install
   ```

6. **Run the Frontend:**
   ```bash
   npm start
   ```

---

## Usage

1. **Access the Application:**
   - Frontend: `http://localhost:3000`
   - Backend API: `http://localhost:5000/api`

2. **Setup Database:**
   - Import MySQL schema provided in `server/db/rotary_schema.sql`

3. **Login to Admin Panel:**
   - Use default credentials or register through API

---

## Project Structure
```
avinashi-rotary-website/
├── client/                # ReactJS Frontend
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       └── App.js
├── server/                # Node.js + Express Backend
│   ├── routes/
│   ├── controllers/
│   ├── config/
│   └── server.js
├── README.md
├── .env
└── package.json
```

---

## Libraries Used

- `ReactJS` – Frontend library
- `Axios` – API communication
- `Node.js` & `Express.js` – Backend & routing
- `MySQL` – Relational database
- `cors`, `dotenv`, `body-parser` – Middleware & configuration

---
