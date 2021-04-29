import React, { useCallback } from 'react';
import useSignUpForm from './CustomHooks';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import * as actions from './../Store/Actions/index';
import { connect } from 'react-redux';


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

const Login = (props) => {

  const history = useHistory();
  const SignIn = () => {
    if(inputs.email == '') {
      alert('Please enter email');
      return false;
    } else if(!validateEmail(inputs.email)) {
      alert('please enter valid email');
      return false;
    }else if (inputs.password == '') {
      alert('Please enter password');
      return false;
    } else {
      
    }
    // history.push('/dashboard');
    const loginCredentials = {
      "email": inputs.email,
      "password": inputs.password      
  }
    props.checkLogin(loginCredentials);
  }

  function validateEmail(emailField) {
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

    if (reg.test(emailField) == false) {        
      return false;
    }
    return true;
  }
  const classes = useStyles();
  const { inputs, handleInputChange, handleSubmit } = useSignUpForm({ email: '', password: '' }, SignIn);
  function doRegister() {
    // history.push('/register');
  }

  if(props.isLoggedIn) {
    
    if(props.role == 'admin') {
      history.push('/admin');
    }
    if(props.role == 'user') {
      // history.push('/user');
      history.push({
        pathname: '/user',
        state: {
          userId : props.user_id,
          isVoted: props.isVoted } // your data array of objects
      })
    }
  }
  return(
    <div>
      <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>        
        <div>
          <TextField id="" label="Email" type="email" name="email" onChange={handleInputChange} value={inputs.email} />
        </div>
        <div>
          <TextField id="" label="Password" type="password" name="password" onChange={handleInputChange} value={inputs.password} />
        </div>
        <div>
          <div>
          <Button className="btn-success" type="submit">Login</Button>
          </div>
         
          <Button variant="contained" color="secondary" onClick={doRegister} type="button">Register</Button>
                  
        </div>

      </form>
    </div>
  )
}

const mapStateToProps = state => {
  return {
      userData: state.loginReducer.userData,
      isLoggedIn: state.loginReducer.isLoggedIn,
      role: state.loginReducer.role,     
      user_id: state.loginReducer.user_id ,
      isVoted: state.loginReducer.isVoted
  };
}
const mapDispatchToProps = dispatch => {
  return {
    checkLogin: (loginCredentials) => dispatch(actions.get_userlist(loginCredentials))      
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
