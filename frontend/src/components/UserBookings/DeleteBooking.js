import { useDispatch } from "react-redux"
import { removeBooking } from "../../store/bookings"
import { loadUsersBookings } from "../../store/sessionBooking"

function DeleteBooking({ id, setShowModal }) {
    const dispatch = useDispatch()

    const payload = {
        "bookingId": id
    }

    const deleteBooking = async () => {

        await dispatch(removeBooking(payload))
        await dispatch(loadUsersBookings())
        setShowModal(false)
    }

    return (
        <div>
            <span>Are you sure you want to cancel your booking?</span>
            <button onClick={deleteBooking}>Yes</button>
            <button onClick={() => setShowModal(false)}>cancel</button>
        </div>
    )
}

export default DeleteBooking
