import React from "react";
import Grid from '@mui/material/Grid';
import Grouplist from "../components/Grouplist";
import Friendlist from "../components/Friendlist";
import Userlist from "../components/Userlist";

const Home = () => {

  return (
    <>
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <Grouplist/>
      </Grid>
      <Grid item xs={4}>
        <Friendlist/>
      </Grid>
      <Grid item xs={4}>
        <Userlist/>
      </Grid>
    </Grid>
    </>
  )
}

export default Home