import React, { useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import "./AddNewProduct.css";

export default function AddNewProduct({ getAllproducts }) {
  const [newProductName, setNewProductName] = useState("");
  const [newProductPrice, setNewProductPrice] = useState("");
  const [newProductImg, setNewProductImg] = useState(null);
  const [successUplodeImgText, setSuccessUplodeImgText] = useState("");
  const [newProductInStock, setNewProductInStock] = useState("");
  const [newProductPopularity, setNewProductPopularity] = useState("");
  const [newProductsale, setNewProductsale] = useState("");
  const [newProductColor, setNewProductColor] = useState("");

  function getEmptyInputs() {
    setNewProductName("");
    setNewProductPrice("");
    setNewProductImg(null);
    setNewProductInStock("");
    setNewProductPopularity("");
    setNewProductsale("");
    setNewProductColor("");
    setSuccessUplodeImgText("");
  }

  const addNewProduct = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("title", newProductName);
    formData.append("price", newProductPrice);
    formData.append("count", newProductInStock);
    formData.append("image", newProductImg);
    formData.append("popularity", newProductPopularity);
    formData.append("sale", newProductsale);
    formData.append("colors", newProductColor);

    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/products/`, {
      method: "POST",
      body: formData,
    })
      .then((res) => {
        // Log the response status and body
        console.log("Response Status:", res.status);
        return res.text(); // Get the response as text
      })
      .then((text) => {
        console.log("Response Body:", text); // Log the response body
        try {
          const result = JSON.parse(text); // Attempt to parse as JSON
          getAllproducts();
          getEmptyInputs();
        } catch (error) {
          console.error("JSON Parse Error:", error); // Handle parse error
        }
      })
      .catch((error) => {
        console.error("Fetch Error:", error);
      });
  };

  return (
    <>
      <Paper sx={{ pl: "20px", py: "10px" }}>
        <Typography variant="h5" gutterBottom sx={{ margin: "5px 0 20px 0" }}>
          Add new product
        </Typography>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { width: "100%" },
          }}
          noValidate
          autoComplete="off"
        >
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                id="product-name"
                label="product name"
                value={newProductName}
                onChange={(event) => setNewProductName(event.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                className="newProductInput"
                id="product-price"
                label="product's price"
                value={newProductPrice}
                onChange={(event) => setNewProductPrice(event.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                className="newProductInput"
                id="product-in-stock"
                label="number of in stack"
                value={newProductInStock}
                onChange={(event) => setNewProductInStock(event.target.value)}
                fullWidth
              />
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <Button
                variant="contained"
                component="label"
                startIcon={<CloudUploadIcon />}
              >
                Upload Image
                <input
                  type="file"
                  hidden
                  onChange={(event) => {
                    setNewProductImg(event.target.files[0]);
                    setSuccessUplodeImgText("Image uploded successfully");
                  }}
                />
              </Button>
              <Typography
                variant="h1"
                component="h2"
                sx={{
                  color: "green",
                  fontSize: "10px",
                  borderRadius: "3px",
                }}
              >
                {successUplodeImgText}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                className="newProductInput"
                id="product-popularity"
                label="product's popularity"
                value={newProductPopularity}
                onChange={(event) =>
                  setNewProductPopularity(event.target.value)
                }
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                className="newProductInput"
                id="product-sale"
                label="product's sale"
                value={newProductsale}
                onChange={(event) => setNewProductsale(event.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                className="newProductInput"
                id="product-color"
                label="product's color"
                value={newProductColor}
                onChange={(event) => setNewProductColor(event.target.value)}
                fullWidth
              />
            </Grid>
          </Grid>
          <Grid item xs={12} md={6} sx={{ mt: "20px" }}>
            <Button
              variant="contained"
              onClick={addNewProduct}
              color="secondary"
            >
              Add product
            </Button>
          </Grid>
        </Box>
      </Paper>
    </>
  );
}
