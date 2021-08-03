import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
// material
import { Card, Stack, Container, Typography, TextField, Grid, Button } from '@material-ui/core';
// components
import { Form, FormikProvider, useFormik } from 'formik';
import { LoadingButton } from '@material-ui/lab';
import { RequestQueryBuilder } from '@nestjsx/crud-request';
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import Page from '../../components/Page';
import { FileUploader } from '../../components/FileUploader';
import { COURSE_THUMBNAIL_TYPE } from '../../constants/fileTypes';
// apis
import * as apis from '../../apis';
import VideoCard from '../../components/_dashboard/courses/VideoCard';
import VideoCreateForm from '../../components/_dashboard/courses/VideoCreateForm';

// ----------------------------------------------------------------------

export default function Edit() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [course, setCourse] = useState();
  const [videos, setVideos] = useState([]);
  const [isVideoModelOpen, setVideoModelOpen] = useState(false);
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  useEffect(() => {
    async function fetchCourse() {
      const queryString = RequestQueryBuilder.create({
        join: {
          field: 'videos'
        }
      });
      const course = await apis.course.findOne(id, queryString.query());
      if (!course) navigate('/dashboard/courses', { replace: true });
      formik.initialValues = {
        title: course.title,
        description: course.description
      };
      setCourse(course);
      setVideos(course.videos);
      setThumbnailUrl(course.thumbnailUrl);
    }
    fetchCourse();
  }, []);

  const CourseSchema = Yup.object().shape({
    title: Yup.string().required('Full name is required'),
    description: Yup.string().required('Username is required')
  });

  const formik = useFormik({
    initialValues: course,
    enableReinitialize: true,
    validationSchema: CourseSchema,
    onSubmit: async (values) => {
      // const data = {
      //   ...values,
      //   thumbnailUrl
      // };
      // const newCourse = await apis.course.create(data);
      // if (!newCourse) {
      //   return;
      // }
      // navigate('/dashboard/courses', { replace: true });
    }
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;
  const closeVideoForm = (e, reason) => {
    if (reason !== 'backdropClick') setVideoModelOpen(false);
  };
  return (
    <Page title="List | Minimal-UI">
      <Container>
        <VideoCreateForm open={isVideoModelOpen} onClose={closeVideoForm} />
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Edit Course
          </Typography>
        </Stack>
        {course && (
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
                  initUrl={thumbnailUrl}
                  type={COURSE_THUMBNAIL_TYPE}
                  setUrl={setThumbnailUrl}
                  title="Upload thumbnail"
                  name="edit-course-thumb"
                />
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                  <Typography variant="h5" gutterBottom>
                    Videos
                  </Typography>
                  <Button
                    variant="contained"
                    onClick={() => setVideoModelOpen(true)}
                    startIcon={<Icon icon={plusFill} />}
                  >
                    Add video
                  </Button>
                </Stack>
                {videos && (
                  <Grid container spacing={3}>
                    {videos.map((video) => (
                      <Grid key={video.id} item xs={12} sm={6} md={3}>
                        <VideoCard video={video} />
                      </Grid>
                    ))}
                  </Grid>
                )}
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
        )}
        <Card />
      </Container>
    </Page>
  );
}
