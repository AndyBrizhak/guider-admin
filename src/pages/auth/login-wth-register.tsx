/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-key */

import { Box, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { Login, LoginForm } from "react-admin";

const LoginWithRegister = () => (
  <Login>
    <LoginForm />
    <Box textAlign="center" sx={{ mt: 2 }}>
      <Link component={RouterLink} to="/users/create">
        Registration?
      </Link>
    </Box>
  </Login>
);

export default LoginWithRegister;
