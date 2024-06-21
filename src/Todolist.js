import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
//
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Container, Grid } from "@mui/material";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);

  const [todo, settodo] = React.useState([]);
  const [text, settext] = React.useState("");
  const [title, settitle] = React.useState("");
  const [id, setid] = React.useState(0);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setid("");
    settitle("");
    settext("");
  };
  const handleAdd = () => {
    if (id) {
      let copy = [...todo];
      let index = copy.findIndex((e) => e.id == id);
console.log("idx==>",index)
      copy[index].title = title;
      copy[index].text = text;
      settodo([...copy]);
      setOpen(false);
    } else {
      setOpen(false);

      settodo([...todo, { id: todo.length + 1, title: title, text: text }]);
      setid(todo.length + 1);
    }
    setid("");
    settitle("");
    settext("");
  };

  return (
    <Container style={{marginTop:"10px"}}>
      <Button variant="outlined" onClick={handleClickOpen}>
       Add your To-Do
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>To-Do</DialogTitle>
        <DialogContent>
          <DialogContentText></DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            value={title}
            label="Title"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => {
              settitle(e.target.value);
            }}
          />

          <TextField
            autoFocus
            margin="dense"
            id="data"
            value={text}
            label="Enter your task"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => {
              settext(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAdd}>Add To-do</Button>
        </DialogActions>
      </Dialog>
      <Grid container spacing={{ xs: 2 }}  style={{marginTop:"10px"}}>
        {todo.map((data) => (
          <>
            <Grid item xs={6} md={4}>
              <Card sx={{ minWidth: 275 }}>
                <CardContent>
                  <Grid container spacing={{ xs: 2 }}>
                    <Grid item xs={6}>
                      <Typography variant="h5" component="div">
                        <b> Title: </b> {data.title}
                      </Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Button
                        variant="outlined"
                        onClick={() => {
                          let index = todo.findIndex(
                            (ele) => ele.id == data.id
                          );
                          let arr = [...todo];
                          arr.splice(index, 1);
                          settodo(arr);
                        }}
                      >
                        Delete
                      </Button>
                    </Grid>
                    <Grid item xs={3}>
                      <Button
                        variant="outlined"
                        onClick={() => {
                          setOpen(true);
                          settitle(data.title);
                          settext(data.text);
                          setid(data.id);
                        }}
                      >
                        EDIT
                      </Button>
                    </Grid>
                  </Grid>
                  <Typography variant="body2">{data.text}</Typography>
                </CardContent>
              </Card>
            </Grid>
          </>
        ))}
      </Grid>
    </Container>
  );
}
