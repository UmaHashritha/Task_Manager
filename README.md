<< HEAD
# Task_Manger
This Task Manager is a full-stack web app built with React 18, Node.js/Express, and PostgreSQL. It features a modern glass morphism design where users can create, manage, and organize tasks with priorities, due  dates, and completion tracking. The responsive interface includes visual indicators and follows modular architecture with RESTful APIs.
=======
# Task Manager

A full-stack task management application built with React and Node.js.

## Features

- Drag and drop task management
- Real-time task updates
- PostgreSQL database integration
- Responsive design with Tailwind CSS

## Tech Stack

**Frontend:**
- React 18
- Tailwind CSS
- Hello Pangea DnD (drag & drop)
- Axios

**Backend:**
- Node.js
- Express.js
- PostgreSQL
- CORS enabled

## Setup

### Prerequisites
- Node.js
- PostgreSQL

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd Task_Manager
```

2. Install backend dependencies
```bash
cd backend
npm install
```

3. Install frontend dependencies
```bash
cd ../frontend
npm install
```

4. Configure environment variables
```bash
cd ../backend
cp .env.example .env
# Edit .env with your database credentials
```

### Running the Application

1. Start the backend server
```bash
cd backend
npm run dev
```

2. Start the frontend development server
```bash
cd frontend
npm start
```

The frontend will be available at `http://localhost:3000`

## Project Structure

```
Task_Manager/
├── frontend/                    # React application
│   ├── public/
│   │   └── index.html          # HTML template
│   ├── src/
│   │   ├── components/
│   │   │   ├── TaskForm.jsx    # Task creation form
│   │   │   └── TaskList.jsx    # Task display and management
│   │   ├── App.jsx             # Main application component
│   │   ├── api.js              # API service functions
│   │   ├── index.js            # React entry point
│   │   ├── index.css           # Global styles
│   │   └── tailwind.css        # Tailwind CSS imports
│   ├── package.json            # Frontend dependencies
│   ├── tailwind.config.js      # Tailwind configuration
│   └── postcss.config.js       # PostCSS configuration
├── backend/                     # Express.js API
│   ├── src/
│   │   ├── controllers/
│   │   │   └── taskController.js    # Task route handlers
│   │   ├── models/
│   │   │   └── taskModel.js         # Task database model
│   │   ├── routes/
│   │   │   └── taskRoutes.js        # API route definitions
│   │   ├── services/
│   │   │   └── taskService.js       # Business logic layer
│   │   ├── app.js                   # Express server setup
│   │   └── db.js                    # Database connection
│   ├── package.json                 # Backend dependencies
│   └── .env                         # Environment variables
├── .gitignore                       # Git ignore rules
└── README.md                        # Project documentation
```
>>>>>>> f28d5e5 (chore: initial commit - Task Manager)
