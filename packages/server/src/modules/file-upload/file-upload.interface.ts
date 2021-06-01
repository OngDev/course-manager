export interface FileUpload {
  uploadVideo(file: any): any;
  downloadVideo(url: any): any;
  getVideoByRange(startTime: string, endTime): any;
}
