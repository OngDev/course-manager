import { OutgoingHttpHeaders, OutgoingHttpHeader } from 'http';

export interface VideoStreamResponseConfig {
  headers: OutgoingHttpHeaders | OutgoingHttpHeader[];
  start: number;
  end: number;
}
