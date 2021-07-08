import * as Yup from 'yup';
import { Icon } from '@iconify/react';
import { useEffect, useState } from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink, useParams } from 'react-router-dom';
// material
import { Card, Stack, Button, Container, Typography } from '@material-ui/core';
// components
import { RequestQueryBuilder } from '@nestjsx/crud-request';
import Page from '../../components/Page';
//
import * as apis from '../../apis';
import {FormikProvider, useFormik} from "formik";

// ----------------------------------------------------------------------

export default function Edit() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  useEffect(() => {
    fetchUser();
  }, []);
  const fetchUser = async () => {
    const queryString = RequestQueryBuilder.create({
      join: [
        {
          field: 'account',
          select: ['username']
        },
        {
          field: 'roles',
          select: ['name']
        }
      ]
    });
    const user = await apis.user.findOne(id, queryString.query());
    const {
      account: { username },
      roles,
      ...rest
    } = user;
    console.log(user);
    setUser({
      ...rest,
      username,
      roles: roles.map(({ name }) => name).join(',')
    });

    const UserSchema = Yup.object().shape({

    })

    const formik = useFormik({
      initialValues: user,
      validationSchema
    })
  };
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
        <FormikProvider value={}>

        </FormikProvider>
        <Card />
      </Container>
    </Page>
  );
}
