import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { loadUsersBookings } from "../../store/sessionBooking"
import DeleteBookingModal from "./DeleteBookingModal"
import EditBookingModal from "./EditBookingModal"



function UserBookings() {
    const dispatch = useDispatch()
    const bookings = useSelector(state => state.userBookings)
    const bookingsArr = Object.values(bookings)


    useEffect(() => {
        dispatch(loadUsersBookings())
    }, [dispatch])

    return bookingsArr.length > 0 && (
        <div>
            <h1 style={{ paddingTop: "100px" }}>User BOOKINGS</h1>
            <div>
                {bookingsArr.map(booking => (
                    <div key={booking.id}>
                        <div>
                            {booking.Spot.name}
                            <img style={{ height: "350px", width: "300px" }} src={booking.Spot.previewImage} alt={"Spot"} />
                            {booking.Spot.city} {booking.Spot.state}
                            {booking.Spot.price} a night
                            Check in {booking.startDate.slice(5, -14)}-{booking.startDate.slice(0, 4)}
                            Check Out {booking.endDate.slice(5, -14)}-{booking.startDate.slice(0, 4)}
                        </div>
                        <div>
                            <EditBookingModal id={booking.id} booking={booking} />
                            <DeleteBookingModal id={booking.id} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default UserBookings
