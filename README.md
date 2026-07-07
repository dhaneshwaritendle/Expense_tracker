# [Expense Tracker Application](https://expense-tracker-1-mpy1.onrender.com)

Check out the deployed application on the url : https://expense-tracker-1-mpy1.onrender.com
A full-stack web application designed to help users track their personal expenses. Built with a modern tech stack including React, Node.js, Express, and Supabase for authentication and database services.

## Features

-   **User Authentication**: Secure user signup and login handled by Supabase Auth.
-   **Expense Management**: Create, Read, Update, and Delete (CRUD) operations for expenses.
-   **Dashboard**: A central place to view key information and navigate the app.
-   **Modern UI**: A clean, minimalistic, and responsive user interface built with Tailwind CSS.
-   **RESTful API**: A robust backend server built with Express.js.

## 🗺️ Roadmap & Upcoming Features

I am actively working on expanding this application. Here are the features currently planned or in development:

-   [ ] **Bulk CSV Import/Export**: Allow users to upload historical financial records via CSV or export data for spreadsheet analysis.
-   [ ] **Interactive Data Analytics**: Add interactive pie charts and trend graphs to visualize monthly distributions by category.
-   [ ] **Budget Threshold Alerts**: Enable users to set monthly spending limits with automated warnings when nearing the cap.
-   [ ] **Recurring Expenses**: Support automated logging for fixed monthly subscriptions (e.g., Netflix, gym memberships).


## Tech Stack

-   **Frontend**:
    -   [React](https://reactjs.org/)
    -   [Vite](https://vitejs.dev/)
    -   [Tailwind CSS](https://tailwindcss.com/)
    -   [React Router](https://reactrouter.com/)
    -   [Axios](https://axios-http.com/)
-   **Backend**:
    -   [Node.js](https://nodejs.org/)
    -   [Express.js](https://expressjs.com/)
    -   [Prisma](https://www.prisma.io/)
-   **Database & Auth**:
    -   [PostgreSQL](https://www.postgresql.org/) (hosted on Supabase)
    -   [Supabase](https://supabase.io/) (for Auth and Database)

## Project Structure

The project is a monorepo with two main directories:

-   `client/expense-ui/`: Contains the React frontend application.
-   `server/`: Contains the Node.js/Express backend server and Prisma schema.

---

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

-   Node.js (v18 or later recommended)
-   npm or yarn
-   A free Supabase account

### Backend Setup

1.  **Navigate to the server directory:**
    ```bash
    cd server
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the `server` directory and add the following variables. You can get these from your Supabase project dashboard.

    -   `DATABASE_URL` & `DIRECT_URL`: Found in `Project Settings` > `Database` > `Connection string`.

    ```env
    # .env
    DATABASE_URL="postgresql://..."
    DIRECT_URL="postgresql://..."
    PORT=3000
    VITE_SUPABASE_URL="https://<your-project-id>.supabase.co"
    VITE_SUPABASE_ANON_KEY="your-supabase-anon-key"
    ```

4.  **Run database migrations:**
    This will set up your database schema based on `prisma/schema.prisma`.
    ```bash
    npx prisma migrate dev
    ```

5.  **Start the server:**
    ```bash
    npm start
    ```
    The backend server will be running on `http://localhost:3000`.

### Frontend Setup

1.  **Navigate to the client directory:**
    ```bash
    cd client/expense-ui
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the `client/expense-ui` directory and add the following variables from your Supabase project dashboard (`Project Settings` > `API`).

    ```env
    # .env
    VITE_API_BASE_URL=http://localhost:3000
    VITE_SUPABASE_URL="https://<your-project-id>.supabase.co"
    VITE_SUPABASE_ANON_KEY="your-supabase-anon-key"
    ```

4.  **Start the development server:**
    ```bash
    npm run dev
    ```
    The frontend application will be running on `http://localhost:5173`.

