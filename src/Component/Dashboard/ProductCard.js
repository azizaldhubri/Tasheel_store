import React, { useState } from "react";
import { Grid, Card, CardContent, Typography, Skeleton } from "@mui/material";
import { useDispatch } from "react-redux";
import { addToCart } from "../../app/storee/CartSlice"; 
import AutohideSnackbar from "./AutohideSnackbar";

function StarRating({ rating }) {
  const fullStars = Math.floor(rating);
  const halfStar = rating - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="d-flex justify-content-center">
      {[...Array(fullStars)].map((_, i) => (
        <span key={"full" + i} style={{ color: "#ffc107", fontSize: "20px" }}>★</span>
      ))}
      {halfStar && <span style={{ color: "#ffc107", fontSize: "20px" }}>☆</span>}
      {[...Array(emptyStars)].map((_, i) => (
        <span key={"empty" + i} style={{ color: "#ddd", fontSize: "20px" }}>★</span>
      ))}
      <span style={{ marginLeft: 8, fontSize: "16px", color: "#555" }}>
        {rating.toFixed(2)}
      </span>
    </div>
  );
}

export default function ProductCard({ products, loading }) {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const dispatch = useDispatch();

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
    setOpenSnackbar(true);
  };
// console.log(products.length)
  return (
    <Grid container spacing={3} className="d-flex align-items-center justify-content-center mt-3 mb-3">
      {products.length===0
        ? // عرض Skeleton أثناء التحميل
          Array.from(new Array(8)).map((_, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Skeleton variant="rectangular" height={200} />
                <CardContent>
                  <Skeleton width="200px" height={30} sx={{ mb: 1 }} />
                  <Skeleton width="200px" height={30} sx={{ mb: 1 }} />
                  <Skeleton width="200px" height={20} />
                  <Skeleton width="200px" height={30} sx={{ mb: 1 }} />
                  <Skeleton width="200px" height={20} />
                </CardContent>
              </Card>
            </Grid>
          ))
        : // عرض المنتجات بعد انتهاء التحميل
          products.map((item) => (            
            <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: 6,
                  },
                }}
              >
                <img
                  src={item.images[0]}
                  alt={item.title}
                  style={{ height: "200px", objectFit: "cover", width: "100%", paddingTop: "15px", minWidth: "200px" }}
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {item.title}
                  </Typography>
                  <Typography
                    variant="h6"
                    color="primary"
                    sx={{ cursor: "pointer" }}
                    onClick={() => {
                      handleAddToCart(item);
                      setOpenSnackbar(true);
                    }}
                  >
                    ${item.price}
                  </Typography>
                  <StarRating rating={item.rating} />
                </CardContent>
              </Card>
            </Grid>
          ))}
      <AutohideSnackbar
        open={openSnackbar}
        onClose={() => setOpenSnackbar(false)}
        message="تمت الإضافة إلى السلة"
        severity="success"
      />
    </Grid>
  );
}
