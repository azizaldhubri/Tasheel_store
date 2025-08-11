import React, { useEffect, useState, useCallback } from "react";
import {
  Grid,  Card,  CardContent,  Typography,  Button,  Box,  Skeleton,  IconButton,} from "@mui/material";
import { useDispatch } from "react-redux";
import { addToCart } from "../app/storee/CartSlice";
import AutohideSnackbar from "../Component/Dashboard/AutohideSnackbar";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

// مكون عرض تقييم النجوم
function StarRating({ rating }) {
  const fullStars = Math.floor(rating);
  const halfStar = rating - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="d-flex justify-content-center" style={{ gap: 2 }}>
      {[...Array(fullStars)].map((_, i) => (
        <span key={"full" + i} style={{ color: "#ffc107", fontSize: 20 }}>
          ★
        </span>
      ))}
      {halfStar && (
        <span style={{ color: "#ffc107", fontSize: 20, opacity: 0.5 }}>☆</span>
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <span key={"empty" + i} style={{ color: "#ddd", fontSize: 20 }}>
          ★
        </span>
      ))}
      <span style={{ marginLeft: 8, fontSize: 16, color: "#555" }}>
        {rating.toFixed(2)}
      </span>
    </div>
  );
}

export default function ProductImagesSlider({ images = [], loading }) {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const dispatch = useDispatch();

  // تحديث عدد الصور المعروضة بناءً على حجم الشاشة
  const handleResize = useCallback(() => {
    if (window.innerWidth <= 768) setVisibleCount(1);
    else if (window.innerWidth <= 900) setVisibleCount(2);
    else setVisibleCount(3);
  }, []);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  // تحديث الصور المعروضة عندما يتغير currentIndex أو visibleCount أو images
  const currentProducts = React.useMemo(() => {
    if (loading) return [];
    return images.slice(currentIndex, currentIndex + visibleCount);
  }, [images, currentIndex, visibleCount, loading]);

  // التحكم بالانتقال للصور التالية
  const nextImage = () => {
    setCurrentIndex((prev) =>
      prev + visibleCount >= images.length ? 0 : prev + visibleCount
    );
  };

  // التحكم بالانتقال للصور السابقة
  const prevImage = () => {
    setCurrentIndex((prev) =>
      prev - visibleCount < 0 ? images.length - visibleCount : prev - visibleCount
    );
  };

  // اضافة المنتج الى السلة مع حساب السعر بعد الخصم
  const handleAddToCart = (item) => {
    const discount = item.discountPercentage || 0;
    const newPrice = (item.price * (100 - discount)) / 100;

    const productForCart = {
      ...item,
      price: parseFloat(newPrice.toFixed(2)),
    };

    dispatch(addToCart(productForCart));
    setOpenSnackbar(true);
  };

  return (
    <Box
      sx={{
        // position: "relative",
        position: "relative",
        width: "90%",
        height: 400,
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f5f5f5",
        boxShadow: 6,
        padding: 0,
        marginTop:'15px'
      }}
    >
      {/* عرض Skeleton اثناء التحميل */}
      {loading
        ? Array.from({ length: visibleCount }).map((_, i) => (
            <Card key={i} sx={{ width: 300, minWidth: 250, m: 1 }}>
              <Skeleton variant="rectangular" height={150} />
              <CardContent>
                <Skeleton width="80%" height={25} />
                <Skeleton width="60%" />
                <Skeleton width="40%" />
                <Skeleton variant="rectangular" height={36} />
              </CardContent>
            </Card>
          ))
        : currentProducts.map((item) => {
            const discount = item.discountPercentage || 0;
            const oldPrice = item.price;
            const newPrice = (oldPrice * (100 - discount)) / 100;

            return (
              <Grid
                key={item.id}
                className="w-100 d-flex align-items-center justify-content-center gap-2 p-0"
                sx={{ maxHeight: 300 }}
              >
                <Card
                  className="d-flex align-items-center justify-content-center"
                  sx={{
                    width: 300,
                    minWidth: 250,
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
                    src={item.thumbnail}
                    alt={item.title}
                    style={{
                      height: 150,
                      objectFit: "cover",
                      paddingTop: 10,
                      minWidth: 200,
                    }}
                    loading="lazy"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h7" gutterBottom>
                      {item.title}
                    </Typography>

                    <Typography sx={{ marginBottom: 0 }}>
                      <span
                        style={{
                          textDecoration: "line-through",
                          color: "#999",
                        }}
                      >
                        ${oldPrice.toFixed(2)}
                      </span>
                      <span
                        style={{
                          fontWeight: "bold",
                          fontSize: 18,
                          color: "green",
                          marginLeft: 6,
                        }}
                      >
                        ${newPrice.toFixed(2)}
                      </span>
                    </Typography>

                    <Typography
                      sx={{
                        backgroundColor: "#f44336",
                        color: "white",
                        padding: "4px 8px",
                        borderRadius: 1,
                        display: "inline-block",
                        fontWeight: "bold",
                        width: "fit-content",
                        mt: 1,
                      }}
                    >
                      خصم {discount}%
                    </Typography>

                    <StarRating rating={item.rating} />

                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      sx={{ marginTop: 1 }}
                      onClick={() => handleAddToCart(item)}
                    >
                      أضف إلى السلة
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}

      {!loading && (
        <>
          {[{ onClick: prevImage, icon: <ArrowBackIosIcon /> }, { onClick: nextImage, icon: <ArrowForwardIosIcon /> }].map(
            (btn, idx) => (
              <IconButton
                key={idx}
                onClick={btn.onClick}
                sx={{
                  position: "absolute",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "rgba(0,0,0,0.4)",
                  color: "white",
                  "&:hover": { background: "rgba(0,0,0,0.6)" },
                  left: idx === 0 ? 10 : "auto",
                  right: idx === 1 ? 10 : "auto",
                }}
              >
                {btn.icon}
              </IconButton>
            )
          )}
        </>
      )}

      <AutohideSnackbar
        open={openSnackbar}
        onClose={() => setOpenSnackbar(false)}
        message="تمت الإضافة إلى السلة"
        severity="success"
      />
    </Box>
  );
}

// export default function DiscountedProducts() {
//   const [groceries, setGroceries] = useState([]);
//   const [fragrances, setFragrances] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch("https://dummyjson.com/products")
//       .then((res) => res.json())
//       .then((data) => {
//         setGroceries(data.products.filter((item) => item.category === "groceries"));
//         setFragrances(data.products.filter((item) => item.category === "fragrances"));
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error(err);
//         setLoading(false);
//       });
//   }, []);

//   return (
//     <Grid
//       container
//       spacing={3}
//       className="d-flex align-items-center justify-content-center mt-3 mb-3"
//     >
//       <ProductImagesSlider images={fragrances} loading={loading} />
//       <ProductImagesSlider images={groceries} loading={loading} />
//     </Grid>
//   );
// }
