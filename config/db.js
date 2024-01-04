const mongoose = require('mongoose')

mongoose
    .connect("mongodb+srv://" + process.env.DB_URI  +"@franck-01.9kcef7g.mongodb.net/mern_project", 
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            
        }
    )
    .then(() => console.log("connexion  à mongoDB réussi"))
    .catch((err) => console.log("connexion à mongoDB échoué", err))
    