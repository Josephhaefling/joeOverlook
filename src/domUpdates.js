import $ from 'jQuery'

const domUpdates = {

 displayAppropriatePage(userType) {
    $('.login-container').toggle('hide')
    $(`.${userType}-page`).toggle('hide')
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
  }
}

export default domUpdates
