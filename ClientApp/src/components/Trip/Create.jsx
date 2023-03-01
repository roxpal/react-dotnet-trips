import * as React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Create = () => {
    const [name, setName] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [dateStarted, setDateStarted] = React.useState(null);
    const [dateCompleted, setDateCompleted] = React.useState(null);

    const navigate = useNavigate();

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

    const onSubmit = e => {
        e.preventDefault();

        const tripObject = {
            id: Math.floor(Math.random() * 1000),
            name: name,
            description: description,
            dateStarted: new Date(dateStarted).toISOString().slice(0, 10),
            dateCompleted: dateCompleted ? new Date(dateCompleted).toISOString().slice(0, 10) : null
        };

        axios.post("api/Trips/AddTrip", tripObject).then(() => {
            navigate("/trips");
        });
    };

    return (
        <div className="trip-form">
            <h3>Add new trip</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Trip name: </label>
                    <input type="text" className="form-control" value={name || ""} onChange={onChangeName} />
                </div>
                <div className="form-group">
                    <label>Trip description: </label>
                    <textarea type="text" className="form-control" value={description || ""} onChange={onChangeDescription} />
                </div>
                <div className="row">
                    <div className="col col-md-6 col-sm-6 col-xs-12">
                        <div className="form-group">
                            <label>Date of start: </label>
                            <input type="date" className="form-control" value={dateStarted || Date.now()} onChange={onChangeDateStarted} />
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
                    <input type="submit" value="Add trip" className="btn btn-primary" />
                </div>
            </form>
        </div>
    );
};
