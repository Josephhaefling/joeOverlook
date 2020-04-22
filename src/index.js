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
import './images/guilitine.jpg';
import './images/creepyRoom1.jpg';
import './images/creepyRoom2.jpg';
import './images/creepyRoom3.jpg';
import './images/creepyRoom4.jpg';
import './images/creepyRoom5.jpg';
import './images/creepyRoom6.jpg';
let userLoginRepo = []
let userRepo = []
let roomRepo = []
let bookingRepo = []
let loggedInUser;
let todaysDate = new Date(Date())
let skeletInn;
$('.large-btn').click(function() {
  loginUser();
})
fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users')
.then(response => response.json())
.then(data => createUserRepo(data))
.catch(err => console.error(err))
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
    convertDate()
  })
}
let convertDate = () => {
  let newDate = []
  let date = todaysDate.toISOString().split('').slice(0, 10)
  let formattedDated = date.forEach(element => {
  if (element === '-') {
    element = '/'
  }
  newDate.push(element)
})
  return newDate.join('');
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
    let guest = new User(user, bookingRepo, convertDate(), roomRepo)
    userRepo.push(guest)
  })
}
let createHotel = (date) => {
  skeletInn = new Hotel(date, roomRepo)
  createManager(todaysDate, skeletInn, roomRepo)
  getAvailableRooms(skeletInn)
}
let createManager = (currentDate, hotel, roomRepo) => {
  let lucyPhurr = new Manager(currentDate, hotel, roomRepo)
  domUpdates.displayManagerInfo(lucyPhurr, roomRepo, bookingRepo)
  $('.see-rooms-btn').click(function() {
    getAvailableRoomInfo(roomRepo, bookingRepo)
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
  loggedInUser = currentUser
}
let verifyPassword = (userType) => {
  let passWord = $('#password').val()
  passWord === 'overlook2020' ? domUpdates.displayAppropriatePage(userType) : domUpdates.showPasswordError()
}
let getAvailableRoomInfo = (roomRepo, bookingRepo) => {
  let userRequest = new Manager($('.calander').val(), skeletInn, roomRepo)
  let formattedDate = [$('.calander').val().slice(-4), $('.calander').val().slice(0,5)].join('/')
  let userDate = new Date($('.calander').val())
  domUpdates.displayAvailableRooms(userRequest, userDate, roomRepo, bookingRepo)
  searchRooms(userRequest, convertDate(), roomRepo, bookingRepo)
  createNewBooking(userRequest, convertDate(), roomRepo, bookingRepo)
}
let searchRooms = (manager, todaysDate, roomRepo, bookingRepo) => {
  $('.search-button').click(() => {
    let availableRooms = manager.getVacantRooms(roomRepo, bookingRepo)
    availableRooms.length > 0 ? domUpdates.filterRooms($(event.target).parent(), availableRooms) : domUpdates.saySorry()
})
}
let createNewBooking = (manager, todaysDate, roomRepo, bookingRepo, currentUser) => {
  $('.room-button').click(() => {
    let roomsAvailable = manager.getVacantRooms(roomRepo, bookingRepo)
    let target = parseInt($(event.target).parent().attr('id'));
    let currentUser = loggedInUser;
    let booking = roomsAvailable.filter(room => room.number === target)
    let date = getFormattedDate(currentUser).join('')
    postBooking(currentUser, booking[0], date)
})
}
let getFormattedDate = (currentUser) => {
  let newDate = []
  let date = currentUser.todaysDate.toISOString().split('').slice(0, 10)
  let formattedDated = date.forEach(element => {
    if (element === '-') {
      element = '/'
    }
    newDate.push(element)
  })
  return newDate
}
function postBooking(currentUser, room, date) {
     fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
       body: JSON.stringify({
          userID: currentUser.userID,
          date: date,
          roomNumber: room.number
      })
     })
       .then(response => response.json())
       .catch(err => console.error(err))
       domUpdates.displayThankYou()
       refreshBookingInfo()
       domUpdates.goBackToMain()
}
let refreshBookingInfo = () => {
  fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings')
  .then(response => response.json())
  .then(data => createBookings(data))
  .catch(data => console.error())
}
