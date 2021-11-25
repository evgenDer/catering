import PropTypes from 'prop-types';

export const OrganizationPropType = PropTypes.shape({
  id: PropTypes.number,
  name: PropTypes.string,
  email: PropTypes.string,
  phone: PropTypes.string,
  isActive: PropTypes.bool,
});
