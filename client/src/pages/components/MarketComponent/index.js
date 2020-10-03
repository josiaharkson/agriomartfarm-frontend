import React from "react";
import { withRouter } from "react-router-dom";
// Material UI Components

import { connect } from "react-redux";
import Box from "@material-ui/core/Box";

import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

// Customized Components
import Copyright from "../../../components/Copyright";

import TabBar from "./TabBar";
import GridList from "./GridList";

import useRequest from "../../../utils/useRequest";
import authHeader from "../../../utils/auth-header";
import { InlineLoader } from "../../../components/IsLoading";

import config from "../../../utils/config";
const KEYS = config();

// Material UI Styling
const useStyles = makeStyles(theme => ({
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

function Market(props) {
  const classes = useStyles();
  const { user } = props;
  const { token } = user;

  // GET ALL PRODUCTS
  const url = KEYS.API_URL + "/api/product/getall";

  const { data, isValidating } = useRequest({
    url,
    headers: authHeader(token),
  });

  return (
    <div className={classes.root}>
      <Container component="main" maxWidth="lg" className={classes.container}>
        <TabBar />
        {isValidating ? (
          <InlineLoader />
        ) : (
          <>{data ? <GridList data={data.response} /> : <InlineLoader />}</>
        )}

        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </div>
  );
}

const mapStateToProps = state => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(withRouter(Market));
