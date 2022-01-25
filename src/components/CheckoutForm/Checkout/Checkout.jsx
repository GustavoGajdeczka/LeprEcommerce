import React, { useState, useEffect } from 'react';
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button, CssBaseline} from '@material-ui/core'
import useStyle from './checkoutStyle'
import AdressForm from '../AdressForm';
import PaymentForm from '../PaymentForm';
import {commerce} from '../../../lib/commerce' 
import {Link, /* useHistory */} from 'react-router-dom'

const steps = ['Endereço de Entrega', 'Detalhes do Pagamento']

const Checkout = ({cart, order, onCaptureCheckout, error}) => {
  const [activeStep, setActiveStep] = useState(0)
  const [checkoutToken, setCheckoutToken] = useState(null);
  const [shippingData, setShippingData] = useState({});
  const [isFinished, setIsFinished] = useState(false);
  const classes = useStyle()
/*   const history = useHistory() */

  useEffect(() => {
    const generateToken = async () => {
      try {
        const token = await commerce.checkout.generateToken(cart.id, {type: 'cart'})
        setCheckoutToken(token)
      } catch (error) {
        console.log(error)
        /* history.pushState('/') */
      }
    }
    generateToken()
  }, [cart]);

  const nextStep = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }
  const backStep = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const next = (data) => {
    setShippingData(data);
    nextStep()
  }

  const timeOut = () => {
    setTimeout(() => {
      setIsFinished(true)
    }, 3000);
  }
  
  let Confirmation = () => order.customer ? (
    <>
      <div>
        <Typography variant="h5">Obrigado por Comprar! {order.customer.nome}</Typography>
        <Divider className={classes.divider} />
        <Typography variant="subtitle2">Compra Ref: {order.customer_reference}</Typography>
      </div>
      <br/>
      <Button component={Link} to="/" variant="outlined" type="button">Voltar para a Home</Button>
    </>
  ) : isFinished ? (
    <>
      <div>
        <Typography variant="h5">Obrigado por Comprar! </Typography>
        <Divider className={classes.divider} />
      </div>
      <br/>
      <Button component={Link} to="/" variant="outlined" type="button">Voltar para a Home</Button>
    </>

  ) : (
    <div className={classes.spinner}>
      <CircularProgress/>
    </div>
  )

  if(error){
    <>
      <Typography variant="h5">Erro: {error}</Typography>
      <br/>
      <Button component={Link} to="/" variant="outlined" type="button">Voltar para a Home</Button>
    </>
  }

  const Form = () => 
    activeStep === 0 ? <AdressForm checkoutToken={checkoutToken} next={next}/> : <PaymentForm timeOut={timeOut} shippingData={shippingData} nextStep={nextStep} checkoutToken={checkoutToken} backStep={backStep} onCaptureCheckout={onCaptureCheckout}/>
  
  return (
    <>
    <CssBaseline/>
      <div className={classes.toolbar}/>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant='h4' align="center"> Checkout </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((step) => (
              <Step key={step}>
                <StepLabel>
                  {step}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form />}
        </Paper>
      </main>
    </>
  );
};

export default Checkout;
