# 🇦🇱 Albania Villages REST-API

A full REST-API built with **SvelteKit** for the 20 biggest villages in Albania.
This project was developed as a school assignment focusing on clean REST principles, Basic Auth security, and a well-documented Git history.

---

## 🌐 Live Demo

| | Link |
|---|---|
| 🔗 Vercel URL | `https://your-project.vercel.app` |
| 📦 Git Repository | `https://github.com/your-username/albania-api` |

---

## 🔐 Authentication

Protected endpoints (POST, PUT, DELETE) require **Basic Auth**:

| Field | Value |
|---|---|
| Username | `admin` |
| Password | `albania2024` |

> GET endpoints are **publicly accessible** — no authentication required.

---

## 📡 API Endpoints

### Public Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/villages` | Returns a list of all 20 villages |
| `GET` | `/api/villages/:id` | Returns a single village by ID |

### Protected Endpoints (Basic Auth required)

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/villages` | Creates a new village |
| `PUT` | `/api/villages/:id` | Updates an existing village |
| `DELETE` | `/api/villages/:id` | Deletes a village |

---

## 📋 HTTP Status Codes

| Code | Meaning | When |
|---|---|---|
| `200` | OK | Successful GET or PUT |
| `201` | Created | Successful POST |
| `204` | No Content | Successful DELETE |
| `400` | Bad Request | Missing required fields |
| `401` | Unauthorized | Missing or wrong Basic Auth |
| `404` | Not Found | Village ID does not exist |

---

## 🗄️ Data Model

Each village has the following fields:

| Field | Type | Required | Description |
|---|---|---|---|
| `id` | `INT` | ✅ auto | Unique identifier |
| `name` | `VARCHAR(100)` | ✅ | Name of the village |
| `location` | `VARCHAR(100)` | ✅ | Region / Qarku (county) |
| `type` | `VARCHAR(50)` | ✅ | `village` or `rural_town` |
| `population` | `INT` | — | Approximate population |
| `area_km2` | `FLOAT` | — | Area in km² |
| `elevation_m` | `INT` | — | Elevation above sea level in metres |
| `municipality` | `VARCHAR(100)` | — | Municipality it belongs to |
| `description` | `TEXT` | — | Short description |

### Example JSON Response

```json
{
  "id": 1,
  "name": "Fushë-Krujë",
  "location": "Durrës",
  "type": "rural_town",
  "population": 12000,
  "area_km2": 38.5,
  "elevation_m": 70,
  "municipality": "Krujë",
  "description": "A large industrial village near Krujë, known for its steel industry and proximity to the main highway."
}
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [Git](https://git-scm.com/)
- A MySQL database (local or remote)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/albania-api.git
cd albania-api

# 2. Install dependencies
npm install

# 3. Set up the database
#    Import the SQL file into your MySQL server:
mysql -u root -p < albania_villages_mysql.sql

# 4. Configure environment variables
cp .env.example .env
#    Fill in your DB credentials in .env

# 5. Start the development server
npm run dev
```

### Environment Variables

Create a `.env` file in the root of the project:

```env
DATABASE_URL=mysql://user:password@localhost:3306/estlel20_netzwerk_projekt
BASIC_AUTH_USER=admin
BASIC_AUTH_PASS=albania2024
```

---

## 🧪 Testing with Postman

1. Import the file `albania-api.postman_collection.json` into Postman
2. All requests are pre-configured with correct headers and example bodies
3. For protected routes, set **Authorization → Basic Auth** with the credentials above

### Example POST Body

```json
{
  "name": "Elbasan",
  "location": "Elbasan",
  "type": "rural_town",
  "population": 5000,
  "area_km2": 20.0,
  "elevation_m": 100,
  "municipality": "Elbasan",
  "description": "A new village entry added via the API."
}
```

---

## 📁 Project Structure

```
albania-api/
├── src/
│   ├── lib/
│   │   └── db.js                        # Database connection
│   └── routes/
│       └── api/
│           └── villages/
│               ├── +server.js           # GET all + POST
│               └── [id]/
│                   └── +server.js       # GET one + PUT + DELETE
├── albania_villages_mysql.sql           # Database schema + seed data
├── albania-api.postman_collection.json  # Postman collection
├── .env.example                         # Environment variable template
├── package.json
└── README.md
```

---

## 📝 Git Commit Convention

This project follows clean, descriptive commit messages in English:

```
feat: Add GET /api/villages endpoint
feat: Implement POST /api/villages with Basic Auth
feat: Add PUT and DELETE endpoints with auth protection
db:   Add seed data for 20 Albanian villages
fix:  Return 404 when village ID not found
docs: Add README and API documentation
```

---

## 🛠️ Built With

- [SvelteKit](https://kit.svelte.dev/) — Full-stack web framework
- [MySQL](https://www.mysql.com/) — Relational database
- [Vercel](https://vercel.com/) — Deployment platform
- [Postman](https://www.postman.com/) — API testing and documentation

---

## Author

**Ester** — School Project 2024/2025