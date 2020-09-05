import { WebhookSupportMethod } from '../webhookSupportMethod.enu';

export interface WebhookOptions {
  url: string;
  method: 'get' | 'post';
  header: Record<string, any>;
  requestBuilder?: (payload: any) => Record<string, any>;
}
