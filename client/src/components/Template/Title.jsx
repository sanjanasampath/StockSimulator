import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";

const Title = (props) => {
  return (
    <Typography  style={{color: "#d533ed" , textAlign: "center" } } component="h2" variant="h6"  gutterBottom>
      {props.children}
    </Typography>
  );
};

Title.propTypes = {
  children: PropTypes.node,
};

export default Title;
