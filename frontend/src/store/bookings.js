import { csrfFetch } from './csrf';

// Types
const GET_BOOKINGS = "booking/GET_BOOKINGS"
const ADD_BOOKINGS = "booking/ADD_BOOKINGS"
const EDIT_BOOKINGS = "booking/EDIT_BOOKINGS"
const DELETE_BOOKINGS = "booking/DELETE_BOOKINGS"

// Actions

const getBookings = payload => {
    return {
        type: GET_BOOKINGS,
        payload
    }
}

const addBooking = payload => {
    return {
        type: ADD_BOOKINGS,
        payload
    }
}

const editBooking = payload => {
    return {
        type: EDIT_BOOKINGS,
        payload
    }
}

const deleteBooking = id => {
    return {
        type: DELETE_BOOKINGS,
        id
    }
}

// thunk
export const loadBookings = (payload) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${payload}/bookings`);
    if (response.ok) {
        const data = await response.json();
        dispatch(getBookings(data.Bookings))
        return data;
    }
};

export const createBooking = payload => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${payload.spotId}/bookings`, {
        method: "POST",
        body: JSON.stringify({ payload }),
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(addBooking({ data }));
        return ({ data });
    } else {
        const data = await response.body.json()
        return data;
    }
};

export const updateBooking = payload => async (dispatch) => {
    const response = await csrfFetch(`/api/bookings/${payload.bookingId}`, {
        method: "PUT",
        body: JSON.stringify({ payload }),
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(editBooking({ data }));
        return ({ data });
    }
    else {
        const data = await response.json()
    }
};

export const removeBooking = payload => async (dispatch) => {
    const response = await csrfFetch(`/api/bookings/${payload.bookingId}`, {
        method: "DELETE",
        body: JSON.stringify({ payload }),
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(deleteBooking({ payload }));
        return ({ data });
    }
    else {
        const data = await response.json()
    }
};

const initialState = {};

const bookingReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_BOOKINGS: {
            const newState = {};
            action.payload.forEach((booking) => (newState[booking.id] = booking))
            return newState;
        }
        case ADD_BOOKINGS: {
            const newState = {};
            action.payload.forEach((booking) => (newState[booking.id] = { ...booking }))
            return newState;
        }
        case EDIT_BOOKINGS: {
            const newReview = {};
            newReview[action.payload.id] = { ...action.payload }
            const newState = { ...state, ...newReview }
            return newState;
        }
        case DELETE_BOOKINGS: {
            const newState = { ...state }
            delete newState[action.id];
            return newState;
        }
        default:
            return state;
    }
};

export default bookingReducer;
