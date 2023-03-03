import React from 'react'
import { Outlet } from 'react-router-dom'

import NavBar from '../NavBar/NavBar'

function Layout() {
    return (
        <main>
            <NavBar />
            <Outlet />
        </main>
    )
}

export default Layout
