import { Navigate, useLocation } from "react-router-dom";
import UseAuth from "../hooks/UseAuth";
import Login from "../pages/Login/Login";


const PrivateRoute = ({children}) => {
    const {user, loading} = UseAuth()
    const location = useLocation()
    
    if(loading) return <div>
        <p>Loading....</p>
        <Login/>
        </div>
    
    if(user) return children

   

    return <Navigate to='/login' state={location.pathname} replace={true}/>
};

export default PrivateRoute;