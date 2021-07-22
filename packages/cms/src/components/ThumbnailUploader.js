import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import * as apis from '../apis';

ThumbnailUploader.propTypes = {
  initImgUrl: PropTypes.string,
  type: PropTypes.string,
  setThumbnailUrl: PropTypes.func
};

export function ThumbnailUploader({ initImgUrl, type, setThumbnailUrl }) {
  const uploadFileToStorage = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const newThumbUrl = await apis.uploader.uploadFile(type, file);
    if (newThumbUrl) {
      setThumbnailUrl(newThumbUrl);
    }
  };
  return (
    <>
      <label htmlFor="raised-button-file">
        <Button variant="raised" component="span">
          Upload
        </Button>
      </label>
      <input
        accept="image/*"
        style={{ display: 'none' }}
        id="raised-button-file"
        type="file"
        onChange={uploadFileToStorage}
      />
      {initImgUrl && <img alt="Thumbnail" src={initImgUrl} />}
    </>
  );
}
