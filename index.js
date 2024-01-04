const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const userRoutes = require('./routes/user.routes')
const postRoutes = require('./routes/post.routes')
require('dotenv').config({path:'./config/.env'})
require('./config/db')
const {checkUser, requireAuth} = require('./middleware/auth.middleware')
const cors = require('cors')

const app = express()

const corsOptions = {
    origin: 'http://localhost:3000', // Remplacez par l'URL de votre application React
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
};

app.use(cors(corsOptions)); 



app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser())



//middleware pour tout les routes verifi si lutilisateur a bien le token qui correspond
app.get('*', checkUser);
app.get('/jwtid', requireAuth, (req, res)=>{
    res.status(200).send(res.locals.user._id)
})

//Routes
app.use('/api/user', userRoutes)
app.use('/api/post', postRoutes)



//server index
app.listen(process.env.PORT, ()=>{
    console.log( `connexion au port: ${process.env.PORT}`)
})