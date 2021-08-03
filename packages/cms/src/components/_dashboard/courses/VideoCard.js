import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Card, Link, Typography, CardContent, CardMedia } from '@material-ui/core';
// utils
import { makeStyles } from '@material-ui/styles';

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

VideoCard.propTypes = {
  video: PropTypes.object
};

export default function VideoCard({ video }) {
  const classes = useStyles();
  const { id, title, description, thumbnailUrl } = video;

  return (
    <Card className={classes.root}>
      <CardMedia image={thumbnailUrl} title={title} className={classes.media} />
      <CardContent style={{ padding: '12px' }}>
        <Link
          to={`/dashboard/videos/${id}`}
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
      </CardContent>
    </Card>
  );
}
