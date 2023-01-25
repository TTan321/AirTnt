import { csrfFetch } from './csrf'


const GET_ALL_SPOTS = "spots/getAllSpots";
const GET_A_SPOT = "spots/getASpot";
const GET_A_USERS_SPOTS = "spots/getAUsersSpots"
const ADD_SPOT = "spots/addSpot";
const EDIT_SPOT = "spot/editSpot";
const DELETE_SPOT = "spots/deleteSpot";


export const loadSpots = (spots) => {
    return {
        type: GET_ALL_SPOTS,
        spots
    };
};

export const loadASpot = (spot) => {
    return {
        type: GET_A_SPOT,
        spot
    };
};

export const loadAUsersSPot = (spots) => {
    return {
        type: GET_A_USERS_SPOTS,
        spots
    };
};

export const addSpot = (spot) => {
    return {
        type: ADD_SPOT,
        spot
    };
};

export const editSpot = (spot) => {
    return {
        type: EDIT_SPOT,
        spot
    };
};

export const deleteSpot = (id) => {
    return {
        type: DELETE_SPOT,
        id
    };
};

// GET ALL SPOTS THUNK
export const getAllSpots = () => async (dispatch) => {
    const response = await csrfFetch("/api/spots");
    if (response.ok) {
        const data = await response.json();
        dispatch(loadSpots(data))
        return data;
    }
};

// GET A SPOT'S DETAILS THUNK
export const getASpot = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${id}`);
    if (response.ok) {
        const data = await response.json();
        dispatch(loadASpot(data))
        return data;
    }
};

// GET A USER'S SPOTS THUNK
export const getAUsersSpots = () => async (dispatch) => {
    const response = await csrfFetch('/api/spots/current');
    if (response.ok) {
        const data = await response.json();
        dispatch(loadAUsersSPot(data))
        return data;
    }
};

// CREATE A SPOT THUNK
export const createSpot = spot => async (dispatch) => {
    const { name, address, city, state, country, lat, lng, description, price, ownerId, previewImageUrl } = spot;
    const response = await csrfFetch("/api/spots", {
        method: "POST",
        body: JSON.stringify({
            name, address, city, state, country, lat, lng, description, price, ownerId
        }),
    });

    if (response.ok) {
        const spotData = await response.json();
        const { id } = spotData;
        const imgResponse = await csrfFetch(`/api/spots/${id}/images`, {
            method: "POST",
            body: JSON.stringify({
                "url": previewImageUrl
            }),
        });
        const imageData = await imgResponse.json();
        dispatch(addSpot({ ...spotData, ...imageData }));
        return ({ ...spotData, ...imageData });

    }
};

// UPDATE SPOT THUNK
export const updateSpot = spot => async (dispatch) => {
    const { name, address, city, state, country, lat, lng, description, price, ownerId, previewImageUrl, imageId } = spot;
    // const deleteImageRes = await csrfFetch(`/api/images/${imageId}`, {
    //     method: "Delete",
    // });
    const editSpotResponse = await csrfFetch(`/api/spots/${spot.id}`, {
        method: "PUT",
        body: JSON.stringify({
            name, address, city, state, country, lat, lng, description, price, ownerId
        }),
    });
    if (editSpotResponse.ok) {
        // const deletedImageData = await deleteImageRes.json();
        const editSpotData = await editSpotResponse.json();
        // const imageData = await dispatch(createImage({ ...editSpotData, previewImageUrl }))
        dispatch(editSpot({ ...editSpotData }));
        return ({ ...editSpotData });
    }
};

// DELETE SPOT THUNK
export const deleteSpotAtId = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        const { id: deletedSpotId } = await response.json();
        dispatch(deleteSpot(deletedSpotId));
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
            action.spot.Spots.forEach((spot) => (newState[spot.id] = action.spot.Spots[0]))
            return newState;
        }
        case GET_A_USERS_SPOTS: {
            const newState = {};
            action.spots.Spots.forEach((spot) => (newState[spot.id] = spot))
            return newState;
        }
        case ADD_SPOT: {
            const newSpot = {};
            newSpot[action.spot.id] = action.spot
            const newState = { ...state, ...newSpot };
            return newState;
        }
        case EDIT_SPOT: {
            const newState = { ...state };
            newState[action.spot.id] = action.spot
            return newState;
        }
        case DELETE_SPOT: {
            const newState = { ...state }
            delete newState[action.id];
            return newState;
        }
        default:
            return state;
    }
};

export default spotsReducer;
