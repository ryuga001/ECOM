# E-commerce Web Application

## Introduction

This project is an e-commerce web application designed to provide users with a seamless shopping experience. It includes features tailored for both regular users and administrators, ensuring efficient management of products and orders.

## User Features

- **Registration**
  - Users can easily register, providing necessary details along with an optional profile image for personalization.

- **Login**
  - Secure login functionality is implemented, with user data efficiently managed and stored using Redux Toolkit for streamlined access.

- **Home Page**
  - A dynamic home page offers a user-friendly interface with intuitive features such as search, category-wise filtering, pagination, and an option to reset filters for enhanced browsing.

- **Product Description**
  - Detailed product descriptions are complemented with image handling, ensuring users have a comprehensive view of the products.
  - Users can leave reviews, with options to edit and delete their own reviews, promoting community engagement.

- **Cart**
  - Efficient cart management allows users to easily add, remove, and adjust quantities of items, providing a hassle-free shopping experience.

- **Place Order**
  - A secure checkout process enables users to finalize their purchases with confidence.

- **My Orders**
  - Users can conveniently view their order history, keeping track of their past purchases.

- **Protected Routes and Logout**
  - Authentication and authorization are seamlessly integrated, ensuring access to protected routes and providing a smooth logout experience.

## Admin Features

- **Dashboard**
  - Administrators have access to a comprehensive dashboard, providing insights and controls for efficient management.

- **User and Product Management**
  - Administrators can view all users and products, facilitating effective oversight and management.
  - CRUD functionality for products allows administrators to create, read, update, and delete product listings as needed.

- **Analytics**
  - Visual representation of data, including charts for male/female distribution, product categories, and more, empowers administrators with actionable insights for strategic decision-making.

- **Order Management**
  - Administrators can efficiently manage all orders, ensuring timely processing and fulfillment.

## Backend Features 
- Server side pagination , category wise filtering , search feature
- Autentication : JWT Token with cookie 
- Error Handling 
- Multer is used for file handling
- Implemented with typescript 

## Technologies Used
- Frontend: React.js, Redux Toolkit , Typescript , scss 
- Backend: Node.js, Express.js, MongoDB , Typescript 
- Authentication: JWT Tokens 
- Chats : Chat.js
- Image uploading  : Multer 

## How to Run

1. Clone the repository.
2. Navigate to the project directory.
3. Install dependencies: `npm install`.
4. Start the frontend: `npm start`.
5. Start the backend (if separate): `npm run server`.
