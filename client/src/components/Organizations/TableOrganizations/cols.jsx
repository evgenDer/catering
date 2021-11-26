import React from 'react';

import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

export const columns = [
  {
    field: 'id',
    headerName: '№',
  },
  {
    field: 'name',
    headerName: 'Имя компании',
    width: 180,
    headerAlign: 'center',
  },
  {
    field: 'email',
    headerName: 'Электронная почта',
    width: 180,
  },
  {
    field: 'phone',
    headerName: 'Контактный телефон',
    width: 210,
  },
  {
    field: 'isActive',
    headerName: 'Активный',
    width: 120,
    renderCell: (params) => (
      params.value
        ? <CheckIcon />
        : <CloseIcon />
    ),
  },
];
