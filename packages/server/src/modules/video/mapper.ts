import { VideoDTO } from './dto/video';
import Video from './model';

export function mapVideoToVideoDTO(video: Video): VideoDTO {
  const { title, description, thumbnailUrl, videoUrl, publishAt } = video;
  return {
    title,
    description,
    thumbnailUrl,
    videoUrl,
    publishAt: publishAt.toLocaleString(),
  };
}
