
# Problem Statement:
# StackIt  – A Minimal Q&A Forum Platform

# Team Members & Email Ids :
SOUMEN DAS & sdas721444@gmail.com
---
SOUVIK MANDAL & souvikmandals10@gmail.com
---
SNIGDHA MANDAL & mandalsnigdha21@gmail.com
---
SANGITA ROY & sangitaroy.dgp2005@gmail.com
---


**StackIt is a minimal question-and-answer platform that supports collaborative 
learning and structured knowledge sharing. It’s designed to be simple, user-friendly, 
and focused on the core experience of asking and answering questions within a 
community.**

[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Python](https://img.shields.io/badge/Python-3.8+-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://python.org/)
[![FastAPI](https://img.shields.io/badge/Flask-2.3.3-000000?style=for-the-badge&logo=flask&logoColor=white)](https://flask.palletsprojects.com/)


Get required answers, conceptual clarity using a modern, responsive web interface powered by intelligent filtering and clean UI.

---

## Table of Contents

- [StackIt – A Minimal Q&A Forum Platform](#stackit--a-minimal-qa-forum-platform)
- [StackIt Screenshots](#stackit-screenshots)
- [Quick Start](#quick-start)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Project Structure](#project-structure)
- [✨ Features](#-features)
  - [🧾 Ask a Question](#-ask-a-question)
  - [💬 Answering Questions](#-answering-questions)
  - [📥 Voting & Accepted Answers](#-voting--accepted-answers)
  - [🏷️ Tagging System](#-tagging-system)
  - [🔔 Notification System](#-notification-system)
  - [👤 User Authentication](#-user-authentication)
  - [🧭 Filtering & Search](#-filtering--search)
  - [🎨 Responsive UI](#-responsive-ui)# StackIt  – A Minimal Q&A Forum Platform

**StackIt is a minimal question-and-answer platform that supports collaborative 
learning and structured knowledge sharing. It’s designed to be simple, user-friendly, 
and focused on the core experience of asking and answering questions within a 
community.**

[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Python](https://img.shields.io/badge/Python-3.8+-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://python.org/)
[![FastAPI](https://img.shields.io/badge/Flask-2.3.3-000000?style=for-the-badge&logo=flask&logoColor=white)](https://flask.palletsprojects.com/)

Get required answers, conceptual clarity using a modern, responsive web interface powered by intelligent filtering and clean UI.

---

## Table of Contents

- [StackIt – A Minimal Q&A Forum Platform](#stackit--a-minimal-qa-forum-platform)
- [StackIt Screenshots](#stackit-screenshots)
- [Quick Start](#quick-start)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Project Structure](#project-structure)
- [✨ Features](#-features)
  - [🧾 Ask a Question](#-ask-a-question)
  - [💬 Answering Questions](#-answering-questions)
  - [📥 Voting & Accepted Answers](#-voting--accepted-answers)
  - [🏷️ Tagging System](#-tagging-system)
  - [🔔 Notification System](#-notification-system)
  - [👤 User Authentication](#-user-authentication)
  - [🧭 Filtering & Search](#-filtering--search)
  - [🎨 Responsive UI](#-responsive-ui)
- [Contribution](#contribution)
- [Acknowledgements](#acknowledgements)
- [License](#license)

## StackIt Screenshots

| Home Page | Ask a Question | All Questions |
|-----------|----------------|----------------|
| ![Home](https://github.com/user-attachments/assets/fab7e670-8652-43e1-83bc-d6da91fbf85b) | ![Ask](https://github.com/user-attachments/assets/f1bdf665-e226-4555-888c-72d65aae1280) | ![List](https://github.com/user-attachments/assets/c99d3ebb-37ce-476f-87bf-6fdcd693f351) |



```mermaid
graph TD
A[User Logs In] --> B[Asks a Question]
B --> C[Uses Rich Text Editor to format question]
C --> D[Saves Question to MongoDB]
D --> E[Displays in Questions List]

F[Other User Answers] --> G[Uses Editor to format]
G --> H[Saves Answer to MongoDB]
H --> I[Sends Notification to Question Owner]

I --> J[Owner Accepts or Votes]

```

## Quick Start


### Prerequisites

- **Node.js** 16.x or higher
- **Python** 3.8 or higher
- **npm**  package manager
- **FastAPI** Latest Version

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/StackIt.git
   cd movierecom
   ```

2. **Setup Backend**
   ```bash
   cd backend
   python -m venv venv
   
   # Windows
   venv\Scripts\activate
   
   # macOS/Linux
   source venv/bin/activate
   
   pip install -r requirements.txt
   ```

3. **Setup Frontend**
   ```bash
   cd ../  # Return to root directory
   npm install
   ```
4. **Start the Application**
   
   **Terminal 1 - Backend:**
   ```bash
   cd backend
   python app.py
   ```
   
   **Terminal 2 - Frontend:**
   ```bash
   npm run dev
   ```

5. **Access the Application**
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:5000`


## Project Structure

```
StackIt/
├── backend/
│   ├── app.py
│   ├── requirements.txt
│   ├── models/
│   ├── routes/
│   └── ... (other backend files)
├── public/
│   └── ... (static assets, favicon, etc.)
├── src/
│   ├── components/
│   │   ├── ui/
│   │   └── ... (shared and UI components)
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Questions.tsx
│   │   ├── Tags.tsx
│   │   ├── User.tsx
│   │   └── ... (other pages)
│   ├── App.tsx
│   ├── main.tsx
│   └── ... (frontend logic)
├── .env
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── README.md
```
- **backend/**: Python Flask/FastAPI backend code, models, and API routes.
- **public/**: Static assets for the frontend.
- **src/components/**: Reusable React components and UI elements.
- **src/pages/**: Main route pages for the app.
- **App.tsx / main.tsx**: React entry points.
- **.env**: Environment variables.
- **package.json**: Frontend dependencies and scripts.
- **tailwind.config.js**: Tailwind CSS configuration.

## ✨ Features

### 🧾 Ask a Question
- Submit a new question with:
  - **Title** (e.g., *"How to implement JWT authentication in React?"*)
  - **Rich-text description**
  - **Relevant tags** (multi-select like React, JWT, Authentication)
- Markdown-style **rich text editor** with support for:
  - Bold, Italic, Strikethrough
  - Bullet & Numbered Lists
  - Emoji Insertion 😊
  - Image Upload
  - Hyperlink Insertion 🔗
  - Text Alignment (Left, Center, Right)

### 💬 Answering Questions
- Users can post answers with the same rich text editor
- Markdown and media formatting supported
- Answer count displayed per question
- Only **authenticated users** can answer

### 📥 Voting & Accepted Answers
- Users can **upvote/downvote** any answer
- Question owner can **mark one answer as accepted**
- Answer metadata: votes, comments, views

### 🏷️ Tagging System
- Questions must include **at least one tag**
- Tags help filter and organize content
- Tag-based question filtering supported

### 🔔 Notification System
- 🔕 Notification icon (bell) on top nav bar
- Real-time notifications for:
  - New answers to your question
  - Comments on your answers
  - Mentions using `@username`
- Shows unread notification count
- Dropdown list with recent alerts

### 👤 User Authentication
- JWT-based secure login system
- Signup/Login via custom form
- User sessions managed on frontend

### 🧭 Filtering & Search
- Search questions by **title** or **tags**
- Sort by **Newest**, **Most Voted**, or **Most Viewed**

### 🎨 Responsive UI
- Fully responsive and mobile-friendly design
- Built with **TailwindCSS** / **Bootstrap** (customizable)

## Contribution

Contributions are welcome!  
If you want to contribute, please fork the repository and submit a pull request.  
For major changes, please open an issue first to discuss what you would like to change.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Acknowledgements

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Flask](https://flask.palletsprojects.com/)
- [FastAPI](https://fastapi.tiangolo.com/)
- [Lucide Icons](https://lucide.dev/)
- [Shadcn/ui](https://ui.shadcn.com/)
- All open source contributors and the Stack Overflow community for inspiration

## License

This project is licensed under the [MIT License](LICENSE).

## Youtube Link of the Project : 
https://youtu.be/orNfhR5OAmw


