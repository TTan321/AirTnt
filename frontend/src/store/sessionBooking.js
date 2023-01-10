import { csrfFetch } from './csrf';

const GET_BOOKINGS = "userBooking/GET_BOOKING"

const getBookings = payload => {
    return {
        type: GET_BOOKINGS,
        payload
    }
}

export const loadUsersBookings = () => async dispatch => {
    const response = await csrfFetch(`/api/bookings/current`)
    const data = await response.json();
    dispatch(getBookings(data.Bookings));
    return data;
}

const initialState = {}

export const sessionBookingsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_BOOKINGS: {
            const newState = {};
            action.payload.forEach((booking) => (newState[booking.id] = booking))
            return newState;
        }
        default: {
            return state;
        }
    }
}

export default sessionBookingsReducer
