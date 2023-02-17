import * as React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

axios.defaults.baseURL = 'https://localhost:7114';

export const Trips = () => {
    const [trips, setTrips] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const navigate = useNavigate();

    React.useEffect(() => {
        populateTripsData();
    }, [trips]);

    const onTripUpdate = id => {
        navigate(`/update/${id}`);
    };

    const populateTripsData = () => {
        axios.get('/api/Trips/GetTrips').then(result => {
            const response = result.data;
            setTrips(response);
            setLoading(false);
        });
    };

    const renderAllTripsTable = trips => {
        return (
            <table className="table table-striped">
                <thead>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Date started</th>
                    <th>Date completed</th>
                    <th>Action</th>
                </thead>
                <tbody>
                    {trips.map(trip => (
                        <tr key={trip.id}>
                            <td>{trip.name}</td>
                            <td>{trip.description}</td>
                            <td>{new Date(trip.dateStarted).toLocaleDateString()}</td>
                            <td>{trip.dateCompleted ? new Date(trip.dateCompleted).toLocaleDateString() : '-'}</td>
                            <td>
                                <div className="form-group">
                                    <button onClick={onTripUpdate(trip.id)} className="btn btn-success">
                                        Update
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
