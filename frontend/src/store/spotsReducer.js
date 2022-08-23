import { csrfFetch } from './csrf'


const GET_ALL_SPOTS = "spots/getAllSpots";

export const loadSpots = (spots) => {
    return {
        type: GET_ALL_SPOTS,
        spots
    };
};

export const getAllSpots = () => async (dispatch) => {
    const response = await csrfFetch("/api/spots");
    if (response.ok) {
        const data = await response.json();
        console.log("Data fetched!!!", data)
        dispatch(loadSpots(data))
        return data;
    } else {
        console.log("failed to fetch spots")
    }
};

const initialState = {};

const spotsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_SPOTS: {
            const newState = {};
            action.spots.Spots.forEach((spot) => (newState[spot.id] = spot))
            return newState;
        }
        default:
            return state;
    }
};

export default spotsReducer;
