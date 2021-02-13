import { Client } from './Client';

export interface Queue {
  id: number;
  queueId: number;
  queueCat: QueueCat;
  clientId: number;
  client: Client;
  processed: boolean;
  position: number;
  turnAt: Date;
}

export interface QueueCat {
  id: number;
  queueName: string;
  queueTime: number;
}
