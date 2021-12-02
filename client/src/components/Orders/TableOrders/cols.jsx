import React from 'react';

import StatusInputCell from './StatusInputCell';

export const columns = [
  {
    field: 'id',
    headerName: '№',
  },
  {
    field: 'address',
    headerName: 'Адрес',
    width: 200,
  },
  {
    field: 'purchaseDish',
    headerName: 'Блюдо',
    renderCell: (params) => (params.value.dish.name),
    width: 200,
  },
  {
    field: 'account',
    headerName: 'Заказчик',
    renderCell: ({ value }) => (`${value.profile.name} ${value.profile.surname} (${value.profile.phone})`),
    width: 250,
  },
  {
    field: 'status',
    headerName: 'Статус заказа',
    renderEditCell: (params) => (
      <StatusInputCell
        {...params}
        value={params.value.name || params.value}
      />
    ),
    renderCell: (params) => (params.value.name),
    editable: true,
    width: 280,
  },
  {
    width: 180,
    field: 'createdAt',
    headerName: 'Создан',
    renderCell: (params) => `${new Date(params.value).toLocaleString()}`,
  },
  {
    width: 180,
    field: 'updatedAt',
    headerName: 'Обновлен',
    renderCell: (params) => `${new Date(params.value).toLocaleString()}`,
  },
  {
    field: 'comment',
    headerName: 'Комментарий',
    width: 230,
  },
];
