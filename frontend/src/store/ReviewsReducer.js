
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

export const getSpotsReviews = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`)
    const data = await response.json();
    console.log("REVIEWS DATA: ", data)
    dispatch(loadReviews(data));
    return data;
};

const initialState = {};

const reviewsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_REVIEWS: {
            const newState = {};
            action.reviews.Reviews.forEach((review) => (newState[review.id] = review))
            return newState;
        }
        // case GET_A_SPOT: {
        //     const newState = {};
        //     action.spots.Spots.find((spot) => (newState[spot.id] === action.id))
        //     return newState;
        // }
        // case ADD_SPOT: {
        //     state = state.spots;
        //     const newState = { ...state, ...action.spot }
        //     return newState;
        // }
        // case DELETE_SPOT: {
        //     state = state.spots;
        //     console.log(state)
        //     const newState = { ...state }
        //     delete newState[action.id];
        //     return newState;
        // }
        default:
            return state;
    }
};

export default reviewsReducer;
