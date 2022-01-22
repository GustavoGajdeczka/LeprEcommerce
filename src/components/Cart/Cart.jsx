import React from 'react';
import { Container, Typography, Button, Grid } from '@material-ui/core';
import useStyle from './cartStyle'
import CartItem from './CartItem/CartItem';
import { Link } from 'react-router-dom';

const Cart = ({cart, onUpdateCart, onRemoveFromCart, onEmptyCart}) => {
  const classes = useStyle() 

  const EmptyCart = () => {
    return (
      <Typography variant="subtitle1">
        Você não tem items no seu carrinho, <Link to='/' className={classes.link}>comece comprando algo</Link>!
      </Typography>
    )
  }

  const FilledCart = () => {
    return (
      <>
        <Grid container spacing={3}>
          {cart.line_items.map((item) => (
            <Grid item xs={12} sm={4} key={item.id}>
              <CartItem 
                item={item} 
                onRemoveFromCart={onRemoveFromCart}
                onUpdateCart={onUpdateCart}/>
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
                onClick={() => onEmptyCart()}
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
