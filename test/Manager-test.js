import {
  expect
} from 'chai'
import Manager from '../src/Manager.js'
import Hotel from '../src/Hotel'
import Booking from '../src/Booking'

describe('Manager', () => {
  let lucyPhurr;
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
    {"id":"5fwrgu4i7k55hl6te","userID":44,"date":"2020/01/19","roomNumber":7,"roomServiceCharges":[]},
    {"id":"5fwrgu4i7k55hl6tf","userID":36,"date":"2020/01/25","roomNumber":6,"roomServiceCharges":[]},
    {"id":"5fwrgu4i7k55hl6tg","userID":34,"date":"2020/02/03","roomNumber":7,"roomServiceCharges":[]},
    {"id":"5fwrgu4i7k55hl6th","userID":19,"date":"2020/02/26","roomNumber":5,"roomServiceCharges":[]},
    {"id":"5fwrgu4i7k55hl6ti","userID":6,"date":"2020/01/22","roomNumber":7,"roomServiceCharges":[]}
  ];

  let createBookingRepo = () => {
    bookings.forEach(booking => {
      let newBooking = new Booking(booking);
      bookingRepo.push(newBooking);
    });
  }

  beforeEach(() => {
    skeletInn = new Hotel('2020/02/05', roomRepo)
    lucyPhurr = new Manager('2020/02/05', skeletInn)
  })

  it('should be a function', () => {
    expect(Manager).to.be.a('function')
  })
  it('should be an instance of Manager', () => {
    expect(lucyPhurr).to.be.an.instanceof(Manager)
  })
  it.only('should be able to get todays bookings', () => {
    createBookingRepo()
    expect(lucyPhurr.getBookingStatus(bookingRepo)).to.deep.equal([
      bookingRepo[0],
      bookingRepo[1],
      bookingRepo[3],
      bookingRepo[5]
    ])
  })
  it('should get booked rooms', () => {
    createBookingRepo()
    expect(lucyPhurr.getBookedRooms(bookingRepo)).to.deep.equal([
      roomRepo[0],
      roomRepo[1],
      roomRepo[6],
      roomRepo[3]
    ])
  })
  it('should get vacant rooms', () => {
    createBookingRepo();
    expect(lucyPhurr.getVacantRooms(roomRepo, bookingRepo)).to.deep.equal([
      roomRepo[2],
      roomRepo[4],
      roomRepo[5]
    ])
  })
  it('should get the percentage of available rooms', () => {
    createBookingRepo()
    // let bookedRooms = lucyPhurr.getBookedRooms(bookingRepo)
    // let getVacantRooms = lucyPhurr.getVacantRooms(roomRepo, bookingRepo)
    expect(lucyPhurr.getPercentageOfRoomsAvailable(roomRepo, bookingRepo)).to.equal(43)
  })
  it('should get the total revenue for today.', () => {
    createBookingRepo();
    expect(lucyPhurr.getTotalRevenue(bookingRepo)).to.equal(1496.68)
  })
})
