/*-----( Declare Pin Numbers )-----*/

const int potentiometerPin = A4;   // Pot connected to Pin 2 will control strobe speed.
const int ledPin = 7;  // Same as the small built-in LED, also use for separate bright LED

/*-----( Declare Constant Values )-----*/

// Set the minimum delay between flashes in milliseconds (thousandths of a second)
const int minDelay = 1;   // 1/1000 of a second

const int maxDelay = 200;  //SO: That's 200/1000 right? 1/5 of a second. 5 flashes per second.

// How long should the each flash be?
const int onTime = 500;    //SO: 500/1000000 hmm.. reduce fraction: .5/1000  1/2 of 1/1000 of a second

/*-----( Declare Variables )-----*/

int potPosition = 0 ;  // Value from analogRead of the pot.  Values from 0..1023 
int strobeDelay = 0;  // How long between flashes? Changed by Pot position

void setup()   /****** SETUP: RUNS ONCE AT THE BEGINNING ******/
{
  pinMode(ledPin, OUTPUT); // Set up ledPins as an output.
  }//--(end setup )---


void loop()   /****** LOOP: RUNS CONSTANTLY ******/
{
  potPosition = analogRead(potentiometerPin);  // Read the pot position
  
  // convert the 0 to 1023 range we get from analogRead, into our strobe delay range of 1 to 200 
  strobeDelay = map(potPosition, 0, 1023, minDelay, maxDelay);

/*---( Blink the LED ON and OFF )-----*/
  digitalWrite(ledPin, HIGH); // Switch the ledPin to HIGH, turn it on!
  delayMicroseconds(onTime); // Delay while on, for onTime.
  digitalWrite(ledPin, LOW); // Switch the ledPin to LOW, turn if off!
  delay(strobeDelay); // Delay while off, for strobeDelay

}//--(end main loop )---

//*********( THE END )***********
