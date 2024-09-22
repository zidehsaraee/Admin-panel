import React, { useState, useEffect } from "react";
import DeleteModal from "../../Components/Modals/DeleteModal/DeleteModal";
import EditModal from "../../Components/Modals/EditModal/EditModal";
import AcceptModal from "../../Components/Modals/AcceptModal/AcceptModal";
import DetailesModal from "../../Components/Modals/DetailesModal/DetailesModal";
import ResponseModal from "../../Components/Modals/ResponseModal/ResponseModal";
import RejectModal from "../../Components/Modals/RejectModal/RejectModal";
import MessageBox from "../../Components/Alert/MessageBox";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Tooltip from "@mui/material/Tooltip";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import NoteIcon from "@mui/icons-material/Note";
import Typography from "@mui/material/Typography";
import CommentIcon from "@mui/icons-material/Comment";
import TextField from "@mui/material/TextField";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import { pink } from "@mui/material/colors";
import "./Comments.css";

export default function Comments() {
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showResponseModal, setShowResponseModal] = useState(false);
  const [showAcceptModal, setShowAcceptModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);

  const [allComments, setAllComments] = useState([]);
  const [commentBody, setCommentBody] = useState("");
  const [commentID, setCommentID] = useState(null);
  const [responseBody, setResponseBody] = useState("");

  useEffect(() => {
    getAllComments();
  }, []);
  const getAllComments = () => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/comments`)
      .then((res) => res.json())
      .then((result) => setAllComments(result));
  };

  const handleDetailModal = () => {
    setShowDetailModal(true);
  };
  const closeDetailModal = () => {
    setShowDetailModal(false);
  };

  const handleDeleteModal = () => {
    setShowDeleteModal(true);
  };
  const closeDeleteModal = () => {
    setCommentID(null);
    setShowDeleteModal(false);
  };
  const submitDeleteComment = () => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/comments/${commentID}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((result) => {
        setShowDeleteModal(false);
        getAllComments();
      });
  };

  const handleEditModal = () => {
    setShowEditModal(true);
  };
  const closeEditModal = () => {
    setShowEditModal(false);
  };
  const submitEditAction = () => {
    const editedCommentBody = {
      body: commentBody,
    };
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/comments/${commentID}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editedCommentBody),
    })
      .then((res) => res.json())
      .then((result) => {
        getAllComments();
        setShowEditModal(false);
      });
  };

  const handleResponseModal = () => {
    setShowResponseModal(true);
  };
  const closeResponseModal = () => {
    setShowResponseModal(false);
  };

  const closeAcceptModal = () => {
    setShowAcceptModal(false);
  };
  const submitAcceptComment = () => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/comments/accept/${commentID}`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((result) => {
        getAllComments();
        closeAcceptModal();
      });
  };

  const handelRejectModal = () => {
    setShowRejectModal(true);
  };

  const submitRejectComment = () => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/comments/reject/${commentID}`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((result) => {
        getAllComments();
        closeRejectModal();
      });
  };

  const closeRejectModal = () => {
    setShowRejectModal(false);
  };

  const submitResponseComment = () => {
    const sendResponseBody = {
      body: responseBody,
    };

    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/comments/response/${commentID}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sendResponseBody),
    })
      .then((res) => res.json())
      .then((result) => {
        getAllComments();
        closeResponseModal();
      });
  };

  return (
    <div className="new-product-header">
      {allComments.length ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>User's name</TableCell>
                <TableCell>Product</TableCell>
                <TableCell>Comment</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Time</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allComments.map((comment) => (
                <TableRow
                  key={comment.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {comment.userID}
                  </TableCell>
                  <TableCell>{comment.productID}</TableCell>
                  <TableCell>
                    <Tooltip title="Show Comment" arrow>
                      <IconButton
                        color="info"
                        onClick={() => {
                          handleDetailModal();
                          setCommentBody(comment.body);
                        }}
                      >
                        <CommentIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                  <TableCell>{comment.date}</TableCell>
                  <TableCell>{comment.hour}</TableCell>
                  <TableCell>
                    <Stack direction="row" sx={{ gap: "10px" }}>
                      {comment.isAccept === 0 ? (
                        <Tooltip title="Accept" arrow>
                          <IconButton
                            color="success"
                            onClick={() => {
                              setShowAcceptModal(true);
                              setCommentID(comment.id);
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
                              handelRejectModal();
                              setCommentID(comment.id);
                            }}
                          >
                            <CloseIcon />
                          </IconButton>
                        </Tooltip>
                      )}

                      <Tooltip title="Response" arrow>
                        <IconButton
                          sx={{
                            backgroundColor: "#E0F2F1",
                            color: "#009688",
                            "&:hover": {
                              backgroundColor: "#009688",
                              color: "#E0F2F1",
                            },
                          }}
                          onClick={() => {
                            handleResponseModal();
                            setCommentBody(comment.body);
                            setCommentID(comment.id);
                          }}
                        >
                          <NoteIcon />
                        </IconButton>
                      </Tooltip>
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
                            setCommentID(comment.id);
                            setCommentBody(comment.body);
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
                            setCommentID(comment.id);
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
        <MessageBox type="error" message="There isn't any comments" />
      )}

      <DetailesModal
        open={showDetailModal}
        detailsModalClose={closeDetailModal}
        children
      >
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Comment :
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {commentBody}
        </Typography>
      </DetailesModal>

      <EditModal open={showEditModal} editModalClose={closeEditModal} children>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          sx={{ textAlign: "center" }}
        >
          Edit Comment
        </Typography>
        <TextField
          id="outlined-multiline-flexible"
          value={commentBody}
          label="comment"
          onChange={(event) => setCommentBody(event.target.value)}
          multiline
          maxRows={15}
        />
        <Button
          variant="contained"
          onClick={submitEditAction}
          color="secondary"
        >
          Save change
        </Button>
      </EditModal>

      <DeleteModal
        open={showDeleteModal}
        deleteModalClose={closeDeleteModal}
        submitAction={submitDeleteComment}
        children
      >
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          sx={{ textAlign: "center" }}
        >
          Are you sure to delete this comment?
        </Typography>
      </DeleteModal>

      <ResponseModal
        open={showResponseModal}
        submitAction={submitResponseComment}
        ResponseModalClose={closeResponseModal}
        children
      >
        <TextField
          id="outlined-multiline-static"
          value={commentBody}
          label="comment"
          multiline
          rows={4}
        />
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          sx={{ marginTop: "20px" }}
        >
          Insert your response :
        </Typography>
        <TextField
          id="outlined-multiline-static"
          onChange={(event) => {
            setResponseBody(event.target.value);
          }}
          multiline
          rows={4}
        />
      </ResponseModal>

      <AcceptModal
        open={showAcceptModal}
        submitAction={submitAcceptComment}
        acceptModalClose={closeAcceptModal}
        children
      >
        <Typography id="modal-modal-description" sx={{ textAlign: "center" }}>
          Are you sure to confirm this comment?
        </Typography>
      </AcceptModal>

      <RejectModal
        open={showRejectModal}
        submitAction={submitRejectComment}
        rejectModalClose={closeRejectModal}
        children
      >
        <Typography id="modal-modal-description" sx={{ textAlign: "center" }}>
          Are you sure to reject this comment?
        </Typography>
      </RejectModal>
    </div>
    /* </Grid> */
  );
}
