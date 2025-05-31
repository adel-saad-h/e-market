import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import { useState } from "react";

interface BannersSliderProps {
  bannersUrls: string[];
}

export const BannersSlider = ({ bannersUrls }: BannersSliderProps) => {
  const [bannerIndex, setBannerImage] = useState(0);

  const showNextImage = () => {
    setBannerImage((index) => {
      if (index === bannersUrls.length - 1) return 0;
      return index + 1;
    });
  };
  const showPrevImage = () => {
    console.log(setBannerImage);
    setBannerImage((index) => {
      if (index === 0) return bannersUrls.length - 1;
      return index - 1;
    });
  };
  return (
    <Box
    
      sx={{
        backgroundImage: `url(${bannersUrls[bannerIndex]})`,
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
        position: "center",
        height: "90vh",
        mt: -11,
        
      }}
    >
      <Button
        onClick={showPrevImage}
        sx={{
          all: "unset",
          display: "block",
          position: "absolute",
          height: "75vh",
          top: 0,
          bottom: 0,
          padding: "1rem",
          cursor: "pointer",
          stroke: "white",
          fill: "black",
          left: 0,
          "&:hover": { background: "rgb(0,0,0,0.2)" },
          transition: "scale 100ms ease-in-out",
        }}
      >
        <ArrowBackIos />
      </Button>
      <Button
        onClick={showNextImage}
        sx={{
          all: "unset",
          display: "block",
          position: "absolute",
          height: "75vh",
          top: 0,
          bottom: 0,
          padding: "1rem",
          cursor: "pointer",
          stroke: "white",
          fill: "black",
          right: 0,
          "&:hover": { background: "rgb(0,0,0,0.2)" },
        }}
      >
        <ArrowForwardIos />
      </Button>
    </Box>
  );
};
