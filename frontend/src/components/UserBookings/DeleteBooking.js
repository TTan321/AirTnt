import { useDispatch } from "react-redux"
import { removeBooking } from "../../store/bookings"
import { loadUsersBookings } from "../../store/sessionBooking"
import "./DeleteBooking.css"

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
        <div className="DeleteBooking">
            <span className="deleteText">Are you sure you want to cancel your booking?</span>
            <div className="DeleteButtons">
                <button onClick={deleteBooking} className="edit" >Yes</button>
                <button onClick={() => setShowModal(false)} className="edit" >cancel</button>
            </div>
        </div>
    )
}

export default DeleteBooking
