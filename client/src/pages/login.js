import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {

        e.preventDefault();

        axios
            .post("http://localhost:5000/api/users/login", {
                email: email,
                password: password
            })
            .then((res) => {

                console.log("Login response:", res.data);

                // Remove any previously logged-in user
                localStorage.removeItem("user");

                // Store the CURRENT logged-in user
                localStorage.setItem(
                    "user",
                    JSON.stringify(res.data.user)
                );

                alert(res.data.message);

                // Go to dashboard
                navigate("/dashboard");

                // Refresh so navbar gets the new user
                window.location.reload();

            })
            .catch((err) => {

                console.log("Login Error:", err);

                if (err.response) {

                    alert(
                        err.response.data.message ||
                        "Login Failed"
                    );

                } else {

                    alert("Cannot connect to server");

                }

            });
    };

    return (
        <div className="container mt-5">

            <div className="row justify-content-center">

                <div className="col-md-6">

                    <div className="card shadow p-4">

                        <h2 className="text-center mb-4">
                            Login
                        </h2>

                        <form onSubmit={handleSubmit}>

                            <div className="mb-3">

                                <label className="form-label">
                                    Email
                                </label>

                                <input
                                    type="email"
                                    className="form-control"
                                    value={email}
                                    onChange={(e) =>
                                        setEmail(e.target.value)
                                    }
                                    required
                                />

                            </div>

                            <div className="mb-3">

                                <label className="form-label">
                                    Password
                                </label>

                                <input
                                    type="password"
                                    className="form-control"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    required
                                />

                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary w-100"
                            >
                                Login
                            </button>

                        </form>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Login;