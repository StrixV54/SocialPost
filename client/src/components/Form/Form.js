import React from 'react';
import useStyles from './styles';
function Form(){
     const classes = useStyles();
     return(
          <h1 className={classes.form}>Form</h1>
     );
}
export default Form;