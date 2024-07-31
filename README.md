# TODO LIST

A full-stack TODO list application built with React (frontend) and Node.js/Express (backend) with MongoDB Atlas for database storage.

## Features

- Add, edit, delete, and mark todos as done
- Light and dark theme toggle
- Responsive design

## Technologies Used

- Frontend: React, Axios, Vite
- Backend: Node.js, Express, Mongoose
- Database: MongoDB Atlas
- Icons: React Icons

## Setup Instructions

### Prerequisites

- Node.js and npm installed
- MongoDB Atlas account
- Vercel account

### Backend Setup

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/todo-list.git
    cd todo-list/Server
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Set up environment variables:

    Create a `.env` file in the `Server` directory with the following content:

    ```env
    MONGODB_URI=mongodb+srv://<username>:<password></password>cluster0.fm78y8t.mongodb.net/?retryWrites=true&w=majority
    ```

4. Run the backend server:

    ```bash
    npm start
    ```

### Frontend Setup

1. Navigate to the frontend directory:

    ```bash
    cd ../todo-list
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Run the frontend development server:

    ```bash
    npm run dev
    ```

### Deployment

#### Deploying Backend to Vercel

1. Install the Vercel CLI:

    ```bash
    npm install -g vercel
    ```

2. Deploy the backend:

    ```bash
    cd ../Server
    vercel
    ```

3. Set up environment variables on Vercel:

    - Go to your project in the Vercel dashboard.
    - Click on the “Settings” tab.
    - Click on “Environment Variables”.
    - Add a new environment variable with the key `MONGODB_URI` and the value from your `.env` file.

#### Deploying Frontend to Vercel

1. Deploy the frontend:

    ```bash
    cd ../todo-list
    vercel
    ```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
