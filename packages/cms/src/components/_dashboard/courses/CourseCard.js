import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Box, Card, Link, Typography, Stack, CardContent, CardMedia } from '@material-ui/core';
import { experimentalStyled as styled } from '@material-ui/core/styles';
// utils
import { makeStyles } from '@material-ui/styles';
import { fCurrency } from '../../../utils/formatNumber';
//
import Label from '../../Label';
import ColorPreview from '../../ColorPreview';

// ----------------------------------------------------------------------

const useStyles = makeStyles({
  root: {
    maxWidth: 345
  },
  media: {
    height: 150
  }
});

// ----------------------------------------------------------------------

CourseCard.propTypes = {
  course: PropTypes.object
};

export default function CourseCard({ course }) {
  const classes = useStyles();
  const { id, title, description, thumbnailUrl, videoCount } = course;

  return (
    <Card className={classes.root}>
      <CardMedia image={thumbnailUrl} title={title} className={classes.media} />
      <CardContent style={{ padding: '12px' }}>
        <Link
          to={`/dashboard/courses/${id}`}
          color="inherit"
          underline="hover"
          component={RouterLink}
        >
          <Typography variant="h6" noWrap>
            {title}
          </Typography>
        </Link>
        <Typography variant="body2" noWrap>
          {description}
        </Typography>
        <Typography variant="body2" noWrap>
          {videoCount} videos
        </Typography>
      </CardContent>
    </Card>
  );
}