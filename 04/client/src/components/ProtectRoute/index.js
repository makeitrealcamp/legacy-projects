import { useEffect,useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function ProtectRoute({ loader }) {
  const user = useSelector((state) => state.UserInfo);
  const [view,setView] = useState(true)

  useEffect(() => {
    if(!loader){
        if(!user.fullName){
            setView(false)
        }
    }

  },[loader]);

  return (
    view 
    ? 
    <Outlet /> 
    :
    <Navigate to='/'/>
    )
}

export default ProtectRoute;
