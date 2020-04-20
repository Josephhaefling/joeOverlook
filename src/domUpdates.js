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

  displayManagerInfo(manager, roomRepo, bookingRepo) {
    $('.vacancies-text').text(`There are currently ${manager.getVacantRooms(roomRepo, bookingRepo).length} available rooms.`)
    $('.revenue-text').text(`Todays revenue is $${manager.getTotalRevenue(bookingRepo)}.`)
    $('.available-text').text(`${manager.getPercentageOfRoomsAvailable(roomRepo, bookingRepo)}% of our rooms are available.`)
  },

  displayUserInfo(user) {
      $('#body').css('background-image','url(../images/creepyGraveYard.jpg)')
      $('.user-header').text(`Welcome back ${user.userName.split(' ')[0]}`)
      $('.total-spent-text').text(`You have spent $${user.getTotalSpent()} with us.`)
      $('.current-bookings-text').text(`You have ${user.getCurrentBookings().length} bookings for today!`)
      $('.future-bookings-text').text(`You have ${user.getFutureBookings().length} upcoming bookings.`)
      $('.past-bookings-text').text(`You have ${user.getPastBookings().length} previous bookings.`)
  },

  displayAvailableRooms(manager, todaysDate, roomRepo, bookingRepo) {
    $('.see-rooms-btn').parent().parent().toggle('hide')
    $('.available-rooms-page').toggle('hide')
    $('.available-rooms').text(`Here are the rooms available for ${todaysDate}`)
    this.createRoomCards(manager, todaysDate, roomRepo, bookingRepo)
  },

    createRoomCards(manager, todaysDate, roomRepo, bookingRepo) {
      let vacantRooms = manager.getVacantRooms(roomRepo, bookingRepo)
      vacantRooms.forEach(room => {
        $('.room-container').prepend(
          `<section class="room-section">
           <image class="room-image" src="./images/creepyRoom1.jpg">
           <span class="room-number">Room#${room.number}</span>
           <span class="room-type">Room Type:${room.roomType}</span>
           <span class="number-beds">Beds:${room.numBeds}</span>
           <span class="bed-size">Bed Size:${room.bedSize}</span>
           </section>`
        )
      })
    }


}

export default domUpdates
