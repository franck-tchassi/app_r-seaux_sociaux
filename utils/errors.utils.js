module.exports.signUpErrors = (err)=>{
    let errors = {speudo: '', email: '', password: ''};
    if(err.message.includes('speudo'))    
      errors.speudo = "Speudo incorrect ou déja pris"

    if(err.message.includes('email'))
      errors.email = "Email incorrect"

    if(err.message.includes('password'))
      errors.password = "le mot de passe doit faire 6 caractère minim"

    if(err.code == 11000 && Object.keys(err.keyValue)[0].includes('speudo'))
      errors.speudo = "cet email est déja enregistré"
    
    if(err.code == 11000 && Object.keys(err.keyValue)[0].includes('email'))
      errors.email = "ce speudo est déja pris"

    return errors
}


module.exports.signInErrors = (err)=>{
    let errors = {email: '', password: ''};
    if (err.message.includes('email'))
      errors.email = "Email inconnue"
    if (err.message.includes('password'))
      errors.password = "le mot de passe ne correspond pas"
    
    return errors
}