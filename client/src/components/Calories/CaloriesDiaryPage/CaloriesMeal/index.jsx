import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@mui/styles';
import { Button, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux';

import { createConsumption, deleteConsumption } from 'actions/consumption';
import { DishDialog } from 'components/Dishes';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    minHeight: '70vh',
    padding: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
  header: {
    ...theme.typography.h5,
    color: theme.appColors.secondary,
  },
  firstRow: {
    textAlign: 'start',
    width: theme.spacing(40),
  },
  delete: {
    color: theme.appColors.dangerous,
    padding: 0,
  },
  bottomRow: {
    fontWeight: 700,
  },
  nutrientColumn: {
    width: theme.spacing(20),
    fontSize: theme.spacing(2),
    color: theme.appColors.primary,
  },
}));

// TODO: move to constants nutrient
const CaloriesMeal = ({
  mealName,
  dishes,
  isFirstElement,
  total,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [initialValues, setInitialValues] = useState({});

  const handleDelete = (id, meal) => {
    dispatch(deleteConsumption(id, meal));
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCreate = (values, { setSubmitting }) => {
    dispatch(createConsumption(
      {
        protein: values.protein,
        fat: values.fat,
        carbohydrates: values.carbohydrates,
        name: values.name,
      },
      mealName,
      values.count,
    ));

    handleCloseDialog();
    setSubmitting(false);
    setInitialValues({});
  };

  return (
    <>
      <DishDialog
        initialValues={initialValues}
        open={open}
        onCancel={handleCloseDialog}
        onConfirm={handleCreate}
      />
      <tr className={classes.header} key={mealName}>
        <td className={clsx(classes.headerRow, classes.firstRow)}>{mealName}</td>
        {isFirstElement && (
          <>
            <td className={classes.nutrientColumn}>
              Калории (kcal)
            </td>
            <td className={classes.nutrientColumn}>
              Углеводы (гр)
            </td>
            <td className={classes.nutrientColumn}>
              Жиры (гр)
            </td>
            <td className={classes.nutrientColumn}>
              Белки (гр)
            </td>
          </>
        )}
      </tr>
      {dishes.map((dish) => (
        <tr key={dish.consumptionId}>
          <td className={classes.firstRow}>{`${dish.name} x ${dish.count}`}</td>
          <td>{dish.calories}</td>
          <td>{dish.carbohydrates}</td>
          <td>{dish.fat}</td>
          <td>{dish.protein}</td>
          <td className={classes.delete}>
            <IconButton
              className={classes.delete}
              onClick={() => handleDelete(
                dish.consumptionId,
                mealName,
              )}
            >
              <DeleteIcon />
            </IconButton>
          </td>
        </tr>
      ))}
      <tr className={classes.bottomRow}>
        <td className={classes.firstRow}>
          <Button
            onClick={handleOpenDialog}
          >
            Добавить блюдо
          </Button>
        </td>
        <td>{total.calories}</td>
        <td>{total.carbohydrates}</td>
        <td>{total.fat}</td>
        <td>{total.protein}</td>
      </tr>
    </>
  );
};

CaloriesMeal.propTypes = {
  dishes: PropTypes.arrayOf(PropTypes.shape({})),
  total: PropTypes.shape({
    calories: PropTypes.number,
    carbohydrates: PropTypes.number,
    fat: PropTypes.number,
    protein: PropTypes.number,
  }),
  mealName: PropTypes.string.isRequired,
  isFirstElement: PropTypes.bool.isRequired,
};

CaloriesMeal.defaultProps = {
  dishes: [],
  total: {
    calories: 0,
    protein: 0,
    fat: 0,
    carbohydrates: 0,
  },
};

export default CaloriesMeal;
