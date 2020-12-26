class Expedition extends Vacation {
    constructor (destination,length,gear) {
        super(destination,length);
        this.gear = gear;
    }


print() {
    super.print();
    console.log(`bring your ${this.gear.join("and your")}`);
}
}

const trip = new Expedition("mt w",3, [
    "sunglasses",
    "player flags",
    "camera"
]);

trip.print();

