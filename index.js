import express from "express";
import mysql from "mysql";
import cors from 'cors';
import { body, check, validationResult  } from "express-validator";

const port = 3000;
const app = express();

const corsOptions = {
	origin: "http://localhost:4200",
};


const dbConfig = {
	host: "localhost",
	user: "root",
	password: "root",
	database: "planes_flights",
	multipleStatements: false,
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

app.use(cors(corsOptions));
app.use(express.json());


app.get("/test-conn", (req, res) => {
	connection.query("SELECT 1 + 1 AS solution", (err, rows, fields) => {
		if (err) throw err;
		console.log("The solution is: ", rows[0].solution);
		res.status(200).send({ solution: rows[0].solution });
	});
});

// get all records
app.get("/arrivals", (req, res) => {
	connection.query("SELECT * FROM arrivals", (err, rows, fields) => {
		if (err) {
            console.log(err.message);
            return res.status(500).send({
                error_code: err.code,
                error_message: err.sqlMessage,
            });
        };
        try {
            console.log('You got all', rows.length, 'records!');
        } catch (err) {
            console.log(err.message);
        };
        res.status(200).send(rows);
	});
});

// get record by id
app.get("/arrivals/:id", (req, res) => {
	connection.query(
		"SELECT * FROM arrivals WHERE id = ?",
		req.params.id,
		(err, rows, fields) => {
			if (err) {
                console.log(err.message);
                return res.status(500).send({
                    error_code: err.code,
                    error_message: err.sqlMessage,
                });
            };
            try {
                console.log('You got record with id: ', rows[0].id);
            } catch (err) {
                console.log(`Record with id ${req.params.id} not found!`);
            };
            if (rows.length === 0) {
                return res.status(404).send({
                    id: +req.params.id,
                    error_message: 'Record not found'
                });
            }
            res.status(200).send(rows);		
		}
	);
});

// create new record
app.post(
	"/arrivals", 

	//validation:
	check("from_town").isLength({min: 1, max: 64}).withMessage("'from_town' field must be 1-64 characters long!"),
	check("airline").isLength({min: 1, max: 32}).withMessage("'airline' field must be 1-32 characters long!"),
	check("arrival_time").isISO8601().toDate().withMessage("Not valid date format! Please enter: 'YYYY-MM-DD HH:MM'."),
	check("is_late").custom(value => (value == 0 || value == 1) ? true : false).withMessage("when arrival delay field value = 0, when not delay field value = 1!"),

	(req, res) => {
	
		const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors.errors[0].msg);
            return res.status(400).json(errors);
        }
		
		connection.query(
			"INSERT INTO arrivals (`from_town`, `airline`, `arrival_time`, `is_late`) VALUES (?, ?, ?, ?)",
			[
				req.body.from_town,
				req.body.airline,
				req.body.arrival_time,
				req.body.is_late,
				// req.body.arrival_time.slice(0, 19).replace("T", " "), // TODO :: sometimes this fails
			],
			(err, rows, field) => {
				if (err) {
					console.log(err.message);
					return res.status(500).send({
						error_code: err.code,
						error_message: err.sqlMessage,
					});
				};
				console.log("created: ", { id: rows.insertId, ...req.body });
				res.status(201).send({ id: rows.insertId, ...req.body });	
			}
		);
	}
);

// update existing (previous) record by id
app.put(
	"/arrivals/:id",
	
	//validation:
	check("from_town").isLength({min: 1, max: 64}).withMessage("'from_town' field must be 1-64 characters long!"),
	check("airline").isLength({min: 1, max: 32}).withMessage("'airline' field must be 1-32 characters long!"),
	check("arrival_time").isISO8601().toDate().withMessage("Not valid date format! Please enter: 'YYYY-MM-DD HH:MM'."),
	check("is_late").custom(value => (value == 0 || value == 1) ? true : false).withMessage("when arrival delay field value = 0, when not delay field value = 1!"),
		
	(req, res) => {

		const errors = validationResult(req);
        	if (!errors.isEmpty()) {
            	console.log(errors.errors[0].msg);
            	return res.status(400).json(errors);
        	}
		
		connection.query(
			"UPDATE arrivals SET from_town = ?, airline = ?, arrival_time = ?, is_late = ? WHERE id = ?",
		[
				req.body.from_town,
				req.body.airline,
				req.body.arrival_time,
				req.body.is_late,
				req.params.id,
				// req.body.arrival_time.slice(0, 19).replace("T", " "), // TODO :: sometimes this fails
							
		],
		(err, rows, field) => {
			if (err) {
				console.log(err.message);
				return res.status(500).send({
					error_code: err.code,
					error_message: err.sqlMessage,
				});
			};
			console.log("Updated rows:", rows === undefined ? 0 : rows.affectedRows);
                if (!rows.affectedRows) {
                    console.log(`Record with id ${req.params.id} not found!`);
                    return res.status(404).send({
                        id: +req.params.id,
                        error_message: 'Record not found'
                    });
                }
                res.status(201).send({id: +req.params.id, ...req.body});	
			}
		);
	}
);

// delete record by id
app.delete("/arrivals/:id", (req, res) => {
	console.log(req.params.id);
	connection.query(
		"DELETE FROM arrivals WHERE id=?",
		req.params.id,
		(err, rows, field) => {
			if (err) {
                console.log(err.message);
                return res.status(500).send({
                    error_code: err.code,
                    error_message: err.sqlMessage,
                });
            };
            console.log("Deleted rows:", rows.affectedRows);
            if (!rows.affectedRows) return res.status(404).send({
                id: +req.params.id,
                error_message: 'Record not found'
            });
            res.status(204).send({
                id: +req.params.id,
                message: `Record with id ${req.params.id} deleted`
            });					
		}
	);
});

// total arrivals:
app.get("/total", (req, res) => {
    connection.query("SELECT count(*) as total_arrivals FROM arrivals", (err, rows, fields) => {
        if (err) {
            console.log(err.message);
            return res.status(500).send({
                error_code: err.code,
                error_message: err.sqlMessage,
            });
        };
        console.log("Total arrivals: ", rows[0].total_arrivals);
        res.status(200).send({ total_arrivals: rows[0].total_arrivals });
    });
});

// total is_late:
app.get("/is_late", (req, res) => {
    connection.query("SELECT count(is_late) as total_is_late FROM arrivals WHERE is_late=1", (err, rows, fields) => {
        if (err) {
            console.log(err.message);
            return res.status(500).send({
                error_code: err.code,
                error_message: err.sqlMessage,
            });
        };
        console.log("Total is_late: ", rows[0].total_is_late);
        res.status(200).send({ total_is_late: rows[0].total_is_late });
    });
});


app.listen(port, () =>
	console.log(`App listening on port ${port}!`)
);
