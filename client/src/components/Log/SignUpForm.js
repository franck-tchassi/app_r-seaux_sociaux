/*import React, { useState } from 'react'
import axios from 'axios'

const SignUpForm = () => {
  const [speudo, setSpeudo] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [controlPassword, setControlPassword] = useState('')

  const handleRegister = async (e) => {
    e.preventDefault();
    const terms = document.getElementById('terms');
    const speudoError = document.querySelector('.speudo.error');
    const emailError = document.querySelector('.email.error');
    const passwordError = document.querySelector('.password.error');
    const password_confError = document.querySelector('.password-confirm.error');
    const termsError = document.querySelector('.terms.error');


    password_confError.innerHTML = "";
    termsError.innerHTML = "";
    if (password !== controlPassword || !terms.checked) {
      if (password !== controlPassword) {
        password_confError.innerHTML = "les mots de passe ne correspondent pas"
      }
      if (!terms.checked) {
        termsError.innerHTML = "veuillez valider les conditions génerales"
      } else {
        await axios(
          {
            method: "post",
            url: `${process.env.REACT_APP_API_URL}api/user/register`,
            withCredentials: true,
            data: {
              speudo,
              email,
              password,
              controlPassword
            },
          }
        )
          .then((res) => {
            console.log(res.data.errors);
            if (res.data.errors) {
              speudoError.innerHTML = res.data.errors.speudo;
              emailError.innerHTML = res.data.errors.email;
              passwordError.innerHTML = res.data.errors.password;
            }
          })
          .catch((err) =>
            console.log(err)
          )
      }
    }
  }
  return (
    <form onSubmit={handleRegister} id='sign-up-forms'>
      <label htmlFor='pseudo'>speudo:</label>
      <br />
      <input type='text' name='speudo' id='speudo'
        onChange={(e) => setSpeudo(e.target.value)}
        value={speudo}
      />
      <div className='pseudo error' />
      <br />
      <label htmlFor='email'>email:</label>
      <br />
      <input type='text' name='email' id='email'
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <div className='email error' />
      <br />
      <label htmlFor='password'>Mot de passe:</label>
      <br />
      <input type='password' name='password' id='password'
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        
      />
      <div className='password error' />
      <br />
      <label htmlFor='password-conf'>Confirmer Mot de passe:</label>
      <br />
      <input type='password' name='password-conf' id='password-conf'
        onChange={(e) => setControlPassword(e.target.value)}
        value={controlPassword}
        autoComplete='new-password'
      />
      <div className='password-confirm error' />
      <br />
      <input type='checkbox' id='terms' />
      <label htmlFor='terms'>j'accepte les <a href='/' target='_blank' rel='noopener noreferrer'>conditions génerales</a></label>
      <div className='terms error' /> 
      
      <br />
      <input type='submit' value="valider inscription" />

    </form>
  )
} 

export default SignUpForm  */

import React, { useState } from 'react';
import axios from 'axios';
import SignInForm from './SignInForm';


const SignUpForm = () => {
  const [formSubmit, setFormSubmit] = useState(false)
  const [speudo, setSpeudo] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [controlPassword, setControlPassword] = useState('');
  const [formErrors, setFormErrors] = useState({
    speudo: '',
    email: '',
    password: '',
    controlPassword: '',
    terms: '',
  });

  const handleRegister = async (e) => {
    e.preventDefault();

    const terms = document.getElementById('terms');
    const speudoError = document.querySelector('.speudo.error');
    const emailError = document.querySelector('.email.error');
    const passwordError = document.querySelector('.password.error');
    const password_confError = document.querySelector('.password-confirm.error');
    const termsError = document.querySelector('.terms.error');

    setFormErrors({
      speudo: '',
      email: '',
      password: '',
      controlPassword: '',
      terms: '',
    });

    // Validation du formulaire
    if (!speudo || !email || !password || !controlPassword || !terms.checked) {
      setFormErrors({
        speudo: !speudo ? 'Le pseudo est requis' : '',
        email: !email ? 'L\'email est requis' : '',
        password: !password ? 'Le mot de passe est requis' : '',
        controlPassword: !controlPassword ? 'La confirmation du mot de passe est requise' : '',
        terms: !terms.checked ? 'Veuillez accepter les conditions générales' : '',
      });
      return;
    }

    // Envoi de la requête au serveur
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}api/user/register`,
        {
          speudo,
          email,
          password,
          controlPassword,
        },
        {
          withCredentials: true,
        }
      );

      if (response.data.errors) {
        setFormErrors(response.data.errors);
      } else {
        // Redirection ou autre action après l'inscription réussie
        setFormSubmit(true)
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {formSubmit ? (
        <>
        <SignInForm />
        <span></span>
        <h4 className='success'>
          Enregistrement réussi, veuillez-vous connecter
        </h4>
        </>
    ): (
    <form onSubmit={handleRegister} id='sign-up-forms'>
      <label htmlFor='pseudo'>Pseudo :</label>
      <br />
      <input
        type='text'
        name='pseudo'
        id='pseudo'
        onChange={(e) => setSpeudo(e.target.value)}
        value={speudo}
      />
      <div className='speudo error'>{formErrors.speudo}</div>
      <br />
      <label htmlFor='email'>Email :</label>
      <br />
      <input
        type='text'
        name='email'
        id='email'
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <div className='email error'>{formErrors.email}</div>
      <br />
      <label htmlFor='password'>Mot de passe :</label>
      <br />
      <input
        type='password'
        name='password'
        id='password'
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <div className='password error'>{formErrors.password}</div>
      <br />
      <label htmlFor='password-conf'>Confirmer le mot de passe :</label>
      <br />
      <input
        type='password'
        name='password-conf'
        id='password-conf'
        onChange={(e) => setControlPassword(e.target.value)}
        value={controlPassword}
      />
      <div className='password-confirm error'>{formErrors.controlPassword}</div>
      <br />
      <input type='checkbox' id='terms' />
      <label htmlFor='terms'>
        J'accepte les <a href='/' target='_blank' rel='noopener noreferrer'>conditions générales</a>
      </label>
      <div className='terms error'>{formErrors.terms}</div>
      <br />
      <input type='submit' value="valider inscription" />
    
    </form>
    )}
    </>
  )
}
export default SignUpForm
