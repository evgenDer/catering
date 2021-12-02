export interface CreateOrderDto {
  address: string;
  accountId: number;
  items: [
    {
      purchasedDishId: number;
      count: number;
    },
  ];
  totalCost: number;
  comment: string;
}

export interface UpdateOrderDto {
  status: string;
}
