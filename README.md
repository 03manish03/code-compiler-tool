🚀 Online Code Compiler Platform

An online code compiler and execution platform built using modern full-stack technologies. This project allows users to write, submit, and execute code through a web-based interface with real-time output display.

This project is generated and customized using Bolt.new and enhanced for learning and full-stack development practice.

📌 Project Features

🧑‍💻 Online Code Editor

▶️ Code Execution & Output Display

⚡ Fast Frontend using Vite + React + TypeScript

🎨 Tailwind CSS for UI Styling

☁️ Supabase Backend Integration

🔐 Serverless Functions for Code Execution

📊 Code Submissions Tracking

🛠 ESLint + TypeScript Configuration

🧰 Tech Stack
Frontend

React (TypeScript)

Vite

Tailwind CSS

PostCSS

Backend / Cloud

Supabase

Supabase Edge Functions

SQL Migrations

Dev Tools

ESLint

TypeScript

Node.js

npm

📂 Project Structure
project/
│
├── src/
│   ├── components/
│   │   ├── CodeEditor.tsx
│   │   └── OutputDisplay.tsx
│   ├── App.tsx
│   ├── main.tsx
│   └── lib/
│       └── supabase.ts
│
├── supabase/
│   ├── functions/
│   │   └── execute-code/
│   └── migrations/
│
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
└── README.md

⚙️ How to Run the Project (Step-by-Step)
1️⃣ Install Node.js

Download and install Node.js from:
https://nodejs.org

2️⃣ Open Project in VS Code

Extract ZIP file

Open folder in VS Code

3️⃣ Install Dependencies

Open terminal in project folder and run:

npm install

4️⃣ Setup Environment Variables

Edit .env file and add your Supabase credentials:

VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key

5️⃣ Run Development Server
npm run dev

6️⃣ Open in Browser

You will see a URL like:

http://localhost:5173


Open it in your browser 🎉

🧪 Supabase Setup (Optional but Recommended)

Create project on https://supabase.com

Enable Edge Functions

Deploy execute-code function

Run SQL migration from:

supabase/migrations/

🎯 Use Case

This project is ideal for:

Full Stack Development Practice

Online Code Compiler System

Final Year Project / Mini Project

MERN / React Learning

Resume & Portfolio Project

👨‍💻 Developer

Name: Manish Charpe
Role: Full Stack Developer & ML Student
Project Type: Learning + Production Ready
Generated Using: Bolt.new AI Platform

📜 License

This project is for educational and learning purposes.
You are free to modify and extend it.
