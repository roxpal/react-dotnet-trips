import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const tripsSlice = createSlice({
    name: "trips",
    initialState: {
        loading: true,
        hasError: false,
        error: null,
        tripsData: []
    },
    reducers: {
        getTripsSuccess: (state, action) => {
            state.loading = false;
            state.hasError = false;
            state.tripsData = action.payload;
        },
        getTripsError: (state, action) => {
            state.loading = false;
            state.hasError = true;
            state.error = action.payload;
        }
    }
});

export const getAllTrips = () => async dispatch => {
    return axios
        .get("api/Trips/GetTrips")
        .then(res => {
            const response = res.data;
            dispatch(getTripsSuccess(response));
        })
        .catch(err => {
            dispatch(getTripsError("Something went wrong!" + err));
            return Promise.reject({});
        });
};

export const selectTrips = state => state.trips;

export const { getTripsSuccess, getTripsError } = tripsSlice.actions;
export default tripsSlice.reducer;
