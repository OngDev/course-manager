import { useEffect, useState } from 'react';
// material
import { Button, Container, Stack, Typography } from '@material-ui/core';
// components
import { Link as RouterLink } from 'react-router-dom';
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { RequestQueryBuilder } from '@nestjsx/crud-request';
import CircularProgress from '@material-ui/core/CircularProgress';
import Page from '../components/Page';
import { CourseList } from '../components/_dashboard/courses';
//
import PRODUCTS from '../_mocks_/products';
import * as apis from '../apis';

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
      limit: 20
    });
    const response = await apis.course.find(queryString.query());
    console.log(response);
    const { data: fetchedCourses, count, page: fetchedPage, pageCount } = response;
    if (count > 0) {
      setCourses(
        fetchedCourses.map(({ id, email, fullName, account: { username }, roles }) => ({
          id,
          email,
          fullName,
          username,
          roles: roles.map(({ name }) => name).join(',')
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
  // const [openFilter, setOpenFilter] = useState(false);
  //
  // const formik = useFormik({
  //   initialValues: {
  //     gender: '',
  //     category: '',
  //     colors: '',
  //     priceRange: '',
  //     rating: ''
  //   },
  //   onSubmit: () => {
  //     setOpenFilter(false);
  //   }
  // });
  //
  // const { resetForm, handleSubmit } = formik;
  //
  // const handleOpenFilter = () => {
  //   setOpenFilter(true);
  // };
  //
  // const handleCloseFilter = () => {
  //   setOpenFilter(false);
  // };
  //
  // const handleResetFilter = () => {
  //   handleSubmit();
  //   resetForm();
  // };

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
            to="/dashboard/course/create"
            startIcon={<Icon icon={plusFill} />}
          >
            New Course
          </Button>
        </Stack>

        {/* <Stack */}
        {/*  direction="row" */}
        {/*  flexWrap="wrap-reverse" */}
        {/*  alignItems="center" */}
        {/*  justifyContent="flex-end" */}
        {/*  sx={{ mb: 5 }} */}
        {/* > */}
        {/*  <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}> */}
        {/*    <CourseFilterSidebar */}
        {/*      formik={formik} */}
        {/*      isOpenFilter={openFilter} */}
        {/*      onResetFilter={handleResetFilter} */}
        {/*      onOpenFilter={handleOpenFilter} */}
        {/*      onCloseFilter={handleCloseFilter} */}
        {/*    /> */}
        {/*    <CourseSort /> */}
        {/*  </Stack> */}
        {/* </Stack> */}

        <Stack direction="column" alignItems="center">
          <CourseList courses={PRODUCTS} />
          {isLoading && <CircularProgress />}
          {canReadMore && !isLoading && (
            <Button style={{ marginTop: '24px' }} variant="contained" onClick={fetchMoreCourses}>
              More
            </Button>
          )}
        </Stack>
        {/* <ProductCartWidget /> */}
      </Container>
    </Page>
  );
}
