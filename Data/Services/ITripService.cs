namespace Trips.Data
{
    public interface ITripService
    {
        void AddTrip(Trip trip);
        void DeleteTrip(int tripId);
        List<Trip> GetAllTrips();
        Trip GetTripById(int tripId);
        void UpdateTrip(int tripId, Trip trip);
    }
}