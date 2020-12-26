const sandwich = {
   bread: 'white',
   meat: 'jam',
   cheese: 'swiss',
   toppings : ["lettuce","tomato","mustard"]

}


function preparaSandwich(sandwich){

    console.log("solo tenemos el pan y la carne");
   
    const sandwish_improvisado = [sandwich.bread,sandwich.meat]
}

const regularPerson = {
    firstname : "bill",
    lastname :  "johnson",
    spouse: {
        firstname : Susan,
        lastname : James
    } 
}


const lordify = ({spouse: {firstname}}) => {
    console.log(`regularPerson.firstname} of canterbury`)
}

const skier = {
    namea,
    sound,
    powderYell() {
      let yell = this.sound.toUpperCase();
      console.log (`${yell} ${yell}`);
},
 speed(mph) {
     this.speed = mph;
     console.log("speed",mph)
 }
}



