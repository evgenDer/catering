import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
} from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
  Alert,
  Button,
  Grid,
  Typography,
  Snackbar,
} from '@mui/material';
import { makeStyles } from '@mui/styles';

import * as actions from 'actions/dishes';
import { LOCALE_TEXT } from 'constants/localeText';
import { presignedUploadUrl } from 'api/common';

import { DishPropTypes } from '../sharedPropTypes';
import { columns } from './constants';
import DishDialog from '../DishDialog';
import { createPayloadFromValues } from './utils';

const useStyles = makeStyles((theme) => ({
  table: {
    height: '80vh',
    width: '100%',
    backgroundColor: theme.appColors.white,
  },
  pageTitle: {
    marginBottom: theme.spacing(1),
  },
  toolbarContainer: {
    height: theme.spacing(7),
    justifyContent: 'space-between',
    padding: theme.spacing(0, 3),
  },
  button: {
    height: theme.spacing(4),
    marginTop: theme.spacing(2),
  },
  deleteButton: {
    color: theme.appColors.dangerous,
  },
}));

export const TableDishes = ({
  deleteDish,
  dishes,
  getAllDishes,
  createDish,
  updateDish,
}) => {
  const classes = useStyles();

  const [selectedRows, setSelectedRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [alert, setAlert] = useState(null);

  const getFileUrl = async (file) => {
    let fileUrl;

    if (file) {
      const res = await presignedUploadUrl(file.name);
      const { uploadUrl } = res.data;

      [fileUrl] = uploadUrl.split('?');

      await fetch(uploadUrl, {
        method: 'PUT',
        body: file,
      });
    }

    return fileUrl;
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
    setAlert(null);
  };

  const handleCreateDish = async (values, { setSubmitting }) => {
    try {
      const fileUrl = await getFileUrl(values.file);
      const createdDish = createPayloadFromValues(values, fileUrl);

      createDish(createdDish);

      setSubmitting(false);

      setAlert({
        type: 'success',
        message: 'Dish has been successfully created',
      });
    } catch (error) {
      setSubmitting(false);

      setAlert({
        type: 'error',
        message: error.message,
      });
    } finally {
      setOpenSnackbar(true);
      handleCloseDialog();
    }
  };

  const handleUpdateDish = async (values, { setSubmitting }) => {
    try {
      const fileUrl = await getFileUrl(values.file);
      const updatedDish = createPayloadFromValues(values, fileUrl);

      updateDish(updatedDish.id, updatedDish);

      setSubmitting(false);

      setAlert({
        type: 'success',
        message: 'Dish has been successfully updated',
      });
    } catch (error) {
      setSubmitting(false);

      setAlert({
        type: 'error',
        message: error.message,
      });
    } finally {
      setOpenSnackbar(true);
      handleCloseDialog();
    }
  };

  const handleDelete = () => {
    deleteDish(selectedRows[0]);
  };

  useEffect(() => {
    getAllDishes();
  }, []);

  const CustomToolbar = () => (
    <Grid container className={classes.toolbarContainer}>
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
      </GridToolbarContainer>
      {
        selectedRows.length <= 1 && (
          !selectedRows.length ? (
            <>
              <DishDialog
                open={open}
                onCancel={handleCloseDialog}
                onConfirm={handleCreateDish}
              />
              <Button
                startIcon={<AddIcon />}
                variant="outlined"
                className={classes.button}
                onClick={handleOpenDialog}
              >
                Добавить
              </Button>
            </>
          ) : (
            <Grid>
              <DishDialog
                initialValues={dishes.find((dish) => (dish.id === selectedRows[0]))}
                open={open}
                onCancel={handleCloseDialog}
                onConfirm={handleUpdateDish}
              />
              <Button
                startIcon={<EditIcon />}
                color="secondary"
                className={clsx(classes.button)}
                onClick={handleOpenDialog}
              >
                Редактировать
              </Button>
              <Button
                startIcon={<DeleteIcon />}
                className={clsx(classes.button, classes.deleteButton)}
                onClick={handleDelete}
              >
                Удалить
              </Button>
            </Grid>
          )
        )
      }
    </Grid>
  );

  return (
    <>
      <Typography variant="h5" className={classes.pageTitle}>Блюда</Typography>
      <div className={classes.table}>
        {alert && (
          <Snackbar open={openSnackbar} onClose={handleCloseSnackbar}>
            <Alert onClose={handleCloseSnackbar} severity={alert.type} sx={{ width: '100%' }}>
              {alert.message}
            </Alert>
          </Snackbar>
        )}
        <DataGrid
          rows={dishes}
          columns={columns}
          localeText={LOCALE_TEXT}
          checkboxSelection
          components={{
            Toolbar: CustomToolbar,
          }}
          onSelectionModelChange={(newSelection) => {
            setSelectedRows(newSelection);
          }}
        />
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  dishes: state.dishes,
});

const mapDispatchToProps = {
  getAllDishes: actions.getAllPurchasedDishes,
  deleteDish: actions.deletePurchaseDish,
  createDish: actions.createPurchaseDish,
  updateDish: actions.updatePurchaseDish,
};

TableDishes.propTypes = {
  dishes: PropTypes.arrayOf(DishPropTypes).isRequired,
  getAllDishes: PropTypes.func.isRequired,
  deleteDish: PropTypes.func.isRequired,
  createDish: PropTypes.func.isRequired,
  updateDish: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(TableDishes);
