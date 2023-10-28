import { Button, Table, TableBody, TableCell, TableHead, TableRow ,styled} from "@mui/material";
import {useEffect, useState} from 'react'
import { getUsers,deleteUser } from "../service/api";
import { Link } from "react-router-dom";

const StyledTable =styled(Table)`
    width: 90px;
    margin: 50px auto 0 auto;

`
const Thead = styled(TableRow)`
    background: #000000;
    &> th {
        color: #fff;
        font-size: 20px;

    }
`
const TBody = styled(TableRow)`
    &> td{
        font-size: 20px;
        white-space: nowrap;
    }
`

const AllUser =() =>{

     const [users, setUsers] = useState([]);

    useEffect(() =>{
        getAllUsers();
    }, []);

    const getAllUsers =async () => {
        let response  = await getUsers();
        setUsers(response.data);
        console.log(response.data);
    }

    const deleteUserDetails = async (id) => {
        try {
            await deleteUser(id); // Call the deleteUser function with the user's ID
            getAllUsers(); // Refresh the user list after deletion
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    }

    return(
       <StyledTable>
            <TableHead>
                <Thead>
                        <TableCell>Id </TableCell>
                        <TableCell> Name </TableCell>
                        <TableCell>Username</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Phone</TableCell>
                        <TableCell></TableCell>
                </Thead>
            </TableHead>
         <TableBody>
            {
               users.map(user =>(
                    <TBody>
                        <TableCell>{user._id}</TableCell>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.username}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.phone}</TableCell>
                        <TableCell>
                            <Button variant="contained" style={{marginRight: 10}} component={Link} to={`/edit/${user._id}`}>Edit</Button>
                            <Button variant="contained" color="secondary" onClick={() => deleteUserDetails(user._id)}>Delete</Button>
                            </TableCell>
                    </TBody>
               ))
            }
            
         </TableBody>
            
       </StyledTable>
    )
}
export default AllUser ;
