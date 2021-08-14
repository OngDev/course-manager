import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useState } from 'react';
// material
import { Card, Stack, Typography, TextField, Modal } from '@material-ui/core';
// components
import { Form, FormikProvider, useFormik } from 'formik';
import { LoadingButton } from '@material-ui/lab';
import { makeStyles } from '@material-ui/styles';
import { FileUploader } from '../../FileUploader';
import { VIDEO_THUMBNAIL_TYPE, VIDEO_TYPE } from '../../../constants/fileTypes';
// apis
import * as apis from '../../../apis';

const useStyles = makeStyles({
  card: {
    maxWidth: 345,
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    padding: '12px'
  }
});

// ----------------------------------------------------------------------
VideoCreateForm.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  courseId: PropTypes.string,
  onDataCreated: PropTypes.func
};

function VideoCreateForm({ open, onClose, courseId, onDataCreated }) {
  const classes = useStyles();
  const [videoThumbnailUrl, setVideoThumbnailUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');

  const VideoSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required')
  });

  const formik = useFormik({
    initialValues: {
      title: '',
      description: ''
    },
    validationSchema: VideoSchema,
    onSubmit: async (values) => {
      const data = {
        ...values,
        thumbnailUrl: videoThumbnailUrl,
        videoUrl,
        courseId
      };
      const newVideo = await apis.video.create(data);
      if (!newVideo) {
        return;
      }
      onDataCreated(newVideo);
      onClose();
    }
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

  return (
    <Modal open={open} onClose={onClose}>
      <Card className={classes.card}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            New Video
          </Typography>
        </Stack>
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <TextField
                fullWidth
                autoComplete="title"
                type="text"
                label="Title"
                {...getFieldProps('title')}
                error={Boolean(touched.title && errors.title)}
                helperText={touched.title && errors.title}
              />
              <TextField
                fullWidth
                autoComplete="description"
                type="text"
                label="Description"
                {...getFieldProps('description')}
                error={Boolean(touched.description && errors.description)}
                helperText={touched.description && errors.description}
              />
              <FileUploader
                initUrl={videoThumbnailUrl}
                type={VIDEO_THUMBNAIL_TYPE}
                setUrl={setVideoThumbnailUrl}
                title="Upload thumbnail"
                name="create-video-thumb"
              />
              <FileUploader
                initUrl={videoUrl}
                type={VIDEO_TYPE}
                setUrl={setVideoUrl}
                title="Upload video"
                name="create-video"
              />
              <LoadingButton
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                loading={isSubmitting}
              >
                Submit
              </LoadingButton>
            </Stack>
          </Form>
        </FormikProvider>
      </Card>
    </Modal>
  );
}

export default VideoCreateForm;
