import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import PropTypes from 'prop-types';
import { useState } from 'react';
import * as apis from '../apis';
import { COURSE_THUMBNAIL_TYPE, VIDEO_THUMBNAIL_TYPE, VIDEO_TYPE } from '../constants/fileTypes';

const useStyles = makeStyles({
  root: {
    width: '100%'
  }
});

FileUploader.propTypes = {
  initUrl: PropTypes.string,
  type: PropTypes.string,
  setUrl: PropTypes.func,
  title: PropTypes.string,
  name: PropTypes.string
};

export function FileUploader({ initUrl, type, setUrl, title, name }) {
  const classes = useStyles();
  const [isUploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const uploadFileToStorage = async (event) => {
    setUploading(true);
    const file = event.target.files[0];
    if (!file) return;
    const newUrl = await apis.uploader.uploadFile(type, file, setProgress);
    if (newUrl) {
      setUrl(newUrl);
    }
    setUploading(false);
  };

  const getFileType = () =>
    type === COURSE_THUMBNAIL_TYPE || type === VIDEO_THUMBNAIL_TYPE ? 'image/*' : 'video/*';
  return (
    <>
      <label htmlFor={name}>
        <Button variant="raised" component="span">
          {title}
        </Button>
      </label>
      <input
        accept={getFileType()}
        style={{ display: 'none' }}
        id={name}
        type="file"
        onChange={uploadFileToStorage}
      />
      {isUploading && <LinearProgress variant="determinate" value={progress} />}
      {!isUploading && (
        <div className={classes.root}>
          {(type === VIDEO_THUMBNAIL_TYPE || type === COURSE_THUMBNAIL_TYPE) && initUrl && (
            <img alt="Thumbnail" width={350} src={initUrl} />
          )}
          {type === VIDEO_TYPE && initUrl && <p>Video Url {initUrl}</p>}
        </div>
      )}
    </>
  );
}
