import React from "react";
import { connect } from "react-redux";
// Material UI Components

import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";

import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

// Customized Components
import Copyright from "../../../components/Copyright";
import Link from "../../../components/Link";

import { logout } from "../../../store/actions/authActions";

// Material UI Styling
const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 100,
    textAlign: "center",

    [theme.breakpoints.down("sm")]: {
      marginTop: 120,
    },
  },
  title: {
    [theme.breakpoints.down("sm")]: {
      fontSize: 40,
    },
  },
  text: {
    [theme.breakpoints.down("sm")]: {
      fontSize: 25,
    },
  },

  btn1: {
    margin: 20,
  },
  btn2: {
    margin: 20,
    color: "white",
    background: "red",
  },
}));

const checkRole = (role) => {
  if (role === "farm") return "Farmer";
  if (role === "cons") return "Consumer";
  if (role === "ret") return "Retailer";
  return "User";
};
function Dashboard(props) {
  const classes = useStyles();
  const { isAuthenticated, user } = props;

  if (!isAuthenticated) return <h1>YOU NEED TO LOGIN IN TO VIEW THIS</h1>;
  let { email, fullName, role } = user;

  return (
    <Container component="main" maxWidth="lg" className={classes.container}>
      <Typography
        variant="h3"
        component="h3"
        className={classes.title}
        gutterBottom
      >
        Sample Empty Dashboard
      </Typography>
      <Typography variant="h4" component="h4" className={classes.text}>
        Email: {email}
      </Typography>
      <Typography variant="h4" component="h4" className={classes.text}>
        Full Name: {fullName}
      </Typography>
      <Typography variant="h4" component="h4" className={classes.text}>
        Role: {checkRole(role)}
      </Typography>

      <div>
        <Button
          size="large"
          className={classes.btn1}
          variant="contained"
          color="secondary"
        >
          <Link to="/" title="Return Homepage" />
        </Button>
        <Button
          onClick={() => props.logout()}
          size="large"
          className={classes.btn2}
          variant="contained"
        >
          LOG OUT
        </Button>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(mapStateToProps, { logout })(Dashboard);
