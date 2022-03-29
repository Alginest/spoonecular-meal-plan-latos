import { Box, Container, Grid, MenuItem, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { useGlobalContext } from "../../Context";
import CardBm from "../Card/CardBm";
import useStyles from "./style";
const calories = [
  {
    value: 2000,
    label: "2000 Cal",
  },
  {
    value: 2200,
    label: "2200 Cal",
  },
  {
    value: 1800,
    label: "1800 Cal",
  },
  {
    value: 1600,
    label: "1600 Cal",
  },
  {
    value: 1600,
    label: "1600 Cal",
  },
  {
    value: 1400,
    label: "1400 Cal",
  },
  {
    value: 1200,
    label: "1200 Cal",
  },
  {
    value: 1000,
    label: "1000 Cal",
  },
];
const MenuPlanner = () => {
  const { calory, setCalory, meals } = useGlobalContext();

  const handleChange = (event) => {
    setCalory(event.target.value);
  };
  const classes = useStyles();

  return (
    <section className={classes.menuPlanner}>
      <Container className={classes.bigCont}>
        <Box className={classes.searchMenu}>
          <TextField
            id="outlined-select-calories"
            label="Calories"
            select
            value={calory}
            onChange={handleChange}
            helperText="Please select your Calories"
            className={classes.calorInput}
          >
            {calories.map((option, index) => (
              <MenuItem key={index} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Box>
        {meals && (
          <Grid container className={classes.gridBox} spacing={2}>
            {meals.map((meal) => {
              const { id } = meal;
              return (
                <Grid item md={12} lg={4} key={id}>
                  <CardBm {...meal} />
                </Grid>
              );
            })}
          </Grid>
        )}
      </Container>
    </section>
  );
};

export default MenuPlanner;
