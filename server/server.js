import express from "express";
import pg from "pg";
import dotenv from "dotenv";
const { Pool } = pg;

dotenv.config({ path: "../.env" });

const pool = new Pool({
  user: "xxjrtxx",
  host: "localhost",
  password: "Passw0rd4U",
  database: "reactmvpdb",
  port: 5432,
});
const port = process.env.PORT || 8000;
// const { PORT, DATABASE_URL } = process.env;

// const client = new pg.Client({
//   connectionString: DATABASE_URL,
// });

// await client.connect();

const app = express();

app.use(express.json());

//---------------------------------------------GET ROUTE FOR PLAYER (ID,  FIRSTNAME, LASTNAME, SCORE, GAME_ID)

app.get("/player", async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * from player");
    res.status(200).send(rows);
  } catch (error) {
    res.status(404).send("No data found");
  }
});

//---------------------------------------------POST ROUTE FOR PLAYER (ID,  FIRSTNAME, LASTNAME, SCORE, GAME_ID)

app.post("/player", async (req, res, next) => {
  const { id, firstname, lastname, score, game_id } = req.body;

  if (
    typeof id != "number" ||
    typeof firstname != "string" ||
    typeof lastname != "string" ||
    typeof score != "number" ||
    typeof game_id != "number"
  ) {
    next();
  }
  try {
    const { rows } = await pool.query(
      `INSERT INTO player (id, firstname, lastname, score, game_id) VALUES ($1, $2, $3, $4, $5)`,
      [id, firstname, lastname, score, game_id]
    );
    const playerQuery = await pool.query(
      `SELECT * FROM player ORDER BY id DESC LIMIT 1`
    );
    const newPlayer = playerQuery.rows[0];
    res.status(201).send(newPlayer);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});
//---------------------------------------------PATCH ROUTE TO UPDATE PLAYER (ID,  FIRSTNAME, LASTNAME, SCORE, GAME_ID)

app.patch("/player/:id", async (req, res) => {
  const { id } = req.params;
  const { firstname, lastname, score, game_id } = req.body;

  try {
    await pool.query(
      `UPDATE player SET firstname = $1, lastname = $2, score = $3, game_id = $4 WHERE id = $5`,
      [firstname, lastname, score, game_id, id]
    );
    const { rows } = await pool.query(`SELECT * FROM player WHERE id = $1`, [
      id,
    ]);

    if (rows.length > 0) {
      res.status(200).send(rows[0]);
    } else {
      res.status(404).send("Outside range of table");
    }
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

// ------------------------------------------------------------DELETE METHOD TO DELETE PLAYER OR SCORE

app.delete("/player/:id", async (req, res) => {
  const { id } = req.params;

  const parsedId = parseInt(id, 10);

  if (!Number.isInteger(parsedId)) {
    return res
      .status(404)
      .send("Not Found. Invalid index. Please provide an integer.");
  }
  try {
    let rowQuery = await pool.query("SELECT COUNT(*) FROM player");
    let totalRowsArray = rowQuery.rows;
    let totalRowsNumber = totalRowsArray[0].count;

    if (parsedId >= 0) {
      const { rows } = await pool.query(`DELETE from player WHERE id = ${id}`);
      res.status(200).send(`Deleted data from ROW: ${id}`);
    } else {
      res.status(404).send("Outside range of table!");
    }
  } catch (error) {
    console.error(error);
    res.send(500).send("Internal Server Error");
  }
});

//--------------------------------------------------------------LISTENING PORT

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
