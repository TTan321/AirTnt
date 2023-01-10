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
        <div className="user-spots-page-container">
            <h1 style={{ padding: "10px 0", fontFamily: "sans-serif", borderBottom: "1px solid black" }}>Your Reservations</h1>
            <div className="user-spots-container">
                {bookingsArr.map(booking => (
                    <div key={booking.id} className="listings-spot-container">
                        <div className="listing-details">
                            <p className="listing-name">
                                {booking.Spot.name}
                            </p>
                            <img src={booking.Spot.previewImage} alt={"Spot"} className="listing-images" />
                            <p className="l-p"><span className="edit-location">{booking.Spot.city}, {booking.Spot.state ? booking.Spot.state : booking.Spot.country} </span></p>
                            <p className="l-p"><span className="listing-price">Reservation Cost: ${booking.Spot.price * ((new Date(booking.endDate) - new Date(booking.startDate)) / 86400000)} </span></p>
                            <div style={{ paddingTop: "10px", display: "flex", flexDirection: "column", fontSize: "14px" }}>
                                <span>
                                    <span style={{ fontWeight: "bold" }}>Check in:</span> {booking.startDate.slice(5, -14)}-{booking.startDate.slice(0, 4)}
                                </span>
                                <span>
                                    <span style={{ fontWeight: "bold" }}>Check Out:</span> {booking.endDate.slice(5, -14)}-{booking.startDate.slice(0, 4)}
                                </span>
                            </div>
                        </div>
                        <div className="buttons-container">
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
