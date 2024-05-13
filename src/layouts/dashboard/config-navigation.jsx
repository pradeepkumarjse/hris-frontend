import SvgColor from 'src/components/svg-color';



const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'dashboard',
    path: '/',
    icon: icon('ic_analytics'),
  },
  {
    title: 'User',
    path: '/user',
    icon: icon('ic_user'),
  },
  {
    title: 'Attendance',
    path: '/attendance',
    icon: icon('ic_attendance'),
  }
  ,
  {
    title: 'Leave',
    path: '/leave',
    icon: icon('ic_leave'),
  },
  {
    title: 'Logout',
    path: '/login',
    icon: icon('ic_logout'),
  }
];

export default navConfig;
