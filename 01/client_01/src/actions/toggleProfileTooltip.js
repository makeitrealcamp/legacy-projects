import { TOGGLEPROFILETOOLTIP } from './constants';

function toggleProfileTooltip(){
    return async function(dispatch){
        dispatch({ type: TOGGLEPROFILETOOLTIP, payload: null})
    }
}

export default toggleProfileTooltip;