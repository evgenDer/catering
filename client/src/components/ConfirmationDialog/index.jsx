import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  dialogTitle: {
    color: theme.appColors.secondary,
    fontWeight: 'bold',
  },
  dialogText: {
    color: theme.appColors.secondary,
  },
  btnCancel: {
    color: theme.appColors.dangerous,
  },
}));

const ConfirmationDialog = ({
  classesProp,
  open,
  title,
  contentText,
  onCancel: handleCancel,
  onConfirm: handleConfirm,
  children,
  isConfirmButtonDisabled,
  maxWidth,
  hideCancelButton,
}) => {
  const classes = useStyles();

  return (
    <Dialog
      classes={{ paper: clsx(classesProp.rootPaper) }}
      open={open}
      onClose={handleCancel}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth={maxWidth}
    >
      <DialogTitle className={clsx(classes.dialogTitle, classesProp.title)}>
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          className={clsx(classes.dialogText, classesProp.contentText)}
        >
          {contentText}
        </DialogContentText>
        {children}
      </DialogContent>
      <DialogActions className={clsx(classesProp.buttonsContainer)}>
        {!hideCancelButton && (
          <Button
            className={clsx(classes.btnCancel, classesProp.cancelButton)}
            onClick={handleCancel}
            autoFocus
          >
            Отменить
          </Button>
        )}
        <Button
          className={clsx(classesProp.confirmButton)}
          onClick={handleConfirm}
          color="secondary"
          disabled={isConfirmButtonDisabled}
        >
          Сохранить
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ConfirmationDialog.propTypes = {
  classesProp: PropTypes.shape({
    rootPaper: PropTypes.string,
    title: PropTypes.string,
    contentText: PropTypes.string,
    buttonsContainer: PropTypes.string,
    cancelButton: PropTypes.string,
    confirmButton: PropTypes.string,
  }),
  open: PropTypes.bool.isRequired,
  title: PropTypes.string,
  contentText: PropTypes.node,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  children: PropTypes.node,
  isConfirmButtonDisabled: PropTypes.bool,
  maxWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  hideCancelButton: PropTypes.bool,
};

ConfirmationDialog.defaultProps = {
  classesProp: {},
  title: undefined,
  contentText: '',
  children: undefined,
  isConfirmButtonDisabled: false,
  maxWidth: false,
  hideCancelButton: false,
};

export default ConfirmationDialog;
