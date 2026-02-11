                                                                     Cards Game Web Application

A browser-based multiplayer-style card game simulation built using HTML, CSS, JavaScript, Python (Flask), and SQLite.
This project was developed as part of my 2nd Year B.Tech learning journey to explore full-stack web development, game logic design, and AI-based gameplay mechanics.

Project Overview:-
 This application allows users to:
. Create accounts and log in securely
. Select player avatars
. View game statistics
. Play a trick-based card game against AI opponents
. Track game progress and performance
The project demonstrates integration of frontend UI, backend API, database storage, and algorithmic game logic.

Features:-
User Authentication:-
. Signup and Login system
. Password hashing using bcrypt
. Session-based authentication

Player Profile:-
. Avatar selection system
. Persistent player statistics
. Games Played
. Games Won
. Total Score

Game Lobby:-
. Displays player profile and stats
. Shows game rules and navigation controls


Card Game Engine:-
. Deck creation and shuffling algorith
. Trump suit selection
. Trick-based round evaluation
. Turn-based gameplay system
. Score tracking and result storage

 AI Opponents:-
. Rule-based decision-making AI
. Suit-following logic
. Trump prioritization logic
. Strategy-based card selection

Tech Stack:-

Frontend:-
. HTML5
. CSS3
. JavaScript (ES6)
. DOM Manipulation
. Async/Await Programming
. Event-driven UI Handling

Backend:-
. Python
. Flask (REST API Development)
. Database
. SQLite
. Security & Authentication
. bcrypt Password Hashing
. Flask Session Management

Concepts Implemented:-
. State Management
. Game Logic Algorithms
. Event-Driven Programming
. REST API Design
. Client-Server Communication
. Asynchronous Programming
. Database Schema Design

Project Structure:-

Cards-Game/
│
├── app.py                 # Flask backend server
├── index.html             # Login & Signup Page
├── avatar.html            # Avatar selection
├── lobby.html             # Game lobby interface
├── main.html              # Main game UI
│
├── test.js                # Core game logic and AI
├── main1.js               # Authentication UI logic
├── lobby.js               # Lobby UI logic
│
├── styles.css             # Authentication & lobby styling
├── styles1.css            # Game styling
│
├── avatars/               # Player avatar images
├── cardsPic/              # Card image assets
│
├── database.db            # SQLite database (auto-created)
├── requirements.txt       # Python dependencies
└── README.md              # Project documentation

Installation & Setup (Run Locally)

Prerequisites:-
Make sure you have installed:
Python 3.x
pip
Git (optional)

Strps :-

. Step 1: Clone Repository
          git clone https://github.com/YOUR_USERNAME/Cards-Game.git
          cd Cards-Game

. Step 2: Install Dependencies
          pip install -r requirements.txt

. Step 3: Run Flask Server
          python app.py

. Step 4: Open Browser
          http://127.0.0.1:5000

Database Information:-
SQLite database is automatically created when the application starts.
Stores:
. User credentials
. Avatar selections
. Player statistics

 Game Rules (Simplified):-
. 4 Players (1 Human vs 3 AI)
. Each player receives 13 cards
. Trump suit determines highest priority
. Highest card in trick wins the round
. Player with most tricks wins the game

Learning Outcomes :-
Through this project, I gained practical experience in:
. Full-stack application development
. Designing browser-based game systems
. Implementing AI decision logic
. Managing asynchronous gameplay flows
. Integrating frontend and backend services
. Handling persistent data storage

 Limitations :-
. AI opponents use rule-based logic (not machine learning)
. Single-player experience only
. Performance depends on asset loading speed
. Designed primarily for desktop browsers

Future Improvements :-
. Multiplayer real-time gameplay using WebSockets
. Enhanced AI difficulty levels
. Performance optimization & asset preloading
. Improved UI animations and transitions
. Mobile responsiveness improvements

License :-
This project is created for educational and learning purposes.
