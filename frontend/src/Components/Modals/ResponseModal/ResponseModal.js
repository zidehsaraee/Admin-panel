import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Stack, Button } from "@mui/material";

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
  justifyContent:'center',
  gap:'10px'
};

export default function ResponseModal({
  open,
  ResponseModalClose,
  submitAction,
  children,
}) {
  return (
    <div>
      <Modal
        open={open}
        onClose={ResponseModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {children}
          <Stack direction="row" spacing={10}>
            <Button variant="contained" color="secondary" onClick={() => submitAction()}>
              submit response
            </Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
