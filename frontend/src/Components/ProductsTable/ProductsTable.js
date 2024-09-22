import React, { useState } from "react";
import "./ProductsTable.css";
import { Box } from "@mui/material";
import MessageBox from "../../Components/Alert/MessageBox";
import EditModal from "../../Components/Modals/EditModal/EditModal";
import DetailesModal from "../../Components/Modals/DetailesModal/DetailesModal";
import DeleteModal from "../../Components/Modals/DeleteModal/DeleteModal";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import DetailsIcon from "@mui/icons-material/Details";
import IconButton from "@mui/material/IconButton";
import TablePagination from "@mui/material/TablePagination";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

export default function ProductsTable({ allproducts, getAllproducts }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [productID, setProductID] = useState(null);
  const [productInfo, setProductInfo] = useState({});
  const [editTitleProduct, setEditTitleProduct] = useState("");
  const [editPriceProduct, setEditPriceProduct] = useState("");
  const [editCountProduct, setEditCountProduct] = useState("");
  const [editImgProduct, setEditImgProduct] = useState(null);

  const [confirmImgProductEditAlert, setConfirmImgProductEditAlert] =
    useState("");

  const [editPopularityProduct, setEditPopularityProduct] = useState("");
  const [editSaleProduct, setEditSaleProduct] = useState("");
  const [editColorsProduct, setEditColorsProduct] = useState("");

  function getEmptyInputs() {
    setConfirmImgProductEditAlert("");
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };
  const handleEditModal = () => {
    setShowEditModal(true);
  };
  const handleEditModalClose = () => {
    setShowEditModal(false);
  };
  const submitEditAction = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("title", editTitleProduct);
    formData.append("price", editPriceProduct);
    formData.append("count", editCountProduct);
    formData.append("image", editImgProduct);
    formData.append("popularity", editPopularityProduct);
    formData.append("sale", editSaleProduct);
    formData.append("colors", editColorsProduct);

    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/products/${productID}`, {
      method: "PUT",
      body: formData,
    })
      .then((res) => res.json())
      .then((result) => {
        getAllproducts();
        handleEditModalClose();
        getEmptyInputs();
      });
  };

  const handleDetailsModal = () => {
    setShowDetailsModal(true);
  };

  const handleDetailsModalClose = () => {
    setShowDetailsModal(false);
  };

  const handleDeleteModal = () => {
    setShowDeleteModal(true);
  };
  const deleteSubmitAction = () => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/products/${productID}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((result) => {
        setShowDeleteModal(false);
        getAllproducts();
      });
  };
  const handleDeleteModalClose = () => {
    setShowDeleteModal(false);
  };

  return (
    <>
      <Divider variant="middle" sx={{ my: "50px" }} />
      {allproducts.length ? (
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 400 }}>
            <Table
              stickyHeader
              aria-label="sticky table"
              sx={{ minWidth: 650 }}
            >
              <TableHead>
                <TableRow>
                  <TableCell>Product image</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>In stock</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allproducts
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((product) => (
                    <TableRow
                      key={product.id}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell component="th" scope="row">
                        <Stack>
                          <Avatar
                            alt={product.title}
                            src={`${process.env.REACT_APP_BACKEND_URL}${product.img}`}
                            sx={{ width: "70px", height: "70px" }}
                          />
                        </Stack>
                      </TableCell>
                      <TableCell>{product.title}</TableCell>
                      <TableCell>£ {product.price}</TableCell>
                      <TableCell>{product.count}</TableCell>
                      <TableCell>
                        <Stack direction="row" sx={{ gap: "10px" }}>
                          <Tooltip title="Details" arrow>
                            <IconButton
                              sx={{
                                backgroundColor: "#C1D8C3",
                                color: "#1E4620",
                                "&:hover": {
                                  backgroundColor: "#1E4620",
                                  color: "#C1D8C3",
                                },
                              }}
                              onClick={() => {
                                setProductInfo(product);
                                handleDetailsModal();
                              }}
                            >
                              <DetailsIcon />
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
                                setProductID(product.id);
                                setEditTitleProduct(product.title);
                                setEditPriceProduct(product.price);
                                setEditCountProduct(product.count);
                                setEditImgProduct(product.img);
                                setEditPopularityProduct(product.popularity);
                                setEditSaleProduct(product.sale);
                                setEditColorsProduct(product.colors);
                                handleEditModal();
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
                                setProductID(product.id);
                                handleDeleteModal();
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
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={allproducts.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      ) : (
        <MessageBox type="error" message="There isn't any products" />
      )}

      <EditModal open={showEditModal} editModalClose={handleEditModalClose}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          sx={{ textAlign: "center" }}
        >
          Edit Product
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
            value={editTitleProduct}
            onChange={(event) => setEditTitleProduct(event.target.value)}
            label="title"
          />
          <TextField
            id="outlined-basic"
            value={editPriceProduct}
            onChange={(event) => setEditPriceProduct(event.target.value)}
            label="price"
          />
          <TextField
            id="outlined-basic"
            value={editCountProduct}
            onChange={(event) => setEditCountProduct(event.target.value)}
            label="in stack"
          />
          <Stack
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              margin: "5px 0",
            }}
          >
            <Avatar
              alt={editImgProduct}
              src={`${process.env.REACT_APP_BACKEND_URL}${editImgProduct}${editImgProduct}`}
              sx={{ width: "70px", height: "70px" }}
            />

            <Button
              variant="contained"
              component="label"
              startIcon={<CloudUploadIcon />}
              color="info"
            >
              Change Image
              <input
                type="file"
                hidden
                onChange={(event) => {
                  setEditImgProduct(event.target.files[0]);
                  setConfirmImgProductEditAlert("Image changed successfully");
                }}
              />
            </Button>
          </Stack>
          <Typography
            variant="h1"
            component="h2"
            sx={{ color: "green", fontSize: "12px" }}
          >
            {confirmImgProductEditAlert}
          </Typography>

          <TextField
            id="outlined-basic"
            value={editPopularityProduct}
            onChange={(event) => setEditPopularityProduct(event.target.value)}
            label="popularity"
          />
          <TextField
            id="outlined-basic"
            value={editSaleProduct}
            onChange={(event) => setEditSaleProduct(event.target.value)}
            label="sale"
          />
          <TextField
            id="outlined-basic"
            value={editColorsProduct}
            onChange={(event) => setEditColorsProduct(event.target.value)}
            label="colors"
          />
          <Button
            variant="contained"
            onClick={submitEditAction}
            color="secondary"
          >
            Save changes
          </Button>
        </Box>
      </EditModal>

      <DetailesModal
        open={showDetailsModal}
        detailsModalClose={handleDetailsModalClose}
        children
      >
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          sx={{ mb: "20px" }}
        >
          Product details
        </Typography>
        <TableContainer sx={{ maxHeight: 400 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>popularity</TableCell>
                <TableCell>sale</TableCell>
                <TableCell>color</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow
                key={productInfo.id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                <TableCell>{productInfo.popularity}</TableCell>
                <TableCell>{productInfo.sale}</TableCell>
                <TableCell>{productInfo.colors}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </DetailesModal>

      <DeleteModal
        open={showDeleteModal}
        deleteModalClose={handleDeleteModalClose}
        submitAction={deleteSubmitAction}
        children
      >
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          sx={{ textAlign: "center" }}
        >
          Are you sure to delete this product?
        </Typography>
      </DeleteModal>
    </>
  );
}
