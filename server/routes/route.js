import express, { Router } from "express";
import  {addUser,getUsers,getUser ,editUser, deleteUser} from "../controller/user-controller.js"
 
const router = express.Router();

router.post('/add', addUser);
// router.get('/add', getUsers);
router.get('/all', getUsers);
router.get('/:id', getUser);
router.post('/:id', editUser)
router.delete('/:id', deleteUser);

export default router;