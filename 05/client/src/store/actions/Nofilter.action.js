import axios from "axios";

import {
    POST_SUCCESS,
    POST_ERROR,
    POST_LOADING,
} from "../reducer/filterReducer";

export const getPosts = (data) => {

    return async (dispatch) =>{
        try{
            dispatch({ type: POST_LOADING, payload: true })
            const res = await axios.get(`${process.env.REACT_APP_AIRBACK}/homes`)
            dispatch({ type: POST_SUCCESS, payload: res.data.data })
            dispatch({ type: POST_LOADING, payload: false })
        } catch(err){
            dispatch({ type: POST_ERROR, payload: err })
        }
    }
}

