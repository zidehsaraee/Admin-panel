require('dotenv').config();
import React, { useState, useEffect } from "react";
import MessageBox from "../../Components/Alert/MessageBox";
import DeleteModal from "../../Components/Modals/DeleteModal/DeleteModal";
import AcceptModal from "../../Components/Modals/AcceptModal/AcceptModal";
import RejectModal from "../../Components/Modals/RejectModal/RejectModal";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Stack, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { pink } from "@mui/material/colors";

export default function Orders() {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAcceptModal, setShowAcceptModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);

  const [allOrders, setAllOrders] = useState([]);
  const [orderID, setOrderID] = useState(null);

  useEffect(() => {
    getAllOrders();
  }, []);
  const getAllOrders = () => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/orders`)
      .then((res) => res.json())
      .then((result) => setAllOrders(result));
  };

  const deleteOrderAction = () => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/orders/${orderID}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((result) => {
        getAllOrders();
        closeDeleteModal();
      });
  };

  const acceptOrderAction = () => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/orders/active-order/${orderID}`, {
      method: "PUT",
    })
      .then((res) => res.json())
      .then((result) => {
        getAllOrders();
        closeAcceptModal();
      });
  };

  const rejectOrderAction = () => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/orders/reject-order/${orderID}`, {
      method: "PUT",
    })
      .then((res) => res.json())
      .then((result) => {
        getAllOrders();
        closeRejectModal();
      });
  };

  const handleDeleteModal = () => {
    setShowDeleteModal(true);
  };
  const closeDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const handleAcceptModal = () => {
    setShowAcceptModal(true);
  };
  const closeAcceptModal = () => {
    setShowAcceptModal(false);
  };

  const handleRejectModal = () => {
    setShowRejectModal(true);
  };
  const closeRejectModal = () => {
    setShowRejectModal(false);
  };

  return (
    <div className="new-product-header">
      {allOrders.length ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Product name</TableCell>
                <TableCell>Customer name</TableCell>
                <TableCell>Date of order</TableCell>
                <TableCell>Time of order</TableCell>
                <TableCell>Total price</TableCell>
                <TableCell>Discount</TableCell>
                <TableCell>Sale</TableCell>
                <TableCell>Count</TableCell>
                <TableCell>Sale count</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allOrders.map((order) => (
                <TableRow
                  key={order.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{order.productID}</TableCell>
                  <TableCell>{order.UserID}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>{order.hour}</TableCell>
                  <TableCell>{order.price}</TableCell>
                  <TableCell>{order.off}</TableCell>
                  <TableCell>{order.sale}</TableCell>
                  <TableCell>{order.count}</TableCell>
                  <TableCell>{order.sale_count}</TableCell>
                  <TableCell>
                    <Stack direction="row" sx={{ gap: "10px" }}>
                      {order.isActive === 0 ? (
                        <Tooltip title="Confirm" arrow>
                          <IconButton
                            color="success"
                            onClick={() => {
                              handleAcceptModal();
                              setOrderID(order.id);
                            }}
                          >
                            <CheckIcon />
                          </IconButton>
                        </Tooltip>
                      ) : (
                        <Tooltip title="Reject" arrow>
                          <IconButton
                            sx={{ color: pink[500] }}
                            onClick={() => {
                              handleRejectModal();
                              setOrderID(order.id);
                            }}
                          >
                            <CloseIcon />
                          </IconButton>
                        </Tooltip>
                      )}

                      <Tooltip title="Delete" arrow>
                        <IconButton
                          sx={{
                            backgroundColor: "#FDEDED",
                            color: "#D32F2F",
                            "&:hover": {
                              backgroundColor: "#D32F2F", // Lighter red on hover
                              color: "#FDEDED", // White color on hover
                            },
                          }}
                          onClick={() => {
                            handleDeleteModal();
                            setOrderID(order.id);
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
        <MessageBox type="error" message="There isn't any Orders!" />
      )}

      <DeleteModal
        open={showDeleteModal}
        deleteModalClose={closeDeleteModal}
        submitAction={deleteOrderAction}
        children
      >
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          sx={{ textAlign: "center" }}
        >
          Are you sure to delete this order?
        </Typography>
      </DeleteModal>

      <AcceptModal
        open={showAcceptModal}
        acceptModalClose={closeAcceptModal}
        submitAction={acceptOrderAction}
      >
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Are you sure to confirm this order?
        </Typography>
      </AcceptModal>

      <RejectModal
        open={showRejectModal}
        rejectModalClose={closeRejectModal}
        submitAction={rejectOrderAction}
      >
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Are you sure to reject this order?
        </Typography>
      </RejectModal>
    </div>
  );
}
