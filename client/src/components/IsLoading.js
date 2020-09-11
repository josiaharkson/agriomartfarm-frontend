import React from "react";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import Appbar from "./layout/AppBar";
const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    background: "rgba(18, 107, 22, 0.3)",
    color: "#fff",
  },
}));

export default function SimpleBackdrop(props) {
  const classes = useStyles();

  return (
    <>
      <Appbar page="isloading" />
      <Backdrop className={classes.backdrop} open={true} onClick={() => {}}>
        <CircularProgress
          color="inherit"
          size={props.iconSize ? props.iconSize : 333}
        />
      </Backdrop>
    </>
  );
}
