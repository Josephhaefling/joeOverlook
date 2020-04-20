// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********
// An example of how you import jQuery into a JS file if you use jQuery in that file
import $ from 'jquery';
import domUpdates from './domUpdates';
import User from './User';
import Booking from './Booking';
import Hotel from './Hotel';
import Manager from './Manager';
// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/creepyCastle.jpg';
import './images/creepyGraveYard.jpg';
import './images/revenue.jpg';
import './images/vacancy.jpg';
import './images/theBlackLodge.jpg';
let userLoginRepo = []
let userRepo = []
let roomRepo = []
let bookingRepo = []
let todaysDate = '2020/02/05'

$('.large-btn').click(function() {
  loginUser();
})

fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users')
.then(response => response.json())
.then(data => createUserRepo(data))
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


let createUserRepo = (userData) => {
  userData.users.forEach(user => {
    userLoginRepo.push(user)
  })
}

let createRooms = (roomData) => {
  roomData.rooms.forEach(room => {
  roomRepo.push(room)
  })
}

let createBookings = (bookingData) => {
  bookingData.bookings.forEach(booking => {
    let newBooking = new Booking(booking)
    bookingRepo.push(newBooking)
  })
  createUsers(userLoginRepo)
  createHotel('2020/02/05')
}

let createUsers = (userLoginRepo) => {
  userLoginRepo.forEach(user => {
    let guest = new User(user, bookingRepo, todaysDate, roomRepo)
    userRepo.push(guest)
  })
}

let createHotel = (date) => {
  let skeletInn = new Hotel(date, roomRepo)
  createManager(todaysDate, skeletInn, roomRepo)
  getAvailableRooms(skeletInn)
}

let createManager = (currentDate, hotel, roomRepo) => {
  let lucyPhurr = new Manager(currentDate, hotel, roomRepo)
  // lucyPhurr.getBookingStatus(bookingRepo)
  // lucyPhurr.getBookedRooms(bookingRepo)
  // lucyPhurr.getVacantRooms(roomRepo)
  // lucyPhurr.getTotalRevenue()
  // lucyPhurr.getPercentageOfRoomsAvailable()
  domUpdates.displayManagerInfo(lucyPhurr, roomRepo, bookingRepo)
  $('.see-rooms-btn').click(function() {
    getAvailableRoomInfo(lucyPhurr, roomRepo, bookingRepo)
  })
}

let loginUser = () => {
  let userID = $('#userID').val();
  userID === 'manager' ? verifyPassword('manager') : verifyUser(userID)
}

let verifyUser = (userID) => {
  let currentUser = userRepo.find(user => userID === `customer${user.userID}`)
  let loginType = userID.replace(/[0-9]/g, '');
  currentUser ? verifyPassword(loginType) : domUpdates.showIDError()
  domUpdates.displayUserInfo(currentUser)
  // currentUser.getPastBookings()
  // currentUser.getCurrentBookings()
}

let verifyPassword = (userType) => {
  let passWord = $('#password').val()
  passWord === 'overlook2020' ? domUpdates.displayAppropriatePage(userType) : domUpdates.showPasswordError()
}

let getAvailableRoomInfo = (manager, roomRepo,bookingRepo) => {
  manager.getBookedRooms(bookingRepo);
  domUpdates.displayAvailableRooms(manager)
}
