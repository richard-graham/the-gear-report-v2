import { createMuiTheme } from "@material-ui/core/styles";

const defaultTheme = createMuiTheme({ typography: { useNextVariants: true } })

export default {
  typography: {
    useNextVariants: true,
  },
  // signup
  signupPaper: {
    width: '40%',
    [defaultTheme.breakpoints.down('sm')]: {
      width: '100%',
      margin: 30,
      minWidth: 0,
      maxWidth: 480
    },
    marginTop: 150,
    alignSelf: 'center',
    minWidth: 520,
    minHeight: 591,
  },
  signupHeader: {
    fontSize: 35,
    padding: 20,
    margin: 20,
  },
  loginHeader: {
    fontSize: 35,
    padding: 20,
    margin: 20,
    marginBottom:   80
  },
  signupTextField: {
    margin: defaultTheme.spacing.unit,
    width: '60%',
    minWidth: 336,
    [defaultTheme.breakpoints.down('sm')]: {
      minWidth: 0,
      maxWidth: 336,
      width: '85%'
    }
  },
  signupContainer: {
    width: '100%',
    heigh: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  signupButton: {
    margin: defaultTheme.spacing.unit * 4,
    marginBottom: defaultTheme.spacing.unit * 6
  },
  loginButton: {
    margin: defaultTheme.spacing.unit * 4,

  },
  signupMultiButton: {
    margin: defaultTheme.spacing.unit * 2,
    marginTop: defaultTheme.spacing.unit * 4,
    marginBottom: defaultTheme.spacing.unit * 6
  },
  signupError: {
    color: 'red',
    fontSize: '1rem',
    // margin: '10px auto'
  },
}