import * as React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllTrips, selectTrips } from "../../redux/tripsSlice";

axios.defaults.baseURL = "https://localhost:7114";

export const Trips = () => {
    const selectedTrips = useSelector(selectTrips);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(getAllTrips());
    }, []);

    const onTripUpdate = id => {
        navigate(`/update/${id}`);
    };

    const onTripDelete = id => {
        navigate(`/delete/${id}`);
    };

    const renderAllTripsTable = tripsData => {
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
                    {tripsData.map(trip => (
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

    const content = selectedTrips.loading ? (
        <p>
            <em>Loading...</em>
        </p>
    ) : selectedTrips.hasError ? (
        <div className="text-danger">{errorMessage}</div>
    ) : (
        renderAllTripsTable(selectedTrips.tripsData)
    );

    return (
        <div>
            <h1>All trips</h1>
            <p>Here you can see all trips</p>
            {content}
        </div>
    );
};
