import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import PaperLayout from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import Grid from '@mui/material/Grid';

import { selectCartItems, clearCart } from 'reducers/cart';
import { currentUser } from 'reducers/user';
import PageTitle from 'components/PageTitle';
import { getCurrentUser } from 'actions/user';

import { addressValidationSchema, orderValidationSchema } from './validation';
import ReviewOrder from './components/ReviewOrder';
import ReviewCart from './components/ReviewCart';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    minHeight: '70vh',
    padding: theme.spacing(4),
    marginBottom: theme.spacing(2),
    fontSize: theme.spacing(3),
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(12),
    marginLeft: theme.spacing(1),
  },
}));

const steps = ['Проверить корзину', 'Адрес доставки', 'Проверить заказ'];

const initialAddressValues = addressValidationSchema.cast();

const CartIsEmpty = () => (
  <Typography variant="h6" gutterBottom>
    Корзину пустая. Не хотите ли вы добавить в неё что-нибудь?
  </Typography>
);

const Success = () => (
  <>
    <Typography variant="h5" gutterBottom>
      Спасибо за покупку.
    </Typography>
    <Typography variant="subtitle1">
      Ваш заказ размещен. Наш менеджер свяжется с вами для подтверждения деталей.
    </Typography>
  </>
);

const renderForm = (user) => (
  <>
    <Typography variant="h6" gutterBottom>
      Адрес доставки
    </Typography>
    <Grid container spacing={1}>
      <Grid item xs={12} sm={6}>
        <Field
          as={TextField}
          name="address"
          label="Адрес доставки"
          fullWidth
          autoComplete="off"
          required
          size="small"
          minRows={3}
          multiline
        />
      </Grid>
      <Grid item xs={12} />
      <Grid item xs={12}>
        <Field
          as={TextField}
          name="comment"
          label="Комментарий"
          fullWidth
          autoComplete="off"
          multiline
          minRows={4}
        />
      </Grid>
    </Grid>
  </>
);

export default function PageCart() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const cartItems = useSelector(selectCartItems);
  const user = useSelector(currentUser);
  const isCartEmpty = !cartItems.length;
  const [address, setAddress] = useState(initialAddressValues);
  const [isFormValid, setIsFormValid] = useState(false);
  const dispatch = useDispatch();

  const totalPrice = cartItems.reduce((total, item) => (item.count * item.product.cost + total), 0);

  useEffect(() => {
    dispatch(getCurrentUser());
  }, []);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
    if (activeStep === 2) {
      const formattedValues = orderValidationSchema.cast({
        items: cartItems.map((i) => ({ productId: i.product.id, count: i.count })),
        address,
      });
      // axios.put(`${API_PATHS.order}/order`, formattedValues)
      //   .then(() => {
      //     dispatch(clearCart());
      //     setActiveStep(activeStep + 1);
      //   });
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <>
      <PageTitle>Оформление заказа</PageTitle>
      <PaperLayout className={classes.root}>
        <Stepper activeStep={activeStep} className={classes.stepper}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <>
          <Formik
            enableReinitialize={false}
            initialValues={initialAddressValues}
            validationSchema={addressValidationSchema}
            onSubmit={() => undefined}
            isInitialValid={false}
          >
            {({ values, isValid }) => {
              console.log(values, isValid);
              setAddress(values);
              setIsFormValid(isValid);
              console.log(isValid);

              return (
                <Form>
                  {isCartEmpty && activeStep === 0 && <CartIsEmpty />}
                  {activeStep === 0 && !isCartEmpty && <ReviewCart totalPrice={totalPrice} />}
                  {activeStep === 1 && renderForm()}
                  {activeStep === 2 && (
                    <ReviewOrder
                      address={address}
                      items={cartItems}
                      user={user}
                      totalPrice={totalPrice}
                    />
                  )}
                  {activeStep === 3 && <Success />}
                </Form>
              );
            }}
          </Formik>

          {activeStep <= 2 && (
            <div className={classes.buttons}>
              {activeStep !== 0 && (
                <Button onClick={handleBack} className={classes.button}>
                  Назад
                </Button>
              )}
              {!isCartEmpty && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  className={classes.button}
                  disabled={(activeStep === 1 && !isFormValid)
                    || totalPrice > user.account?.balance}
                >
                  {activeStep === steps.length - 1 ? 'Заказать' : 'Следующий'}
                </Button>
              )}
            </div>
          )}
        </>
      </PaperLayout>
    </>
  );
}
