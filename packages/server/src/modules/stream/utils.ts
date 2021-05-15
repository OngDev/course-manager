import { VideoStreamResponseConfig } from './types';

export function generateStreamResponseConfig(
  range: string,
  videoSize: number,
): VideoStreamResponseConfig {
  const CHUNK_SIZE = 10 ** 6; // 1MB
  const start = Number(range.replace(/\D/g, ''));
  const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

  // Create headers
  const contentLength = end - start + 1;
  const headers = {
    'Content-Range': `bytes ${start}-${end}/${videoSize}`,
    'Accept-Ranges': 'bytes',
    'Content-Length': contentLength,
    'Content-Type': 'video/mp4',
  };
  return {
    headers,
    start,
    end,
  };
}
