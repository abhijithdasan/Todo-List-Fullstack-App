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
- Netlify account (for frontend deployment)
- Render account (for backend deployment)

### Backend Setup

1. Clone the repository:

    ```bash
    git clone https://github.com/abhijithdasan/Todo-List-Fullstack-App.git
    cd Todo-List-Fullstack-App/Server
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Set up environment variables:

    Create a `.env` file in the `Server` directory with the following content:

    ```env
    MONGO_URI=mongodb+srv://<username>:<password>@cluster0.fm78y8t.mongodb.net/todo-list?retryWrites=true&w=majority
    PORT=3001
    ```

4. Run the backend server:

    ```bash
    npm start
    ```

### Frontend Setup

1. Navigate to the frontend directory:

    ```bash
    cd ../Frontend
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

#### Deploying Backend to Render

1. Deploy the backend:

    - Push your code to GitHub.
    - Go to Render's dashboard.
    - Create a new Web Service.
    - Connect your GitHub repository and select the `Server` folder.
    - Set environment variables in Render's settings:
        - `MONGO_URI`: Your MongoDB connection string
        - `PORT`: `3001`

2. After deployment, your backend will be available at `https://todo-app-server-we6b.onrender.com/`.

#### Deploying Frontend to Netlify

1. Deploy the frontend:

    - Push your code to GitHub.
    - Go to Netlify's dashboard.
    - Create a new site from Git.
    - Connect your GitHub repository and select the `Frontend` folder.

2. After deployment, your frontend will be available at `https://marx-list.netlify.app/`.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Repository

You can find the source code for this project on [GitHub](https://github.com/abhijithdasan/Todo-List-Fullstack-App).
