const mongoose = require('mongoose')



async function connectDataBase() {
    await mongoose.connect('mongodb+srv://fabiano123:fabiano123@cluster0.p2xagpb.mongodb.net/?retryWrites=true&w=majority')
        .then(() => {
            console.log('DataBase conectado');
        })
        .catch((err) => {
            console.log({ err: err });
        })

}

module.exports = { connectDataBase }
