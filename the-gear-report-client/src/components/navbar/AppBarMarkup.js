export const AppBarMarkup = (
  <Fragment>
    <AppBar
        position="fixed"
        className={classNames(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar disableGutters={!open}>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={this.handleDrawerOpen}
            className={classNames(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>

          <NavBarContents />

        </Toolbar>
      </AppBar>
  </Fragment>
)

export const MobileAppBarMarkup = (
  <AppBar
        position="fixed"
        className={classNames(classes.appBar, {
          [classes.appBarShift]: mobileOpen,
        })}
      >
        <Toolbar disableGutters={false}>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={this.handleMobileDrawerOpen}
            className={classNames(classes.menuButton, mobileOpen && classes.hide)}
          >
            <MenuIcon />
          </IconButton>

          <NavBarContents />

        </Toolbar>
      </AppBar>
)
