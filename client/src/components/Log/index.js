import React, { useState } from 'react'
import SignUpForm from './SignUpForm';
import SignInForm from './SignInForm';

const Log = (props) => {
  const [signUpModal, setSignUpModal] = useState(props.signup);
  const [signIpModal, setSignIpModal] = useState(props.signin);


  const handleModals = (e)=>{
    if(e.target.id === "register"){
      setSignUpModal(true)
      setSignIpModal(false)
    }else if(e.target.id === "login"){
      setSignIpModal(true)
      setSignUpModal(false)
    }


  }
  return (
    <div className='connection-form'>
      <div className='form-container'>
        <ul>
          <li onClick={handleModals} id='register' className={ signUpModal ? "active-btn" : null}>S'inscrire</li>
          <li onClick={handleModals} id='login'  className={ signIpModal ? "active-btn" : null}>Se connecter</li>

        </ul>
        {signUpModal && <SignUpForm />}
        {signIpModal && <SignInForm />}
      </div>
      
    </div>
  )
}

export default Log
