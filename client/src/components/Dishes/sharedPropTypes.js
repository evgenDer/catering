import PropTypes from 'prop-types';

export const DishPropTypes = PropTypes.shape({
  name: PropTypes.string,
  fat: PropTypes.string,
  protein: PropTypes.string,
  carbohydrates: PropTypes.string,
  calories: PropTypes.string,
  cost: PropTypes.string,
  count: PropTypes.number,
  imageUrl: PropTypes.string,
});
