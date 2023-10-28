import mongoose from "mongoose";

const Connection = async (username,password) => {
   
    const URL = `mongodb+srv://${username}:${password}@crud-app.vjeyfpb.mongodb.net/?retryWrites=true&w=majority`;
    try {
        await mongoose.connect(URL, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });
        console.log('Database connected successfully');
    } catch (error) {
        console.log('Error while connecting to the database', error);
    }
}

export default Connection;