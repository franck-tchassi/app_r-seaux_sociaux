import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { UidContext } from './AppContext'
import Logout from './Log/Logout'
import { useSelector } from 'react-redux'

const Navbar = () => {
    const uid = useContext(UidContext)
    const userData = useSelector((state)=> state.userReducer);
  return (
    <nav>
      <div className='nav-container'>
        <div className='logo'>
            <NavLink exact to="/">
                <div className='logo'>
                    <img src='./img/icon.png' />
                    <h3>Raccoont</h3>
                </div>
            </NavLink>
        </div>
        {uid? (
            <ul>
                <li></li>
                <li className='welcome'>
                    <NavLink exact to="/profil">
                        <h5>Bienvenue {userData.speudo}</h5>
                    </NavLink>
                </li>
                <Logout />
            </ul>
        ) : (
            <ul>
            <li></li>
            <li className='welcome'>
                <NavLink exact to="/profil">
                    <img src='./img/icons/logout.svg'  />
                </NavLink>
            </li>
        </ul>
        )}
      </div>
    </nav>
  )
}

export default Navbar
