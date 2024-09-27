# ExpenSYNC - Expense Management Web App

ExpenSYNC is a powerful expense management application built using the PERN (PostgreSQL, Express, React, Node.js) stack. It helps users track and manage their monthly expenses efficiently.

- Live Preview: [https://expensyncapp.onrender.com](https://expensyncapp.onrender.com)

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

## Features

- User authentication using JWT for secure access
- Add expenses with details (category, name, amount, date)
- Live view of expenses in a table format
- Sort expenses by categories
- View total expenses
- View category-wise expense totals

## Tech Stack

- Frontend: React
- Backend: Node.js with Express
- Database: PostgreSQL (hosted on Supabase)
- Authentication: JWT (JSON Web Tokens)
- Hosting: Render (for both client and server)

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- PostgreSQL

### Installation

1. Clone the repository

```
  git clone https://github.com/nirajan128/ExpenSync
  cd expensnc
```

2. Install dependencies for both client and server

**Client**
```
  cd client
  npm install
```

**Server**
```
  cd ../server
  npm install
```

3. Set up environment variables
  Create a `.env` file in the server directory and add the following:
```
  DATABASE_URL=your_supabase_postgres_url
  JWT_SECRET=your_jwt_secret
  PORT=5000
```

4. Run the Server
```
  node server.js
```

5. Run the client
```
  npm start
```

6. Visit url
```
   http://localhost:5000
   Note: The client runs on port 5000 by default. Make sure your server is running on port 5000 (or the port specified in the .env file).


```


## Usage

1. Register a new account or log in to an existing one.
2. Add new expenses using the "Add Expense" form.
3. View your expenses in the table below the form.
4. Use the category filter to sort expenses by category.
5. Check the total expenses and category-wise totals at the bottom of the page.

## Deployment

The application is deployed on Render:

- Frontend: [https://expensyncapp.onrender.com](https://expensyncapp.onrender.com)
- Backend: [https://expensync.onrender.com](https://expensync.onrender.com)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [Supabase](https://supabase.io/) for database hosting
- [Render](https://render.com/) for application hosting
- [JWT](https://jwt.io/) for secure authentication
- [React](https://reactjs.org/) for the frontend framework
- [Express](https://expressjs.com/) for the backend framework
- [Node.js](https://nodejs.org/) for the runtime environment
- [PostgreSQL](https://www.postgresql.org/) for the database

---

For any additional information or support, please open an issue in the GitHub repository.
