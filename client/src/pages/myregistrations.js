import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function MyRegistrations() {

    const [registrations, setRegistrations] = useState([]);
    const navigate = useNavigate();

    const fetchRegistrations = () => {

        const user = JSON.parse(
            localStorage.getItem("user")
        );

        // No user logged in
        if (!user) {
            alert("Please login first");
            navigate("/login");
            return;
        }

        console.log("Current logged-in user:", user);

        axios
            .get(
                `http://localhost:5000/api/registrations/${user.id}`
            )
            .then((res) => {

                console.log(
                    "User registrations:",
                    res.data
                );

                setRegistrations(res.data);

            })
            .catch((err) => {

                console.log(
                    "Registration Fetch Error:",
                    err
                );

                if (err.response) {
                    alert(
                        err.response.data.message ||
                        "Failed to load registrations"
                    );
                } else {
                    alert("Cannot connect to server");
                }

            });
    };

    useEffect(() => {
        fetchRegistrations();
    }, []);

    return (
        <div className="container mt-5">

            <h2 className="text-center mb-4">
                My Registrations
            </h2>

            {registrations.length === 0 ? (

                <div className="text-center">

                    <h5>
                        You have not registered for any events.
                    </h5>

                </div>

            ) : (

                <div className="row">

                    {registrations.map((registration) => (

                        <div
                            className="col-md-6 mb-4"
                            key={registration.id}
                        >

                            <div className="card shadow p-4 h-100">

                                <h3>
                                    {registration.title}
                                </h3>

                                <p>
                                    {registration.description}
                                </p>

                                <p>
                                    <strong>
                                        Venue:
                                    </strong>{" "}
                                    {registration.venue}
                                </p>

                                <p>
                                    <strong>
                                        Date:
                                    </strong>{" "}
                                    {new Date(
                                        registration.event_date
                                    ).toLocaleDateString()}
                                </p>

                                <p>
                                    <strong>
                                        Time:
                                    </strong>{" "}
                                    {registration.event_time}
                                </p>

                                <span className="badge bg-success">
                                    Registered
                                </span>

                            </div>

                        </div>

                    ))}

                </div>

            )}

        </div>
    );
}

export default MyRegistrations;