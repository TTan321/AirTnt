import { csrfFetch } from './csrf'


const GET_ALL_SPOTS = "spots/getAllSpots";
const GET_A_SPOT = "spots/getASpot";
const ADD_SPOT = "spots/addSpot";
const UPDATE_SPOT = "spots/updateSpot";
const DELETE_SPOT = "spots/deleteSpot";

const ADD_IMAGE = "images/add_image";



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

export const addImage = (image) => {
    return {
        type: ADD_IMAGE,
        image
    };
};

export const deleteSpot = (id) => {
    return {
        type: DELETE_SPOT,
        id
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
    const { name, address, city, state, country, lat, lng, description, price, ownerId, previewImageUrl } = spot;
    console.log("spot ", spot)
    console.log("About to post new spot to server")
    const response = await csrfFetch("/api/spots", {
        method: "POST",
        body: JSON.stringify({
            name, address, city, state, country, lat, lng, description, price, ownerId
        }),
    });
    const data = await response.json();
    dispatch(addSpot(data));
    console.log("DATA  ",)
    console.log("SPOT HAS BEEN CREATED")
    dispatch(createImage({ ...data, previewImageUrl }))
    return response;
};

export const createImage = image => async (dispatch) => {
    const { id, previewImageUrl, ownerId } = image;
    console.log("type of ID ", typeof id)
    console.log("image is: ", image)
    console.log("ABOUT TO POST IMAGE TO SERVER")
    const response = await csrfFetch(`/api/spots/${id}/images`, {
        method: "POST",
        body: JSON.stringify({
            "url": previewImageUrl
        }),
    });
    console.log("IMAGE HAS BEEN ADDED")
};

export const deleteSpotAtId = (spotId) => async dispatch => {
    console.log('spot to be deleted id ', spotId)
    console.log("SPOT IS ABOUT TO BE DELETED")
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        const { id: deletedSpotId } = await response.json();
        dispatch(deleteSpot(deletedSpotId));
        console.log("SPOT HAS BEEN DELETED")
        return deletedSpotId;
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
        case DELETE_SPOT: {
            state = state.spots;
            console.log(state)
            const newState = { ...state }
            delete newState[action.id];
            return newState;
        }
        default:
            return state;
    }
};

export default spotsReducer;
