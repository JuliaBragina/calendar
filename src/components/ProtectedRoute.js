import { Outlet, Navigate } from 'react-router-dom'

const ProtectedRoute = (loggedIn) => {
    return(
      loggedIn.loggedIn ? <Outlet /> : <Navigate to="/sign-in"/>
    )
}

export default ProtectedRoute