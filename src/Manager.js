class Manager {
  constructor(todaysDate, hotel) {
    this.currentDate = todaysDate
    this.hotelRooms = hotel.allRooms
    this.todaysRevenue = 0;
    this.availableRooms = [];
    this.bookedRooms = [];
    this.todaysBookings = [];
    this.laterBookings = [];
  }

  getBookingStatus(bookingRepo) {
    bookingRepo.forEach(booking => {
        booking.bookingDate === this.currentDate ? this.todaysBookings.push(booking) : this.laterBookings.push(booking)
    })
  }

  getBookedRooms(bookingRepo) {
    this.hotelRooms.forEach(room => {
      this.todaysBookings.forEach(booking => {
        booking.roomNumber === room.number ? this.bookedRooms.push(room) : console.log();
      })
    })
  }

  getVacantRooms(roomRepo) {
    roomRepo.forEach(room => {
      this.bookedRooms.includes(room) ? console.log() : this.availableRooms.push(room)
    });
  }

  getPercentageOfRoomsAvailable() {
    return 100 - parseInt((this.bookedRooms.length / this.hotelRooms.length) * 100)
  }

  getTotalRevenue() {
    let revenueSum = this.bookedRooms.reduce((totalRev, room) => {
      totalRev += room.costPerNight
      return totalRev
    }, 0)
    this.todaysRevenue = revenueSum
    return revenueSum
  }
}

export default Manager
