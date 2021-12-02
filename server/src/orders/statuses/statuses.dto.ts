export interface GetStatusesConfigDto {
  statuses: {
    name: string;
    id: number;
  }[];
}

export enum Statuses {
  READY = 'Готов',
  IN_PROCESS = 'В процессе проготовления',
  CONFIRMED = 'Подтвержден',
  REVIEW = 'Поступил на рассмотрение',
  DELIVERED = 'Доставлен',
}
