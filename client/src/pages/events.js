import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Events() {

    const [events, setEvents] = useState([]);
    const navigate = useNavigate();

    // Get all events
    const fetchEvents = () => {

        axios
            .get("http://localhost:5000/api/events")
            .then((res) => {
                setEvents(res.data);
            })
            .catch((err) => {
                console.log("Error loading events:", err);
            });
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    // Delete Event
    const deleteEvent = (id) => {

        if (!window.confirm("Are you sure you want to delete this event?")) {
            return;
        }

        axios
            .delete(`http://localhost:5000/api/events/${id}`)
            .then((res) => {
                alert(res.data.message);
                fetchEvents();
            })
            .catch((err) => {
                console.log("Delete Error:", err);
                alert("Failed to delete event");
            });
    };

    // Register Event
    const registerEvent = (eventId) => {

        const user = JSON.parse(localStorage.getItem("user"));

        if (!user) {
            alert("Please login first");
            navigate("/login");
            return;
        }

        axios
            .post(
                "http://localhost:5000/api/registrations/register",
                {
                    user_id: user.id,
                    event_id: eventId
                }
            )
            .then((res) => {

                alert(res.data.message);

            })
            .catch((err) => {

                console.log("Registration Error:", err);

                if (err.response) {

                    console.log(
                        "Server response:",
                        err.response.data
                    );

                    alert(
                        err.response.data.message ||
                        "Registration Failed"
                    );

                } else {

                    alert("Cannot connect to server");

                }

            });
    };

    return (
        <div className="container mt-5">

            <h2 className="text-center mb-4">
                All Events
            </h2>

            <div className="row">

                {events.length === 0 ? (

                    <div className="text-center">
                        <h4>No Events Found</h4>
                    </div>

                ) : (

                    events.map((event) => (

                        <div
                            className="col-md-4 mb-4"
                            key={event.id}
                        >

                            <div className="card shadow p-3 h-100">

                                <h3>{event.title}</h3>

                                <p>
                                    {event.description}
                                </p>

                                <p>
                                    <strong>Venue:</strong>{" "}
                                    {event.venue}
                                </p>

                                <p>
                                    <strong>Date:</strong>{" "}
                                    {new Date(
                                        event.event_date
                                    ).toLocaleDateString()}
                                </p>

                                <p>
                                    <strong>Time:</strong>{" "}
                                    {event.event_time}
                                </p>

                                <p>
                                    <strong>Capacity:</strong>{" "}
                                    {event.capacity}
                                </p>

                                <div className="mt-3">

                                    {/* Edit Button */}
                                    <button
                                        className="btn btn-warning me-2"
                                        onClick={() =>
                                            navigate(
                                                `/editevent/${event.id}`
                                            )
                                        }
                                    >
                                        Edit
                                    </button>

                                    {/* Delete Button */}
                                    <button
                                        className="btn btn-danger me-2"
                                        onClick={() =>
                                            deleteEvent(event.id)
                                        }
                                    >
                                        Delete
                                    </button>

                                    {/* Register Button */}
                                    <button
                                        className="btn btn-success"
                                        onClick={() =>
                                            registerEvent(event.id)
                                        }
                                    >
                                        Register
                                    </button>

                                </div>

                            </div>

                        </div>

                    ))

                )}

            </div>

        </div>
    );
}

export default Events;