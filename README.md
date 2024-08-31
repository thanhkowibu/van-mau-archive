<div align="center">
<a href="https://github.com/thanhkowibu/van-mau-archive">
    <img src="/client/public/logo.png" alt="Logo" width="500">
</a>
</div>

# Van Mau Archive

A web application for storing and sharing copypasta text, making it easy to search and copy content for various uses.

## Demo

Feel free to test out the demo website deployed on Vercel [here](https://vanmauarchive.vercel.app/).

## Table of Contents

- [Installation](#installation)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)

## Installation

To run the project, follow these steps:

1. **Clone the repository:**
```
git clone https://github.com/thanhkowibu/van-mau-archive.git
cd van-mau-archive
```


2. **Install dependencies:**

- For the client:
```
cd client
npm install
```

- For the server:
```
cd api
npm install
```


3. **Configure environment variables:**

- Create a `.env` file in the `api` directory with the following content:
```
PORT=5000
CLIENT_URL=http://localhost:5173
CONNECTION_STRING=your_postgresql_database_url
JWT_KEY_ACCESS=your_jwt_access
JWT_KEY_REFRESH=your_jwt_refresh
```

- Create a `.env` file in the `client` directory with the following content:
```
VITE_BASE_URL=http://localhost:5000
```


4. **Run the development servers:**

- Start the client:
```
npm run dev
```

- Start the server:
```
npm run dev
```

5. **Access the application:**

- Open your browser and go to `http://localhost:5173` for the client and `http://localhost:5000` for the API server.

<p align="right">(<a href="#readme">back to top</a>)</p>

## Features

- **Text Search and Copy:** Easily search for specific copypasta text and copy it to the clipboard.
- **User Authentication:** Secure login and registration with JWT-based authentication.
- **Text Submission:** Users can create, update, delete own copypasta text.
- **Responsive Design:** Optimized for various devices with a user-friendly interface.

<p align="right">(<a href="#readme">back to top</a>)</p>

## Technologies Used

### **Frontend:**
- [React](https://reactjs.org/) with [TypeScript](https://www.typescriptlang.org/) and [Vite](https://vitejs.dev/)
- [TailwindCSS](https://tailwindcss.com/) for styling

### **Backend:**
- [ExpressJS](https://expressjs.com/) with [TypeScript](https://www.typescriptlang.org/) for server-side logic
- [PostgreSQL](https://www.postgresql.org/) for the database

<p align="right">(<a href="#readme">back to top</a>)</p>

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch with a descriptive name: `git checkout -b feature/your-feature-name`.
3. Make your changes and commit them: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature/your-feature-name`.
5. Open a pull request.

<p align="right">(<a href="#readme">back to top</a>)</p>

## Like this project?

If you find this project interesting, please leave a star on the repo!

<p align="right">(<a href="#readme">back to top</a>)</p>

