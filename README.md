# Stock Trading Platform — Zerodha Inspired UI/UX

A full-stack stock trading platform I built with the MERN stack, inspired by the look and feel of Zerodha Kite. I split it into three independent apps — a public landing site, an authenticated trading dashboard, and a backend API — because I wanted to practice structuring a project the way real production systems are organized, with presentation, business logic, and data all cleanly separated.

I built this to get hands-on with RESTful API design, MongoDB integration, authentication flows, React Context API, and deploying multiple services independently. It's a project I keep coming back to whenever I want to test out a new concept in full-stack development.

> **Disclaimer:** This project is inspired by the visual design and workflow of Zerodha Kite for educational and portfolio purposes only. It is an independent, non-commercial project and is not affiliated with, endorsed by, or connected to Zerodha Broking Ltd. in any way. All trademarks and brand references belong to their respective owners.

---

## Live Demo

**Landing Website:** https://zerodha-clone-rosy-xi.vercel.app/
**Trading Dashboard:** https://zerodha-clone-dashboard-mauve.vercel.app/login

*(Note: these URLs still reflect an earlier project name and will be updated to match the new branding soon.)*

---

## Screenshots

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/4cd7571d-dbd7-49d4-95a3-ed5aa69b6673" />

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/a50f1e4c-f4d7-41f3-8b9a-9316ebf20549" />

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/39358966-4ca0-4284-9e13-f9dad36419fa" />

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/fe588a33-5fcd-4f1e-8c1f-747fd765490d" />




---

## Tech Stack

**Frontend:** React.js, React Router DOM, Bootstrap, Axios, React Toastify
**Backend:** Node.js, Express.js, REST APIs, CORS
**Database:** MongoDB Atlas, Mongoose ODM
**Deployment:** Vercel, Render, MongoDB Atlas

---

## Architecture

```
                    Internet
                        │
        ┌───────────────┴───────────────┐
        │                               │
        ▼                               ▼

   Landing Website               Trading Dashboard
      (React.js)                    (React.js)

        │                               │
        └───────────────┬───────────────┘
                        │
                  REST API Requests
                        │
                        ▼

              Node.js + Express Server
                        │
                        ▼
                 MongoDB Atlas Database
```

I kept the three modules independent on purpose:

- **Frontend** — the public-facing site: product info, pricing, and support pages.
- **Dashboard** — the authenticated workspace where users manage holdings, positions, funds, orders, and simulated trades.
- **Backend** — a single REST API handling auth, business logic, and all communication with MongoDB Atlas.

---

## Repository Structure

```text
.
├── backend
│   ├── Controllers
│   ├── Middlewares
│   ├── Routes
│   ├── model
│   ├── schemas
│   ├── util
│   ├── index.js
│   └── package.json
│
├── dashboard
│   ├── public
│   └── src
│       ├── components
│       │   ├── AppList.js
│       │   ├── BuyActionWindow.js
│       │   ├── Dashboard.js
│       │   ├── DoughnutChart.js
│       │   ├── Funds.js
│       │   ├── GeneralContext.js
│       │   ├── Holdings.js
│       │   ├── Home.js
│       │   ├── Menu.js
│       │   ├── Orders.js
│       │   ├── Positions.js
│       │   ├── SellActionWindow.js
│       │   ├── Summary.js
│       │   ├── TopBar.js
│       │   ├── VerticalGraph.js
│       │   └── WatchList.js
│       ├── data
│       │   └── data.js
│       └── pages
│           ├── Home.jsx
│           ├── Login.jsx
│           └── Signup.jsx
│
└── frontend
    ├── public
    └── src
        ├── landing_page
        │   ├── about
        │   ├── home
        │   ├── pricing
        │   ├── products
        │   ├── signup
        │   └── support
        ├── Footer.js
        ├── Navbar.js
        └── OpenAccount.js
```

---

## Features

**Public Website**
Product landing page, company overview, pricing, support section, and signup/login flows — all built as clean, component-based React pages.

**Trading Dashboard**
This is where most of the engineering work went. Users get a portfolio summary, holdings and positions overview, order history, funds management, and an interactive watchlist. Selecting a stock opens a Buy or Sell order window, and portfolio performance is visualized with charts. All of this is coordinated through React Context API so components stay in sync without prop-drilling.

**Backend**
A modular REST API — controllers, middleware, and routes are all separated — handling CRUD operations and MongoDB Atlas integration through Mongoose.

---

## The Interesting Part: Cross-Domain Authentication

This was the trickiest problem I ran into while deploying. The frontend apps live on Vercel, the backend lives on Render — different domains. Browsers treat cookies across different domains as third-party cookies and block them by default, which meant users were getting logged in successfully but then bounced right back to the login page.

I fixed this by moving session state out of cookies entirely and into `localStorage` (`userLoggedIn` and `username`). Protected routes check these values before rendering, which eliminated the redirect loop and gave a smooth login experience across three independently deployed services. It's a reasonable trade-off for a project like this, though a production system would likely want a more robust token-based approach — see Future Improvements below.

---

## State Management

The dashboard uses React Context API (`GeneralContext.js`) as its shared state manager. When a user picks Buy or Sell from the watchlist, the selected stock gets stored in context, the right order window opens automatically, and the order gets submitted to the backend via REST. Once it succeeds, the update flows back through context to every component that needs it.

---

## Getting Started

**1. Set up environment variables**

Create a `.env` file inside `backend/`:

```env
PORT=3002
MONGO_URL=your_mongodb_connection_string
TOKEN_KEY=your_secret_key
```

**2. Clone the repo**

```bash
git clone https://github.com/Avik-Mitra-7/Zerodha-Clone.git
cd Zerodha-Clone
```

**3. Install and run each app**

```bash
# Backend
cd backend
npm install
npm start

# Dashboard
cd ../dashboard
npm install
npm start

# Frontend
cd ../frontend
npm install
npm start
```

---

## A Note on Desktop-Only Design

The dashboard is built specifically for desktop and laptop screens and isn't responsive on mobile or tablet yet. This was a deliberate call — financial tables, charts, and trading panels need room to breathe, and I'd rather ship a great desktop experience than a cramped mobile one. Responsive layout is next on my list.

---

## What's Next

- Responsive dashboard layout for mobile and tablet
- JWT-based authentication to replace the current localStorage approach
- Live market data integration
- WebSocket-based real-time price updates
- Portfolio search and filtering
- User profile management

---

## Author

**Avik Mitra**
GitHub: https://github.com/Avik-Mitra-7
LinkedIn: https://www.linkedin.com/in/avik-mitra-74b965370/

---

## License

This project is for educational and portfolio use only. All trademarks, product names, and brand references belong to their respective owners.
