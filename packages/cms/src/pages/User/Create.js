import * as Yup from 'yup';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// material
import {
  Card,
  Stack,
  Button,
  Container,
  Typography,
  TextField,
  FormControlLabel,
  FormGroup
} from '@material-ui/core';
// components
import { Form, FormikProvider, useFormik } from 'formik';
import { LoadingButton } from '@material-ui/lab';
import Page from '../../components/Page';
//
import * as apis from '../../apis';
import { ODCheckbox } from '../../components/ODCheckbox';

// ----------------------------------------------------------------------

export default function Create() {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isMod, setIsMod] = useState(false);
  const [isSupporter, setIsSupporter] = useState(false);

  const UserSchema = Yup.object().shape({
    fullName: Yup.string().required('Full name is required'),
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required')
  });

  const formik = useFormik({
    initialValues: {
      fullName: '',
      username: '',
      email: ''
    },
    validationSchema: UserSchema,
    onSubmit: async (values) => {
      const roles = [];
      if (isAdmin) roles.push('ADMIN');
      if (isSupporter) roles.push('SUPPORTER');
      if (isMod) roles.push('MOD');

      const newUser = await apis.user.create({
        ...values,
        roles
      });
      console.log(`New user ${newUser.username}`);
      navigate('/dashboard/user', { replace: true });
    }
  });

  const handleChange = (event) => {
    switch (event.target.name) {
      case 'isAdmin':
        setIsAdmin(event.target.checked);
        if (event.target.checked) {
          setIsMod(false);
          setIsSupporter(false);
        }
        break;
      case 'isMod':
        setIsMod(event.target.checked);
        break;
      case 'isSupporter':
        setIsSupporter(event.target.checked);
        break;
      default:
        break;
    }
  };

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  return (
    <Page title="List | Minimal-UI">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Edit User
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="#"
            startIcon={<Icon icon={plusFill} />}
          >
            New List
          </Button>
        </Stack>
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <TextField
                fullWidth
                autoComplete="username"
                type="text"
                label="Username"
                {...getFieldProps('username')}
                error={Boolean(touched.username && errors.username)}
                helperText={touched.username && errors.username}
              />
              <TextField
                fullWidth
                autoComplete="fullName"
                type="text"
                label="Full name"
                {...getFieldProps('fullName')}
                error={Boolean(touched.fullName && errors.fullName)}
                helperText={touched.fullName && errors.fullName}
              />
              <TextField
                fullWidth
                autoComplete="email"
                type="email"
                label="Email"
                {...getFieldProps('email')}
                error={Boolean(touched.email && errors.email)}
                helperText={touched.email && errors.email}
              />
              <FormControlLabel
                control={<ODCheckbox checked={isAdmin} onChange={handleChange} name="isAdmin" />}
                label="Is Admin"
              />
              <FormGroup row>
                <FormControlLabel
                  disabled={isAdmin}
                  control={<ODCheckbox checked={isMod} onChange={handleChange} name="isMod" />}
                  label="Is Mod"
                />
                <FormControlLabel
                  disabled={isAdmin}
                  control={
                    <ODCheckbox checked={isSupporter} onChange={handleChange} name="isSupporter" />
                  }
                  label="Is Supporter"
                />
              </FormGroup>
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
        <Card />
      </Container>
    </Page>
  );
}
