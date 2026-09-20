const express = require("express");
const router = express.Router();

const db = require("../config/db");

// =======================================
// Get All Events
// =======================================

router.get("/", (req, res) => {

    db.query("SELECT * FROM events", (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);

    });

});

// =======================================
// Get One Event
// =======================================

router.get("/:id", (req, res) => {

    const sql = "SELECT * FROM events WHERE id=?";

    db.query(sql, [req.params.id], (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        if (result.length === 0) {
            return res.status(404).json({
                message: "Event Not Found"
            });
        }

        res.json(result[0]);

    });

});

// =======================================
// Add Event
// =======================================

router.post("/", (req, res) => {

    const {
        title,
        description,
        venue,
        event_date,
        event_time,
        capacity,
        organizer_id
    } = req.body;

    const sql = `
        INSERT INTO events
        (title,description,venue,event_date,event_time,capacity,organizer_id)
        VALUES (?,?,?,?,?,?,?)
    `;

    db.query(
        sql,
        [
            title,
            description,
            venue,
            event_date,
            event_time,
            capacity,
            organizer_id
        ],
        (err) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.status(201).json({
                message: "Event Added Successfully"
            });

        }
    );

});

// =======================================
// Update Event
// =======================================

router.put("/:id", (req, res) => {

    const {
        title,
        description,
        venue,
        event_date,
        event_time,
        capacity
    } = req.body;

    const sql = `
        UPDATE events
        SET
        title=?,
        description=?,
        venue=?,
        event_date=?,
        event_time=?,
        capacity=?
        WHERE id=?
    `;

    db.query(
        sql,
        [
            title,
            description,
            venue,
            event_date,
            event_time,
            capacity,
            req.params.id
        ],
        (err) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                message: "Event Updated Successfully"
            });

        }
    );

});

// =======================================
// Delete Event
// =======================================

router.delete("/:id", (req, res) => {

    const sql = "DELETE FROM events WHERE id=?";

    db.query(sql, [req.params.id], (err) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json({
            message: "Event Deleted Successfully"
        });

    });

});

module.exports = router;