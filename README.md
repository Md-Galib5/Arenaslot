🏟️ ArenaSlot

Book the perfect sports arena in seconds.

ArenaSlot is a modern full-stack sports facility booking platform that helps users discover, book, and manage sports venues like football fields, cricket grounds, basketball courts, gyms, swimming pools, and more — all in one seamless experience.

Built for speed, simplicity, and real-time availability.

🌐 Live Link : https://arenaslot-seven.vercel.app/

⚙️ Tech Stack

Frontend

Next.js (App Router)
React
Tailwind CSS
Framer Motion
HeroUI / DaisyUI
Lucide Icons

Backend

Express.js
MongoDB + Mongoose
BetterAuth
jose-cjs (JWT handling)
📌 Overview

ArenaSlot connects players with local sports facilities in a fast and intuitive way.

Users can:

Discover nearby sports venues
View real-time availability
Book time slots instantly
Manage bookings from a personal dashboard

Facility owners can:

Add and manage sports venues
Configure pricing and time slots
Track incoming bookings

The platform is designed to make sports booking simple, fast, and reliable.

✨ Features
🧑‍💻 For Users
⚡ Instant Booking System — Book slots in seconds with live availability
🏀 Multi-Sport Support — Football, Cricket, Tennis, Basketball, Gym, Swimming & more
🔍 Smart Search & Filters — Easily find the right facility
⭐ Featured Venues — Highlighted top facilities for quick discovery
📅 Booking Dashboard — Manage all your bookings in one place
💬 User Reviews — Read and share real feedback
🏢 For Facility Owners
🏟️ Add new sports facilities
⏰ Manage available time slots
💰 Set pricing per hour
📊 Track bookings in real time
🔐 Authentication & Security
Secure authentication using BetterAuth
JWT-based session management
Protected routes for users and owners
Role-based access control
🎨 UI & UX
Smooth animations with Framer Motion
Fully responsive design (mobile-first)
Modern UI components using HeroUI & DaisyUI
Optimistic UI updates for better experience
Simple 3-step flow: Browse → Book → Play
🚀 Getting Started
1. Clone the repository
git clone https://github.com/your-username/arenaslot.git
cd arenaslot
2. Install dependencies

Frontend

cd client
npm install

Backend

cd server
npm install
3. Configure environment variables

Create .env files for both frontend and backend as shown below.

4. Run the project

Backend

cd server
npm run dev

Frontend

cd client
npm run dev

Open:

http://localhost:3000
📁 Project Structure
arenaslot/
├── src/
│   ├── app/              # Next.js routes
│   ├── components/       # UI components
│   ├── lib/              # Auth + helpers
│
├── server/               # Express backend
├── client/               # Next.js frontend
├── proxy.js
├── package.json
└── README.md
🔐 Environment Variables
Frontend (.env.local)
NEXT_PUBLIC_API_URL=http://localhost:5000
BETTER_AUTH_SECRET=your_secret
BETTER_AUTH_URL=http://localhost:3000
MONGODB_URI=your_mongodb_uri
Backend (.env)
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:3000
📜 Scripts
Frontend
npm run dev     # start dev server
npm run build   # build project
npm run start   # start production
npm run lint    # lint code
Backend
npm run dev     # start backend with nodemon
npm start       # production server
🤝 Contributing
Fork the repository

Create a branch

git checkout -b feature-name
Commit changes
Push branch
Open a Pull Request
