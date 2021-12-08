import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Field, Form, Formik } from 'formik';
import {
  Alert,
  Button,
  FormControl,
  MenuItem,
  InputLabel,
  Grid,
  Paper,
  TextField,
  Select,
  Snackbar,
  Typography,
} from '@mui/material';
import { currentUser } from 'reducers/user';
import { useDispatch, useSelector } from 'react-redux';

import PageTitle from 'components/PageTitle';
import { GENDERS } from 'constants/application';
import { calculateCalories } from 'utils/calculation';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    minHeight: '70vh',
    padding: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
  container: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    minHeight: '50vh',
  },
  formFields: {
    width: theme.spacing(60),
  },
  field: {
    marginBottom: `${theme.spacing(2.5)}!important`,
    width: theme.spacing(60),
  },
  buttonContainer: {
    textAlign: 'end',
  },
}));

const CaloriesCalculatorPage = () => {
  const classes = useStyles();
  const user = useSelector(currentUser);

  const [alert, setAlert] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [initialValues, setInitialValues] = useState({ weight: 0, height: 0, calories: 0 });

  const handleUpdate = async (values, { setSubmitting }) => {
    // register(valuesIn).then(() => {
    //   setSubmitting(false);

    //   setAlert({
    //     type: 'success',
    //     message: 'Цель по калориям успешно обновлена',
    //   });
    // }).catch((error) => {
    //   setAlert({
    //     type: 'error',
    //     message: error.message,
    //   });
    // }).finally(() => {
    //   setSubmitting(false);
    // });
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
    setAlert(null);
  };

  const handleCalculateCalories = (values, setFieldValue) => {
    const { height, weight, gender } = values;

    if (height && weight && gender) {
      const calories = calculateCalories(
        user.profile.birthday,
        values.height,
        values.weight,
        values.gender,
      );

      setFieldValue('calories', calories);
    }
  };

  return (
    <>
      <PageTitle>Калькулятор калорий</PageTitle>
      <Paper className={classes.root}>
        {alert && (
          <Snackbar open={openSnackbar} onClose={handleCloseSnackbar}>
            <Alert onClose={handleCloseSnackbar} severity={alert.type} sx={{ width: '100%' }}>
              {alert.message}
            </Alert>
          </Snackbar>
        )}
        <Typography variant="h6">Введите новую цель или свои данные для расчета</Typography>
        <br />
        <Formik
          enableReinitialize
          initialValues={initialValues}
          onSubmit={handleUpdate}
        >
          {
            ({
              errors,
              values,
              dirty,
              isSubmitting,
              submitForm,
              setFieldValue,
              handleBlur,
            }) => (
              <Form>
                <Grid container className={classes.container}>
                  <Grid container className={classes.formFields}>
                    <Grid container>
                      <Field
                        as={TextField}
                        type="number"
                        name="weight"
                        label="Вес"
                        variant="outlined"
                        size="small"
                        className={classes.field}
                        InputProps={{ inputProps: { min: 0 } }}
                        fullWidth
                        required
                        onBlur={(event) => {
                          handleBlur(event);
                          handleCalculateCalories(values, setFieldValue);
                        }}
                      />
                    </Grid>
                    <Grid container>
                      <Field
                        as={TextField}
                        type="number"
                        name="height"
                        label="Рост"
                        variant="outlined"
                        size="small"
                        defaultValue="0"
                        className={classes.field}
                        InputProps={{ inputProps: { min: 0 } }}
                        fullWidth
                        required
                        onBlur={(event) => {
                          handleBlur(event);
                          handleCalculateCalories(values, setFieldValue);
                        }}
                      />
                    </Grid>
                    <FormControl
                      variant="outlined"
                      size="small"
                      required
                    >
                      <InputLabel id="gender-label">Пол</InputLabel>
                      <Field
                        name="gender"
                        as={Select}
                        id="gender-select"
                        label="Пол"
                        type="text"
                        className={classes.field}
                        fullWidth
                        value={values.gender || ''}
                        onBlur={(event) => {
                          handleBlur(event);
                          handleCalculateCalories(values, setFieldValue);
                        }}
                      >
                        {
                          Object.values(GENDERS).map((gender) => (
                            <MenuItem key={gender} value={gender}>
                              {gender}
                            </MenuItem>
                          ))
                        }
                      </Field>
                    </FormControl>
                    <Grid container>
                      <Field
                        as={TextField}
                        type="number"
                        name="calories"
                        label="Калории"
                        variant="outlined"
                        size="small"
                        className={classes.field}
                        InputProps={{ inputProps: { min: 0 } }}
                        fullWidth
                        required
                      />
                    </Grid>
                  </Grid>
                  <Grid className={classes.buttonContainer}>
                    <Button
                      variant="contained"
                      onClick={submitForm}
                      color="primary"
                      size="large"
                      disabled={!dirty || isSubmitting}
                    >
                      Сохранить
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            )
          }
        </Formik>
      </Paper>
    </>
  );
};

export default CaloriesCalculatorPage;
