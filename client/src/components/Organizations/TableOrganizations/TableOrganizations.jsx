import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { DataGrid } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import {
  Alert,
  Button,
  Grid,
  Typography,
  Snackbar,
} from '@mui/material';
import { makeStyles } from '@mui/styles';

import * as actions from 'actions/organizations';
import { LOCALE_TEXT } from 'constants/localeText';

import { OrganizationPropType } from '../sharedPropTypes';
import { columns } from './cols';
import OrganizationDialog from '../OrganizationDialog';

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
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 3),
  },
  button: {
    marginTop: theme.spacing(2),
    height: theme.spacing(4),
  },
}));

export const TableOrganizations = ({
  organizations,
  getAllOrganizations,
  createOrganization,
  updateOrganization,
}) => {
  const classes = useStyles();

  const [selectedRows, setSelectedRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [alert, setAlert] = useState(null);

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

  const handleCreate = async (values, { setSubmitting }) => {
    try {
      await createOrganization(values);

      setSubmitting(false);

      setAlert({
        type: 'success',
        message: 'Organization has been successfully created',
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

  const handleUpdate = async (values, { setSubmitting }) => {
    try {
      await updateOrganization(values.id, values);

      setSubmitting(false);

      setAlert({
        type: 'success',
        message: 'Organization has been successfully updated',
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

  useEffect(() => {
    getAllOrganizations();
  }, []);

  const CustomToolbar = () => (
    <Grid container className={classes.toolbarContainer}>
      {
        selectedRows.length <= 1 && (
          !selectedRows.length ? (
            <>
              <OrganizationDialog
                open={open}
                onCancel={handleCloseDialog}
                onConfirm={handleCreate}
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
              <OrganizationDialog
                initialValues={organizations.find((organization) => (organization.id === selectedRows[0]))}
                open={open}
                onCancel={handleCloseDialog}
                onConfirm={handleUpdate}
              />
              <Button
                startIcon={<EditIcon />}
                color="secondary"
                className={clsx(classes.button)}
                onClick={handleOpenDialog}
              >
                Редактировать
              </Button>
            </Grid>
          )
        )
      }
    </Grid>
  );

  return (
    <>
      <Typography variant="h5" className={classes.pageTitle}>Организации</Typography>
      <div className={classes.table}>
        {alert && (
          <Snackbar open={openSnackbar} onClose={handleCloseSnackbar}>
            <Alert onClose={handleCloseSnackbar} severity={alert.type} sx={{ width: '100%' }}>
              {alert.message}
            </Alert>
          </Snackbar>
        )}
        <DataGrid
          rows={organizations}
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
  organizations: state.organizations,
});

const mapDispatchToProps = {
  getAllOrganizations: actions.getAllOrganizations,
  createOrganization: actions.createOrganization,
  updateOrganization: actions.updateOrganization,
};

TableOrganizations.propTypes = {
  organizations: PropTypes.arrayOf(OrganizationPropType).isRequired,
  getAllOrganizations: PropTypes.func.isRequired,
  createOrganization: PropTypes.func.isRequired,
  updateOrganization: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(TableOrganizations);
