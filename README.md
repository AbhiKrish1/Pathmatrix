# 🚖 PathMatrix

## Intelligent Route Planning and Adaptive Optimization System

PathMatrix is an intelligent transportation optimization platform that combines two real-world optimization problems into a single web application:

- 🗺️ **Sightseeing Route Optimization**
- 🚖 **Dynamic Ride Sharing Optimization**

Built with a **Next.js frontend** and a **FastAPI backend**, the system demonstrates optimization algorithms, interactive route visualization, and real-time route planning while satisfying practical transportation constraints.

---

# ✨ Features

## 🗺️ Sightseeing Route Optimization

Generate optimized sightseeing itineraries while:

- Maximizing effective sightseeing satisfaction
- Respecting a user-defined distance budget
- Promoting category diversity
- Applying exponential satisfaction decay based on cumulative travel distance
- Applying category penalties to discourage repetitive visits
- Comparing multiple optimization algorithms
- Visualizing optimized routes on an interactive map
- Displaying route summaries and optimization metrics

---

## 🚖 Dynamic Ride Sharing Optimization

Perform real-time ride-sharing optimization by:

- Accepting and rejecting ride requests
- Dynamically inserting new ride requests into the existing vehicle route
- Preserving pickup-before-drop ordering
- Respecting vehicle capacity constraints
- Validating ride flexibility constraints
- Minimizing additional travel distance
- Tracking passenger trace throughout the route
- Displaying Maximum Planned Occupancy
- Providing route reset functionality
- Visualizing updated routes in real time

---

# 🧠 Optimization Algorithms

## Sightseeing Optimization

- Greedy Search
- Beam Search
- Genetic Algorithm

These algorithms optimize sightseeing routes while balancing:

- Effective satisfaction
- Distance budget
- Category diversity
- Satisfaction decay

---

## Ride Sharing Optimization

- Least Cost Feasible Insertion
- Capacity Constraint Validation
- Pickup-before-Drop Constraint Handling
- Passenger Trace Generation
- Dynamic Route Updates

---

# 🛠 Tech Stack

## Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- Leaflet
- Lucide Icons
- shadcn/ui

## Backend

- FastAPI
- Python
- Uvicorn
- Pydantic

---

# 📂 Repository Structure

The repository is organized as follows:

```text
PathMatrix/
│
├── app/                  # Next.js application pages
├── components/           # React UI components
├── lib/                  # Frontend utilities, payload builders, API helpers & mappers
├── public/               # Static assets
│
├── backend/
│   ├── app/              # FastAPI routes and backend logic
│   ├── algorithms/       # Optimization algorithms
│   ├── tests/            # Backend unit tests
│   ├── requirements.txt
│   └── README.md
│
├── package.json
├── package-lock.json
├── requirements.txt
├── README.md
└── LICENSE
```

> **Note:**  
> The **repository root contains the Next.js frontend**, while the **FastAPI backend is located inside the `backend/` directory**.

---

# 🎯 Project Goals

The project aims to:

- Generate high-quality optimized routes.
- Minimize overall travel distance.
- Maximize sightseeing satisfaction.
- Encourage category diversity.
- Handle dynamic ride requests efficiently.
- Respect pickup-before-drop ordering.
- Enforce vehicle capacity constraints.
- Validate ride flexibility constraints.
- Provide an intuitive real-time web application for visualization and interaction.

---

# 🔌 Backend API Endpoints

## Ride Sharing

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/ride-request` | Processes an incoming ride request and updates the vehicle route |
| GET | `/current-route` | Returns the current optimized vehicle route |
| POST | `/reset-route` | Resets the active ride-sharing route |

## Sightseeing

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/optimize-route` | Generates an optimized sightseeing route |

---

# 🚀 Getting Started

## 1. Clone the Repository

```bash
git clone <repository-url>

cd PathMatrix
```

---

# 🌐 Frontend Setup

The frontend is located in the repository root.

Install dependencies:

```bash
npm install
```

Create a `.env.local` file in the repository root:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

Run the frontend:

```bash
npm run dev
```

Frontend:

```
http://localhost:3000
```

---

# ⚙️ Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

Create a virtual environment:

```bash
python -m venv venv
```

Activate the environment.

### Windows

```bash
venv\Scripts\activate
```

### Linux / WSL

```bash
source venv/bin/activate
```

Install backend dependencies:

```bash
pip install -r requirements.txt
```

Run the FastAPI server:

```bash
uvicorn app.main:app --reload
```

Backend:

```
http://127.0.0.1:8000
```

Swagger Documentation:

```
http://127.0.0.1:8000/docs
```

---

# 📊 Project Workflow

## 🚖 Dynamic Ride Sharing

```
Incoming Ride Request
          │
          ▼
Frontend (Next.js)
          │
          ▼
Payload Builder
          │
          ▼
FastAPI Backend
          │
          ▼
Least Cost Feasible Insertion
          │
          ▼
Optimized Vehicle Route
          │
          ▼
Response Mapper
          │
          ▼
Interactive Route Map & Vehicle Metrics
```

---

## 🗺️ Sightseeing Route Optimization

```
User Preferences
        │
        ▼
Frontend
        │
        ▼
API Request
        │
        ▼
Optimization Algorithm
(Greedy / Beam Search / Genetic Algorithm)
        │
        ▼
Optimized Route
        │
        ▼
Interactive Visualization
```

---

# 📈 Key Concepts

## Sightseeing Route Optimization

The sightseeing planner selects an optimal subset of locations while maximizing **effective satisfaction**.

It considers:

- Distance budget
- Satisfaction decay over cumulative travel distance
- Category diversity
- Category penalties
- Route ordering

---

## Dynamic Ride Sharing

Incoming ride requests are inserted into the existing vehicle route using a **Least Cost Feasible Insertion** strategy while respecting:

- Pickup-before-drop ordering
- Vehicle capacity
- Ride flexibility constraints
- Route feasibility
- Minimum additional travel distance

---

## Maximum Planned Occupancy

The dashboard displays the **maximum number of simultaneous passengers onboard** during the optimized route.

This value may differ from the total number of accepted requests because multiple rides may be served sequentially rather than simultaneously depending on the optimized route.

---

# 🧪 Testing

The project was tested for:

### Ride Sharing

- Ride acceptance
- Ride rejection
- Pickup-before-drop validation
- Vehicle capacity constraints
- Ride flexibility validation
- Route reset
- ETA calculation
- Passenger trace generation
- Backend API integration
- Interactive route visualization

### Sightseeing

- Route optimization
- Distance budget constraints
- Satisfaction decay
- Category diversity
- Interactive visualization
- Backend integration

---

# 📸 Demo

The application consists of two primary modules:

### 🚖 Dynamic Ride Sharing

Demonstrates intelligent ride insertion, dynamic routing, passenger trace generation, and real-time vehicle optimization.

### 🗺️ Sightseeing Route Optimization

Generates optimized sightseeing itineraries using multiple optimization algorithms while balancing satisfaction, distance, and diversity.

Both modules communicate with the FastAPI backend to generate optimized routes and visualize results in real time.

---

# 👥 Team

- Abhinav
- Varun
- Harsh
---

# 📄 License

This project was developed for educational purposes as part of the **Summer of Innovation – Coding Club, IIT Dharwad**.
