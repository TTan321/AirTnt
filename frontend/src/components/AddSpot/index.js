import { useSelector } from "react-redux"
import AddSpotForm from "./AddSpotForm";


function AddSpot() {
    const sessionUser = useSelector(state => state.session.user);
    console.log(sessionUser)
    if (sessionUser) {
        return (
            < AddSpotForm />
        )
    } else return (<div>Please login to host your property</div>)
}
