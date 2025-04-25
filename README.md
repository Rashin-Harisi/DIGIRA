DIGIRA is a full-stack online shop practice project developed using React.js for the frontend, Express.js for the backend, and MongoDB as the database. It features a simple UI, as the main focus has been on building the application logic.

The EC2 AWS service is used to host the database in the cloud. A Docker container is set up using the official MongoDB image to containerize the database. The container's IP address is then added to the connection string. The database includes four collections: users, sellers, admins, and products.

The server runs on port 5001, and the frontend connects to it through this port. The backend has a straightforward structure: all routes are defined in the routes folder and imported into the main server file, app.js.

There are four main areas: authentication (signup/signin), profiles, products, and cart.

Signup: Email is used for verification via an OTP code. Passwords are hashed using the bcrypt package. User information is stored in the database according to their role (user, seller, or admin).

Signin: After entering a valid email and password and completing verification, a JWT token is issued with the request. As long as the token remains valid, users do not need to log in again. If a user forgets their password, they can recover it using their email address and an OTP code sent to them.

Products: Product submission is straightforward. However, submissions must be approved by an admin before appearing on the website. Once approved, they are visible on the main page. Product images are stored using the AWS S3 service.

Profiles: The profile page varies based on the user's role. Both users and sellers can edit personal information, change passwords, and track either their purchase history (for users) or product submissions (for sellers).

Cart: For state management, I used Zustand and also relied on the browser’s localStorage to persist cart data. This ensures that users keep their cart items even after a page reload or when returning later.

The project is still under development and not yet complete. I plan to add a payment system in a future update.
