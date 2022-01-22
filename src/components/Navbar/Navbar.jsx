import React from 'react';
import { AppBar, Toolbar, IconButton, Badge, Menu, MenuItem, Typography } from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
import useStyles from './navbarStyles';

import logo from '../../assets/leprechaun-png-128.png'

const Navbar = ({totalItems}) => {
  const classes = useStyles();
  return (
    <>
    <AppBar position="fixed" className={classes.AppBar} color="inherit">
      <Toolbar>
        <Typography variant='h6' className={classes.title} color="inherit">
          <img 
            src={logo} 
            alt="LeprEcommerce" 
            height="25px" 
            className='classes.image'/>
          LeprEcommerce
        </Typography>
        <div className={classes.grow}/>
        <div className="classes.button">
          <IconButton aria-label="Items no Carrinho" color="inherit">
            <Badge badgeContent={totalItems} color="secondary">
              <ShoppingCart/>
            </Badge>
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
    </>
  );
};

export default Navbar;
