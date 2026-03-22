# Quiz Backend API

A comprehensive quiz application backend built with Node.js, Express, and MongoDB.

## Features

- User authentication with JWT
- Multiple quiz categories (Java, Python, React, Node.js, Networking, OS)
- Difficulty levels (Easy, Medium, Hard)
- Score tracking and leaderboard
- Admin functionality
- RESTful API design

## Prerequisites

- Node.js (v14 or higher)
- MongoDB database
- npm or yarn

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   
   Copy the example environment file and configure your variables:
   ```bash
   cp .env.example .env
   ```
   
   Update the `.env` file with your actual configuration:
   ```env
   MONGODB_URI=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/your_database_name
   JWT_SECRET=your_jwt_secret_key_here
   QUIZ_API_KEY=your_quiz_api_key_here
   PORT=5001
   ```

   **Important:**
   - `MONGODB_URI`: Your MongoDB connection string
   - `JWT_SECRET`: A secure secret key for JWT token generation
   - `QUIZ_API_KEY`: API key for external quiz services (if applicable)
   - `PORT`: Server port (default: 5001)

4. **Database Setup**
   
   The application will automatically create the necessary collections when you first run it. You can also seed the database with sample questions using the provided seed scripts:
   ```bash
   # Seed questions for different topics and difficulty levels
   node seedJavaQuestionsEasy.js
   node seedJavaQuestionsMedium.js
   node seedJavaQuestionsHard.js
   node seedPythonQuestionsEasy.js
   node seedPythonQuestionsMedium.js
   node seedPythonQuestionsHard.js
   node seedReactQuestionsEasy.js
   node seedReactQuestionsMedium.js
   node seedReactQuestionsHard.js
   node seedNodeQuestionsEasy.js
   node seedNodeQuestionsMedium.js
   node seedNodeQuestionsHard.js
   node seedNetworkingQuestionsEasy.js
   node seedNetworkingQuestionsMedium.js
   node seedNetworkingQuestionsHard.js
   node seedOSQuestionsEasy.js
   node seedOSQuestionsMedium.js
   node seedOSQuestionsHard.js
   ```

## Running the Application

1. **Start the server**
   ```bash
   npm start
   ```
   
   Or for development with auto-reload:
   ```bash
   npm run dev
   ```

2. **Access the API**
   
   The server will be running at `http://localhost:5001`

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/admin/login` - Admin login

### Quiz
- `GET /api/quiz/topics` - Get available quiz topics
- `GET /api/quiz/questions/:topic/:difficulty` - Get questions by topic and difficulty
- `POST /api/quiz/submit` - Submit quiz answers
- `GET /api/quiz/scores/:userId` - Get user scores
- `GET /api/quiz/leaderboard` - Get leaderboard

### User Management
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile

### Admin
- `GET /api/admin/users` - Get all users
- `POST /api/admin/make-admin` - Make user admin
- `GET /api/admin/scores` - Get all user scores

## Database Schema

### Users Collection
```javascript
{
  _id: ObjectId,
  username: String,
  email: String,
  password: String, // hashed
  isAdmin: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Questions Collection
```javascript
{
  _id: ObjectId,
  topic: String,
  difficulty: String, // 'Easy', 'Medium', 'Hard'
  question: String,
  options: [String],
  correctAnswer: String,
  explanation: String
}
```

### Scores Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  topic: String,
  difficulty: String,
  score: Number,
  totalQuestions: Number,
  timeTaken: Number,
  completedAt: Date
}
```

## Utility Scripts

- `checkData.js` - Check database data integrity
- `checkScores.js` - Verify score data
- `checkUserScores.js` - Check user-specific scores
- `migrateUserScores.js` - Migrate user score data
- `makeAdmin.js` - Promote user to admin
- `updateUserNamesDirect.js` - Update user names directly in database

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `MONGODB_URI` | MongoDB connection string | Yes |
| `JWT_SECRET` | Secret key for JWT tokens | Yes |
| `QUIZ_API_KEY` | External API key for quiz services | Optional |
| `PORT` | Server port number | No (default: 5001) |

## Security Notes

- Never commit your `.env` file to version control
- Use strong, unique secrets for `JWT_SECRET`
- Ensure your MongoDB is properly secured with authentication
- Use HTTPS in production

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For issues and questions, please open an issue in the repository or contact the development team.
