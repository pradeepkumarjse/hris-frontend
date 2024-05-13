import { useState, useEffect, useCallback } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';

// import Snackbar from '@mui/material/Snackbar';
// import MuiAlert from '@mui/material/Alert';


import {apiPut, apiGet, apiPost, apiDelete } from 'src/utils/apiUtils';







import Modal from '@mui/material/Modal';


// import { users } from 'src/_mock/user';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import TableNoData from '../table-no-data';
import UserTableRow from '../user-table-row';
import UserTableHead from '../user-table-head';
import TableEmptyRows from '../table-empty-rows';
import UserTableToolbar from '../user-table-toolbar';
import { emptyRows, applyFilter } from '../utils';
// import { emptyRows, applyFilter, getComparator } from '../utils';



const roles = ['Employee'];
const statuses = ['Active', 'Inactive'];
const workLocations = ['Office', 'Remote'];

// ----------------------------------------------------------------------


export default function UserPage() {
  const [page, setPage] = useState(0);

  const [userId, setUserId] = useState(0);

  const [order, setOrder] = useState('asc');



  const [users, setUsers] = useState([]);

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);



  const getUserData = useCallback(async () => {
    try {
      const userResponse = await apiGet('/api/users');

      setUsers(userResponse)

    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }, []);


  useEffect(() => {
    getUserData();


    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    role: '',
    status: '',
    workLocation: '',
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value });
  };






  const handleSubmit = async () => {
    // Perform submission logic here
    console.log('Form data submitted:', formData);

    if (userId !== 0) {
         await apiPut(`/api/users/${userId}`, {
        password: '',
        phone: formData.phone,
        email: formData.email,
        username:formData.email,
        firstname: formData.firstname,
        lastname: formData.lastname,
        status: formData.status,
        workLocation: formData.workLocation,
        role: [
          {
            roleName: formData.role,
            description: 'string',
          },
        ],
      //  role:formData.role,
        organization: {
          id: 1,
          name: "maxaix"
        }
      });

    } else {
      await apiPost('/api/users', {
        password: '',
        phone: formData.phone,
        email: formData.email,
        username:formData.email,
        firstname: formData.firstname,
        lastname: formData.lastname,
        status: formData.status,
        workLocation: formData.workLocation,
        role: [
          {
            roleName: formData.role, // Adjust for your field names
            description: 'string', // Provide a default value or fetch from the form
          },
        ],
        organization: {
          id: 1,
          name: "maxaix"
        }
      });

    }


    getUserData();





    // Reset the form and close the modal
    setFormData({
      firstname: '',
      lastname: '',
      email: '',
      phone: '',
      role: '',
      status: '',
      workLocation: '',
    });
    setOpen(false);
  };

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = users.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const handleEdit = async (id) => {
    setOpen(true);
    const userResponse = await apiGet(`/api/users/${id}`);

    setFormData(userResponse)
    setUserId(id);


  }

  const handleDelete = async (id) => {

    await apiDelete(`/api/users/${id}`);

    getUserData();


  }

  const dataFiltered = applyFilter({
    inputData: users,
    // comparator: getComparator(order, orderBy),
    // filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">User</Typography>

        <Button variant="contained" color="inherit" onClick={handleOpen} startIcon={<Iconify icon="eva:plus-fill" />}>
          Add User
        </Button>
      </Stack>

      <Card>
        <UserTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <UserTableHead
                order={order}
                orderBy={orderBy}
                rowCount={users.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'firstname', label: 'First Name' },
                  { id: 'lastname', label: 'Last Name' },
                  { id: 'email', label: 'Email' },
                  { id: 'role', label: 'Role' },
                  { id: 'isVerified', label: 'Verified', align: 'center' },
                  { id: 'status', label: 'Status' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <UserTableRow
                      key={row.userId}
                      firstname={row.firstname}
                      lastname={row.lastname}
                      email={row.email}
                      role={row.role[0]?.roleName}
                      status={row.status}
                      // company={row.company}
                      // avatarUrl={row.avatarUrl}
                      // isVerified={row.isVerified}
                      selected={selected.indexOf(row.name) !== -1}
                      handleClick={(event) => handleClick(event, row.name)}
                      handleOpen={() => handleEdit(row.userId)}
                      handleDelete={() => handleDelete(row.userId)}
                    />
                  ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, users.length)}
                />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
      <Modal open={open} onClose={handleClose} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Box
          sx={{
            width: '60%',
            marginTop: '20px',
            marginBottom: '20px',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          <h2>Add User</h2>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="First Name"
                variant="outlined"
                fullWidth
                margin="normal"
                value={formData.firstname}
                onChange={handleChange('firstname')}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Last Name"
                variant="outlined"
                fullWidth
                margin="normal"
                value={formData.lastname}
                onChange={handleChange('lastname')}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                margin="normal"
                value={formData.email}
                onChange={handleChange('email')}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Phone"
                variant="outlined"
                fullWidth
                margin="normal"
                value={formData.phone}
                onChange={handleChange('phone')}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                select
                label="Role"
                variant="outlined"
                fullWidth
                margin="normal"
                value={formData.role}
                onChange={handleChange('role')}
              >
                {roles.map((role) => (
                  <MenuItem key={role} value={role}>
                    {role}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                select
                label="Status"
                variant="outlined"
                fullWidth
                margin="normal"
                value={formData.status}
                onChange={handleChange('status')}
              >
                {statuses.map((status) => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                select
                label="Work Location"
                variant="outlined"
                fullWidth
                margin="normal"
                value={formData.workLocation}
                onChange={handleChange('workLocation')}
              >
                {workLocations.map((location) => (
                  <MenuItem key={location} value={location}>
                    {location}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
          <Grid item xs={12} style={{ textAlign: 'right' }}>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Save
            </Button> &nbsp;
            <Button variant="contained" color="primary" onClick={handleClose}>
              Close
            </Button>
          </Grid>
        </Box>
      </Modal>



    </Container>
  );
}
