const mongoose = require('mongoose');

const connectToDb = async() =>{
    try{
        await mongoose.connect(process.env.DB);
        console.log("connect to database successfully");
        
    }catch(error){
        console.log('connect to database failed',error);
        process.exit(1);

        // process.exit(0): Exits the process successfully (no errors).
        // process.exit(1): Exits the process with an error (indicating failure).
        
    }

}

module.exports = connectToDb;