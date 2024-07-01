# E-Commerce Application
This project is a basic e-commerce application developed using MERN stack (MongoDB, Express.js, React.js, Node.js). It includes user authentication, product management, and shopping cart functionalities.

Features
User Authentication:

Register new users.
Authenticate users and issue JWT tokens.
Secure routes with JWT middleware.
Product Management:

View a list of products.
View details of a specific product.
Add new products (admin only).
Update existing products (admin only).
Delete products (admin only).
Shopping Cart:

Add items to the shopping cart.
Remove items from the shopping cart.
View the shopping cart with item details.
Tech Stack
Frontend: React.js, Redux for state management, React Router for navigation.
Backend: Node.js, Express.js, MongoDB for database.
Authentication: JWT (JSON Web Tokens), bcrypt for password hashing.
API Testing: Postman.
Installation
Prerequisites
Node.js installed on your local machine.
MongoDB installed locally or using a cloud MongoDB service (e.g., MongoDB Atlas).
Git installed on your local machine for version control.
Setup Instructions
Clone the repository:

bash
Copy code
git clone <repository-url>
cd <project-folder>
Install dependencies:

bash
Copy code
# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
Set up environment variables:

Create a .env file in the backend folder.
Add environment variables like PORT, MONGODB_URI, JWT_SECRET, etc.
Start the development servers:

bash
Copy code
# Start backend server (from the backend folder)
npm start

# Start frontend server (from the frontend folder)
npm start
Open the application:

Open your browser and navigate to http://localhost:3000 to view the application.
API Endpoints
User Authentication
POST /api/auth/register
Register a new user.
POST /api/auth/login
Authenticate a user and issue a JWT token.
Product Management
GET /api/products

Retrieve all products.
GET /api/products/

Retrieve details of a specific product.
POST /api/products

Add a new product (admin only).
PUT /api/products/

Update an existing product (admin only).
DELETE /api/products/

Delete a product (admin only).
Shopping Cart
GET /api/cart
Retrieve the user's shopping cart.
POST /api/cart
Add an item to the cart.
DELETE /api/cart/
Remove an item from the cart.
This README provides clear instructions on how to install and run the application locally, outlines the project's features and technologies used, and lists the API endpoints for reference. Adjust the placeholders like <repository-url> and <project-folder> with your actual repository URL and project folder name.
