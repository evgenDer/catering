export const columns = [
  {
    field: 'id',
    headerName: '№',
  },
  {
    field: 'startDate',
    headerName: 'Начальная дата',
    width: 210,
    renderCell: (params) => (`${new Date(params.value).toLocaleString().split(',')[0]}`),
  },
  {
    field: 'endDate',
    headerName: 'Конечная дата',
    width: 180,
    renderCell: (params) => (`${new Date(params.value).toLocaleString().split(',')[0]}`),
  },
  {
    field: 'sum',
    headerName: 'Выделенная сумма для всех сотрудников',
    width: 350,
    renderCell: (params) => (`${params.value} руб`),
  },
];
