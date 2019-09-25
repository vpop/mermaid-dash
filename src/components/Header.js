import React from 'react';

import { ReactComponent as MermaidLogo } from '../styles/Icons/logo.svg';
import makeStyles from '@material-ui/core/styles/makeStyles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Box from '@material-ui/core/Box';
import { drawerWidth } from '../constants/summary-information';
import { LinkStyle } from '../styles/MermaidStyledComponents';

import PropTypes from 'prop-types';

const MermaidHeader = [
  { name: 'COLLECT', link: 'https://collect.datamermaid.org' },
  { name: 'ABOUT THIS DATA', link: 'https://datamermaid.org/about/' },
  { name: 'PRIVACY', link: 'https://datamermaid.org/terms-of-service/' },
  { name: 'CONTACT', link: 'https://datamermaid.org/contact/' }
];

const headerStyles = makeStyles(theme => ({
  appBarProperty: {
    background: '#2C3742',
    height: 49,
    justifyContent: 'center',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginRight: drawerWidth
  },
  toolBarProperty: {
    padding: 0
  },
  menuIconProperty: {
    margin: 0
  },
  hide: {
    display: 'none'
  }
}));

const HeaderItem = ({ children, link }) => {
  return (
    <Box p={2} fontSize={12} fontWeight="fontWeightBold">
      <LinkStyle target="_blank" href={link} rel="noopener noreferrer">
        {children}
      </LinkStyle>
    </Box>
  );
};

const HeaderItems = MermaidHeader.map(({ name, link }) => {
  return (
    <HeaderItem key={name} link={link}>
      {name}
    </HeaderItem>
  );
});

const Header = () => {
  const classes = headerStyles();

  return (
    <AppBar position="static" className={classes.appBarProperty}>
      <Toolbar className={classes.toolBarProperty}>
        <Box p={1} flexGrow={1}>
          <MermaidLogo height="38px" />
        </Box>
        {HeaderItems}
      </Toolbar>
    </AppBar>
  );
};

Header.propTypes = {
  handleDrawerChange: PropTypes.func,
  classes: PropTypes.object
};

export default Header;
