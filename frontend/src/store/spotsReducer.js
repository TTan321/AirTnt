import { csrfFetch } from './csrf'


const GET_ALL_SPOTS = "spots/getAllSpots";
const GET_A_SPOT = "spots/getASpot";
const ADD_SPOT = "spots/addSpot";
const UPDATE_SPOT = "spots/updateSpot";

export const loadSpots = (spots) => {
    return {
        type: GET_ALL_SPOTS,
        spots
    };
};

export const loadASpot = (id) => {
    return {
        type: GET_A_SPOT,
        id
    };
};

export const addSpot = (spot) => {
    return {
        type: ADD_SPOT,
        spot
    };
};

export const updateSpot = (spot) => {
    return {
        type: UPDATE_SPOT,
        spot
    };
};

export const getAllSpots = () => async (dispatch) => {
    const response = await csrfFetch("/api/spots");
    if (response.ok) {
        const data = await response.json();
        dispatch(loadSpots(data))
        return data;
    }
};

export const createSpot = spot => async (dispatch) => {
    console.log("About to post new spot to server")
    const response = await csrfFetch("/api/spots", {
        method: "POST",
        body: JSON.stringify(
            spot
        ),
    });
    const data = await response.json();
    dispatch(addSpot(data));
    console.log("SPOT HAS BEEN CREATED")
    return response;
};

const initialState = {};

const spotsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_SPOTS: {
            const newState = {};
            action.spots.Spots.forEach((spot) => (newState[spot.id] = spot))
            return newState;
        }
        case GET_A_SPOT: {
            const newState = {};
            action.spots.Spots.find((spot) => (newState[spot.id] === action.id))
            return newState;
        }
        case ADD_SPOT: {
            state = state.spots;
            const newState = { ...state, ...action.spot }
            return newState;
        }
        default:
            return state;
    }
};

export default spotsReducer;
