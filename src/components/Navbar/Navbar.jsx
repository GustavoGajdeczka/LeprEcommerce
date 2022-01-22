import React from 'react';
import { AppBar, Toolbar, IconButton, Badge, Menu, MenuItem, Typography } from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
import useStyles from './navbarStyles';
import { Link, useLocation } from 'react-router-dom';

import logo from '../../assets/leprechaun-png-128.png'

const Navbar = ({totalItems}) => {
  const classes = useStyles();
  const location = useLocation();

  if(location.pathname === '/'){

  }
  return (
    <>
    <AppBar position="fixed" className={classes.AppBar} color="inherit">
      <Toolbar>
        <Typography component={Link} to="/" variant='h6' className={classes.title} color="inherit">
          <img 
            src={logo} 
            alt="LeprEcommerce" 
            height="25px" 
            className='classes.image'/>
          LeprEcommerce
        </Typography>
        <div className={classes.grow}/>
        {location.pathname === '/' && (
        <div className="classes.button">
            <IconButton component={Link} to="/cart" aria-label="Items no Carrinho" color="inherit">
              <Badge badgeContent={totalItems} color="secondary">
                <ShoppingCart/>
              </Badge>
            </IconButton>
        </div> )}
      </Toolbar>
    </AppBar>
    </>
  );
};

export default Navbar;
