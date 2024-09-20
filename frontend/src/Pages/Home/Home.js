import React from "react";
import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import ChartComponent from "../../Components/Reports/ChartComponent";
import TrafficSrs from "../../Components/Reports/TrafficSrs";

export default function Home() {
  const [userCount, setUserCount] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);

  useEffect(() => {
    fetchUserCount();
    fetchProductsCount();
    fetchOrdersCount();
  }, []);

  const fetchUserCount = () => {
    fetch("http://localhost:5000/api/users")
      .then((res) => res.json())
      .then((result) => setUserCount(result.length))
      .catch((error) => console.error("Error fetching user count:", error));
  };
  const fetchProductsCount = () => {
    fetch("http://localhost:5000/api/products/")
      .then((res) => res.json())
      .then((result) => setProductCount(result.length))
      .catch((error) => console.error("Error fetching product count:", error));
  };
  const fetchOrdersCount = () => {
    fetch("http://localhost:5000/api/orders")
      .then((res) => res.json())
      .then((result) => setOrderCount(result.length))
      .catch((error) => console.error("Error fetching order count:", error));
  };

  return (
    <Box sx={{ width: "100%", padding: "40px" }}>
      <Typography
        variant="h1"
        component="h2"
        sx={{ fontSize: "24px", marginBottom: "30px" }}
      >
        Dashboard
      </Typography>
      <Grid
        container
        spacing={2}
        rowSpacing={3}
        columnSpacing={{ xs: 1, sm: 2, md: 4 }}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
        }}
      >
        <Grid item xs={12} md={6} xl={3}>
          <Card sx={{ minWidth: 275 }}>
            <CardContent
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <Stack
                spacing={2}
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "center",
                }}
              >
                <Typography
                  gutterBottom
                  sx={{ color: "text.primary", fontSize: 24 }}
                >
                  Users
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    backgroundColor: "#4cb9501a",
                    color: "#4cb950",
                    padding: "2px 15px",
                    borderRadius: "5px",
                  }}
                >
                  {userCount} people
                </Typography>
              </Stack>
              <Avatar
                src="./images/HomePageImg/users-svg.png"
                sx={{ width: "80px", height: "80px" }}
              ></Avatar>
              {/* <GroupsIcon
                color="success"
                sx={{ fontSize: "70px", height: "100%" }}
              /> */}
            </CardContent>
          </Card>
        </Grid>
        <Grid size={6} item xs={12} md={6} xl={3}>
          <Card sx={{ minWidth: 275 }}>
            <CardContent
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <Stack
                spacing={2}
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "center",
                }}
              >
                <Typography
                  gutterBottom
                  sx={{ color: "text.primary", fontSize: 24 }}
                >
                  Products
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    backgroundColor: "#4cb9501a",
                    color: "#4cb950",
                    padding: "2px 15px",
                    borderRadius: "5px",
                  }}
                >
                  {productCount} items
                </Typography>
              </Stack>
              <Avatar
                src="./images/HomePageImg/products-svg.png"
                sx={{ width: "80px", height: "80px" }}
              ></Avatar>

              {/* <GroupsIcon
                color="success"
                sx={{ fontSize: "70px", height: "100%" }}
              /> */}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} xl={3}>
          <Card sx={{ minWidth: 275 }}>
            <CardContent
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <Stack
                spacing={2}
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "center",
                }}
              >
                <Typography
                  gutterBottom
                  sx={{ color: "text.primary", fontSize: 24 }}
                >
                  Orders
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    backgroundColor: "#4cb9501a",
                    color: "#4cb950",
                    padding: "2px 15px",
                    borderRadius: "5px",
                  }}
                >
                  {orderCount}
                </Typography>
              </Stack>
              <Avatar
                src="./images/HomePageImg/orders-svg.png"
                sx={{ width: "80px", height: "80px" }}
              ></Avatar>

              {/* <GroupsIcon
                color="success"
                sx={{ fontSize: "70px", height: "100%" }}
              /> */}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} xl={3}>
          <Card sx={{ minWidth: 275 }}>
            <CardContent
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <Stack
                spacing={2}
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "center",
                }}
              >
                <Typography
                  gutterBottom
                  sx={{ color: "text.primary", fontSize: 24 }}
                >
                  Sale
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    backgroundColor: "#4cb9501a",
                    color: "#4cb950",
                    padding: "2px 15px",
                    borderRadius: "5px",
                  }}
                >
                  145
                </Typography>
              </Stack>
              <Avatar
                src="./images/HomePageImg/sales-svg.png"
                sx={{ width: "80px", height: "80px" }}
              ></Avatar>

              {/* <GroupsIcon
                color="success"
                sx={{ fontSize: "70px", height: "100%" }}
              /> */}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Grid
        container
        spacing={2}
        rowSpacing={3}
        columnSpacing={{ xs: 1, sm: 2, md: 4 }}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Grid item xs={12} md={12} xl={8} sx={{ height: '500px' }}>
          <ChartComponent />
        </Grid>

        <Grid item xs={12} md={12} xl={4} sx={{ height: '500px' }}>
          <TrafficSrs />
        </Grid>
      </Grid>
    </Box>
  );
}
