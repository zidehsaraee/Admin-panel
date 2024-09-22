import React, { useState, useEffect } from "react";
import MessageBox from "../../Components/Alert/MessageBox";
import DeleteModal from "../../Components/Modals/DeleteModal/DeleteModal";
import EditModal from "../../Components/Modals/EditModal/EditModal";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Stack, Tooltip, Button, Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";


export default function Users() {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [allUsers, setAllUsers] = useState([]);
  const [userID, setUserID] = useState(null);

  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userUserName, setUserUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userCity, setUserCity] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [userScore, setUserScore] = useState("");
  const [userBuy, setUserBuy] = useState("");

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = () => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/users`)
      .then((res) => res.json())
      .then((result) => setAllUsers(result));
  };

  const submitDeleteUser = () => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/users/${userID}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((result) => {
        getAllUsers();
        closeDeleteModal();
      });
  };

  const submitEditUser = (event) => {
    const editedUserInfo = {
      firstname: userFirstName,
      lastname: userLastName,
      username: userUserName,
      password: userPassword,
      phone: userPhone,
      email: userEmail,
      city: userCity,
      address: userAddress,
      score: userScore,
      buy: userBuy,
    };
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/users/${userID}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editedUserInfo),
    })
      .then((res) => res.json())
      .then((result) => {
        getAllUsers();
        closeEditModal();
      });
  };

  const handleDeleteModal = () => {
    setShowDeleteModal(true);
  };
  const closeDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const handleEditModal = () => {
    setShowEditModal(true);
  };
  const closeEditModal = () => {
    setShowEditModal(false);
  };

  return (
    <div className="new-product-header">
      {allUsers.length ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>First name</TableCell>
                <TableCell>Last name</TableCell>
                <TableCell>Username</TableCell>
                <TableCell>Password</TableCell>
                <TableCell>Contact no</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>City</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Score</TableCell>
                <TableCell>Buy</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allUsers.map((user) => (
                <TableRow
                  key={user.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{user.firstname}</TableCell>
                  <TableCell>{user.lastname}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.password}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.city}</TableCell>
                  <TableCell>{user.address}</TableCell>
                  <TableCell>{user.score}</TableCell>
                  <TableCell>{user.buy}</TableCell>
                  <TableCell>
                    <Stack direction="row" sx={{ gap: "10px" }}>
                      <Tooltip title="Edit" arrow>
                        <IconButton
                          sx={{
                            backgroundColor: "#E5F6FD",
                            color: "#0288EF",
                            "&:hover": {
                              backgroundColor: "#0288EF",
                              color: "#E5F6FD",
                            },
                          }}
                          onClick={() => {
                            handleEditModal();
                            setUserID(user.id);
                            setUserFirstName(user.firstname);
                            setUserLastName(user.lastname);
                            setUserUserName(user.username);
                            setUserPassword(user.password);
                            setUserPhone(user.phone);
                            setUserEmail(user.email);
                            setUserCity(user.city);
                            setUserAddress(user.address);
                            setUserScore(user.score);
                            setUserBuy(user.buy);
                          }}
                        >
                          <ModeEditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete" arrow>
                        <IconButton
                          sx={{
                            backgroundColor: "#FDEDED",
                            color: "#D32F2F",
                            "&:hover": {
                              backgroundColor: "#D32F2F",
                              color: "#FDEDED",
                            },
                          }}
                          onClick={() => {
                            handleDeleteModal();
                            setUserID(user.id);
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <MessageBox type="error" message="There isn't any users!" />
      )}

      <DeleteModal
        open={showDeleteModal}
        submitAction={submitDeleteUser}
        deleteModalClose={closeDeleteModal}
        children
      >
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          sx={{ textAlign: "center" }}
        >
          Are you sure to delete this user?
        </Typography>
      </DeleteModal>

      <EditModal open={showEditModal} editModalClose={closeEditModal}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Edit User
        </Typography>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "35ch" },
            display: "flex",
            flexDirection: "column",
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-basic"
            value={userFirstName}
            variant="outlined"
            label="first name"
            onChange={(event) => {
              setUserFirstName(event.target.value);
            }}
          />
          <TextField
            id="outlined-basic"
            value={userLastName}
            variant="outlined"
            label="last name"
            onChange={(event) => {
              setUserLastName(event.target.value);
            }}
          />
          <TextField
            id="outlined-basic"
            value={userUserName}
            variant="outlined"
            label="userName"
            onChange={(event) => {
              setUserUserName(event.target.value);
            }}
          />
          <TextField
            id="outlined-basic"
            value={userPassword}
            variant="outlined"
            label="password"
            onChange={(event) => {
              setUserPassword(event.target.value);
            }}
          />
          <TextField
            id="outlined-basic"
            value={userPhone}
            variant="outlined"
            label="phone number"
            onChange={(event) => {
              setUserEmail(event.target.value);
            }}
          />
          <TextField
            id="outlined-basic"
            value={userEmail}
            variant="outlined"
            label="email"
            onChange={(event) => {
              setUserEmail(event.target.value);
            }}
          />
          <TextField
            id="outlined-basic"
            value={userCity}
            variant="outlined"
            label="city"
            onChange={(event) => {
              setUserCity(event.target.value);
            }}
          />
          <TextField
            id="outlined-basic"
            value={userAddress}
            variant="outlined"
            label="address"
            onChange={(event) => {
              setUserAddress(event.target.value);
            }}
          />
          <TextField
            id="outlined-basic"
            value={userScore}
            variant="outlined"
            label="score"
            onChange={(event) => {
              setUserScore(event.target.value);
            }}
          />
          <TextField
            id="outlined-basic"
            value={userBuy}
            variant="outlined"
            label="buy"
            onChange={(event) => {
              setUserBuy(event.target.value);
            }}
          />
          <Button
            color="secondary"
            variant="contained"
            onClick={() => {
              submitEditUser();
            }}
          >
            save change
          </Button>
        </Box>
      </EditModal>
    </div>
  );
}
