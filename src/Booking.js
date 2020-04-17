class Booking {
  constructor(booking) {
    this.bookingId = booking.id;
    this.userID = booking.userID;
    this.bookingDate = booking.date;
    this.roomNumber = booking.roomNumber;
    this.roomServiceCharges = booking.roomServiceCharges;
  }
}

export default Booking
