function Dashboard() {

  const user = JSON.parse(localStorage.getItem("user"));

  return (

    <div className="container mt-5">

      <h2>Welcome, {user?.name}</h2>

      <p>Email : {user?.email}</p>

      <p>Role : {user?.role}</p>

    </div>

  );

}

export default Dashboard;