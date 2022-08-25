
const GET_IMAGES = "images/get_images";
const ADD_IMAGE = "images/add_image";

export const getImages = () => {
    return {
        type: GET_IMAGES,
        images
    };
};

export const addImage = (image) => {
    return {
        type: ADD_IMAGE,
        image
    };
};

export const loadImages = () => async (dispatch) => {
    const response = await csrfFetch("/api/spots");
    if (response.ok) {
        const data = await response.json();
        dispatch(loadSpots(data))
        return data;
    }
};

export const createImage = image => async (dispatch) => {
    console.log("ABOUT TO POST IMAGE TO SERVER")
    const response = await csrfFetch("/api/spots/:spotId/images", {
        method: "POST",
        body: JSON.stringify(
            image
        ),
    });
    const data = await response.json();
    dispatch(addSpot(data));
    console.log("IMAGE HAS BEEN ADDED")
    return response;
};


const ImageReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_IMAGE: {
            action.spots.Spots.forEach((spot) => (newState[spot.id] = spot))
            return newState;
        }
        default:
            return state;
    }
};

export default spotsReducer;
