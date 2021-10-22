import express from "express";
import mysql from "mysql";
import cors from 'cors';

const dbConfig = {
	host: "localhost",
	user: "root",
	password: "root",
	database: "planes_flights",
};

const connection = mysql.createConnection({
	host: dbConfig.host,
	user: dbConfig.user,
	password: dbConfig.password,
	database: dbConfig.database,
});

connection.connect((error) => {
	if (error) throw error;
	console.log("Successfully connected to the database.");
});

const app = express();
app.use(express.json());
app.use(cors());
const port = 3000;

var corsOptions = {
	origin: "http://localhost:4200",
};

app.get("/test-conn", cors(corsOptions), (req, res) => {
	connection.query("SELECT 1 + 1 AS solution", (err, rows, fields) => {
		if (err) throw err;
		console.log("The solution is: ", rows[0].solution);
		res.status(200).send({ solution: rows[0].solution });
	});
});

app.get("/arrivals", cors(corsOptions), (req, res) => {
	connection.query("SELECT * FROM arrivals", (err, rows, fields) => {
		if (err) throw err;
		res.status(200).send(rows);
	});
});

app.get("/arrivals/:id", cors(corsOptions), (req, res) => {
	connection.query(
		"SELECT * FROM arrivals WHERE id = ?",
		req.params.id,
		(err, rows, fields) => {
			if (err) throw err;
			res.status(200).send(rows);
		}
	);
});

app.post("/arrivals", cors(corsOptions), (req, res) => {
	connection.query(
		"INSERT INTO arrivals (`from_town`, `airline`, `is_late`, `arrival_time`) VALUES (?, ?, ?, ?)",
		[
			req.body.from_town,
			req.body.airline,
			req.body.is_late,
			// req.body.arrival_time,
			req.body.arrival_time.slice(0, 19).replace("T", " "), // TODO :: sometimes this fails
		],
		// TODO :: check if this can be simplified
		// "INSERT INTO arrivals VALUES (?)",
		// req.body,
		(err, rows, field) => {
			if (err) throw err;
			console.log("created: ", { id: rows.insertId, ...req.body });
			res.status(201).send({ id: rows.insertId, ...req.body });
		}
	);
});

app.put("/arrivals/:id", cors(corsOptions), (req, res) => {
	connection.query(
		"UPDATE arrivals SET from_town = ?, airline = ?, is_late = ?, arrival_time = ? WHERE id = ?",
		[
			req.body.from_town,
			req.body.airline,
			req.body.is_late,
			// req.body.arrival_time,
			req.body.arrival_time.slice(0, 19).replace("T", " "), // sanitization
			req.params.id,
		],
		(err, rows, field) => {
			if (err) throw err;
			console.log("updated: ", { rows });
			res.status(204).send();
		}
	);
});

app.delete("/arrivals/:id", cors(corsOptions), (req, res) => {
	console.log(req.params.id);
	connection.query(
		"DELETE FROM arrivals WHERE id=?",
		req.params.id,
		(err, rows, field) => {
			if (err) throw err;
			console.log("deleted: ", rows);
			// TODO :: should we return 204 when there affectedRows:0
			res.status(204).send();
		}
	);
});

app.listen(port, () =>
	console.log(`Hello world app listening on port ${port}!`)
);
