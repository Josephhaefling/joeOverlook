class User {
  constructor(user, bookingRepo, todaysDate, roomRepo) {
    this.userID = user.id;
    this.userName = user.name;
    this.bookingRepo = bookingRepo;
    this.todaysDate = new Date(todaysDate);
    this.roomRepo = roomRepo;
  }

  getAllBookings() {
    return this.bookingRepo.filter(booking => this.userID === booking.userID)
  }

  getPastBookings() {
    let allBookings = this.bookingRepo.filter(booking => this.userID === booking.userID)
     return allBookings.filter(booking => booking.bookingDate < this.todaysDate)
  }

  getFutureBookings() {
    let allBookings = this.bookingRepo.filter(booking => this.userID === booking.userID)
     return allBookings.filter(booking => booking.bookingDate > this.todaysDate)
  }

  getCurrentBookings() {
    let allBookings = this.bookingRepo.filter(booking => this.userID === booking.userID)
     return allBookings.filter(booking => booking.bookingDate.getTime() === this.todaysDate.getTime())
  }

  getMatchingRooms() {
    let allBookings = this.getAllBookings();
    return allBookings.map(booking => {
      return this.roomRepo.filter(room => room.number === booking.roomNumber)
    }).flat()
  }

  getTotalSpent() {
    let rooms = this.getMatchingRooms()
      return rooms.reduce((totalCost, currentRoom) => {
      totalCost += currentRoom.costPerNight
      return totalCost
    }, 0)
  }
}
export default User;
