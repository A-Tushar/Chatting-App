import React from "react";
import Grid from '@mui/material/Grid';
import Grouplist from "../components/Grouplist";
import Friendlist from "../components/Friendlist";
import Userlist from "../components/Userlist";
import Friendrequest from "../components/Friendrequest";
import Mygroup from "../components/Mygroup";
import Blocklist from "../components/Blocklist";

const Home = () => {

  return (
    <>
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <Grouplist/>
        <Friendrequest/>
      </Grid>
      <Grid item xs={4}>
        <Friendlist/>
        <Mygroup/>
      </Grid>
      <Grid item xs={4}>
        <Userlist/>
        <Blocklist/>
      </Grid>
    </Grid>
    </>
  )
}

export default Home