// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********
// An example of how you import jQuery into a JS file if you use jQuery in that file
import $ from 'jquery';
import domUpdates from './domUpdates';
import User from './User';
import Booking from './Booking';
// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/creepyCastle.jpg'
let userRepo = [];
let roomRepo = [];

$('.large-btn').click(function(event) {
  loginManager();
})

fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users')
.then(response => response.json())
.then(data => createUsers(data))
.catch(err => console.error())

setTimeout(function fetchData() {
fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms')
.then(response => response.json())
.then(data => createRooms(data))
.catch(data => console.error());
fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings')
.then(response => response.json())
.then(data => createBookings(data))
.catch(data => console.error())
})


let createUsers = (userData) => {
  userData.users.forEach(user => {
    let guest = new User(user)
    userRepo.push(guest)
  })
}

let createRooms = (roomData) => {
  roomData.rooms.forEach(room => {
  roomRepo.push(room)
  })
}

let createBookings = (bookingData) => {
  bookingData.bookings.forEach(booking => {
    let newBooking = new Booking(booking);
  })
}

let loginManager = () => {
  let userID = $('#userID').val();
  let passWord = $('#password').val()
  userID === 'manager' ? verifyPassword('manager') : verifyUser(userID)
}

let verifyUser = (userID) => {
  let currentUser = userRepo.find(user => userID === `customer${user.userID}`)
  let loginType = userID.replace(/[0-9]/g, '');
  currentUser ? verifyPassword(loginType) : domUpdates.showIDError()
}

let verifyPassword = (userType) => {
  let passWord = $('#password').val()
  passWord === 'overlook2020' ? domUpdates.displayAppropriatePage(userType) : domUpdates.showPasswordError()
}
