import PropTypes from 'prop-types';
import * as React from 'react';
import { MenuItem, Select } from '@mui/material';
import { useDispatch } from 'react-redux';

import { STATUSES } from 'constants/application';
import { updateOrder } from 'actions/order';

const StatusInputCell = ({
  id,
  value,
  api,
  field,
}) => {
  const dispatch = useDispatch();

  const handleChange = (event) => {
    api.setEditCellValue({ id, field, value: event.target.value }, event);

    dispatch(updateOrder(id, event.target.value));

    api.commitCellChange({ id, field });
    api.setCellMode(id, field, 'view');
  };

  return (
    <Select
      value={value}
      onChange={handleChange}
      style={{ width: '280px' }}
      autoWidth
    >
      {
        STATUSES.map((item) => (
          <MenuItem key={item} value={item}>
            {item}
          </MenuItem>
        ))
      }
    </Select>
  );
};

StatusInputCell.propTypes = {
  /**
   * GridApi that let you manipulate the grid.
   */
  api: PropTypes.any.isRequired,
  /**
   * The column field of the cell that triggered the event
   */
  field: PropTypes.string.isRequired,
  /**
   * The grid row id.
   */
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  /**
   * The cell value, but if the column has valueGetter, use getValue.
   */
  value: PropTypes.string.isRequired,
};

export default StatusInputCell;
