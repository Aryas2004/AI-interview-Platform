# MockMate 🎓💻
## AI-Powered Interview Preparation Platform

**MockMate** is a smart, AI-integrated platform designed to help students and professionals practice and improve their interview skills through a self-guided, interactive interface. The platform simulates real interview environments and provides **instant, AI-generated feedback** using the **Gemini API**.

---

## 🚀 Key Features

### 🎙️ Real-Time Interview Simulation

- Users select an interview domain:  
  **Behavioral**, **Java**, or **CS Fundamentals**.
- For each session:
  - **5 random questions** are selected from a MongoDB Atlas database.
  - Questions are displayed one-by-one.
  - The user responds **via speech**, captured using the **Web Speech API**.
  - Audio is converted to text and submitted automatically.

---

### 🤖 AI-Powered Feedback

- Each response is sent to **Google’s Gemini API**, which:
  - Analyzes the answer
  - Provides **instant feedback**
  - Highlights strengths and suggests improvements
- The feedback considers:
  - Content quality
  - Clarity
  - Relevance
  - Communication skills

---

### ✅ Clean Workflow

1. Users start at the **Home Page**
2. Choose interview type and begin simulation
3. Answer 5 questions via voice
4. Receive live feedback after each answer
5. Land on a **Thank You Page** with a restart option

---

## 🧠 Technologies Used

### 🖥️ Frontend
- **React JS**
- **Tailwind CSS**
- **Web Speech API** (speech-to-text conversion)

### 🧪 AI & Feedback
- **Gemini API** (for intelligent answer evaluation)

### 🌐 Backend
- **Node.js** with **Express.js**
- **MongoDB Atlas** (cloud database to store questions and logs)

---

## 📋 UI Pages

- Home Page
- Interview Selection Page
- Practice Interview Page
- Feedback and Analysis Page

---

## ⚙️ Getting Started

Follow these steps to run the project locally:

### 🔧 Prerequisites
- Node.js installed
- MongoDB Atlas connection string
- Gemini API key

### 📦 Setup Instructions

```bash
# Clone the repo
git clone https://github.com/Aryas2004/AI-interview-Platform.git

# Go to backend folder
cd express-backend

# Create a .env file
touch .env

# Install backend dependencies
npm install

# Start backend
npm start
# Go to frontend folder
cd ../frontend

# Install frontend dependencies
npm install

# Start frontend
npm start

