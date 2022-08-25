
const GET_IMAGES = "images/get_images";
const ADD_IMAGE = "images/add_image";

export const addImage = (userInfo) => {
    return {
        type: ADD_IMAGE,
        userInfo
    };
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
