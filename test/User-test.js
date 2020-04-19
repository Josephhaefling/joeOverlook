import {
  expect
} from 'chai'
import User from '../src/User.js'
import Booking from '../src/Booking'

describe('User', () => {
  let todaysDate = "2020/02/05"
  let newUser;
  let skeletInn;
  let bookingRepo = [];
  let roomRepo = [
  {"number":1,"roomType":"residential suite","bidet":true,"bedSize":"queen","numBeds":1,"costPerNight":358.4},
  {"number":2,"roomType":"suite","bidet":false,"bedSize":"full","numBeds":2,"costPerNight":477.38},
  {"number":3,"roomType":"single room","bidet":false,"bedSize":"king","numBeds":1,"costPerNight":491.14},
  {"number":4,"roomType":"single room","bidet":false,"bedSize":"queen","numBeds":1,"costPerNight":429.44},
  {"number":5,"roomType":"single room","bidet":true,"bedSize":"queen","numBeds":2,"costPerNight":340.17},
  {"number":6,"roomType":"junior suite","bidet":true,"bedSize":"queen","numBeds":1,"costPerNight":397.02},
  {"number":7,"roomType":"single room","bidet":false,"bedSize":"queen","numBeds":2,"costPerNight":231.46}
];
  let bookings = [
    {"id":"5fwrgu4i7k55hl6sz","userID":9,"date":"2020/02/05","roomNumber":1,"roomServiceCharges":[]},
    {"id":"5fwrgu4i7k55hl6t5","userID":43,"date":"2020/02/05","roomNumber":2,"roomServiceCharges":[]},
    {"id":"5fwrgu4i7k55hl6t6","userID":13,"date":"2020/02/10","roomNumber":1,"roomServiceCharges":[]},
    {"id":"5fwrgu4i7k55hl6t7","userID":20,"date":"2020/02/05","roomNumber":7,"roomServiceCharges":[]},
    {"id":"5fwrgu4i7k55hl6t8","userID":1,"date":"2020/02/07","roomNumber":1,"roomServiceCharges":[]},
    {"id":"5fwrgu4i7k55hl6t9","userID":38,"date":"2020/02/05","roomNumber":4,"roomServiceCharges":[]},
    {"id":"5fwrgu4i7k55hl6ta","userID":25,"date":"2020/01/05","roomNumber":3,"roomServiceCharges":[]},
    {"id":"5fwrgu4i7k55hl6tb","userID":49,"date":"2020/02/06","roomNumber":5,"roomServiceCharges":[]},
    {"id":"5fwrgu4i7k55hl6tc","userID":22,"date":"2020/01/30","roomNumber":3,"roomServiceCharges":[]},
    {"id":"5fwrgu4i7k55hl6td","userID":27,"date":"2020/01/31","roomNumber":2,"roomServiceCharges":[]},
    {"id":"5fwrgu4i7k55hl6te","userID":9,"date":"2020/01/19","roomNumber":7,"roomServiceCharges":[]},
    {"id":"5fwrgu4i7k55hl6tf","userID":36,"date":"2020/01/25","roomNumber":6,"roomServiceCharges":[]},
    {"id":"5fwrgu4i7k55hl6tg","userID":34,"date":"2020/02/03","roomNumber":7,"roomServiceCharges":[]},
    {"id":"5fwrgu4i7k55hl6th","userID":9,"date":"2020/02/26","roomNumber":5,"roomServiceCharges":[]},
    {"id":"5fwrgu4i7k55hl6ti","userID":6,"date":"2020/01/22","roomNumber":7,"roomServiceCharges":[]}
  ];
  let createBookingRepo = () => {
    bookings.forEach(booking => {
      let newBooking = new Booking(booking);
      bookingRepo.push(newBooking);
    });
  }

  beforeEach(() => {
    newUser = new User({"id":9,"name":"Faustino Quitzon"}, bookingRepo, todaysDate, roomRepo)
  })

  it('should be a function', () => {
    expect(User).to.be.a('function')
  })
  it('should be an instance of user', () => {
    expect(newUser).to.be.an.instanceof(User)
  })
  it('should be a able to get all user bookings', () => {
    createBookingRepo()
    expect(newUser.getAllBookings()).to.deep.equal([
      bookingRepo[0],
      bookingRepo[10],
      bookingRepo[13]
    ])
  })
  it('should be a able to get past bookings', () => {
    createBookingRepo();
    expect(newUser.getPastBookings()).to.deep.equal([bookingRepo[10]])
  })
  it('should be a able to get future bookings', () => {
    createBookingRepo();
    expect(newUser.getFutureBookings()).to.deep.equal([bookingRepo[13]])
  })
  it('should be a able to get current bookings', () => {
    createBookingRepo();
    expect(newUser.getCurrentBookings()).to.deep.equal([bookingRepo[0]])
  })
  it('should be able to get rooms that match bookings', () => {
    createBookingRepo();
    expect(newUser.getMatchingRooms()).to.deep.equal([
      {"number":1,"roomType":"residential suite","bidet":true,"bedSize":"queen","numBeds":1,"costPerNight":358.4},
      {"number":7,"roomType":"single room","bidet":false,"bedSize":"queen","numBeds":2,"costPerNight":231.46},
      {"number":5,"roomType":"single room","bidet":true,"bedSize":"queen","numBeds":2,"costPerNight":340.17}
    ])
  })
  it('should be able to get total spent at hotel', () => {
    createBookingRepo()
    expect(newUser.getTotalSpent()).to.equal(930.03)
  })
})
