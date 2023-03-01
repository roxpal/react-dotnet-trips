import * as React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

axios.defaults.baseURL = "https://localhost:7114";

export const Trips = () => {
    const [trips, setTrips] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [failed, setFailed] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("");

    const navigate = useNavigate();

    React.useEffect(() => {
        populateTripsData();
    }, [trips]);

    const populateTripsData = () => {
        axios
            .get("/api/Trips/GetTrips")
            .then(result => {
                const response = result.data;
                setTrips(response);
                setLoading(false);
                setFailed(false);
                setErrorMessage("");
            })
            .catch(error => {
                setTrips([]);
                setLoading(false);
                setFailed(true);
                setErrorMessage("Trips could not be loaded.");
            });
    };

    const onTripUpdate = id => {
        navigate(`/update/${id}`);
    };

    const onTripDelete = id => {
        navigate(`/delete/${id}`);
    };

    const renderAllTripsTable = trips => {
        return (
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Date started</th>
                        <th>Date completed</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {trips.map(trip => (
                        <tr key={trip.id}>
                            <td>{trip.name}</td>
                            <td>{trip.description}</td>
                            <td>{new Date(trip.dateStarted).toLocaleDateString()}</td>
                            <td>{trip.dateCompleted ? new Date(trip.dateCompleted).toLocaleDateString() : "-"}</td>
                            <td>
                                <div className="form-group">
                                    <button onClick={() => onTripUpdate(trip.id)} className="btn btn-success">
                                        Update
                                    </button>
                                    <button onClick={() => onTripDelete(trip.id)} className="btn btn-danger">
                                        Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    };

    const content = loading ? (
        <p>
            <em>Loading...</em>
        </p>
    ) : failed ? (
        <div className="text-danger">{errorMessage}</div>
    ) : (
        renderAllTripsTable(trips)
    );

    return (
        <div>
            <h1>All trips</h1>
            <p>Here you can see all trips</p>
            {content}
        </div>
    );
};
