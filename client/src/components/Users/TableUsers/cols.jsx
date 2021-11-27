export const columns = [
  {
    field: 'id',
    headerName: '№',
  },
  {
    field: 'email',
    headerName: 'Электронная почта',
    width: 220,
  },
  {
    width: 180,
    field: 'role',
    headerName: 'Роль',
    renderCell: (params) => (params.value.name),
  },
  {
    width: 180,
    field: 'profile',
    headerName: 'Имя (Фамилия)',
    renderCell: (params) => (`${params.value.name} (${params.value.surname})`),
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
