import { Box, Grid, Typography } from "@mui/material";
import banner1 from "../assets/images/market.png";
import banner2 from "../assets/images/LED.png";
import banner3 from "../assets/images/mobile.png";

import { BannersSlider } from "../components/BannersSlider";
import ProductCard from "../components/ProductCard";
import { useEffect, useState } from "react";
import { Product } from "../types/Product";
import { BASE_URL } from "../constants/baseUrl";

const bannersList = [banner1, banner2, banner3];

export const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${BASE_URL}/products`);
        const data = await res.json();
        setProducts(data.data);
      } catch {
        setError(true);
      }
    };
    fetchData();
  }, []);
  if (error) {
    return (
      <Box>
        <Typography>Some thing went wrong</Typography>
      </Box>
    );
  }
  return (
    <Box>
      <Box
        sx={{
          mt: -11,
        }}
      >
        <BannersSlider bannersUrls={bannersList} />
      </Box>
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        sx={{ mt: -5, ml: 2, mr: 2, gap: 2 }}
      >
        <Grid container spacing={3}>
          {products.map((p) => (
            <Grid size={{ md: 6, xs: 100 }}>
              <ProductCard {...p} />
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box
        height="100vh"
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Typography
          fontFamily={"sans-serif"}
          fontWeight={900}
          fontSize={"70px"}
          textAlign={"center"}
        >
          ADEL S
        </Typography>
      </Box>
    </Box>
  );
};
