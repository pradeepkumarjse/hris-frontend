import { faker } from '@faker-js/faker';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

// import Iconify from 'src/components/iconify';
import {  useSelector } from 'react-redux';

// import AppTasks from '../app-tasks';
import AppNewsUpdate from '../app-news-update';
import AppCurrentVisits from '../app-current-visits';
import AppWidgetSummary from '../app-widget-summary';



export default function AppView() {

  const data = useSelector((state) => state.currentUser.data.currentUser);

  const roles = data.role.map((role) => role.roleName);


  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Welcome 👋 {data.firstname} {data.lastname}
      </Typography>

      {roles.includes('ADMIN') ? (

      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="In Office"
            total={20}
            color="success"
            icon={<img alt="icon" src="/assets/icons/glass/in_office.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Remote"
            total={10}
            color="info"
            icon={<img alt="icon" src="/assets/icons/glass/remote.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="On Leave"
            total={2}
            color="warning"
            icon={<img alt="icon" src="/assets/icons/glass/leave.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Absent"
            total={1}
            color="error"
            icon={<img alt="icon" src="/assets/icons/glass/absent.png" />}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AppNewsUpdate
            title="Recent Activities"
            list={[...Array(5)].map((_, index) => ({
              id: faker.string.uuid(),
              title: faker.person.jobTitle(),
              description: faker.commerce.productDescription(),
              image: `/assets/images/covers/cover_${index + 1}.jpg`,
              postedAt: faker.date.recent(),
            }))}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppCurrentVisits
            title="Today's attendance"
            chart={{
              series: [
                { label: 'Office', value: 4344 },
                { label: 'Remote', value: 5435 },
                { label: 'Leave', value: 1443 },
                { label: 'Absent', value: 4443 },
              ],
            }}
          />
        </Grid>                  
      </Grid>
       ) : <h1>hello employee</h1>}


    </Container>
  );
}
