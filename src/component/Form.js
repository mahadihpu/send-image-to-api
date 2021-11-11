import { Button, Card, CardMedia, Chip, CircularProgress, Grid, Input, Typography } from "@mui/material";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import banner from "../banner.jpg";

const Form = () => {
  const { register, handleSubmit } = useForm();

  const [imageURL, setImageURL] = useState(null);
  const [loading,setLoading] = useState(false);

  const onSubmit = (data) => {
    console.log(data);
  };
  const handleImageUpload = (event) => {
    setLoading(true);
    const imageData = new FormData();
    imageData.set("key", "1a86b17b63b6f25bf9866c1c1c785e83");
    imageData.append("image", event.target.files[0]);

    axios
      .post("https://api.imgbb.com/1/upload", imageData)

      .then((res) => {
        if (res.data.data.display_url) {
          setImageURL(res.data.data.display_url);
          setLoading(false);
          console.log(res.data.data.display_url);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Card raised="true"  sx={{height: "400px",padding:"15px",width:"90%",margin:"50px auto 0 auto"}}>
        <CardMedia
        component="img"
        height="140"
        image={banner}
        alt="green iguana"
      />
        <Typography align="center" variant="h4" sx={{mt:2,mb:5}}>Image processing Application</Typography>
      <Grid container>
        <Grid md={6} sx={{borderRight:"1px solid lightgrey"}}>
            <Typography variant="h6">**Upload an image to be processed**</Typography>
            <br />
            <br />
          <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="contained-button-file">
              <Input
                accept="image/*"
                id="contained-button-file"
                multiple
                name="exampleRequired"
                onChange={handleImageUpload}
                type="file"
              />
              <Button variant="contained" color="inherit" component="span">
                Upload
              </Button>
            </label>
          </form>
        </Grid>
        <Grid md={6}>
            {/* <Typography variant="h6" align="center" color="white">Result showing area</Typography> */}
            <Chip label="Result showing area" variant="outlined" />
            {
                loading === true ?  <CircularProgress color="secondary" /> : 
                imageURL ? <Typography color="primary">Result: {imageURL}</Typography>
                :null
            }
        </Grid>
      </Grid>
    </Card>
  );
};

export default Form;
