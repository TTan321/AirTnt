import { useState } from "react"
import { useDispatch } from "react-redux"
import { loadBookings, updateBooking } from "../../store/bookings"
import { loadUsersBookings } from "../../store/sessionBooking"
import "./EditBooking.css"

function EditBooking({ booking, setShowModal }) {
    const dispatch = useDispatch();

    let currentDate = new Date();

    let month;
    if (currentDate.getMonth() < 9) {
        month = `0${currentDate.getMonth() + 1}`
    }
    else {
        month = `${currentDate.getMonth() + 1}`
    }
    const date = `${currentDate.getDate()}`
    const year = `${currentDate.getFullYear()}`

    const [checkIn, setCheckIn] = useState(`${booking.startDate.slice(0, 4)}-${booking.startDate.slice(5, 7)}-${booking.startDate.slice(8, 10)}`)
    const [checkOut, setCheckOut] = useState(`${booking.endDate.slice(0, 4)}-${booking.endDate.slice(5, 7)}-${booking.endDate.slice(8, 10)}`)

    const onSubmit = async (e) => {
        e.preventDefault()

        const payload = {
            "bookingId": booking.id,
            "startDate": checkIn,
            "endDate": checkOut
        }

        setShowModal(false)
        await dispatch(updateBooking(payload))
        await dispatch(loadUsersBookings())
        await dispatch(loadBookings())
    }

    let nights = ((new Date(checkOut) - new Date(checkIn)) / 86400000)

    return (
        <form onSubmit={(e) => onSubmit(e)} className="editBooking">
            <div style={{ fontFamily: "sans-serif", fontWeight: "bold", fontSize: "22px", borderBottom: "1px solid black", marginBottom: "10px" }}>Edit your reservation</div>
            <div>{booking.Spot.name}</div>
            <p className="l-p"><span className="edit-location">{booking.Spot.city}, {booking.Spot.state ? booking.Spot.state : booking.Spot.country} </span></p>
            <p className="l-p"><span className="listing-price">Reservation Cost: ${booking.Spot.price * nights} </span></p>
            <div className='calendar'>
                <div className="CheckIn">
                    <span style={{ paddingRight: '20px' }}>
                        Check In:
                    </span>
                    <input
                        type={"date"}
                        value={checkIn}
                        min={`${year}-${month}-${date}`}
                        onChange={(e) => setCheckIn(e.target.value)}
                    />
                </div>
                <div className="CheckOut">
                    <span style={{ paddingRight: '9px' }}>
                        Check Out:
                    </span>
                    <input
                        type={"date"}
                        value={checkOut}
                        min={`${year}-${month}-${date}`}
                        onChange={(e) => setCheckOut(e.target.value)}
                    />
                </div>
            </div>
            <div className="editBookButton">
                <button type="submit" className="edit" >Submit</button>
                <button onClick={() => setShowModal(false)} className="edit" >Cancel</button>
            </div>
        </form >
    )
}

export default EditBooking
