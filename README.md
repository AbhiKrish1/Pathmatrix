# PathMatrix

PathMatrix is a route optimization and intelligent mobility platform that demonstrates two real-world optimization problems:

1. **Sightseeing Route Optimization**
2. **Dynamic Ride Sharing Optimization**

The project provides interactive visualizations, route analytics, map-based exploration, and optimization dashboards powered by custom algorithms and backend APIs.

---

## Features

### Sightseeing Route Optimization

* Interactive route planning dashboard
* Distance budget constraints
* Category diversity constraints
* Satisfaction decay visualization
* Route comparison panel
* Interactive Leaflet maps
* Dynamic route optimization
* Runtime and efficiency metrics

### Dynamic Ride Sharing

* Ride request management
* Vehicle occupancy tracking
* Route visualization
* Passenger flow analytics
* Pickup and drop-off sequencing
* Distance and efficiency monitoring

---

## Tech Stack

### Frontend

* Next.js 16
* React
* TypeScript
* Tailwind CSS
* shadcn/ui
* Lucide Icons
* Leaflet
* React Leaflet
* Recharts

### Backend

* Python
* FastAPI
* Uvicorn

### Data Exchange

* REST APIs
* JSON Request/Response Contracts

---

## Project Structure

```text
pathmatrix/
├── app/
│   ├── page.tsx
│   ├── sightseeing/
│   └── rideshare/
│
├── components/
│   ├── sightseeing/
│   └── rideshare/
│
├── lib/
│   ├── api.ts
│   ├── api-types.ts
│   ├── mock-data.ts
│   └── types.ts
│
├── public/
├── README.md
└── package.json
```

---

## Installation

Clone the repository:

```bash
git clone <repository-url>
cd pathmatrix
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## Environment Variables

Create:

```text
.env.local
```

Add:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

Update this value when deploying the backend.

---

## Production Build

Build the project:

```bash
npm run build
```

Start production mode:

```bash
npm run start
```

---

## API Integration

The frontend communicates with backend optimization services through:

### Sightseeing Optimization

```http
POST /optimize-route
```

Returns:

* Optimized route
* Total distance
* Effective satisfaction
* Selected locations
* Algorithm metadata

### Ride Sharing Optimization

```http
POST /ride-request
```

Returns:

* Updated vehicle route
* Passenger trace
* Occupancy changes
* Distance metrics

---

## Visualization Components

### Maps

* Leaflet-based route visualization
* Dynamic markers
* Route polylines
* Auto-fit viewport

### Charts

* Satisfaction Decay Analysis
* Passenger Occupancy Trends
* Route Efficiency Metrics

---

## Optimization Objectives

### Sightseeing

Maximize:

* Tourist satisfaction
* Category diversity

Subject to:

* Distance budget constraints
* Satisfaction decay

### Ride Sharing

Minimize:

* Additional travel distance
* Passenger inconvenience

Subject to:

* Vehicle capacity
* Pickup/drop-off ordering constraints

---

## Current Status

### Frontend

* Landing Page Complete
* Sightseeing Dashboard Complete
* Ride Sharing Dashboard Complete
* Maps Integrated
* Charts Integrated
* API Layer Ready

### Backend

* API Contracts Defined
* Optimization Algorithms Integrated
* FastAPI Endpoints Available

---

## Team

PathMatrix Development Team

Frontend:

* Abhinav

Backend & Optimization:

* Team Members
Varun, Harsh

## License

Academic Project / Educational Use

```
```
