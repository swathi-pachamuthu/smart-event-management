const express = require("express");
const router = express.Router();

const db = require("../config/db");

// =======================================
// Register User for Event
// =======================================

router.post("/register", (req, res) => {

    const { user_id, event_id } = req.body;

    if (!user_id || !event_id) {
        return res.status(400).json({
            message: "User ID and Event ID are required"
        });
    }

    // Check if user already registered
    const checkSql = `
        SELECT * FROM registrations
        WHERE user_id = ? AND event_id = ?
    `;

    db.query(checkSql, [user_id, event_id], (err, result) => {

        if (err) {
            console.log(err);

            return res.status(500).json({
                message: "Database Error"
            });
        }

        if (result.length > 0) {
            return res.status(400).json({
                message: "Already Registered"
            });
        }

        // Insert registration
        const insertSql = `
            INSERT INTO registrations (user_id, event_id)
            VALUES (?, ?)
        `;

        db.query(
            insertSql,
            [user_id, event_id],
            (err) => {

                if (err) {
                    console.log(err);

                    return res.status(500).json({
                        message: "Registration Failed"
                    });
                }

                res.status(201).json({
                    message: "Registration Successful"
                });

            }
        );

    });

});

// =======================================
// Get My Registrations
// =======================================

router.get("/:userId", (req, res) => {

    const userId = req.params.userId;

    const sql = `
        SELECT
            registrations.id,
            events.title,
            events.description,
            events.venue,
            events.event_date,
            events.event_time
        FROM registrations
        JOIN events
        ON registrations.event_id = events.id
        WHERE registrations.user_id = ?
    `;

    db.query(sql, [userId], (err, result) => {

        if (err) {
            console.log(err);

            return res.status(500).json({
                message: "Database Error"
            });
        }

        res.json(result);

    });

});

module.exports = router;