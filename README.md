🎥 LetsMeetUp — Real-Time Video Meeting Platform

LetsMeetUp is a full-stack real-time video meeting platform that enables users to create and join online meetings, communicate through video and audio, and collaborate through an interactive meeting interface.

The project is built with a modern 'React + Node.js + Express + PostgreSQL' architecture and uses 'Clerk' for authentication and 'Socket.IO' for real-time communication.

🔗 Live Demo: https://lets-meet-up-ten.vercel.app/

✨ Features

🔐 Secure user authentication with Clerk
🎥 Real-time video meetings
🎙️ Microphone and camera controls
💬 Real-time meeting chat
👥 Meeting room and participant management
🏠 Dashboard for managing meetings
📅 Meeting/session history
📊 Meeting statistics
🔒 Protected routes and authenticated API requests
⚡ Real-time communication using Socket.IO
📱 Responsive and modern user interface
☁️ Full-stack deployment support

🛠️ Tech Stack

# Frontend

* React.js
* JavaScript
* React Router
* Axios
* Lucide React
* Framer Motion

# Backend

* Node.js
* Express.js
* Socket.IO
* PostgreSQL
* Neon

# Authentication

* Clerk

# Deployment

* Vercel
* Render

# 🏗️ Project Structure

```text
LetsMeetUp/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── config/
│   │   └── assets/
│   └── package.json
│
├── server/
│   ├── controllers/
│   ├── routes/
│   ├── socket/
│   ├── config/
│   └── server.js
│
└── README.md
```

🔄 How It Works

```text
User
  ↓
Clerk Authentication
  ↓
React Dashboard
  ↓
Create / Join Meeting
  ↓
Express REST API
  ↓
PostgreSQL / Neon
  ↓
Socket.IO
  ↓
Real-Time Meeting Room
  ↓
Audio + Video + Chat
```

🚀 Getting Started

1. Clone the repository

```bash
git clone https://github.com/Mansviaskar/LetsMeetUp.git
cd LetsMeetUp
```

2. Install frontend dependencies

```bash
cd client
npm install
```

3. Install backend dependencies

```bash
cd ../server
npm install
```

4. Configure environment variables

Create `.env` files for the frontend and backend and add the required Clerk, database, and server configuration.

5. Start the backend

```bash
npm run dev
```

6. Start the frontend

```bash
cd ../client
npm run dev
```

🎯 Key Learning Outcomes

This project provided hands-on experience with:

* Full-stack web application development
* REST API development
* Authentication and authorization
* PostgreSQL database integration
* Real-time communication with Socket.IO
* WebRTC/media-device handling
* Protected routes
* Client-server communication
* Production deployment
* Debugging CORS and authentication issues

🔮 Future Improvements

* Screen sharing
* Meeting recording
* Meeting invitations
* Participant permissions
* File sharing
* Meeting notifications
* Improved mobile experience
* Production-grade monitoring and analytics

👩‍💻 Author

Mansvi Askar

* GitHub: https://github.com/Mansviaskar
* LinkedIn: https://linkedin.com/in/mansvi-askar-a3382b287/

---

⭐ If you find this project interesting, feel free to explore the repository and try the live demo.
