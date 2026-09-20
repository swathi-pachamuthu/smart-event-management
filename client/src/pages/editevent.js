import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function EditEvent() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [event, setEvent] = useState({
        title: "",
        description: "",
        venue: "",
        event_date: "",
        event_time: "",
        capacity: ""
    });

    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/events/${id}`)
            .then((res) => {
                setEvent(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [id]);

    const handleChange = (e) => {
        setEvent({
            ...event,
            [e.target.name]: e.target.value
        });
    };

    const updateEvent = (e) => {
        e.preventDefault();

        axios
            .put(`http://localhost:5000/api/events/${id}`, event)
            .then((res) => {
                alert(res.data.message);
                navigate("/events");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className="container mt-5">

            <h2>Edit Event</h2>

            <form onSubmit={updateEvent}>

                <input
                    className="form-control mb-3"
                    name="title"
                    value={event.title}
                    onChange={handleChange}
                    placeholder="Title"
                />

                <textarea
                    className="form-control mb-3"
                    name="description"
                    value={event.description}
                    onChange={handleChange}
                    placeholder="Description"
                />

                <input
                    className="form-control mb-3"
                    name="venue"
                    value={event.venue}
                    onChange={handleChange}
                    placeholder="Venue"
                />

                <input
                    type="date"
                    className="form-control mb-3"
                    name="event_date"
                    value={event.event_date}
                    onChange={handleChange}
                />

                <input
                    type="time"
                    className="form-control mb-3"
                    name="event_time"
                    value={event.event_time}
                    onChange={handleChange}
                />

                <input
                    type="number"
                    className="form-control mb-3"
                    name="capacity"
                    value={event.capacity}
                    onChange={handleChange}
                />

                <button className="btn btn-primary">
                    Update Event
                </button>

            </form>

        </div>
    );
}

export default EditEvent;