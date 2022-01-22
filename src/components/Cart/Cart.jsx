import React from 'react';
import { Container, Typography, Button, Grid } from '@material-ui/core';
import useStyle from './cartStyle'
import CartItem from './CartItem/CartItem';

const Cart = ({cart}) => {
  const classes = useStyle() 

  const EmptyCart = () => {
    return (
      <Typography variant="subtitle1">Você não tem items no seu carrinho, comece comprando algo!</Typography>
    )
  }

  const FilledCart = () => {
    return (
      <>
        <Grid container spacing={3}>
          {cart.line_items.map((item) => (
            <Grid item xs={12} sm={4} key={item.id}>
              <CartItem item={item}/>
            </Grid>
          ))}
        </Grid>
        <div className={classes.cardDetails}>
          <Typography variant='h4'>
            Subtotal: {cart.subtotal.formatted_with_symbol}
            <div>
              <Button 
                className={classes.emptyButton} 
                size="large" 
                type="button" 
                variant="contained"
                color="secondary"> Esvaziar Carrinho</Button>
              <Button 
                className={classes.checkoutButton} 
                size="large" 
                type="button" 
                variant="contained"
                color="primary">Checkout</Button>
            </div>
          </Typography>
        </div>
      </>
    )
  }

  if(!cart.line_items) return 'Loading...'

  return (
    <Container>
      <div className={classes.toolbar}/>
      <Typography className={classes.title} variant='h3' gutterBottom> 
        Seu Carrinho 
      </Typography>
      { !cart.line_items.length ? <EmptyCart /> : <FilledCart/>}
    </Container>
  );
};

export default Cart;