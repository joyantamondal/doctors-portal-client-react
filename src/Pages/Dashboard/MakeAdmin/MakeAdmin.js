import { Alert, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import useAuth from "../../../hooks/useAuth";

const MakeAdmin = () => {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const { token } = useAuth();
  const handleOnBlur = (e) => {
    setEmail(e.target.value);
  };
  const handleAdminSubmit = (e) => {
    const user = { email };
    fetch("http://localhost:5000/users/admin", {
      method: "PUT",
      headers: {
        authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          setSuccess(true);
        }
      });
    e.preventDefault();
  };
  return (
    <div>
      <h2>Make an Admin</h2>
      {success && (
        <Alert
          severity="success"
          sx={{ display: "flex", justifyContent: "center" }}
        >
          New Admin Added Successfully...
        </Alert>
      )}
      <form onSubmit={handleAdminSubmit}>
        <TextField
          sx={{ width: "30%" }}
          label="Email"
          type="email"
          onBlur={handleOnBlur}
          variant="standard"
        />
        <br />
        <Button style={{ margin: 10 }} type="submit" variant="contained">
          Make Admin
        </Button>
      </form>
    </div>
  );
};

export default MakeAdmin;
