class Manager {
  constructor(todaysDate, hotel) {
    this.currentDate = new Date(todaysDate)
    this.hotelRooms = hotel.allRooms
    this.todaysRevenue = 0;
    this.todaysBookings = [];
    this.laterBookings = [];
  }

  getBookingStatus(bookingRepo) {
    return bookingRepo.filter(booking => booking.bookingDate.getTime() === this.currentDate.getTime())
  }

  getBookedRooms(bookingRepo) {
    let todaysBookings = this.getBookingStatus(bookingRepo)
      return todaysBookings.map(booking => {
        return this.hotelRooms.filter(room => room.number === booking.roomNumber)
    }).flat()
  }

  getVacantRooms(roomRepo, bookingRepo) {
    let todaysBookedRooms = this.getBookedRooms(bookingRepo)
    return roomRepo.filter(room => !todaysBookedRooms.includes(room))
  }

  getPercentageOfRoomsAvailable(roomRepo, bookingRepo) {
    return Math.round((this.getVacantRooms(roomRepo, bookingRepo).length / roomRepo.length) * 100)
  }

  getTotalRevenue(bookingRepo) {
    let revenueSum = this.getBookedRooms(bookingRepo).reduce((totalRev, room) => {
      totalRev += room.costPerNight
      return totalRev
    }, 0)
    this.todaysRevenue = revenueSum
    return revenueSum
  }
}

export default Manager
