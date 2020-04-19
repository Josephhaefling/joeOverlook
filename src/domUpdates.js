import $ from 'jQuery'

const domUpdates = {

  displayManagerInfo(manager) {
    this.displayVacancies(manager)
  },

 displayAppropriatePage(userType) {
    $('.login-container').toggle('hide')
    $(`.${userType}-page`).toggle('hide')
    $(`.${userType}-page`).css('display', 'grid')
  },

  showIDError() {
    $('#ID-label').text('Invalid Name');
    $('#ID-label').css('color','Red');
    $('#userID').css('box-shadow', '0px 0px 7px 2px red')
  },

  showPasswordError() {
    $('#password-label').text('Invalid Password')
    $('#password-label').css('color', 'Red')
    $('#password').css('box-shadow', '0px 0px 7px 2px red')
  },

  displayManagerInfo(manager) {
    $('.vacancies-text').text(`There are currently ${manager.availableRooms.length} available rooms.`)
    $('.revenue-text').text(`Todays revenue is $${manager.todaysRevenue}.`)
    $('.available-text').text(`${manager.getPercentageOfRoomsAvailable()}% of our rooms are available.`)
  },

  displayUserInfo(user) {
      $('#body').css('background-image','url(../images/creepyGraveYard.jpg)')
      $('.user-header').text(`Welcome back ${user.userName.split(' ')[0]}`)
      $('.total-spent-text').text(`You have spent $${user.getTotalSpent()} with us.`)
      $('.current-bookings-text').text(`You have ${user.getCurrentBookings().length} bookings for today!`)
      $('.future-bookings-text').text(`You have ${user.getFutureBookings().length} upcoming bookings.`)
      $('.past-bookings-text').text(`You have ${user.getPastBookings().length} previous bookings.`)
  }


}

export default domUpdates
