import React, { useState} from 'react'

import axios from 'axios'


const SignInForm = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    

    const handleLogin = (e)=>{
        e.preventDefault()
        
        const emailError = document.querySelector('.email.error')
        const passwordError = document.querySelector('.password.error')
        
        axios({
            method: "post",
            url: `${process.env.REACT_APP_API_URL}api/user/login`,
            withCredentials: true,
            data:{
                email,
                password
            }
        })
        
         .then((res)=>{
            if(res.data.errors){
                emailError.innerHTML =res.data.errors.email
                passwordError.innerHTML=res.data.errors.password
            }
            else{
            
                window.location = "/"
            }
         })
         .catch((err)=>{
            console.log(err)
         })
    }

    
  return (
    <form action='' onSubmit={handleLogin} id='sign-up-form'>
        <label htmlFor='email' >Email</label>
        <br/>
        <input 
            type='text' 
            name='email' 
            id='email' 
            onChange={(e)=> setEmail(e.target.value)}
            value={email}
        />
        <div className='email error'></div>
        <br/>
        <label htmlFor='password'>Mot de passe</label>
        <br/>
        <input 
            type='password' 
            name='password' 
            id='password' 
            onChange={(e)=> setPassword(e.target.value)}
            value={password}
        />
        <div className='password error'></div>
        <br/>
        <input type='submit' value="se connecter"/>
        
    </form>
  )
}

export default SignInForm  

/*
import React, { useState } from 'react'

import axios from 'axios'


const SignInForm = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    
    

    const handleLogin = async (e)=>{
        e.preventDefault()
        
        const emailError = document.querySelector('.email-error')
        const passwordError = document.querySelector('.password.error')
        
        setEmailError('');
        setPasswordError('');
        /*axios({
            method: "post",
            url: "http://localhost:5000/api/user/login",
            withCredentials: true,
            data:{
                email,
                password
            }
        }) */   /*
        axios.post('http://localhost:5000/api/user/login', {
            email: email,
            password: password,
            }, {
                withCredentials: true,
        })
        
         .then((res)=>{
            if(res.data.errors){
                emailError.innerHTML =res.data.errors.email
                passwordError.innerHTML=res.data.errors.password

                setEmailError(res.data.errors.email || 'erreur');
                setPasswordError(res.data.errors.password || 'eerrr');
            }
            else{
            
                window.location = "/"
    
            }
         })
         .catch((err)=>{
            console.log(err)
         })
    }

    
  return (
    <form action='' onSubmit={handleLogin} id='sign-up-form'>
        <label htmlFor='email' >Email</label>
        <br/>
        <input 
            type='text' 
            name='email' 
            id='email' 
            onChange={(e)=> setEmail(e.target.value)}
            value={email}
        />
        <div className='email-error' >{emailError}</div>
        <br/>
        <label htmlFor='password'>Mot de passe</label>
        <br/>
        <input 
            type='password' 
            name='password' 
            id='password' 
            onChange={(e)=> setPassword(e.target.value)}
            value={password}
        />
        <div className='password error'>{passwordError}</div>
        <br/>
        <input type='submit' value="se connecter"/>
        
    </form>
  )
}

export default SignInForm  */

