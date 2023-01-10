import { useState } from "react"
import { useDispatch } from "react-redux"
import { loadBookings, updateBooking } from "../../store/bookings"
import { loadUsersBookings } from "../../store/sessionBooking"

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

    return (
        <form onSubmit={(e) => onSubmit(e)}>
            <div>
                <label>
                    Check in
                    <input
                        type={"date"}
                        value={checkIn}
                        min={`${year}-${month}-${date}`}
                        onChange={(e) => setCheckIn(e.target.value)}
                    />
                </label>
            </div>
            <div>
                <label>
                    Check out
                    <input
                        type={"date"}
                        value={checkOut}
                        min={`${year}-${month}-${date}`}
                        onChange={(e) => setCheckOut(e.target.value)}
                    />
                </label>
            </div>
            <button type="submit" >Submit</button>
            <button onClick={() => setShowModal(false)}>Cancel</button>
        </form>
    )
}

export default EditBooking
