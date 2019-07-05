import React, {useState} from 'react'
import { connect } from 'react-redux'
//import { Redirect } from 'react-router-dom'
import { authenticate, signout } from '../actions/auth'

import graphql from '../graphql/client'
import {CURRENT_USER} from '../graphql/queries'

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import {getCurrentUser} from '../actions/current_user'

import logo from '../images/logo'

import Snackbar from '../components/snackbar'

import {
  Link as RouteLink
} from 'react-router-dom'

class Login extends React.Component {
  constructor(props) {
    super(props)
  }

  handleSubmit(data) {
    const { email, password } = data //this.state
    this.props.dispatch(authenticate(email, password, ()=>{
      this.getCurrentUser()
    }))
  }

  getCurrentUser = ()=>{
    this.props.dispatch(getCurrentUser())
  }

  render() {
    const { isAuthenticated } = this.props
    if (isAuthenticated) {
      return <p>user logged! 
        <button onClick={()=>{
          this.props.dispatch(signout())
        }}>sign out</button>

        <GetUserDataButton onClick={this.getCurrentUser}>
          getUserData
        </GetUserDataButton>
      </p>
    }
    return (
      <div>
        <SignIn handleSubmit={this.handleSubmit.bind(this)}/>
        {/*<h2>Login</h2>
        <p>Email: <input type="text" value={this.state.email} onChange={(e) => this.setState({ email: e.target.value })} /></p>
        <p>Password: <input type="text" value={this.state.password} onChange={(e) => this.setState({ password: e.target.value })} /></p>
        <p><input type="submit" value="Login" onClick={this.handleSubmit.bind(this)} /></p>*/}
      </div>
    )
  }
}

function GetUserDataButton(props){
  
  props.onClick()

  return <button onClick={props.onClick}>
          getUserData
        </button>
}


function MadeWithLove() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Built with love by the'}
      <Link color="inherit" href="https://chaskiqapp.com/">
        Chasqik Team
      </Link>
      {' team.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: 'transparent',
    height: '120px',
    width: '120px',
    borderRadius: '0%'
  },
  logo: {
    height: '100%',
    width: '100%'
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function SignIn(props) {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e)=>{
    e.preventDefault()
    props.handleSubmit({email, password})
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          {/*<LockOutlinedIcon />*/}
          <img className={classes.logo} src={logo}/>
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>

        <Snackbar/>

        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e)=> setEmail(e.target.value)}
          />

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e)=> setPassword(e.target.value)}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="/forgot" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <MadeWithLove />
      </Box>
    </Container>
  );
}




function mapStateToProps(state) {
  const { auth, current_user } = state
  const { loading, isAuthenticated } = auth

  return {
    current_user,
    loading,
    isAuthenticated
  }
}

export default connect(mapStateToProps)(Login)