```markdown
# Avinashi Rotary Club - Official Website 🌐

This is the official website of **Avinashi Rotary Club**, developed as a consultancy project to provide an elegant and functional online presence. The site showcases the club’s objectives, members, events, gallery, and community service activities. It is a full-stack web application built using **ReactJS** for the frontend, **Node.js + Express.js** for the backend, and **MySQL** for data storage.

## 🚀 Tech Stack

### Frontend
- **ReactJS** (with functional components and hooks)
- **Axios** for API communication
- **Tailwind CSS / Bootstrap** (choose the one you used) for styling

### Backend
- **Node.js**
- **Express.js**
- **RESTful APIs**
- **CORS** and **body-parser**

### Database
- **MySQL**
- Tables include:
  - `members`
  - `events`
  - `gallery`
  - `news`
  - `contact_queries`
  - `admin_users`

---

## 🔧 Features

- Responsive and mobile-friendly design
- Admin login and content management (CRUD)
- Events listing and updates
- Member directory
- Image gallery
- Contact form with backend integration
- News/Announcements section
- Secure routing and data validation

---

## 📂 Project Structure

### Frontend (`/client`)
```

client/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── App.js
│   ├── index.js
│   └── services/
│       └── api.js

```

### Backend (`/server`)
```

server/
├── config/
│   └── db.js
├── controllers/
├── routes/
├── models/
├── server.js
└── .env

````

---

## ⚙️ Setup and Installation

### Prerequisites
- Node.js & npm
- MySQL server

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/avinashi-rotary-website.git
cd avinashi-rotary-website
````

### 2. Backend Setup

```bash
cd server
npm install
```

* Configure `.env`:

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=rotarydb
```

* Run backend server:

```bash
npm start
```

### 3. Frontend Setup

```bash
cd client
npm install
npm start
```

The app will run at: `http://localhost:3000`

---

## 🗄️ Database

Import the MySQL schema from `server/db/rotary_schema.sql` using any MySQL client (like phpMyAdmin, MySQL Workbench, or command-line).

---

## 🙌 Acknowledgements

This project was developed as part of a professional consultancy assignment.
Special thanks to the **Avinashi Rotary Club** team for their support and guidance throughout development.

---
