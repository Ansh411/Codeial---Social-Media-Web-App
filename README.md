# 💬 Codeial – Social Media Web Application

A full-stack **social networking web app** built using modern web technologies like **Node.js**, **Express**, and **MongoDB**.
This project represents my journey through backend development — from setting up authentication manually to implementing advanced tools like **Passport.js**, **JWT**, **Google OAuth**, and **Kue** for background jobs.

---

## 🧰 Tech Stack & Libraries Used

| Category               | Technologies / Libraries                       |
| ---------------------- | ---------------------------------------------- |
| **Backend**            | 🟩 Node.js • ⚙️ Express.js                     |
| **Database**           | 🗄️ MongoDB • 🧩 Mongoose                      |
| **Authentication**     | 🔐 Passport.js (Local & Google OAuth) • 🔑 JWT |
| **Utilities**          | 🍪 Cookie-Parser • 🔒 Crypto • 🧂 Bcrypt       |
| **Styling & Frontend** | 🎨 EJS • 💅 SCSS/SASS • ⚡ Noty.js • ⚙️ AJAX    |
| **Email & Jobs**       | 📬 Nodemailer • 🧵 Kue • 🧱 Redis              |
| **File Uploads**       | 🗂️ Multer                                     |
| **Architecture**       | 🧠 MVC Pattern                                 |

---

## ✨ Key Features

✅ **User Authentication & Authorization**

* Manual sign up / login using sessions
* Authentication via **Passport.js** (Local + Google OAuth)
* Token-based APIs using **JWT**

✅ **Profile Management**

* Update profile details and upload avatar with **Multer**
* Flash messages using **Noty.js**

✅ **Post & Comment System**

* Users can create, delete, and comment on posts
* Asynchronous operations using **AJAX**, **Promises**, and **async/await**

✅ **Email Service & Password Reset**

* Forgot Password feature using **Nodemailer**
* Secure password reset and update mechanism using **Crypto** and **Bcrypt**

✅ **Background Jobs**

* Used **Kue** and **Redis** to manage email jobs in background threads

✅ **API Integration**

* Created REST APIs for posts, comments, and user authentication with **JWT**

✅ **Styling**

* Beautiful UI built with modular **SASS/SCSS**

---

## 🧠 What I Learned

* Node.js + Express.js fundamentals
* Working with MongoDB using **Mongoose ODM**
* Authentication (Manual + Passport.js + JWT + Google OAuth 2.0)
* File upload with **Multer**
* Sending mails with **Nodemailer**
* Implementing background jobs using **Kue** & **Redis**
* Flash messages and alerts with **Noty.js**
* Securing data using **Crypto** and **Bcrypt**
* Building dynamic frontends with **AJAX**, **Promises**, and **async/await**
* Organizing and compiling **SASS/SCSS** files
* Following the **MVC architectural pattern**

---

## 📂 Folder Structure

```
codeial/
│
├── assets/             # SCSS, JS, images
├── config/             # Passport, Mongoose, Kue, etc.
├── controllers/        # App logic
├── mailers/            # Nodemailer templates
├── models/             # Mongoose schemas
├── routes/             # Express routes
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

### 2️⃣ Install all dependencies

```bash
npm install
```

### 3️⃣ Setup environment variables

Create a `.env` file in the root folder and add the following:

```bash
MONGODB_URI=your_mongodb_url
SESSION_SECRET=your_secret_key
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret
GOOGLE_CALLBACK_URL=http://localhost:8000/users/auth/google/callback
JWT_SECRET=your_jwt_secret
REDIS_URL=redis://127.0.0.1:6379
```

### 4️⃣ Start Redis (for Kue jobs)

If using WSL or Linux:

```bash
redis-server
```

### 5️⃣ Run the application

```bash
npm start
```

The app will run at 👉 **[http://localhost:8000](http://localhost:8000)**

---

## 📨 Email Configuration

This project uses **Nodemailer** to send password reset and other notification emails.
Configure your email credentials in `/config/nodemailer.js` for sending real emails.

---

## 🔒 Authentication Flow

1. Users can sign up or log in manually
2. Authentication handled with **Passport.js**
3. Social login with **Google OAuth 2.0**
4. JWT-based authentication for APIs
5. Forgot password → Generates token via **Crypto** → Sends mail via **Nodemailer**
6. User clicks link → Updates password securely (hashed with **Bcrypt**)

---

## ⚡ Running Background Jobs

Used **Kue** with **Redis** to handle asynchronous jobs (like sending mails).
Each job runs in a background worker thread to improve performance.

---

## 💾 Scripts in package.json

```json
"scripts": {
  "start": "node index.js",
  "dev": "nodemon index.js"
}
```

---

## 🧪 Testing the Application

* Create a user manually or log in using Google
* Create, delete, and comment on posts
* Check live flash messages using **Noty.js**
* Click “Forgot Password” to receive an email
* Reset password via secure tokenized link
* Try asynchronous post deletion via **AJAX**

---

## 🧑‍💻 Author

**Ansh Gupta**
📍 India
🔗 [LinkedIn](https://www.linkedin.com/in/ansh-gupta) • [GitHub](https://github.com/<your-username>)

> 💡 *“Still learning, building, and exploring full-stack technologies every day.”*

---

## 🌟 Project Status

🚧 **This is not the complete project — I’m still building it and adding more crazy features soon!**
Stay tuned for updates like real-time chat, notifications, and more! 🚀
