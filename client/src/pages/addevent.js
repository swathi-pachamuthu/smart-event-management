import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddEvent() {

    const navigate = useNavigate();

    const [event, setEvent] = useState({
        title: "",
        description: "",
        venue: "",
        event_date: "",
        event_time: "",
        capacity: ""
    });

    const handleChange = (e) => {
        setEvent({
            ...event,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {

        e.preventDefault();

        const user = JSON.parse(localStorage.getItem("user"));

        if (!user) {
            alert("Please login first");
            navigate("/login");
            return;
        }

        const eventData = {
            title: event.title,
            description: event.description,
            venue: event.venue,
            event_date: event.event_date,
            event_time: event.event_time,
            capacity: event.capacity,
            organizer_id: user.id
        };

        console.log("Sending event:", eventData);

        axios
            .post("http://localhost:5000/api/events", eventData)
            .then((res) => {

                console.log("Server response:", res.data);

                alert(res.data.message);

                setEvent({
                    title: "",
                    description: "",
                    venue: "",
                    event_date: "",
                    event_time: "",
                    capacity: ""
                });

                navigate("/events");

            })
            .catch((err) => {

                console.log("Error:", err);

                if (err.response) {
                    console.log("Server error:", err.response.data);
                    alert(
                        err.response.data.message ||
                        "Failed to add event"
                    );
                } else {
                    alert("Cannot connect to server");
                }

            });
    };

    return (
        <div className="container mt-5">

            <div className="card shadow p-4">

                <h2 className="text-center mb-4">
                    Add New Event
                </h2>

                <form onSubmit={handleSubmit}>

                    <div className="mb-3">
                        <label className="form-label">
                            Event Title
                        </label>

                        <input
                            type="text"
                            className="form-control"
                            name="title"
                            value={event.title}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">
                            Description
                        </label>

                        <textarea
                            className="form-control"
                            name="description"
                            value={event.description}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">
                            Venue
                        </label>

                        <input
                            type="text"
                            className="form-control"
                            name="venue"
                            value={event.venue}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">
                            Event Date
                        </label>

                        <input
                            type="date"
                            className="form-control"
                            name="event_date"
                            value={event.event_date}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">
                            Event Time
                        </label>

                        <input
                            type="time"
                            className="form-control"
                            name="event_time"
                            value={event.event_time}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">
                            Capacity
                        </label>

                        <input
                            type="number"
                            className="form-control"
                            name="capacity"
                            value={event.capacity}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary w-100"
                    >
                        Add Event
                    </button>

                </form>

            </div>

        </div>
    );
}

export default AddEvent;