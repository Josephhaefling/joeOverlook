class Hotel {
  constructor(currentDate, roomRepo) {
    this.currentDate = new Date(currentDate);
    this.occupiedRooms = [];
    this.vacantRooms = [];
    this.allRooms = roomRepo;
  }

  upDateOcuupiedRooms() {
    console.log(this.allRooms);
  } 

  updateVacantRooms() {

  }
}

export default Hotel
