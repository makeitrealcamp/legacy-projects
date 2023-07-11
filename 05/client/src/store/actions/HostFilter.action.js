import axios from "axios";

import { 
    RESERV_All,
    RESERV_PASSED,
    RESERV_AGENDED,
    RESERV_LOADING,
    RESERV_ERROR,
    RESERV_SHOW,
 } from "../reducer/hostReservation.Reducer";

export const getPosts = (token) => {
    const convertion = 1000*60*60*24
    const all = []
    const agended =[]
    const passed = []
    return async (dispatch) =>{
        try{
            dispatch({ type: RESERV_LOADING, payload: true })
            const { data } = await axios.get(
                `${process.env.REACT_APP_AIRBACK}/reservations/showHost`,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );
            data.data.homes.forEach(home=>{
                if (home.reservations.length === 0) return 
                home.reservations.forEach(reservation=>{
                    all.push(reservation)
                    const final = Math.floor(reservation.finalDate /convertion) 
                    const now = Math.floor(Date.now() /convertion)
                    if (final >= now){
                        agended.push(reservation)
                    } else {
                        passed.push(reservation)
                    }
                })
            })
            dispatch({type:RESERV_All, payload:all})    
            dispatch({ type: RESERV_AGENDED, payload: agended })
            dispatch({ type: RESERV_PASSED, payload: passed })
            dispatch({ type: RESERV_SHOW, payload: 'agended' })
            dispatch({ type: RESERV_LOADING, payload: false })
        } catch(err){
            dispatch({ type: RESERV_ERROR, payload: err })
        }
    }
}
