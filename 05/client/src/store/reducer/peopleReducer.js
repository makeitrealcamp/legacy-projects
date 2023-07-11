export const INCREMENT = "INCREMENT"
export const DECREMENT = "DECREMENT"

//action creator
export const increment = (value, who) => {
    return {
        type: INCREMENT,
        who: who,
        payload: value + 1
    }
}
export const decrement = (value, who) => {
    return {
        type: DECREMENT,
        who: who,
        payload: value - 1
    }
}

// state
const initialState = {
    countPeople:
    {
        adults: 0,
        children: 0,
        babies: 0,
        pets: 0,
    },

}

//reducer
const peopleReducer = (state = initialState, action) => {
    switch (action.type) {
        case INCREMENT:
            return {
                ...state,
                countPeople: {
                    ...state.countPeople,
                    [action.who]: action.payload
                }
            }
        case DECREMENT:
            return {
                ...state,
                countPeople: {
                    ...state.countPeople,
                    [action.who]: action.payload
                }
            }
        default:
            return state
    }
}

export default peopleReducer