import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Box, Card, Link, Typography, Stack } from '@material-ui/core';
import { experimentalStyled as styled } from '@material-ui/core/styles';
// utils
import { fCurrency } from '../../../utils/formatNumber';
//
import Label from '../../Label';
import ColorPreview from '../../ColorPreview';

// ----------------------------------------------------------------------

const ProductImgStyle = styled('img')({
  top: 0,
  width: '100%',
  objectFit: 'contain',
  position: 'absolute'
});

// ----------------------------------------------------------------------

CourseCard.propTypes = {
  course: PropTypes.object
};

export default function CourseCard({ course }) {
  const { id, title, description, thumbnailUrl, videoCount } = course;

  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        {/* {status && ( */}
        {/*  <Label */}
        {/*    variant="filled" */}
        {/*    color={(status === 'sale' && 'error') || 'info'} */}
        {/*    sx={{ */}
        {/*      zIndex: 9, */}
        {/*      top: 16, */}
        {/*      right: 16, */}
        {/*      position: 'absolute', */}
        {/*      textTransform: 'uppercase' */}
        {/*    }} */}
        {/*  > */}
        {/*    {status} */}
        {/*  </Label> */}
        {/* )} */}
        <ProductImgStyle alt={title} src={thumbnailUrl} />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link to="#" color="inherit" underline="hover" component={RouterLink}>
          <Typography variant="subtitle2" noWrap>
            {title}
          </Typography>
        </Link>
      </Stack>
    </Card>
  );
}
