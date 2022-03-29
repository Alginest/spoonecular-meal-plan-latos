import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import ShareIcon from "@material-ui/icons/Share";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import FavoriteIcon from "@material-ui/icons/Favorite";
import useStyles from "./style";

const key = process.env.REACT_APP_SPOON_KEY;

const CardBm = ({ id, title }) => {
  const classes = useStyles();
  const [imageUrl, setImageUrl] = useState("");
  const [likes, setLikes] = useState(1);
  const [instructions, setInstructions] = useState("");

  const fetchImg = async () => {
    try {
      const resp = await fetch(
        `https://api.spoonacular.com/recipes/${id}/information?apiKey=${key}&includeNutrition=false`
      );
      const data = await resp.json();
      console.log(data);
      setImageUrl(data.image);
      setLikes(data.aggregateLikes);
      setInstructions(data.instructions);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchImg();
  }, [id]);
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ backgroundColor: "red" }} aria-label="recipe">
            {likes}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={title}
        subheader="September 18, 2022"
      />
      <img src={imageUrl} alt={title} className={classes.img} />
      <CardContent>
        <Typography variant="body2">
          {instructions.substring(0, 400)}...
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default CardBm;
