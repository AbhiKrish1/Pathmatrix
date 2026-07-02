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
