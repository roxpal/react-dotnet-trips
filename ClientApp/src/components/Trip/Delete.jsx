import * as React from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export const Delete = () => {
    const [name, setName] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [dateStarted, setDateStarted] = React.useState(null);
    const [dateCompleted, setDateCompleted] = React.useState(null);

    const { id } = useParams();
    const navigate = useNavigate();

    React.useEffect(() => {
        axios.get("api/Trips/SingleTrip/" + id).then(trip => {
            const response = trip.data;
            setName(response.name);
            setDescription(response.description);
            setDateStarted(new Date(response.dateStarted).toISOString().slice(0, 10));
            setDateCompleted(response.dateCompleted ? new Date(response.dateCompleted).toISOString().slice(0, 10) : null);
        });
    }, []);

    const onCancel = () => {
        navigate("/trips");
    };

    const onConfirm = () => {
        axios.delete("api/Trips/deleteTrip/" + id).then(() => {
            navigate("/trips");
        });
    };

    return (
        <div style={{ marginTop: 10 }}>
            <h2>Delete trip confirmation</h2>

            <div class="card">
                <div class="card-body">
                    <h4 className="card-title">{name}</h4>
                    <p className="card-text">{description}</p>
                    <button onClick={onCancel} class="btn btn-default">
                        Cancel
                    </button>
                    <button onClick={onConfirm} class="btn btn-danger">
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
};
