import React from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import CircularProgress from "@material-ui/core/CircularProgress";
import Badge from "@material-ui/core/Badge";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import useRequest from "../../../../utils/useRequest";
import authHeader from "../../../../utils/auth-header";
import { InlineLoader } from "../../../../components/IsLoading";
import SnackBar from "../../../../components/SnackBar";

import config from "../../../../utils/config";
const KEYS = config();

const useStyles = makeStyles(theme => ({
  appBar: {
    position: "relative",
    color: "#FFF",
    background: "rgba(18, 107, 22, 0.88)",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  body: {
    padding: theme.spacing(6),
  },
  btn: { height: 30, margin: "0 5px", fontSize: 12, marginBottom: 10 },
  message: { fontSize: 30, textAlign: "center", margimBottom: 30 },
  span: { color: "gray", textAlign: "left", fontSize: 14 },
  paper: {
    width: "100%",
    height: 140,
    display: "flex",
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-end",
    fontSize: 14,
    textAlign: "center",
  },
  prodDetails: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    color: "gray",
    fontSize: 12,
    margin: "10px 5px",
    textAlign: "center",
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({
  farmId,
  farmName,
  handleClose,
  token,
}) {
  const classes = useStyles();

  // GET All products for this farm
  const url = KEYS.API_URL + "/api/product/" + farmId;

  const { data, error, isValidating, mutate } = useRequest({
    url,
    headers: authHeader(token),
  });

  const refresh = () => {
    mutate();
  };

  // SnackBar Props
  const [msg, setMsg] = React.useState("");
  const [msgType, setMsgType] = React.useState("success");
  const [SnackBarOpen, setSnackBarOpen] = React.useState(false);

  const [open, setOpen] = React.useState(false);
  const handleClickOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  return (
    <div>
      {SnackBarOpen && (
        <SnackBar
          autoHideDuration={10000}
          message={msg}
          handleClose={() => setSnackBarOpen(false)}
          type={msgType}
        />
      )}

      <Dialog
        fullScreen
        open={true}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              My Farm - {farmName.toUpperCase()}
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              CLose
            </Button>
          </Toolbar>
        </AppBar>
        <div className={classes.body}>
          <h2>
            All Products for this farm
            <Badge
              badgeContent={data ? data.response.length : "0"}
              color="secondary"
              style={{ margin: "0 15px" }}
            />
          </h2>
          <Button
            color="inherit"
            variant="outlined"
            onClick={handleClickOpenDialog}
          >
            Add A new Product
          </Button>

          <DisplayData data={data} error={error} isValidating={isValidating} />
          {open && (
            <AddNewProductDialog
              open={open}
              farmId={farmId}
              token={token}
              handleClose={handleCloseDialog}
              refresh={refresh}
              setMsg={setMsg}
              setMsgType={setMsgType}
              setSnackBarOpen={setSnackBarOpen}
            />
          )}
        </div>
      </Dialog>
    </div>
  );
}

const DisplayData = ({ data, error, isValidating }) => {
  const classes = useStyles();

  if (isValidating) return <InlineLoader />;
  if (error) return <div>An Error Occured!</div>;
  if (data) {
    if (data.response) {
      if (!data.response.length) {
        return (
          <div className={classes.message} style={{ margin: 30 }}>
            You have not added any Product yet under this farm!
          </div>
        );
      } else {
        return (
          <>
            <div className={classes.message}>
              <span className={classes.span}>
                Click on an item to open product
              </span>
            </div>
            <Grid container spacing={4}>
              {data.response.map(product => (
                <SingleProductBox
                  key={Math.random() + product.name}
                  product={product}
                />
              ))}
            </Grid>
          </>
        );
      }
    }
  } else {
    return <InlineLoader />;
  }

  return <InlineLoader />;
};

const AddNewProductDialog = ({
  open,
  handleClose,
  farmId,
  refresh,
  token,
  setMsg,
  setMsgType,
  setSnackBarOpen,
}) => {
  const [name, setName] = React.useState("");
  const [quantity, setQuantity] = React.useState("");
  const [sold, setSold] = React.useState("");

  const createNewFarm = async () => {
    if (!name.trim()) return;

    const url = KEYS.API_URL + "/api/product/add/" + farmId;

    try {
      const res = await axios.post(
        url,
        {
          name,
          farm: farmId,
          quantity,
          sold,
        },
        { headers: authHeader(token) }
      );
      console.log(res.data);
      refresh();
      handleClose();
      setMsg("New Product Has been Created Successfully!");
      setMsgType("success");
      setName("");
      setSnackBarOpen(true);
    } catch (e) {
      if (e.response) {
        if (e.response.data) {
          console.log(e.response.data);
        }
      }

      console.log(e);

      setMsg("An Error Occured!");
      setMsgType("error");
      setSnackBarOpen(true);
      setName("");
    }
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add New Product</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter your name of the product here.
          </DialogContentText>

          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Product Name"
            type="email"
            fullWidth
            value={name}
            onChange={e => setName(e.target.value)}
          />

          <TextField
            margin="dense"
            id="name"
            label="Product Quantity"
            type="number"
            fullWidth
            value={quantity}
            onChange={e => setQuantity(e.target.value)}
          />

          <TextField
            margin="dense"
            id="name"
            label="Product Price"
            type="number"
            fullWidth
            value={sold}
            onChange={e => setSold(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={() => createNewFarm()} color="primary">
            Create New
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const SingleProductBox = ({ product }) => {
  const classes = useStyles();

  const url = KEYS.API_URL + "/api/product/stats/" + product._id;
  const { data, error, isValidating } = useRequest({
    url,
  });

  return (
    <Grid item xs={3} style={{ marginTop: 20 }}>
      <Paper className={classes.paper} elevation={10}>
        <div>
          <Typography style={{ textTransform: "capitalize" }}>
            {product.name}
          </Typography>
          <div className={classes.prodDetails}>
            {error ? (
              <>GET error!</>
            ) : (
              <>
                {isValidating ? (
                  <CircularProgress size={20} />
                ) : (
                  <>
                    {data ? (
                      <>
                        <span> Quantity: {data.response.quantity}</span>
                        <span> Price: {data.response.sold}</span>
                      </>
                    ) : null}
                  </>
                )}
              </>
            )}
          </div>
        </div>

        <Button className={classes.btn} variant="contained" color="default">
          open product
        </Button>
      </Paper>
    </Grid>
  );
};
