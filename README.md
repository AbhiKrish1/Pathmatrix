# 🚖 PathMatrix

**Overview:**
PathMatrix is a smart transportation optimization platform designed to improve urban mobility through intelligent ride sharing and sightseeing route planning. By leveraging optimization algorithms such as Least Cost Feasible Insertion, Beam Search, Greedy Search, and Genetic Algorithms, the system generates efficient routes while minimizing travel distance and improving resource utilization.

## Intelligent Ride Sharing & Sightseeing Route Optimization

PathMatrix is an intelligent transportation optimization platform that combines **Dynamic Ride Sharing** and **Sightseeing Route Optimization** into a single web application.

The project demonstrates real-time optimization algorithms, interactive route visualization, and efficient decision-making using a modern web interface backed by a FastAPI server.

---

# ✨ Features

## 🚖 Dynamic Ride Sharing

- Real-time ride request insertion
- Least Cost Feasible Insertion algorithm
- Dynamic vehicle route optimization
- Maximum Planned Occupancy tracking
- Passenger trace visualization
- Interactive route map
- ETA estimation
- Distance calculation
- Reset active route
- Backend state persistence

---

## 🗺️ Sightseeing Route Optimization

- Budget-aware itinerary planning
- Distance optimization
- Category diversity optimization
- Satisfaction score calculation
- Multiple optimization algorithms
- Interactive map visualization
- Route summaries and explanations

---

# 🧠 Optimization Algorithms

## Ride Sharing

- Least Cost Feasible Insertion
- Capacity Constraint Validation
- Passenger Trace Generation

## Sightseeing

- Greedy Search
- Beam Search
- Genetic Algorithm

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

# 📂 Project Structure

```text
PathMatrix
│
├── app/                  # Frontend pages
├── components/           # UI components
├── lib/                  # Frontend utilities
│
├── backend/
│   ├── app/
│   ├── models.py
│   ├── rideshare.py
│   ├── optimizer.py
│   ├── state.py
│   └── distance.py
│
├── algorithms/
│
├── tests/
│
├── public/
│
└── README.md
```

---

# 🔌 Backend API

## Ride Sharing

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/ride-request` | Insert ride request |
| GET | `/current-route` | Get current vehicle route |
| POST | `/reset-route` | Reset active route |

## Sightseeing

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/optimize-route` | Generate optimized sightseeing route |

---

# 🚀 Installation

## Clone Repository

```bash
git clone https://github.com/AbhiKrish1/pathmatrix.git

cd pathmatrix
```

---

## Frontend

```bash
npm install

npm run dev
```

Frontend:

```
http://localhost:3000
```

---

## Backend

```bash
cd backend

python -m venv venv
```

### Windows

```bash
venv\Scripts\activate
```

### Linux / WSL

```bash
source venv/bin/activate
```

Install packages:

```bash
pip install -r requirements.txt
```

Run server:

```bash
uvicorn app.main:app --reload
```

Swagger:

```
http://127.0.0.1:8000/docs
```

---

# 📊 Workflow

## Ride Sharing

```
Ride Request
      │
      ▼
Frontend
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
Frontend Visualization
```

---

## Sightseeing

```
User Preferences
      │
      ▼
Frontend
      │
      ▼
Optimization Algorithm
      │
      ▼
Optimized Itinerary
      │
      ▼
Interactive Route Map
```

---

# 🧪 Testing

The application was tested for:

- Ride acceptance
- Ride rejection
- Capacity constraints
- Route reset
- Backend API integration
- Sightseeing optimization
- Interactive maps
- Edge case handling

---

# 👥 Team

- Abhinav
- Varun
- Harsh

---

# 📄 License

Developed for educational and academic purposes.
