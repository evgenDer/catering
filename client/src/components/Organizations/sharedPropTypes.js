import PropTypes from 'prop-types';

export const PaymentPropType = PropTypes.shape({
  id: PropTypes.number,
  startDate: PropTypes.instanceOf(Date),
  endDate: PropTypes.instanceOf(Date),
  sum: PropTypes.string,
});

export const OrganizationPropType = PropTypes.shape({
  id: PropTypes.number,
  name: PropTypes.string,
  email: PropTypes.string,
  phone: PropTypes.string,
  isActive: PropTypes.bool,
  payment: PaymentPropType,
});
