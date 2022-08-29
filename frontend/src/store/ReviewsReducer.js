
import { csrfFetch } from "./csrf";

const GET_REVIEWS = "reviews/getReviews";
const ADD_REVIEW = "review/addReview";
const DELETE_REVIEW = "review/deleteReview";

export const loadReviews = (reviews) => {
    return {
        type: GET_REVIEWS,
        reviews
    };
};

export const addReview = (reviews) => {
    return {
        type: ADD_REVIEW,
        reviews
    };
};

export const deleteReview = (review) => {
    return {
        type: DELETE_REVIEW,
        review
    };
};


export const getSpotsReviews = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`)
    const data = await response.json();
    console.log("REVIEWS DATA: ", data)
    dispatch(loadReviews(data));
    return data;
};

export const addAReview = (newReview) => async (dispatch) => {
    const { spotId, review, stars } = newReview;
    console.log("ABOUT TO ADD NEW REVIEW")
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: "POST",
        body: JSON.stringify({
            "review": review,
            "stars": stars
        }),
    })
    const data = await response.json();
    console.log("NEW REVIEW: ", data)
    dispatch(addReview(data));
    return data;
}

export const deleteAReview = reviewToBeDeleted => async (dispatch) => {
    console.log("PARAM IS: ", typeof reviewToBeDeleted, reviewToBeDeleted)
    console.log("ABOUT TO DELETE REVIEW")
    const response = await csrfFetch(`/api/reviews/${reviewToBeDeleted}`, {
        method: "DELETE",
    })
    const data = await response.json();
    console.log("DELETED REVIEW ", data)
    dispatch(deleteReview(data));
    return data;
}

const initialState = {};

const reviewsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_REVIEWS: {
            const newState = {};
            action.reviews.Reviews.forEach((review) => (newState[review.id] = review))
            return newState;
        }
        case ADD_REVIEW: {
            state = state.reviews;
            const newState = { ...state, ...action.review }
            return newState;
        }
        case DELETE_REVIEW: {
            state = state.reviews;
            const newState = { ...state }
            delete newState[action.review];
            return newState;
        }
        default:
            return state;
    }
};

export default reviewsReducer;
