import PropTypes from 'prop-types';
// material
import { Grid } from '@material-ui/core';
import CourseCard from './CourseCard';

// ----------------------------------------------------------------------

CourseList.propTypes = {
  courses: PropTypes.array.isRequired
};

export default function CourseList({ courses, ...other }) {
  return (
    <Grid container spacing={3} {...other}>
      {courses.map((course) => (
        <Grid key={course.id} item xs={12} sm={6} md={2}>
          <CourseCard course={course} />
        </Grid>
      ))}
    </Grid>
  );
}
