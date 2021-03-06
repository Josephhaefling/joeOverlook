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
    $('#ID-label').css('color', 'Red');
    $('#userID').css('box-shadow', '0px 0px 7px 2px red')
  },
  showPasswordError() {
    $('#password-label').text('Invalid Password')
    $('#password-label').css('color', 'Red')
    $('#password').css('box-shadow', '0px 0px 7px 2px red')
  },
  displayManagerInfo(manager, roomRepo, bookingRepo) {
    $('#body').css('background-color', 'rgba(32, 32, 32)')
    $('.vacancies-text').text(`There are currently ${manager.getVacantRooms(roomRepo, bookingRepo).length} available rooms.`)
    $('.revenue-text').text(`Todays revenue is $${manager.getTotalRevenue(bookingRepo)}.`)
    $('.available-text').text(`${manager.getPercentageOfRoomsAvailable(roomRepo, bookingRepo)}% of our rooms are available.`)
  },
  displayUserInfo(user) {
    // $('#body').css('background-image','none')
    $('#body').css('background-color', 'rgba(32, 32, 32, .9)')
    $('.user-header').text(`Welcome back ${user.userName.split(' ')[0]}`)
    $('.total-spent-text').text(`You have spent $${user.getTotalSpent()} with us.`)
    $('.current-bookings-text').text(`You have ${user.getCurrentBookings().length} bookings for today!`)
    $('.future-bookings-text').text(`You have ${user.getFutureBookings().length} upcoming bookings.`)
    $('.past-bookings-text').text(`You have ${user.getPastBookings().length} previous bookings.`)
  },
  displayAvailableRooms(manager, selectedDate, roomRepo, bookingRepo) {
    let date = selectedDate.toString().split(' ').slice(0, 4).join(' ')
    $('.customer-page').toggle('hide')
    $('#body').css('background-image', 'none')
    $('#body').css('background-color', 'black')
    $('.see-rooms-btn').parent().parent().toggle('hide')
    $('.available-rooms-page').toggle('hide')
    $('.available-rooms').text(`Here are the available rooms for ${date}`)
    this.createRoomCards(manager, roomRepo, bookingRepo)
  },
  createRoomCards(manager, roomRepo, bookingRepo) {
    let vacantRooms = manager.getVacantRooms(roomRepo, bookingRepo)
    vacantRooms.length > 0 ? vacantRooms.forEach(room => {
      Math.floor(Math.random() * (7 - 1)) + 1
      $('.room-container').prepend(
        `<button class="room-section" id="${room.number}">
           <div class="room-button room-image${Math.floor(Math.random() * (7 - 1)) + 1}" id="${room.number}"></div>
           <span class="room-button room-number" id="${room.number}">Room#${room.number}</span>
           <span class="room-buttonroom-type" id="${room.number}">Room Type:${room.roomType}</span>
           <span class="room-button number-beds" id="${room.number}">Beds:${room.numBeds}</span>
           <span class="room-button bed-size" id="${room.number}">Bed Size:${room.bedSize}</span>
           </button>`
      )
    }) : this.saySorry(manager)
  },
  filterRooms(event, availableRooms) {
    let inputValue = $('#room-type-drop-down').val()
    availableRooms.forEach(room => {
      if (room.roomType !== inputValue) {
        $(`#${room.number}`).toggle('hide');
      }
    });
  },
  saySorry(manager) {
    let date = manager.currentDate.toString().split(' ').slice(0, 4).join(' ');
    $('.room-container').prepend(
      `<section class="room-section" id="sorry-page">
         <span class="room-button bed-size" id="$sorry-text">We are sorry but we don't have any vacancies on ${date}</span>
         </section>`
    )
  },
  displayThankYou() {
    $('.room-container').toggle('hide')
    $(`<section class="room-section" id="thanks-page">
         <span class="room-button bed-size" id="$thanks-text">Thanks for staying with us! We look forward to having you for dinner.</span>
         <button class="back-to-main">Back to Main</button>
         </section>`).insertAfter('.search-button')
  },
  goBackToMain() {
    $('.back-to-main').click(() => {
      $('.available-rooms-page').toggle('hide')
      $(`.customer-page`).toggle('hide')
    })
  }
}
export default domUpdates
