// import React, { useEffect , useState } from 'react'
// import axios from "axios";
// import Swal from 'sweetalert2'
// import Error from "../components/Error";
// import Loader from "../components/Loader";
// import Success from '../components/Success'
// import StripeCheckout from 'react-stripe-checkout'

// import moment from "moment"
// import AOS from 'aos';
// import 'aos/dist/aos.css';
// AOS.init();
// AOS.refresh()
// function Bookingscreen({match}) {
//     const[loading, setloading]=useState(true);
//     const[error, seterror]=useState(false)
//     const[success, setsuccess]=useState(false)   
//     const[room , setroom]=useState()
//     const roomid=match.params.roomid
//     const fromdate=moment(match.params.fromdate , 'DD-MM-YYYY')
//     const todate=moment(match.params.todate,'DD-MM-YYYY')
//     const totalDays = moment.duration(todate.diff(fromdate)).asDays()+1
//     const [totalAmount , settotalAmount]=useState()
//     useEffect(async() => {
        
//         try {
//             setloading(true);
//             const data = await (await axios.post("http://localhost:5000/api/rooms/getroombyid" , {roomid})).data;
//             console.log(data);
//             setroom(data);
//             setloading(false);
//             settotalAmount(data.rentperday * totalDays)
//           } catch (error) {
//             console.log(error);
//             setloading(false);
//           }
          
//     }, [])


//     async function tokenHander(token) {
    
//         console.log(token);
//         const bookingDetails ={

//             token ,
//             user : JSON.parse(localStorage.getItem('currentUser')),
//             room ,
//             fromdate,
//             todate,
//             totalDays,
//             totalAmount

//         }


//         try {
//             setloading(true);
//             const result = await axios.post('http://localhost:5000/api/bookings/bookroom' , bookingDetails)
//             setloading(false)
//             Swal.fire('Congrats' , 'Your Room has booked succeessfully' , 'success').then(result=>{
//                 window.location.href='/profile'
//             })
//         } catch (error) {
//             console.log(error);
//             setloading(false)
//             Swal.fire('Oops' , 'Something went wrong , please try later' , 'error')
//         }
        
//     }

//     return (
//         <div className='m-5'>
            
            

//                 <div className="row p-3 mb-5 bs" data-aos='flip-right' duration='2000'>

//                       <div className="col-md-6 my-auto">
                        
//                          <div>
//                          <h1> {room.name}</h1>
//                            <img src={room.imageurls[0]} style={{height:'400px'}} />
//                          </div>

//                       </div>
//                       <div className="col-md-6 text-right">
//                            <div>
//                            <h1><b>Booking Details</b></h1>
//                            <hr />

//                            <p><b>Name</b> : {JSON.parse(localStorage.getItem('currentUser')).name}</p>
//                            <p><b>From Date</b> : {match.params.fromdate}</p>
//                            <p><b>To Date</b> : {match.params.todate}</p>
//                            <p><b>Max Count </b>: {room.maxcount}</p>
//                            </div>
                           
//                            <div className='mt-5'>
//                            <h1><b>Amount</b></h1>
//                            <hr />
//                            <p>Total Days : <b>{totalDays}</b></p>
//                            <p>Rent Per Day : <b>{room.rentperday}</b></p>
//                            <h1><b>Total Amount : {totalAmount} /-</b></h1>

//                            <StripeCheckout
//             amount={totalAmount*100}
//             shippingAddress
//             token={tokenHander}
//             stripeKey='pk_test_51IYnC0SIR2AbPxU0TMStZwFUoaDZle9yXVygpVIzg36LdpO8aSG8B9j2C0AikiQw2YyCI8n4faFYQI5uG3Nk5EGQ00lCfjXYvZ'
//             currency='INR'
//             >

                  
//                   <button className='btn btn-primary'>Pay Now</button>

//             </StripeCheckout>
//                            </div>
                          

                           
//                       </div>

//                 </div>

            
        
//         </div>
//     )
// }

// export default Bookingscreen




import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import StripeCheckout from 'react-stripe-checkout';
import moment from 'moment';
import AOS from 'aos';
import 'aos/dist/aos.css';

import Error from '../components/Error';
import Loader from '../components/Loader';
import Success from '../components/Success';

import 'bootstrap/dist/css/bootstrap.min.css';

AOS.init();

function Bookingscreen({ match }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [room, setRoom] = useState({});
  const [totalAmount, setTotalAmount] = useState(0);

  const roomid = match.params.roomid;
  const fromdate = moment(match.params.fromdate, 'DD-MM-YYYY');
  const todate = moment(match.params.todate, 'DD-MM-YYYY');
  const totalDays = moment.duration(todate.diff(fromdate)).asDays() + 1;

  useEffect(() => {
    async function fetchRoomData() {
      try {
        setLoading(true);
        const response = await axios.post(
          'http://localhost:5000/api/rooms/getroombyid',
          { roomid }
        );
        const data = response.data;
        setRoom(data);
        setTotalAmount(data.rentperday * totalDays);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError(true);
        setLoading(false);
      }
    }

    fetchRoomData();
  }, [roomid, totalDays]);

  async function handleToken(token) {
    const bookingDetails = {
      token,
      user: JSON.parse(localStorage.getItem('currentUser')),
      room,
      fromdate,
      todate,
      totalDays,
      totalAmount,
    };

    try {
      setLoading(true);
      const result = await axios.post(
        'http://localhost:5000/api/bookings/bookroom',
        bookingDetails
      );
      setLoading(false);

      if (result.status === 200) {
        setSuccess(true);
        Swal.fire('Success', 'Your room has been booked successfully!', 'success').then((result) => {
          window.location.href = '/profile';
        });
      } else {
        setError(true);
        Swal.fire('Error', 'Something went wrong. Please try again later.', 'error');
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
      setError(true);
      Swal.fire('Error', 'Something went wrong. Please try again later.', 'error');
    }
  }

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Error />;
  }

  if (success) {
    return <Success />;
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <h1>{room.name}</h1>
          <img src={room.imageurls[0]} alt={room.name} style={{ height: '400px' }} />
        </div>
        <div className="col-md-6">
          <h1 className="text-right">Booking Details</h1>
          <hr />
          <p><b>Name:</b> {JSON.parse(localStorage.getItem('currentUser')).name}</p>
          <p><b>From Date:</b> {match.params.fromdate}</p>
          <p><b>To Date:</b> {match.params.todate}</p>
          <p><b>Max Count:</b> {room.maxcount}</p>

          <div className="mt-5">
            <h1 className="text-right">Amount</h1>
            <hr />
            <p>Total Days: <b>{totalDays}</b></p>
            <p>Rent Per Day: <b>{room.rentperday}</b></p>
            <h1 className="text-right">Total Amount: {totalAmount} /-</h1>
          </div>

          <div className="text-right mt-4">
            <StripeCheckout
              amount={totalAmount * 100}
              shippingAddress
              token={handleToken}
              // stripeKey="pk_test_51IYnC0SIR2AbPxU0TMStZwFUoaDZle9yXVygpVIzg36LdpO8aSG8B9j2C0AikiQw2YyCI8n4faFYQI5uG3Nk5EGQ00lCfjXYvZ"
              stripeKey='pk_test_51Nw9EVSEfXr9xpANMzKuJXZjMJrhQ4Aq7lSleWLc78k5JjoMFI4JqD2rJeEmsPOeolT9mByCzcUJYyqoJQeSwX4q00lIiKddLO'
              currency="INR"
            >
              <button className="btn btn-primary">Pay Now</button>
            </StripeCheckout>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Bookingscreen;
