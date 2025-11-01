# 🌐 Codeial – Social Media Web Application

A full-stack social media web application built with **Node.js**, **Express**, **MongoDB**, and **EJS**.
This project helped me learn backend development from scratch — from manual authentication to advanced features like email services, job queues, and social login.

---

## 🚀 Features Implemented

✅ **User Authentication & Authorization**

* Manual login/signup system using sessions
* Authentication with **Passport.js** (Local Strategy)
* **Google OAuth 2.0** login integration

✅ **Profile Management**

* Update profile details and upload avatars with **Multer**
* Flash messages via **Noty.js** for better UX

✅ **Post & Comment System**

* Users can create, delete, and comment on posts
* Asynchronous updates using **AJAX**, **Promises**, and **async/await**

✅ **Email & Password Recovery**

* Password reset via email using **Nodemailer**
* Secure reset links and password update flow

✅ **Background Jobs & Notifications**

* **Kue** + **Redis** for handling parallel jobs (like sending emails)

✅ **Security**

* **JWT (JSON Web Token)** based API authentication

✅ **Styling**

* Responsive UI using **SCSS/SASS** for modular CSS

---

## 🧠 What I Learned

* Node.js and Express fundamentals
* MongoDB integration using **Mongoose**
* Authentication (manual + Passport.js + JWT + Google OAuth)
* Working with **APIs**, **AJAX**, **Promises**, and **async/await**
* File upload using **Multer**
* Flash messages with **Noty.js**
* Email service using **Nodemailer**
* Job queues using **Kue** and **Redis**
* SCSS compilation and organization
* MVC architecture and modular code structure

---

## 🛠️ Tech Stack & Tools

| Category          | Technology                              |
| ----------------- | --------------------------------------- |
| 🟩 Backend        | Node.js, Express.js                     |
| 🗄️ Database      | MongoDB, Mongoose                       |
| 🔐 Authentication | Passport.js (Local + Google OAuth), JWT |
| 💅 Frontend       | EJS, SCSS, Noty.js, AJAX                |
| 📨 Mail Service   | Nodemailer                              |
| ⚙️ Job Queue      | Kue, Redis                              |
| 💾 File Upload    | Multer                                  |
| 🧰 Other Tools    | WSL (Redis setup), VS Code              |

---

## 🧩 Project Structure

```
codeial/
│
├── assets/             # SCSS, JS, images
├── config/             # Passport, Mongoose, Kue, etc.
├── controllers/        # Business logic
├── mailers/            # Nodemailer email templates
├── models/             # Mongoose schemas
├── routes/             # Express route files
├── views/              # EJS templates
├── index.js            # Main server file
└── package.json
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/<your-username>/codeial.git
cd codeial
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Set up environment variables

Create a `.env` file in the root directory and add:

```bash
MONGODB_URI=your_mongodb_url
SESSION_SECRET=your_secret_key
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret
GOOGLE_CALLBACK_URL=http://localhost:8000/users/auth/google/callback
JWT_SECRET=your_jwt_secret
REDIS_URL=redis://127.0.0.1:6379
```

### 4️⃣ Run Redis (for Kue jobs)

If using WSL:

```bash
redis-server
```

### 5️⃣ Run the server

```bash
npm start
```

Server runs on: **[http://localhost:8000](http://localhost:8000)**

---

## 📬 Sending Emails

The app uses **Nodemailer** for sending password reset and notification emails.
Make sure to configure a valid email service (like Gmail) inside `/config/nodemailer.js`.

---

## 🧪 Testing the App

* Create a new user or sign in using Google
* Create posts and comments
* Try deleting asynchronously (AJAX update)
* Use “Forgot Password” to receive reset mail
* Check email inbox for the reset link
* Reset your password securely

---

## 📸 Screenshots (Optional)

*Add screenshots or a demo GIF here if you’d like.*

---

## ❤️ Acknowledgements

This project was inspired by the **Codeial** project from the Node.js Bootcamp by [Coding Ninjas].
Built step-by-step while learning full-stack development.

---

## 🧑‍💻 Author

**Ansh Gupta**
📫 [LinkedIn](https://www.linkedin.com/in/ansh-gupta-b734a7230/) • [GitHub](https://github.com/Ansh411)
“Still learning, building, and exploring more!”

---

## ⭐ If you liked this project

Don’t forget to **star** the repository and share it with your friends!
