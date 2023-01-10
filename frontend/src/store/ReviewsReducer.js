
import { csrfFetch } from "./csrf";

const GET_USER_REVIEWS = "reviews/getUserReviews";
const GET_REVIEWS = "reviews/getReviews";
const ADD_REVIEW = "review/addReview";
const DELETE_REVIEW = "review/deleteReview";

export const loadUserReviews = (reviews) => {
    return {
        type: GET_USER_REVIEWS,
        reviews
    };
};

export const loadReviews = (reviews) => {
    return {
        type: GET_REVIEWS,
        reviews
    };
};

export const addReview = (review) => {
    return {
        type: ADD_REVIEW,
        review
    };
};

export const deleteReview = (review) => {
    return {
        type: DELETE_REVIEW,
        review
    };
};

export const getUserReviews = () => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/current`)
    const data = await response.json();
    dispatch(loadUserReviews(data));
    return data;
};

export const getSpotsReviews = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`)
    const data = await response.json();
    dispatch(loadReviews(data));
    return data;
};

export const addAReview = (newReview) => async (dispatch) => {
    const { spotId, review, stars } = newReview;
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: "POST",
        body: JSON.stringify({
            "review": review,
            "stars": stars
        }),
    })
    const data = await response.json();
    dispatch(addReview(data));
    return data;
}

export const deleteAReview = reviewToBeDeleted => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/${reviewToBeDeleted}`, {
        method: "DELETE",
    })
    const data = await response.json();
    dispatch(deleteReview(data));
    return data;
}

const initialState = {};

const reviewsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER_REVIEWS: {
            const newState = {};
            action.reviews.Reviews.forEach((review) => (newState[review.id] = review))
            return newState;
        }
        case GET_REVIEWS: {
            const newState = {};
            action.reviews.Reviews.forEach((review) => (newState[review.id] = { ...review, ["Spot"]: {} }))
            return newState;
        }
        case ADD_REVIEW: {
            const newReview = {};
            newReview[action.review.id] = { ...action.review }
            const newState = { ...state, ...newReview }
            return newState;
        }
        case DELETE_REVIEW: {
            const newState = { ...state }
            delete newState[action.review];
            return newState;
        }
        default:
            return state;
    }
};

export default reviewsReducer;
