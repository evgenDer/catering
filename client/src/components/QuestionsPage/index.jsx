import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Field, Form, Formik } from 'formik';
import {
  Alert,
  Button,
  Grid,
  Paper,
  TextField,
  Snackbar,
  Typography,
} from '@mui/material';

import PageTitle from 'components/PageTitle';
import { sendQuestionEmail } from 'api/email';

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
    width: theme.spacing(80),
  },
  field: {
    width: theme.spacing(80),
  },
  buttonContainer: {
    textAlign: 'end',
  },
}));

const QuestionPage = () => {
  const classes = useStyles();

  const [alert, setAlert] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [initialValues, setInitialValues] = useState({});

  const handleUpdate = async (values, { setSubmitting }) => {
    try {
      await sendQuestionEmail(values);

      setAlert({
        type: 'success',
        message: 'Сообщение успешно отправлено',
      });

      setInitialValues({ message: '' });
    } catch (error) {
      setAlert({
        type: 'error',
        message: error.message,
      });
    } finally {
      setOpenSnackbar(true);
      setSubmitting(false);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
    setAlert(null);
  };
  return (
    <>
      <PageTitle>Страница вопроса</PageTitle>
      <Paper className={classes.root}>
        {alert && (
          <Snackbar open={openSnackbar} onClose={handleCloseSnackbar}>
            <Alert onClose={handleCloseSnackbar} severity={alert.type} sx={{ width: '100%' }}>
              {alert.message}
            </Alert>
          </Snackbar>
        )}
        <Typography variant="h6">Введите вопрос организации</Typography>
        <br />
        <Formik
          enableReinitialize
          initialValues={initialValues}
          onSubmit={handleUpdate}
        >
          {
            ({
              dirty,
              isSubmitting,
              submitForm,
            }) => (
              <Form>
                <Grid container className={classes.container}>
                  <Grid container className={classes.formFields}>
                    <Grid container>
                      <Field
                        as={TextField}
                        name="message"
                        label="Вопрос организации"
                        variant="outlined"
                        size="small"
                        className={classes.field}
                        minRows={6}
                        multiline
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
                      Отправить
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

export default QuestionPage;
