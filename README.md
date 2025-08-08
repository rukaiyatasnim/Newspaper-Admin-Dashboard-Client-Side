# Newsly - Comprehensive News Aggregation Platform

## Project Overview

Newsly is a modern, responsive newspaper website built with React, Node.js, Express, MongoDB, and Firebase. It offers trending news articles, premium subscription content, and a seamless user experience for both normal and premium users. Admins can manage publishers, articles, and users through an intuitive dashboard.

## Live Site
https://newspp-37d15.web.app/

## Admin Credentials

- **Email:** admin@gmail.com  
- **Password:** admin@gmail.com

---

## Key Features

- Fully responsive design for mobile, tablet, and desktop  
- Trending articles slider based on article view counts  
- Search articles by title with instant filtering  
- Filter articles by publisher and tags using multi-select dropdowns  
- User registration and login with email/password and Google OAuth  
- Role-based private routes: Admin, Premium user, Normal user  
- Admin dashboard with user management, article approval, and publisher management  
- Subscription system with multiple plans and premium content access  
- SweetAlert2 notifications for all CRUD and auth actions  
- Persistent login with JWT token stored in localStorage to prevent logout on page refresh  
- Pagination on admin pages for users and articles  
- Homepage modal prompting subscription after 10 seconds  
- SEO optimization using React Helmet Async  
- Image uploads via imgbb or Cloudinary  
- Dynamic charts on admin dashboard using React Google Charts  
- Smooth animations and typewriter effects for enhanced UI  

---

## Technologies Used

- React.js  
- React Router  
- Firebase Authentication  
- Axios  
- TanStack Query (React Query)  
- React Select  
- SweetAlert2  
- React Google Charts  
- MongoDB & Mongoose  
- Node.js & Express  
- Cloudinary / imgbb (for image upload)  
- Tailwind CSS  

---

## Project Structure

- **Client:** React frontend with public and private routes  
- **Server:** Node.js backend REST API with authentication and authorization  
- **Database:** MongoDB for storing users, articles, publishers, and subscriptions  
- **Authentication:** JWT-based authentication with role checks and token persistence  

---

## Setup Instructions

### Backend

1. Clone the repository  
2. Install dependencies with `npm install`  
3. Create `.env` file and add your MongoDB URI, JWT secret, Firebase config keys  
4. Run the server with `npm run dev`  

### Frontend

1. Navigate to the client folder  
2. Install dependencies with `npm install`  
3. Create `.env` file and add your Firebase config keys and imgbb/cloudinary API keys  
4. Run the frontend with `npm start`  

---

## GitHub Commits

- 20+ meaningful commits on the client side  
- 12+ meaningful commits on the server side  

---

## Additional Notes

- Avoided using Lorem Ipsum text; all content is relevant and real  
- Implemented full CRUD for articles with admin approval workflow  
- Normal users can post one article; premium users have unlimited posts  
- Reloading private routes keeps the user logged in via JWT token  
- Responsive dashboard with charts and pagination for admin views  
- Homepage modal encourages subscription after 10 seconds on page  

---

## Contact

For any questions, please contact Rukaiya Tasnim at connectrukaiya@gmail.com

---

*Thank you for checking out Newsly!*

