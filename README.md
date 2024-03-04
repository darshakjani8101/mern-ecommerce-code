# MERN Stack AI Chatbot

This is an AI Chatbot application, inspired by ChatGPT, by using MERN Stack and OpenAI.

It's a customized chatbot where each message of the user is stored in DB and can be retrieved and deleted.

It's a completely secure application using JWT Tokens, HTTP-Only Cookies, Signed Cookies, Password Encryption, and Middleware Chains.

## Features

- **User Authentication and Authorization System:** Implements user authentication and authorization using JWT tokens and HTTP-only cookies for secure access.
- **Express-Validators Middleware:** Utilizes Express-Validators middleware to validate incoming data.
- **Storing User's Chats in MongoDB:** Stores user chats in MongoDB for persistence and retrieval.
- **Custom Authentication System:** Develops a custom authentication system for enhanced security.
- **JWT Authorization Tokens:** Uses JWT tokens for authorization, ensuring secure communication between client and server.
- **Protecting User Routes:** Secures user routes with verification checks to control access.
- **Modern React App with Vite:** Builds a modern React application using Vite for fast and efficient development.
- **Beautiful Chat UI with Material UI Library:** Creates a visually appealing chat UI using the Material UI library.
- **Complete Responsive Design:** Ensures a responsive design for optimal user experience across devices.
- **Integrating OpenAI with MERN Stack:** Integrates OpenAI for AI capabilities, creating a full-stack ChatGPT-like clone.
- **Storing User Sessions:** Manages user sessions for seamless interaction and continuity.

## Hosted Application
You can access the hosted application at https://openai-chatbot-bxaa.onrender.com

## Local Setup

### 1. Clone the repository:

```bash
git clone https://github.com/darshakjani8101/OpenAI_Chatbot.git
```

### 2. Install dependencies:

```bash
# Navigate to the backend directory
cd backend
npm install

# Navigate to the frontend directory
cd ../frontend
npm install
```

### 3. Set up environment variables:
Create a .env file in the backend directory and add the following variables:

```bash
OPEN_AI_SECRET=sk-your_openai_api_key
OPENAI_ORGANIZATION_ID=your_openai_organization_id
MONGODB_URL=your_mongodb_uri
JWT_SECRET=your_jwt_secret
COOKIE_SECRET=your_cookie_secret
PORT=5000
```

### 4. Set up local URLs:
Modify below mentioned files in both backend and frontend directories and setup the following variables:

```bash
# Open backend/src/app.ts file and setup below variable
const origin = "http://localhost:5173";

# Open frontend/src/main.tsx file and setup below variable
axios.defaults.baseURL = "http://localhost:5000/api/v1";
```

### 5. Run the application:

```bash
# Start the backend
cd ../backend
npm run dev

# Start the frontend
cd ../frontend
npm run dev
```

### 6. Access the application:
Open your web browser and visit http://localhost:5173 to access the MERN stack AI chatbot application.

## Contributors
### Darshak Jani
#### Github: https://github.com/darshakjani8101
#### LinkedIn: https://www.linkedin.com/in/darshakjani8101

## License
This project is not licensed.

