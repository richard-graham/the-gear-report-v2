import { createMuiTheme } from "@material-ui/core/styles";
import { fade } from '@material-ui/core/styles/colorManipulator';

const defaultTheme = createMuiTheme({ typography: { useNextVariants: true } })
const navDrawerWidth = 240;
const navHeight = '64px'


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
  navAvatar: {
    width: 30,
    height: 30,
    margin: 0,
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
    // padding: defaultTheme.spacing.unit * 3,
    // paddingLeft: defaultTheme.spacing.unit * 6,
    // paddingRight: defaultTheme.spacing.unit * 6,
    transition: defaultTheme.transitions.create('margin', {
      easing: defaultTheme.transitions.easing.sharp,
      duration: defaultTheme.transitions.duration.leavingScreen,
    }),
    marginLeft: -navDrawerWidth,
    [defaultTheme.breakpoints.down('sm')]: {
      marginLeft: 0
    }
  },
  navContentShift: {
    transition: defaultTheme.transitions.create('margin', {
      easing: defaultTheme.transitions.easing.easeOut,
      duration: defaultTheme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  //NavBarMarkup
  navRoot: {
    width: '100%',
    display: 'flex'
  },
  navGrow: {
    flexGrow: 1,
  },
  navTitle: {
    display: 'none',
    textDecoration: 'none',
    [defaultTheme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  navSearch: {
    position: 'relative',
    borderRadius: defaultTheme.shape.borderRadius,
    backgroundColor: fade(defaultTheme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(defaultTheme.palette.common.white, 0.25),
    },
    marginRight: defaultTheme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    [defaultTheme.breakpoints.up('sm')]: {
      marginLeft: defaultTheme.spacing.unit * 3,
      width: 'auto',
    },
    [defaultTheme.breakpoints.up('md')]: {
      marginLeft: defaultTheme.spacing.unit * 3,
      width: 300,
    },
  },
  navSearchIcon: {
    width: defaultTheme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navInputRoot: {
    color: 'inherit',
    width: '100%',
  },
  navInputInput: {
    paddingTop: defaultTheme.spacing.unit,
    paddingRight: defaultTheme.spacing.unit,
    paddingBottom: defaultTheme.spacing.unit,
    paddingLeft: defaultTheme.spacing.unit * 10,
    transition: defaultTheme.transitions.create('width'),
    width: '100%',
    [defaultTheme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  navSectionDesktop: {
    display: 'none',
    [defaultTheme.breakpoints.up('md')]: {
      display: 'flex',
    },

  },
  navSectionMobile: {
    display: 'flex',
    [defaultTheme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  navAccountCircle: {
    maxWidth: 30,
    borderRadius: '50%'
  },
  // AllTickets
  allTicketsContainer: {
    padding: 15
  },
  allAlertsTable: {
    marginTop: 100,
  }
}