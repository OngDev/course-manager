import { FileUploadType } from 'src/common/enums/file-upload-type.enum';

export interface FileUpload {
  uploadFile(file: any, type: FileUploadType): any;
  downloadVideo(url: any): any;
  getVideoByRange(startTime: string, endTime): any;
  getAllFile(marker: string): any;
}
