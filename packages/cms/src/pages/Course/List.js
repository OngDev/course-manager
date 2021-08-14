import { useEffect, useState } from 'react';
// material
import { Button, Container, Stack, Typography } from '@material-ui/core';
// components
import { Link as RouterLink } from 'react-router-dom';
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { RequestQueryBuilder } from '@nestjsx/crud-request';
import CircularProgress from '@material-ui/core/CircularProgress';
import Page from '../../components/Page';
import { CourseList } from '../../components/_dashboard/courses';
//
import * as apis from '../../apis';

// ----------------------------------------------------------------------

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [canReadMore, setCanReadMore] = useState(true);
  const fetchData = async () => {
    setIsLoading(true);
    const queryString = RequestQueryBuilder.create({
      page,
      limit: 20,
      join: {
        field: 'videos',
        select: ['id']
      }
    });
    const response = await apis.course.find(queryString.query());
    const { data: fetchedCourses, count, page: fetchedPage, pageCount } = response;
    if (count > 0) {
      setCourses(
        fetchedCourses.map(({ id, title, description, thumbnailUrl, videos }) => ({
          id,
          title,
          description,
          videoCount: videos.length,
          thumbnailUrl
        }))
      );
    }
    setCanReadMore(fetchedPage < pageCount);
    setPage(fetchedPage);
    setIsLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);
  const fetchMoreCourses = async () => {
    setPage(page + 1);
    await fetchData();
  };
  return (
    <Page title="Courses">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Courses
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="/dashboard/courses/create"
            startIcon={<Icon icon={plusFill} />}
          >
            New Course
          </Button>
        </Stack>

        <Stack direction="column" alignItems="center">
          <CourseList courses={courses} />
          {isLoading && <CircularProgress />}
          {canReadMore && !isLoading && (
            <Button style={{ marginTop: '24px' }} variant="contained" onClick={fetchMoreCourses}>
              More
            </Button>
          )}
        </Stack>
      </Container>
    </Page>
  );
}
