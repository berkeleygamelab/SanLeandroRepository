//@program

Pins = require("pins");

/* Skins & Styles */
var MainSkin = new Skin({ fill: 'white'});
var ButtonStyle = new Style({ color: 'black', font: 'bold 50px'});

/* Behaviors */

class MainContainerBehavior extends Behavior {
	somebody(container){
		//When button clicked, change text
		let curString = container.first.string;
		container.first.string = "Hola!"
	}
	nobody(container){
		//When button clicked, change text
        let curString = container.first.string;
        container.first.string = "Adios!"
	}
	onSensorConfigured(container){
		//Once the sensor has been configured, start reading from it.
		Pins.repeat("/pir/wasPressed", 20, function(readResult){
			if ( readResult == true ) {
				application.distribute( "somebody" );
				trace ("from /gotButtonResult: pin_hi "+readResult+"\n");
			}
			if ( readResult == false )	{
				application.distribute( "nobody" );
				trace ("from /gotButtonResult: pin_lo "+readResult+"\n");
			}
		});
	}
}

let MainContainer = Container.template($ => ({
	left: 0, right: 0, top: 0, bottom: 0, skin: MainSkin,
	Behavior: MainContainerBehavior,
	contents: [
		Label($, { left: 0, right: 0, top: 0, bottom: 0, style: ButtonStyle, string: 'Cuenta Me', }),
	],
}));

/* Create message for communication with hardware pins.
   button: name of pins object, will use later for calling 'button' methods.
   require: name of js or xml bll file.
   pins: initializes 'button' (matches 'button' object in the bll)
  	   	 with the given pin numbers. Pin types and directions
  		 are set within the bll.	*/

Pins.configure({
	pir: {
		require: "pir",
        pins: {
        	ground: {pin: 51, type: "Ground"},
        	power: {pin: 52, voltage: 3.3, type: "Power"},
			PIRinput: { pin: 53 }
        }
    }
}, function(success){
	trace("Pins configuration " + (success ? "was " : "WAS NOT ") + "successful.\n");
	//tell the rest of the application that the sensor configuration is done
	if (success) application.distribute("onSensorConfigured");
});

/* Start application */
application.add( new MainContainer() );