import React, { useState, useEffect } from "react";
import {
  FormControl,
  FormGroup,
  InputLabel,
  Input,
  Typography,
  styled,
  Button,
} from "@mui/material";
import { editUser, getUser } from "../service/api.js";
import { useNavigate, useParams } from "react-router-dom";

const Container = styled(FormGroup)`
  width: 50%;
  margin: 10% auto 0 auto;
  & > div {
    margin-top: 20px;
  }
`;

const defaultValue = {
  name: "",
  username: "",
  email: "",
  phone: "",
};

const EditUser = () => {
  const [user, setUser] = useState(defaultValue);
  const [notification, setNotification] = useState(""); // Notification state
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    loadUserDetails();
  }, []);

  const loadUserDetails = async () => {
    const response = await getUser(id);
    setUser(response.data);
  };

  const onValueChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });

    if (e.target.name === "email") {
      // Validate email
      const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value);
      if (!isEmailValid) {
        setNotification("Please add a valid email address.");
      } else {
        setNotification(""); // Clear the notification
      }
    } else if (e.target.name === "phone") {
      // Remove non-numeric characters
      const numericValue = e.target.value.replace(/\D/g, "");
      // Limit to 10 digits
      const limitedNumericValue = numericValue.slice(0, 10);
      setUser({ ...user, phone: limitedNumericValue });
      e.target.value = limitedNumericValue; // Update the input value
    }
  };

  const editUserDetails = async () => {
    if (notification) {
      return; // Don't proceed if there's an email or phone validation error
    }

    await editUser(user, id);
    navigate(`/all`);
  };

  return (
    <Container>
      <Typography variant="h4">EditUser</Typography>
      {notification && <p style={{ color: "red" }}>{notification}</p>}
      <FormControl>
        <InputLabel>Name</InputLabel>
        <Input
          onChange={(e) => onValueChange(e)}
          name="name"
          value={user.name}
        />
        
      </FormControl>
      <FormControl>
        <InputLabel>Username</InputLabel>
        <Input
          onChange={(e) => onValueChange(e)}
          name="username"
          value={user.username}
        />
      </FormControl>
      <FormControl>
        <InputLabel>Email</InputLabel>
        <Input
          onChange={(e) => onValueChange(e)}
          name="email"
          value={user.email}
        />
      </FormControl>
      <FormControl>
        <InputLabel>Phone</InputLabel>
        <Input
          onChange={(e) => onValueChange(e)}
          name="phone"
          value={user.phone}
        />
      </FormControl>
      <FormControl>
        <Button variant="contained" onClick={() => editUserDetails()}>
          Edit
        </Button>
      </FormControl>
    </Container>
  );
};

export default EditUser;
