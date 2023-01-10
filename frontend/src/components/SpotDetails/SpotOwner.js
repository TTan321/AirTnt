import { EditSpotFormModal } from "../EditSpot/EditSpotFromModal"


function SpotOwner({ spot, reviews }) {

    const deleteSpot = (e) => {
        e.preventDefault();

        dispatch(deleteSpotAtId(spotId))
        history.push('/hostspot')
    }

    let noReview;
    if (!spot?.avgRating) {
        noReview = "No"
    }

    let reviewsDiv;

    if (!!reviews) {
        reviewsDiv = <div className="reviews">
            <h2>{noReview} Stars {spot.avgRating?.toFixed(2)} {count} Reviews</h2>
            {reviews?.map(({ id, User, createdAt, review, stars }) => (
                <div key={id}>
                    <div className="user">
                        <div>{User.firstName} {User.lastName}</div>
                        <div className="time"> {createdAt.slice(0, 10)}</div>
                    </div>
                    <div className="description">
                        <div>Rating {stars}</div>
                        <div>{review}</div>
                    </div>
                </div>
            ))}
        </div>
    }

    return (
        <>
            <div className="spot">
                <div>
                    <h1>{spot?.name}</h1>
                    <img src={spot?.previewImage} className="image" alt={"Spot preview"} />
                    <p>{spot?.description} ${spot?.price} night</p>
                    <EditSpotFormModal />
                    <button onClick={deleteSpot}>Delete</button>
                </div>
                {reviewsDiv}
            </div>
        </>
    )
}

export default SpotOwner
