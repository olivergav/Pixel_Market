import React from 'react'
import { Outlet, Navigate, useLocation } from 'react-router-dom'

import useAuth from '../../hooks/useAuth'

function RequireAuth() {
    const { auth } = useAuth()
    const location = useLocation()

    return (
        <>
            {auth?.accessToken ? (
                <Outlet />
            ) : (
                <Navigate
                    to="/login"
                    replace={true}
                    state={{ from: location }}
                />
            )}
        </>
    )
}

export default RequireAuth
