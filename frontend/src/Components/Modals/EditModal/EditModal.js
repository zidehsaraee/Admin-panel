import * as React from "react";
import Modal from "@mui/material/Modal";
import { Box } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display:'flex',
  flexDirection:'column',
  gap:'20px'

};
export default function EditModal({ open, editModalClose, children }) {
  return (
    <div>
      <Modal
        open={open}
        onClose={editModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}> {children}</Box>
      </Modal>
    </div>
  );
}
