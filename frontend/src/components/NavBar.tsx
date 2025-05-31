import { Box, Fab, Typography } from "@mui/material";

export const Navbar = () => {
  return (
     <Box
       p={2}
       display={"flex"}
       flexDirection={"row"}
       justifyContent="space-between"
       alignItems={"center"}
     >
      <Fab variant="extended" color="primary">
        <Typography>{"ADEL =>"}</Typography>
      </Fab>
      <Fab variant="circular" color="default">
        <Typography>{"Login"}</Typography>
      </Fab>
    </Box>
   
  );
};
