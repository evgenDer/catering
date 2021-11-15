import PropTypes from 'prop-types';

export const DishPropTypes = PropTypes.shape({
  name: PropTypes.string.isRequired,
  fat: PropTypes.number.isRequired,
  protein: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
  calories: PropTypes.number.isRequired,
  cost: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
  imageUrl: PropTypes.string,
});
