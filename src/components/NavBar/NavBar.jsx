import React, { useContext } from 'react'
import { Link } from 'react-router-dom'

import AuthContext from '../../context/AuthProvider'
import LogOut from '../LogOut/LogOut'

import './NavBar.scss'

function NavBar() {
    const { auth } = useContext(AuthContext)

    return (
        <nav className="navigation">
            <Link to="/" className="navigation__item">
                Home
            </Link>
            <div>
                {!Object.keys(auth).length ? (
                    <>
                        <Link to="/login" className="navigation__item">
                            Login
                        </Link>
                        <Link to="/register" className="navigation__item">
                            Register
                        </Link>
                    </>
                ) : (
                    <LogOut />
                )}
            </div>
        </nav>
    )
}

export default NavBar
