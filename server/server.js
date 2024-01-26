import express from "express";
import pg from "pg";
import dotenv from "dotenv";
const { Pool } = pg;

dotenv.config({ path: "../.env" });

// const pool = new Pool({
//   user: "xxjrtxx",
//   host: "localhost",
//   password: "Passw0rd4U",
//   database: "reactmvpdb",
//   port: 5432,
// });
// const port = process.env.PORT || 8000;
const { PORT, DATABASE_URL } = process.env;

const client = new pg.Client({
  connectionString: DATABASE_URL,
});

await client.connect();

const app = express();

app.use(express.json());

app.get("/hello", (req, res) => {
  res.send("FUCK YOU BITCH!!");
});

// app.listen(port, () => {
//   console.log(`Listening on port ${port}`);
// });

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});