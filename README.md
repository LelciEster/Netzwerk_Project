Albania Villages REST API
A REST API built with SvelteKit that manages data for Albanian villages. The API connects to a MySQL database and exposes endpoints to read, create, update, and delete village records.

How It Works
Database Connection
The file src/lib/server/database.js creates a MySQL connection pool using credentials stored in environment variables. The pool is exported and reused across all API routes, which avoids opening a new connection for every request.
API Routes
All routes live under src/routes/api/villages/.
+server.js handles requests to /api/villages:

GET — returns all villages from the database. No authentication required.
POST — inserts a new village. Requires Basic Auth. The fields name, location, and type must be provided; all other fields are optional.

[id]/+server.js handles requests to /api/villages/:id:

GET — returns a single village by ID. No authentication required. Returns 404 if not found.
PUT — updates an existing village by ID. Requires Basic Auth. Checks that the village exists before updating.
DELETE — deletes a village by ID. Requires Basic Auth. Returns 204 with no body on success.

Authentication
Protected endpoints (POST, PUT, DELETE) use HTTP Basic Auth. The server reads the Authorization header, decodes the Base64 credentials, and compares them against API_USER and API_PASS from the environment variables. If the credentials are missing or wrong, the server returns 401.
Data Model
Each village has the following fields:
FieldTypeRequiredidINTautonameVARCHAR(100)yeslocationVARCHAR(100)yestypeVARCHAR(50)yespopulationINTnoarea_km2FLOATnoelevation_mINTnomunicipalityVARCHAR(100)nodescriptionTEXTno
Status Codes
CodeWhen200Successful GET or PUT201Successful POST204Successful DELETE400Missing required fields401Wrong or missing credentials404Village not found

Setup
Install dependencies and create a .env file with your database credentials:
envDB_HOST=your-host
DB_USER=your-user
DB_PASSWORD=your-password
DB_NAME=your-database
DB_PORT=your-port
API_USER=admin
API_PASS=your-password
Then run:
bashnpm install
npm run dev