import { formatAsPrice } from 'utils/order';

export const columns = [
  {
    field: 'id',
    headerName: '№',
  },
  {
    field: 'name',
    headerName: 'Название блюда',
    width: 180,
  },
  {
    field: 'fat',
    headerName: 'Жиры',
  },
  {
    field: 'protein',
    headerName: 'Белки',
  },
  {
    field: 'carbohydrates',
    headerName: 'Углеводы',
  },
  {
    field: 'calories',
    headerName: 'Калории',
  },
  {
    field: 'count',
    headerName: 'Количество',
    width: 150,
  },
  {
    field: 'cost',
    headerName: 'Цена',
    width: 150,
    renderCell: (params) => (`${formatAsPrice(params.value)}`),
  },
];
