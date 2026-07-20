import { Box, Container, Grid, Typography, Paper } from "@mui/material";
import LoginForm from "../components/LoginForm";
import "../../../assets/styles/login.css";

export default function LoginPage() {
  return (
    <Box className="login-page">
      {/* Background Blur Circles */}
      <Box className="blur-circle circle-one" />
      <Box className="blur-circle circle-two" />

      <Container maxWidth="lg">
        <Paper elevation={0} className="login-card">
          <Grid container sx={{ minHeight: "700px" }}>
            {/* Left Section */}
            <Grid size={{ xs: 12, md: 6 }} className="login-left">
              <Box className="brand-section">
                <Typography variant="h3" fontWeight={700} gutterBottom>
                  PeopleFlow
                </Typography>

                <Typography variant="h6" className="subtitle">
                  Human Resource Management System
                </Typography>

                <Typography variant="body1" className="description">
                  A modern enterprise platform to manage employees, departments,
                  attendance, leave, payroll, recruitment and much more from a
                  single dashboard.
                </Typography>
              </Box>

              <Box className="stats-container">
                <Box className="stat-box">
                  <Typography variant="h4" fontWeight={700}>
                    250+
                  </Typography>

                  <Typography variant="body2">Employees</Typography>
                </Box>

                <Box className="stat-box">
                  <Typography variant="h4" fontWeight={700}>
                    98%
                  </Typography>

                  <Typography variant="body2">Attendance</Typography>
                </Box>

                <Box className="stat-box">
                  <Typography variant="h4" fontWeight={700}>
                    24/7
                  </Typography>

                  <Typography variant="body2">Secure Access</Typography>
                </Box>
              </Box>

              <Box className="illustration-container">
                <img
                  src="/images/login-illustration.svg"
                  alt="PeopleFlow HRMS"
                  className="login-illustration"
                />
              </Box>
            </Grid>

            {/* Right Section */}
            <Grid size={{ xs: 12, md: 6 }} className="login-right">
              <Box className="login-form-wrapper">
                <Typography variant="h4" fontWeight={700} gutterBottom>
                  Welcome Back 👋
                </Typography>

                <Typography variant="body1" color="text.secondary" mb={5}>
                  Sign in to navigate to your workspace.
                </Typography>

                <LoginForm />

                <Typography
                  variant="body2"
                  color="text.secondary"
                  mt={5}
                  textAlign="center"
                ></Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
}
