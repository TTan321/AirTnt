import { csrfFetch } from './csrf'


const GET_ALL_SPOTS = "spots/getAllSpots";
const GET_A_SPOT = "spots/getASpot";
const GET_A_USERS_SPOTS = "spots/getAUsersSpots"
const ADD_SPOT = "spots/addSpot";
const EDIT_SPOT = "spot/editSpot";
const DELETE_SPOT = "spots/deleteSpot";
const ADD_IMAGE = "images/add_image";



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

export const addImage = (image) => {
    return {
        type: ADD_IMAGE,
        image
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
    console.log("spot ", spot)
    console.log("About to post new spot to server")
    const response = await csrfFetch("/api/spots", {
        method: "POST",
        body: JSON.stringify({
            name, address, city, state, country, lat, lng, description, price, ownerId
        }),
    });
    const spotData = await response.json();
    const imageData = await dispatch(createImage({ ...spotData, previewImageUrl }));
    console.log("DATA  ",)
    dispatch(addSpot({ ...spotData, ...imageData }));
    console.log("SPOT HAS BEEN CREATED")
    return ({ ...spotData, ...imageData });
};

// THUNK TO ADD IMAGE TO DB - CALLBACK FOR CREATE SPOT THUNK AND UPDATE SPOT THUNK
export const createImage = image => async (dispatch) => {
    console.log("Data param passed to createImage: ", image)
    const { id, previewImageUrl } = image;
    console.log("type of ID ", typeof id)
    console.log("image is: ", image)
    console.log("ABOUT TO POST IMAGE TO SERVER")
    const response = await csrfFetch(`/api/spots/${id}/images`, {
        method: "POST",
        body: JSON.stringify({
            "url": previewImageUrl
        }),
    });
    const data = await response.json();
    console.log("IMAGE HAS BEEN ADDED")
    return data;
};

// UPDATE SPOT THUNK
export const updateSpot = spot => async (dispatch) => {
    const { name, address, city, state, country, lat, lng, description, price, ownerId, previewImageUrl, imageId } = spot;
    console.log(`About to UPDATE spot with id ${spot.id} to server`)
    const deleteImageRes = await csrfFetch(`/api/images/${imageId}`, {
        method: "Delete",
    });
    if (deleteImageRes.ok) {
        console.log("Preview Image HAS BEEN DELETED")
        const deletedImageData = await deleteImageRes.json();
        const editSpotResponse = await csrfFetch(`/api/spots/${spot.id}`, {
            method: "PUT",
            body: JSON.stringify({
                name, address, city, state, country, lat, lng, description, price, ownerId
            }),
        });
        const editSpotData = await editSpotResponse.json();
        console.log("DATA  ",)
        console.log("SPOT HAS BEEN CREATED")
        const imageData = await dispatch(createImage({ ...editSpotData, previewImageUrl }))
        dispatch(editSpot({ ...editSpotData, ...imageData }));
        return ({ ...editSpotData, ...imageData });
    }
};

// DELETE SPOT THUNK
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
            action.spot.Spots.forEach((spot) => (newState[spot.id] = action.spot.Spots[0]))
            return newState;
        }
        case GET_A_USERS_SPOTS: {
            const newState = {};
            action.spots.Spots.forEach((spot) => (newState[spot.id] = spot))
            return newState;
        }
        case ADD_SPOT: {
            console.log('Previous spot state - state : ', state)
            console.log('New Spot - ACTION.SPOT: ', action.spot)

            // For CREATING a new spot
            const newSpot = {};
            newSpot[action.spot.id] = action.spot
            const newState = { ...state, ...newSpot };
            console.log('NEW SPOT HAS BEEN MADE - newState: ', newState)
            return newState;
        }
        case EDIT_SPOT: {
            // For UPDATING an existing spot
            console.log('Previous spot state - state : ', state);
            console.log('New Spot - ACTION.SPOT: ', action.spot);

            const newState = { ...state };
            newState[action.spot.id] = action.spot
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
