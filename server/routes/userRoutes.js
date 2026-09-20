const express = require("express");
const router = express.Router();

const db = require("../config/db");

// ===============================
// Register User
// ===============================

router.post("/register", (req, res) => {

    const { name, email, password, role } = req.body;

    const userRole = role || "participant";

    const sql =
        "INSERT INTO users(name, email, password, role) VALUES (?,?,?,?)";

    db.query(sql, [name, email, password, userRole], (err) => {

        if (err) {
            console.log(err);
            return res.status(500).json({
                message: "Registration Failed"
            });
        }

        res.status(201).json({
            message: "User Registered Successfully"
        });

    });

});

// ===============================
// Login
// ===============================

router.post("/login", (req, res) => {

    const { email, password } = req.body;

    const sql = "SELECT * FROM users WHERE email=?";

    db.query(sql, [email], (err, result) => {

        if (err) {
            return res.status(500).json({
                message: "Database Error"
            });
        }

        if (result.length === 0) {
            return res.status(404).json({
                message: "User Not Found"
            });
        }

        if (result[0].password !== password) {
            return res.status(401).json({
                message: "Invalid Password"
            });
        }

        res.json({
            message: "Login Successful",
            user: result[0]
        });

    });

});

module.exports = router;