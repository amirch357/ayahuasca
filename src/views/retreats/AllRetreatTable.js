
import { Box, Button, Link } from '@mui/material';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import MUIDataTable from 'mui-datatables';
import { useEffect, useState } from 'react';
import swal from "sweetalert2";
import { useRouter } from 'next/router';

const AllRetreatTable = (theme) => {
  const router = useRouter()
  
  const HandleViewBooking = (id) => {
    router.push({
      pathname: "/admin/retreats/view_bookings",
      query: { id: id },
    })
  }

  const HandleEditButton = (id) => {
    router.push({
      pathname: "/admin/retreats/editretreat",
      query: { id: id },
    })
  }

  const host = "http://localhost:3007";
  const [retreatdata, setRetreatData] = useState([]);
  const GetRetreats = async (e) => {
    await fetch(host + '/get_retreats', {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'GET',
    }).then(
      response => response.json()
    ).then(res => {
      const result = res.allretreats;
      setRetreatData(result);
    })
  };
  useEffect(() => {
    GetRetreats()
  }, []);

  const handledelete = async (id) => {
    swal.fire({
      title: "Are you sure!",
      text: "You want to delete this Retreat?",
      icon: "question",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Yes',
      denyButtonText: "Cancel",
      customClass: {
        actions: 'my-actions',
        confirmButton: 'order-1',
        denyButton: 'order-2',
      }
    }).then((result) => {
      if (result.isConfirmed) {
        fetch('http://localhost:3007/delete_retreat/' + id, {
          body: null,
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'DELETE',
        }).then(
          response => response.json()
        ).then(res => {
          if (res.msg == "success") {
            const updatedData = retreatdata.filter(retreat => retreat._id !== id);
            setRetreatData(updatedData);
            swal.fire("Success", res.response, "success");
          } else {
            swal.fire("Error", res.response, "error");
          }
        });
      } else if (result.isDenied) {
        swal.fire("Cancelled", "Your file is safe 😉", "info");
      }
    })
  }



  const rows = retreatdata.map((retreat, k) => {
    var sr = 1;
    var sr = sr + k;
    return {
      srno: sr,
      title: retreat.title,
      description: retreat.description,
      interested: retreat.interested,
      going: retreat.going,
      action:
        <Box sx={{ display: 'flex' }}>
          <Button className='primary' onClick={() => HandleViewBooking(retreat._id)} variant='outlined' color='primary'>
            View 
          </Button>
          <Button className='secondry' onClick={() => HandleEditButton(retreat._id)} variant='outlined' color='success'>
            Edit
          </Button>
          &nbsp;
          <Button className='danger' onClick={() => handledelete(retreat._id)} variant='outlined' color='error'  >
            Delete
          </Button>
        </Box>
    }
  });

  const columns = [
    {
      label: "SRNo",
      name: "srno",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      label: "Title",
      name: "title",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      label: "Description",
      name: "description",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      label: "Interested",
      name: "interested",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      label: "Going",
      name: "going",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      label: "Action",
      name: "action",
      options: {
        filter: true,
        sort: true,
      },
    },
  ];

  const options = {
    filterType: "dropdown",
    responsive: "stacked", // 'stacked' or 'scroll'
    rowsPerPage: 15,
    selectableRows: "none",
    selectableRowsOnClick: false,
    customClass: "border"
  };

  return (
    <TableContainer component={Paper}>
      <MUIDataTable
        title="Retreats"
        options={options}
        columns={columns}
        data={rows}
      />
    </TableContainer>
  )
}

export default AllRetreatTable
