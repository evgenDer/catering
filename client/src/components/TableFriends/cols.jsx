export const columns = [
  {
    field: 'id',
    headerName: '№',
  },
  {
    field: 'email',
    headerName: 'Электронная почта',
    width: 260,
  },
  {
    width: 280,
    field: 'profile',
    headerName: 'Имя Фамилия',
    renderCell: (params) => (`${params.value.name} ${params.value.surname}`),
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
];
