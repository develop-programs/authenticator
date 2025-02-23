# Node.js Authentication System

A robust authentication system built with Node.js, Express, and MongoDB, featuring secure user management and modern security practices.

## 🚀 Features

- Express.js REST API
- MongoDB with Mongoose ODM
- Security-first approach with Helmet
- CORS configuration for cross-origin requests
- Environment-based configurations
- Graceful shutdown handling
- Comprehensive error handling
- Production-ready security features

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## 🛠️ Setup

1. Clone the repository:
```bash
git clone <your-repo-url>
cd authenticator
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
NODE_ENV=development
PORT=3000
MONGODB_URI=mongodb://localhost:27017/your-database
CORS_ORIGIN=http://localhost:3000
```

4. Start the development server:
```bash
npm run dev
```

## 🏗️ Project Structure

```
src/
├── config/
│   └── config.js     # Configuration management
├── routes/
│   └── auth.routes.js # Authentication routes
└── index.js          # Application entry point
```

## 🔒 Security Features

- Helmet for security headers
- CORS protection
- Request size limits
- Rate limiting in production
- Secure error handling
- SSL/TLS configuration in production

## 📝 Environment Variables

| Variable     | Description                | Default     |
|-------------|---------------------------|-------------|
| NODE_ENV    | Environment mode          | development |
| PORT        | Server port               | 3000        |
| MONGODB_URI | MongoDB connection string | Required    |
| CORS_ORIGIN | Allowed CORS origin       | *           |

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👤 Author

Shreyansh Awadhiya
