import { configureStore } from "@reduxjs/toolkit";
import tripsReducer from "../redux/tripsSlice";

export default configureStore({
    reducer: {
        trips: tripsReducer
    }
});
