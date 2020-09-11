import React from "react";
import { withRouter } from "react-router-dom";
// Material UI Components

import Box from "@material-ui/core/Box";

import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

// Customized Components
import Copyright from "../../../components/Copyright";

import TabBar from "./TabBar";
import GridList from "./GridList";

// Material UI Styling
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    [theme.breakpoints.down("sm")]: {
      display: "block",
    },
  },

  container: {
    flex: 1,
    width: "50%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      marginTop: -50,
    },
  },
}));

function Market() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container component="main" maxWidth="lg" className={classes.container}>
        <TabBar />
        <GridList />
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </div>
  );
}

export default withRouter(Market);
