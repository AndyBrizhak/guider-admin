import { Card, CardContent, Typography, Box } from "@mui/material";

export const HomePage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Card>
        <CardContent>
          <Typography variant="h5" component="div">
            Welcome to the Admin Panel for Guider.pro
          </Typography>
          <Typography variant="body2" color="text.secondary">
            This is a simple admin panel built with React.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};
