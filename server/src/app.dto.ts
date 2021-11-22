export interface CustomResponse {
  status: number;
  message: string;
}

export enum HttpMessages {
  CREATED = 'Created successfully',
  DELETED = 'Deleted successfully',
  UPDATED = 'Updated successfully',
}
