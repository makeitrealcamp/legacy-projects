export const POST_LOADING = 'POST_LOADING'
export const POST_SUCCESS = 'POST_SUCCESS'
export const POST_ERROR = 'POST_ERROR'

const initialState = {
    post: [],
    loading:true,
    error:''
}

const filterReducer = (state=initialState,action)=>{
    switch(action.type){
        case POST_LOADING:
            return {
                ...state,
                loading: action.payload
            }
        case POST_SUCCESS:
            return{
                ...state,
                post: action.payload
            }
        case POST_ERROR:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state
            
    }
}

export default filterReducer;