<<<<<<< HEAD
# 🚀 PathMatrix

PathMatrix is a route optimization platform that provides intelligent solutions for two real-world transportation problems:

- 🗺️ **Sightseeing Route Optimization**
- 🚖 **Dynamic Ride Sharing Optimization**

The project combines a **Next.js frontend** with a **FastAPI backend** to demonstrate optimization algorithms, interactive visualizations, and real-time route management.

---

# ✨ Features

## 🗺️ Sightseeing Route Optimization

- Optimize sightseeing routes based on:
  - Distance budget
  - Category diversity
  - Satisfaction score
- Interactive map visualization
- Dynamic route comparison
- Physical satisfaction decay visualization
- Backend-powered optimization algorithms
- Route summary and performance metrics

---

## 🚖 Dynamic Ride Sharing

- Accept and reject incoming ride requests
- Real-time ride insertion into an existing route
- Vehicle occupancy tracking
- Passenger trace visualization
- Interactive vehicle route map
- Distance and ETA estimation
- Backend state management for active routes

---

# 🛠️ Tech Stack

## Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- Leaflet
- Lucide Icons

## Backend

- FastAPI
- Python
- Uvicorn

---

# 📂 Project Structure

```
PathMatrix/
│
├── app/
│   ├── sightseeing/
│   └── rideshare/
│
├── components/
│
├── lib/
│   ├── api.ts
│   ├── payload-builder.ts
│   ├── ride-payload-builder.ts
│   ├── route-mapper.ts
│   └── ride-response-mapper.ts
│
├── public/
│
└── package.json
```

---

# 🔌 Backend API Endpoints

## Sightseeing

```
POST /optimize-route
```

Optimizes sightseeing routes based on user constraints.

---

## Ride Sharing

```
POST /ride-request
```

Processes an incoming ride request and updates the vehicle route.

```
GET /current-route
```

Returns the current ride-sharing route.

```
POST /reset-route
```

Resets the active ride-sharing route.

---

# 🚀 Getting Started

## Clone the repository

```bash
git clone <repository-url>
cd pathmatrix
```

---

## Install dependencies

```bash
npm install
```

---

## Configure Backend URL

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

---

## Start Frontend

```bash
npm run dev
```

Frontend:

```
http://localhost:3000
```

---

## Start Backend

Navigate to the backend folder:

```bash
cd backend
```

Activate the virtual environment:

```bash
source ../venv/bin/activate
```

Run FastAPI:

```bash
uvicorn app.main:app --reload
```

Swagger documentation:

```
http://127.0.0.1:8000/docs
```

---

# 📊 Project Workflow

### Sightseeing

```
User Input
      │
      ▼
Frontend
      │
      ▼
Build API Payload
      │
      ▼
FastAPI Backend
      │
      ▼
Optimization Algorithm
      │
      ▼
Optimized Route
      │
      ▼
Frontend Visualization
```

---

### Ride Sharing

```
Ride Request
      │
      ▼
Frontend
      │
      ▼
Ride Request API
      │
      ▼
Backend Route Insertion
      │
      ▼
Updated Vehicle Route
      │
      ▼
Frontend Map & Vehicle Metrics
```

---

# 📈 Technologies Used

- Next.js
- React
- TypeScript
- Tailwind CSS
- FastAPI
- Python
- Leaflet Maps
- REST APIs

---

# 👥 Contributors

- Frontend Development
- Backend Development
- Route Optimization Algorithms
- UI/UX Design

(Add team member names here.)

---

# 📄 License

This project was developed for educational purposes as part of an academic project.
=======
# Backend-for-RouteX

Backend for Intelligent Route Planning and Adaptive Optimization System (RouteX).

This repository contains the Member 2 backend work for RouteX/PathMatrix. It provides FastAPI endpoints that the frontend and optimization modules can call later.

## Current Status

* FastAPI backend structure is ready.
* Sightseeing route optimization API is integrated with greedy, beam, and genetic algorithms.
* Ride-sharing insertion heuristic is implemented separately and tested.
* Distance matrix input is supported, with coordinate-based Euclidean distance as fallback.
* Current route state is stored in memory for development and demo use.

## Endpoints

```text
GET  /health
POST /optimize-route
POST /ride-request
GET  /current-route
POST /reset-route
```

## Run Locally

```bash
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Then open:

```text
http://127.0.0.1:8000/docs
```

## Run Tests

```bash
python -m unittest discover -s tests
```

## API Response Examples

### POST `/optimize-route`

```json
{
  "route": [
    { "id": "College", "lat": 15.4589, "lng": 75.0078 },
    { "id": "Museum", "lat": 15.46, "lng": 75.01 },
    { "id": "Beach", "lat": 15.5, "lng": 75.08 }
  ],
  "total_distance": 42.5,
  "total_effective_satisfaction": 18.72,
  "selected_location_ids": ["Museum"],
  "algorithm": "greedy",
  "penalty_count": 1,
  "runtime_ms": 4.32,
  "summary": "This route visits one location, Museum, achieving a total score of 18.72 over 42.50 units of travel.",
  "explanations": [
    "Museum was included because of its strong base score and category diversity."
  ],
  "message": "Route optimized successfully using the greedy algorithm."
}
```

### POST `/ride-request`

```json
{
  "accepted": true,
  "reason": "Request inserted using least-cost feasible insertion.",
  "route": [
    {
      "location": { "id": "S", "lat": 0, "lng": 0 },
      "stop_type": "start",
      "request_id": null,
      "passenger_delta": 0
    },
    {
      "location": { "id": "A", "lat": 0, "lng": 4 },
      "stop_type": "pickup",
      "request_id": "req-1",
      "passenger_delta": 1
    },
    {
      "location": { "id": "C", "lat": 0, "lng": 6 },
      "stop_type": "pickup",
      "request_id": "req-2",
      "passenger_delta": 1
    },
    {
      "location": { "id": "B", "lat": 0, "lng": 8 },
      "stop_type": "drop",
      "request_id": "req-1",
      "passenger_delta": -1
    },
    {
      "location": { "id": "D", "lat": 0, "lng": 10 },
      "stop_type": "drop",
      "request_id": "req-2",
      "passenger_delta": -1
    }
  ],
  "total_distance": 13,
  "added_distance": 4,
  "passenger_trace": [
    { "stop_id": "S", "active_passengers": 0 },
    { "stop_id": "A", "active_passengers": 1 },
    { "stop_id": "C", "active_passengers": 2 },
    { "stop_id": "B", "active_passengers": 1 },
    { "stop_id": "D", "active_passengers": 0 }
  ]
}
```

## Main Files

```text
app/main.py        FastAPI routes
app/models.py      Request and response schemas
app/distance.py    Distance matrix and coordinate distance helpers
app/optimizer.py   Sightseeing optimizer integration
app/rideshare.py   Ride-sharing insertion engine
app/state.py       Temporary in-memory route state
tests/             Unit tests
```
>>>>>>> teammate/main
