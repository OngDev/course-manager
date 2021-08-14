import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
//
import DashboardNavbar from './DashboardNavbar';
import DashboardSidebar from './DashboardSidebar';
import { setUpdateLoginState } from '../../apis/axios';
import * as apis from '../../apis';

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const RootStyle = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden'
});

const MainStyle = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  }
}));

// ----------------------------------------------------------------------

export default function DashboardLayout() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [profile, setProfile] = useState(null);

  setUpdateLoginState((newProfile) => {
    if (
      profile === null ||
      newProfile.fullname !== profile.fullname ||
      newProfile.email !== profile.email
    ) {
      setProfile(newProfile);
    }

    // localStorage.setItem('email', newProfile?.email || '');
    // localStorage.setItem('username', newProfile?.username || '');
  });

  useEffect(() => {
    (async function fetchUserProfile() {
      try {
        if (!(await apis.auth.profile())) {
          navigate('/login', { replace: true });
        }
      } catch (error) {
        // ignore
      }
    })();
  });

  return (
    <RootStyle>
      <DashboardNavbar profile={profile} onOpenSidebar={() => setOpen(true)} />
      <DashboardSidebar
        profile={profile}
        isOpenSidebar={open}
        onCloseSidebar={() => setOpen(false)}
      />
      <MainStyle>
        <Outlet />
      </MainStyle>
    </RootStyle>
  );
}
