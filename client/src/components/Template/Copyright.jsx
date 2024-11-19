import React from "react";
import { Typography, Link } from "@material-ui/core/";

const Copyright = () => {
  return (
    <div style={{padding: "2rem"}}>
      <Typography variant="body1" color="textSecondary" align="center">
        {"Copyright © "}
        <Link color="inherit" href="https://github.com/OktarianTB">
          AudaSynth
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </div>
  );
};

export default Copyright;
