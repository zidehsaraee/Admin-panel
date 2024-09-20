import * as React from "react";
import Modal from "@mui/material/Modal";
import { Box, Stack, Button } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
export default function DeleteModal({
  open,
  deleteModalClose,
  submitAction,
  children,
}) {
  return (
    <div>
      <Modal
        open={open}
        onClose={deleteModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {children}
          <Stack
            direction="row"
            sx={{
              display: "flex",
              justifyContent:'center',
              alignItems: "center",
              marginTop: "20px",
              gap:'50px'
            }}
          >
            <Button
              variant="contained"
              color="success"
              onClick={() => submitAction()}
            >
              YES
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => deleteModalClose()}
            >
              NO
            </Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
