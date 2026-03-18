import mysql from "mysql2/promise";
import{DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT} from "$env/static/private";

// Create a connection pool to the MySQL database using environment variables
// A pool manages multiple connections automatically for better performance

const pool = mysql.createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
  port: Number(DB_PORT),
    database: DB_NAME

});
// Export the pool so it can be imported in API route files

export default pool;