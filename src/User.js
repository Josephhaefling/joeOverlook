class User {
  constructor(user) {
    this.userID = user.id;
    this.userName = user.name;
    this.previousBookings = [];
    this.currentBookings = [];
  }
  getPastBookings() {
    console.log(this.user);
  }
  getCurrentBookings() {
  }
  getTotalSpent() {
  }
}
export default User;
