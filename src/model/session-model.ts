export interface SessionModel {
  _id: string;
  from: string;
  botNumber: string;
  createdAt: Date;
  updatedAt: Date;
  finishedAt?: Date;
}
