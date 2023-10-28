import React, { useState } from "react";
import {
  FormControl,
  FormGroup,
  InputLabel,
  Input,
  Typography,
  styled,
  Button,
} from "@mui/material";
import { addUser } from "../service/api.js";
import { useNavigate } from "react-router-dom";

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

const AddUser = () => {
  const [user, setUser] = useState(defaultValue);
  const [notification, setNotification] = useState(""); // Notification state
  const navigate = useNavigate();

  const onValueChange = async (e) => {
    if (e.target.name === "phone") {
      const numericValue = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
      if (numericValue.length !== 10) {
        setNotification("Phone number should be exactly 10 digits.");
      } else {
        setNotification(""); // Clear the notification
      }
      const limitedNumericValue = numericValue.slice(0, 10);
      setUser({ ...user, phone: limitedNumericValue });
      e.target.value = limitedNumericValue; // Update the input value
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }

    if (e.target.name === "email") {
      const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value);
      if (!isEmailValid) {
        setNotification("Please add a valid email address.");
      } else {
        setNotification(""); // Clear the notification
      }
    }


    };

  const addUserDetails = async () => {
    if (notification) {
      return; // Don't proceed if there's a validation error
    }

    await addUser(user);
    navigate(`/all`);
  };

  return (
    <Container>
      <Typography variant="h4">AddUser</Typography>
      {notification && <p style={{ color: "red" }}>{notification}</p>}
      <FormControl>
        <InputLabel>Name</InputLabel>
        <Input onChange={(e) => onValueChange(e)} name="name" />
      </FormControl>
      <FormControl>
        <InputLabel>Username</InputLabel>
        <Input onChange={(e) => onValueChange(e)} name="username" />
      </FormControl>
      <FormControl>
        <InputLabel>Email</InputLabel>
        <Input onChange={(e) => onValueChange(e)} name="email" />
      </FormControl>
      <FormControl>
        <InputLabel>Phone</InputLabel>
        <Input
          onChange={(e) => onValueChange(e)}
          onInput={(e) => {
            e.target.value = e.target.value.replace(/\D/g, "").slice(0, 10);
          }}
          name="phone"
        />
      </FormControl>
      <FormControl>
        <Button variant="contained" onClick={() => addUserDetails()}>
          ADD
        </Button>
      </FormControl>
    </Container>
  );
};

export default AddUser;
