class Car{
  #brand;
  #model;  
  speed;
  isTrunkOpen;
  constructor(carDetails) {
    this.#brand = carDetails.brand;
    this.#model = carDetails.model;
    this.speed = 0;
    this.isTrunkOpen = false;
  }

  displayInfo() {
    console.log(`${this.#brand} ${this.#model}, Speed: ${this.speed} km/h Trunk is ${this.isTrunkOpen ? "Open" : "Close"}`)
  }

  go() {
    if(this.speed < 200 && this.isTrunkOpen !== true){
      this.speed += 5;
      this.displayInfo();
    }
  }

  brake() {
    if(this.speed > 0){
      this.speed -= 5;
      this.displayInfo();
    }
  }

  openTrunk() {
    if(!this.speed){
      this.isTrunkOpen = true;
    }
  }

  closeTrunk() {
    this.isTrunkOpen = false;
  }
}

class RaceCar extends Car{
  brand;
  model;
  acceleration;
  constructor(carDetails) {
    super(carDetails);
    this.acceleration = carDetails.acceleration;
    this.brand = carDetails.brand;
    this.model = carDetails.model;
  }

  displayInfo() {
    console.log(`${this.brand} ${this.model}, Speed: ${this.speed} km/h`)
  }

  go() {
    if(this.speed < 300){
      this.speed += this.acceleration;
      this.displayInfo();
    }
  }

  brake() {
    if(this.speed > 0){
      this.speed -= 5;
      this.displayInfo();
    }
  }

  openTrunk() {
    return '';
  }

  closeTrunk() {
    return '';
  }


}

const raceCar = [{
  brand: 'McLaren',
  model: 'F1',
  acceleration: 20
}].map((raceCarDetails) => {
  return new RaceCar(raceCarDetails);
});

const F1 = raceCar[0];
F1.go();
F1.openTrunk();
F1.go();

const car =[{
  brand: 'Toyota',
  model: 'Corolla'
},
{
  brand: 'Tesla',
  model: 'Model 3'
}].map((carDetails) => {
  return new Car(carDetails);
});

console.log(car);

// Display info for each car
const toyota = car[0];
const tesla = car[1];

toyota.displayInfo();
toyota.go();
tesla.openTrunk();
tesla.go();
tesla.displayInfo();
tesla.displayInfo();