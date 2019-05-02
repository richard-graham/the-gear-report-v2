import { createMuiTheme } from "@material-ui/core/styles";

const defaultTheme = createMuiTheme({ typography: { useNextVariants: true } })
const navDrawerWidth = 240;

export default {
  typography: {
    useNextVariants: true,
  },
  // form
  signupPaper: {
    width: '40%',
    [defaultTheme.breakpoints.down('sm')]: {
      width: '100%',
      margin: 30,
      minWidth: 0,
      maxWidth: 480
    },
    [defaultTheme.breakpoints.down('lg')]: {
      marginTop: 50
    },
    marginTop: 150,
    alignSelf: 'center',
    minWidth: 520,
    minHeight: 591,
  },
  loginPaper: {
    width: '40%',
    [defaultTheme.breakpoints.down('sm')]: {
      width: '100%',
      margin: 30,
      minWidth: 0,
      maxWidth: 480
    },
    [defaultTheme.breakpoints.down('lg')]: {
      marginTop: 50
    },
    marginTop: 150,
    alignSelf: 'center',
    minWidth: 520,
  },
  formHeader: {
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
  formContainer: {
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
  formError: {
    color: 'red',
    fontSize: '1rem',
  },
  //Nav
  avatar: {
    width: 30,
    height: 30,
    margin: 0,
  },
  navRoot: {
    display: 'flex',
  },
  navDrawer: {
    [defaultTheme.breakpoints.up('md')]: {
      width: navDrawerWidth,
      flexShrink: 0,
    },
  },
  navDrawerPaper: {
    width: navDrawerWidth,
  },
  navDrawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...defaultTheme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  navContent: {
    flexGrow: 1,
    padding: defaultTheme.spacing.unit * 3,
    transition: defaultTheme.transitions.create('margin', {
      easing: defaultTheme.transitions.easing.sharp,
      duration: defaultTheme.transitions.duration.leavingScreen,
    }),
    marginLeft: -navDrawerWidth,
  },
  navContentShift: {
    transition: defaultTheme.transitions.create('margin', {
      easing: defaultTheme.transitions.easing.easeOut,
      duration: defaultTheme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}