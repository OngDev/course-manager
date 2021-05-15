import { OutgoingHttpHeaders, OutgoingHttpHeader } from 'node:http';

export interface VideoStreamResponseConfig {
  headers: OutgoingHttpHeaders | OutgoingHttpHeader[];
  start: number;
  end: number;
}
