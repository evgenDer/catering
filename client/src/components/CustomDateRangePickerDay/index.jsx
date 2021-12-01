import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/styles';
import { Field } from 'formik';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import StaticDateRangePicker from '@mui/lab/StaticDateRangePicker';
import MuiDateRangePickerDay from '@mui/lab/DateRangePickerDay';

const DateRangePickerDay = styled(MuiDateRangePickerDay)(
  ({
    theme,
    isHighlighting,
    isStartOfHighlighting,
    isEndOfHighlighting,
  }) => ({
    '& .MuiDateRangePickerDay-dayInsideRangeInterval': {
      color: `${theme.palette.common.white}!important`,
    },
    '& .MuiDateRangePickerDay-root': {
      width: theme.spacing(30),
      height: theme.spacing(20),
    },
    ...(isHighlighting && {
      borderRadius: 0,
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
      '&:hover, &:focus': {
        backgroundColor: theme.palette.primary.dark,
      },
      '& .Mui-disabled': {
        color: `${theme.palette.common.white}!important`,
      },
    }),
    ...(isStartOfHighlighting && {
      borderTopLeftRadius: '50%',
      borderBottomLeftRadius: '50%',
      '& .MuiButtonBase-root.Mui-disabled': {
        color: theme.palette.common.white,
      },
    }),
    ...(isEndOfHighlighting && {
      borderTopRightRadius: '50%',
      borderBottomRightRadius: '50%',
    }),
  }),
);

const CustomDateRangePickerDay = ({
  editable,
  startDate,
  endDate,
  handleChange,
}) => {
  const [value, setValue] = React.useState([startDate, endDate]);

  const renderWeekPickerDay = (_, dateRangePickerDayProps) => <DateRangePickerDay {...dateRangePickerDayProps} />;

  return (
    <StaticDateRangePicker
      name="range"
      displayStaticWrapperAs="desktop"
      label="dateRange"
      value={value}
      disableHighlightToday
      disabled={!editable}
      minDate={Date.now()}
      onChange={(newValue) => {
        setValue(newValue);
        handleChange(newValue);
      }}
      renderDay={renderWeekPickerDay}
      renderInput={(startProps, endProps) => (
        <>
          <TextField {...startProps} />
          <Box sx={{ mx: 2 }}> to </Box>
          <TextField {...endProps} />
        </>
      )}
    />
  );
};

CustomDateRangePickerDay.propTypes = {
  editable: PropTypes.bool,
  startDate: PropTypes.instanceOf(Date),
  endDate: PropTypes.instanceOf(Date),
  handleChange: PropTypes.func,
};

CustomDateRangePickerDay.defaultProps = {
  editable: false,
  startDate: null,
  endDate: null,
  handleChange: () => {},
};

export default CustomDateRangePickerDay;
