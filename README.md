# Natours

Natours is a complete tour booking application built with Node.js, Express, and MongoDB. This project focuses on building a robust and secure RESTful API, server-side rendering with Pug, and integrating payments.

## Features

-   **Tours**: Full CRUD operations for tour management, including geospatial searches.
-   **Users**: User authentication (signup, login, password reset) and authorization (roles: user, guide, lead-guide, admin).
-   **Reviews**: Users can write reviews and rate tours.
-   **Bookings**: Secure payments via Stripe integration.
-   **Security**: Implemented security best practices including checking for NoSQL injection, XSS, and parameter pollution. rate limiting, and security headers with Helmet.
-   **Email**: Automated emails for welcome messages and password resets.

## Built With

-   [Node.js](https://nodejs.org/) - JavaScript runtime
-   [Express.js](https://expressjs.com/) - Web framework for Node.js
-   [MongoDB](https://www.mongodb.com/) - NoSQL Database
-   [Mongoose](https://mongoosejs.com/) - Object Data Modeling (ODM) library
-   [Pug](https://pugjs.org/) - Template engine for server-side rendering
-   [Stripe](https://stripe.com/) - Payment processing platform
-   [JWT](https://jwt.io/) - JSON Web Tokens for authentication

## Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/Viveknegi384/Natours.git
    cd Natours
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Set up environment variables:
    Create a `config.env` file in the root directory and add the following variables:
    ```env
    NODE_ENV=development
    PORT=3000
    DATABASE=your_mongodb_connection_string
    DATABASE_PASSWORD=your_database_password
    JWT_SECRET=your_jwt_secret
    JWT_EXPIRES_IN=90d
    JWT_COOKIE_EXPIRES_IN=90
    
    # Email configuration (e.g., Mailtrap)
    EMAIL_USERNAME=your_email_username
    EMAIL_PASSWORD=your_email_password
    EMAIL_HOST=your_email_host
    EMAIL_PORT=your_email_port
    
    # Stripe
    STRIPE_SECRET_KEY=your_stripe_secret_key
    ```

## Usage

Run the application in development mode:
```bash
npm run start:dev
```

Run in production mode:
```bash
npm run start:prod
```

## API Endpoints

The API is structured around the following main resources:
-   `/api/v1/tours` - Tour management
-   `/api/v1/users` - User authentication and profile management
-   `/api/v1/reviews` - Review management
-   `/api/v1/bookings` - Booking and checkout

## Acknowledgements & Learning

This project was built while following the [Node.js, Express, MongoDB & More: The Complete Bootcamp 2024](https://www.udemy.com/share/101Wv63@ZJ9HUy5WXn6Y2UU54xR72rm1igIavsAR0AgLL-k-HiZe-j3-urxy2ro6QJTWxhbVug==/) course on Udemy.

The step-by-step learning process and progress can be found in this repository: [Backend Learning Repo](https://github.com/Viveknegi384/Backend).
