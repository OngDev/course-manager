
export class Video {
  id: string  ;
  authorName: string
  date: string;
  timeVideo : number;
  titleVideo: string;

  constructor (data: any = {}){
    this.id = data?.id || '';
    this.authorName = data?.name || '';
    this.date = data?.icon || '';
    this.timeVideo = data?.timeVideo || '';
    this.titleVideo = data?.title || '';
  }
}
