
import User from "../schema/user-schema.js";

export const addUser= async (request ,response) => {
    const user = request.body;
 // Find the last user and get its ID
    const lastUser = await User.findOne({}, {}, { sort: { _id: -1 } });

 // Increment the ID or start at 1 if there are no existing users
    user._id = lastUser ? lastUser._id + 1 : 1;

    const newUser = new User(user);


    try {
       await newUser.save();
       response.status(201).json(newUser);
    } catch (error) {
        
            response.status(409).json({message: error.message});
    }
}

export const getUsers = async (request, response) => {
    try {
        const users =await User.find({});
        response.status(200).json(users);
    } catch (error) {
        response.status(404).json({message: error.message })
    }
}

export const getUser = async(request ,response) =>{
    try {
        // const user  =await User.find({ _id: request.params.id});
        const user = await User.findById((request.params.id))
        response.status(200).json(user);
    } catch (error) {
        response.status(404).json({message: error.message })
    }
}

export const editUser = async (request, response) =>{
    let user = request.body;
    const editUser = new User(user);

    try {
        await User.updateOne({_id: request.params.id},editUser)
        response.status(201).json(editUser);
    } catch (error) {
        response.status(409).json({message: error.message});
    }
}

export const deleteUser = async (request, response) => {
    try {
        const deletedUser = await User.findByIdAndDelete(request.params.id);
        if (!deletedUser) {
            return response.status(404).json({ message: "User not found" });
        }
        response.status(200).json(deletedUser);
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
}
