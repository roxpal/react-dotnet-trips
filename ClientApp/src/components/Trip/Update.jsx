import * as React from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export const Update = () => {
    const [name, setName] = React.useState(undefined);
    const [description, setDescription] = React.useState(undefined);
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

    const onChangeName = e => {
        setName(e.target.value);
    };

    const onChangeDescription = e => {
        setDescription(e.target.value);
    };

    const onChangeDateStarted = e => {
        setDateStarted(e.target.value);
    };

    const onChangeDateCompleted = e => {
        setDateCompleted(e.target.value);
    };

    const onUpdateCancel = () => {
        navigate("/trips");
    };

    const onSubmit = e => {
        e.preventDefault();

        let tripObject = {
            name: name,
            description: description,
            dateStarted: new Date(dateStarted).toISOString(),
            dateCompleted: dateCompleted ? new Date(dateCompleted).toISOString() : null
        };

        axios.put("api/Trips/updateTrip/" + id, tripObject).then(() => {
            navigate("/trips");
        });
    };

    return (
        <div className="trip-form">
            <h3>Add new trip</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Trip name: </label>
                    <input type="text" className="form-control" value={name} onChange={onChangeName} />
                </div>
                <div className="form-group">
                    <label>Trip description: </label>
                    <textarea type="text" className="form-control" value={description} onChange={onChangeDescription} />
                </div>
                <div className="row">
                    <div className="col col-md-6 col-sm-6 col-xs-12">
                        <div className="form-group">
                            <label>Date of start: </label>
                            <input type="date" className="form-control" value={dateStarted} onChange={onChangeDateStarted} />
                        </div>
                    </div>
                    <div className="col col-md-6 col-sm-6 col-xs-12">
                        <div className="form-group">
                            <label>Date of completion: </label>
                            <input type="date" className="form-control" value={dateCompleted} onChange={onChangeDateCompleted} />
                        </div>
                    </div>
                </div>

                <div className="form-group">
                    <button onClick={onUpdateCancel} className="btn btn-default">
                        Cancel
                    </button>
                    <button type="submit" className="btn btn-success">
                        Update
                    </button>
                </div>
            </form>
        </div>
    );
};
