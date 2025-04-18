import sql from 'mssql';

// SQL Server connection configuration
const sqlConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  server: process.env.DB_SERVER,
  port: parseInt(process.env.DB_PORT), // Convert port to a number
  options: {
    encrypt: process.env.DB_ENCRYPT === 'false', // Convert "true"/"false" string to a boolean
    trustServerCertificate: process.env.DB_ENCRYPT !== 'true',
  },
};



async function executeQuery(query, params = {}) {
  let pool;

  try {
    pool = await sql.connect(sqlConfig);
    const request = pool.request();

    // ✅ Bind parameters dynamically
    for (const key in params) {
      request.input(key, params[key]); // ✅ Ensures SQL Server recognizes @username
    }

    console.log("Executing Query:", query);
    console.log("With Parameters:", params);

    const result = await request.query(query);
    return result.recordset; // ✅ Returns retrieved rows

  } catch (error) {
    console.error("Database query error:", error);
    throw error;
  } finally {
    if (pool) {
      try {
        await pool.close();
      } catch (err) {
        console.error("Error closing pool:", err);
      }
    }
  }
}



export { sqlConfig, executeQuery };
