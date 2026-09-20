import { Link, useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

    const logout = () => {
        localStorage.removeItem("user");
        navigate("/login");
        window.location.reload();
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">

            <div className="container">

                <Link className="navbar-brand" to="/">
                    Smart Event
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div
                    className="collapse navbar-collapse"
                    id="navbarNav"
                >

                    <ul className="navbar-nav ms-auto">

                        <li className="nav-item">
                            <Link className="nav-link" to="/">
                                Home
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/events">
                                Events
                            </Link>
                        </li>

                        {/* Only Admin can see Add Event */}
                        {user && user.role === "admin" && (
                            <li className="nav-item">
                                <Link
                                    className="nav-link"
                                    to="/addevent"
                                >
                                    Add Event
                                </Link>
                            </li>
                        )}

                        {/* Logged-in users */}
                        {user && (
                            <>
                                <li className="nav-item">
                                    <Link
                                        className="nav-link"
                                        to="/myregistrations"
                                    >
                                        My Registrations
                                    </Link>
                                </li>

                                <li className="nav-item">
                                    <Link
                                        className="nav-link"
                                        to="/dashboard"
                                    >
                                        Dashboard
                                    </Link>
                                </li>

                                <li className="nav-item">
                                    <button
                                        className="btn btn-danger ms-2"
                                        onClick={logout}
                                    >
                                        Logout
                                    </button>
                                </li>
                            </>
                        )}

                        {/* Not logged-in users */}
                        {!user && (
                            <>
                                <li className="nav-item">
                                    <Link
                                        className="nav-link"
                                        to="/login"
                                    >
                                        Login
                                    </Link>
                                </li>

                                <li className="nav-item">
                                    <Link
                                        className="nav-link"
                                        to="/register"
                                    >
                                        Register
                                    </Link>
                                </li>
                            </>
                        )}

                    </ul>

                </div>

            </div>

        </nav>
    );
}

export default Navbar;