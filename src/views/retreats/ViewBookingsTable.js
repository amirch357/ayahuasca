import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import MUIDataTable from 'mui-datatables';
import { useEffect, useState } from 'react';
import swal from "sweetalert2";
import { useRouter } from 'next/router';
import moment from 'moment';
const ViewBookingsTable = (theme) => {
  
  const router = useRouter();
  const retreat_id = router.query.id;

  const [retreatdata, setRetreatData] = useState([]);
  const GetBookings = async (e) => {
      await fetch('http://localhost:3007/retreatbooking/' + retreat_id, {
          credentials: 'include',
          headers: {
              'Content-Type': 'application/json',
          },
          method: 'POST',
      }).then(
          response => response.json()
      ).then(res => {
          const result = res.response;
          setRetreatData(result);
      })
  };
  useEffect(() => {
    GetBookings()
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
      fullname: retreat.fullname,
      email: retreat.email,
      phone: retreat.phone,
      trx_id: retreat.trx_id,
      payment: "$ "+ retreat.payment/100,
      bookedat: moment(retreat.createdAt).format("ddd, MMM DD YYYY"),
      booking_date: moment(retreat.booking_date).format("ddd, MMM DD YYYY"),
    }
  });

  const columns = [
    {
      label: "SR_No",
      name: "srno",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      label: "Who Booked",
      name: "fullname",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
        label: "Email",
        name: "email",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        label: "Phone No",
        name: "phone",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        label: "Trax Id",
        name: "trx_id",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        label: "Payed Amount",
        name: "payment",
        options: {
          filter: true,
          sort: true,
        },
      },  
      {
        label: "Booked At",
        name: "bookedat",
        options: {
          filter: true,
          sort: true,
        },
      }, 
      {
        label: "Booking For",
        name: "booking_date",
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
        title="Retreat Bookings"
        options={options}
        columns={columns}
        data={rows}
      />
    </TableContainer>
  )
}

export default ViewBookingsTable
