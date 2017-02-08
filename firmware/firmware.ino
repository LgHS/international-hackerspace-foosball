#include <WS2812FX.h>

#define LED_COUNT 167
#define LED_PIN 5

// Parameter 1 = number of pixels in strip
// Parameter 2 = Arduino pin number (most are valid)
// Parameter 3 = pixel type flags, add together as needed:
//   NEO_KHZ800  800 KHz bitstream (most NeoPixel products w/WS2812 LEDs)
//   NEO_KHZ400  400 KHz (classic 'v1' (not v2) FLORA pixels, WS2811 drivers)
//   NEO_GRB     Pixels are wired for GRB bitstream (most NeoPixel products)
//   NEO_RGB     Pixels are wired for RGB bitstream (v1 FLORA pixels, not v2)
//   NEO_RGBW    Pixels are wired for RGBW bitstream (NeoPixel RGBW products)
WS2812FX ws2812fx = WS2812FX(LED_COUNT, LED_PIN, NEO_GRB + NEO_KHZ800);

String cmd = "";               // String to store incoming serial commands
boolean cmd_complete = false;  // whether the command string is complete

#define GOAL_1_LED_PIN 13
#define GOAL_1_LDR_PIN A0
#define GOAL_2_LED_PIN 12
#define GOAL_2_LDR_PIN A1

int debounce = 3000;
int treshold1  = 865;
int treshold2  = 600;
unsigned long sentTiming = -debounce;
bool ball = false;

// Strobe of shame
const int strobePotentiometerPin = A4;   // Pot connected to Pin 2 will control strobe speed.
const int strobeLedPin = 7;  // Same as the small built-in LED, also use for separate bright LED
const int minDelay = 1;   // 1/1000 of a second
const int maxDelay = 200;  //SO: That's 200/1000 right? 1/5 of a second. 5 flashes per second.
const int onTime = 500;    //SO: 500/1000000 hmm.. reduce fraction: .5/1000  1/2 of 1/1000 of a second
int potPosition = 0 ;  // Value from analogRead of the pot.  Values from 0..1023
int strobeDelay = 0;  // How long between flashes? Changed by Pot position
bool strobeIsOn = false;

void setup() {
  Serial.begin(115200);
  ws2812fx.init();
  ws2812fx.setBrightness(30);
  ws2812fx.setSpeed(200);
  ws2812fx.setColor(0x007BFF);
  ws2812fx.setMode(FX_MODE_STATIC);
  ws2812fx.start();

  pinMode(GOAL_1_LED_PIN, OUTPUT);
  digitalWrite(GOAL_1_LED_PIN, HIGH);
  pinMode(GOAL_1_LDR_PIN, INPUT);

  pinMode(GOAL_2_LED_PIN, OUTPUT);
  digitalWrite(GOAL_2_LED_PIN, HIGH);
  pinMode(GOAL_2_LDR_PIN, INPUT);

  printModes();
  printUsage();

  // Strobe of shame
  pinMode(strobeLedPin, OUTPUT); // Set up ledPins as an output.
}

void loop() {
  ws2812fx.service();

  // On Atmega32U4 based boards (leonardo, micro) serialEvent is not called
  // automatically when data arrive on the serial RX. We need to do it ourself
  #if defined(__AVR_ATmega32U4__)
  serialEvent();
  #endif

  if(cmd_complete) {
    process_command();
  }


  int readLDR = 0;
  readLDR = analogRead(GOAL_1_LDR_PIN);
  // Serial.print("1: "); Serial.println(readLDR);
  ball = readLDR > treshold1;
  if( ball && millis() > sentTiming + debounce) {
    Serial.write("G1\n");
    sentTiming = millis();
  }

  readLDR = analogRead(GOAL_2_LDR_PIN);
  //Serial.print("2: "); Serial.println(readLDR);
  ball = readLDR > treshold2;
  if( ball && millis() > sentTiming + debounce) {
    Serial.write("G2\n");
    sentTiming = millis();
  }


  // Strobe of shame
  potPosition = analogRead(strobePotentiometerPin);  // Read the pot position

  if(strobeIsOn) {
    // convert the 0 to 1023 range we get from analogRead, into our strobe delay range of 1 to 200
    strobeDelay = map(potPosition, 0, 1023, minDelay, maxDelay);
    digitalWrite(strobeLedPin, HIGH); // Switch the ledPin to HIGH, turn it on!
    delayMicroseconds(onTime); // Delay while on, for onTime.
    digitalWrite(strobeLedPin, LOW); // Switch the ledPin to LOW, turn if off!
    delay(strobeDelay); // Delay while off, for strobeDelay
  }
}

/*
 * Checks received command and calls corresponding functions.
 */
void process_command() {
  if(cmd == F("b+")) {
    ws2812fx.increaseBrightness(25);
    Serial.print(F("Increased brightness by 25 to: "));
    Serial.println(ws2812fx.getBrightness());
  }

  if(cmd == F("b-")) {
    ws2812fx.decreaseBrightness(25);
    Serial.print(F("Decreased brightness by 25 to: "));
    Serial.println(ws2812fx.getBrightness());
  }

  if(cmd.startsWith(F("b "))) {
    uint8_t b = (uint8_t) cmd.substring(2, cmd.length()).toInt();
    ws2812fx.setBrightness(b);
    Serial.print(F("Set brightness to: "));
    Serial.println(ws2812fx.getBrightness());
  }

  if(cmd == F("s+")) {
    ws2812fx.increaseSpeed(10);
    Serial.print(F("Increased speed by 10 to: "));
    Serial.println(ws2812fx.getSpeed());
  }

  if(cmd == F("s-")) {
    ws2812fx.decreaseSpeed(10);
    Serial.print(F("Decreased speed by 10 to: "));
    Serial.println(ws2812fx.getSpeed());
  }

  if(cmd.startsWith(F("s "))) {
    uint8_t s = (uint8_t) cmd.substring(2, cmd.length()).toInt();
    ws2812fx.setSpeed(s);
    Serial.print(F("Set speed to: "));
    Serial.println(ws2812fx.getSpeed());
  }

  if(cmd.startsWith(F("m "))) {
    uint8_t m = (uint8_t) cmd.substring(2, cmd.length()).toInt();
    ws2812fx.setMode(m);
    Serial.print(F("Set mode to: "));
    Serial.print(ws2812fx.getMode());
    Serial.print(" - ");
    Serial.println(ws2812fx.getModeName(ws2812fx.getMode()));
  }

  if(cmd.startsWith(F("c "))) {
    uint32_t c = (uint32_t) strtol(&cmd.substring(2, cmd.length())[0], NULL, 16);
    ws2812fx.setColor(c);
    Serial.print(F("Set color to: "));
    Serial.println(ws2812fx.getColor(), HEX);
  }

  cmd = "";              // reset the commandstring
  cmd_complete = false;  // reset command complete
}

/*
 * Prints a usage menu.
 */
void printUsage() {
  Serial.println(F("Usage:"));
  Serial.println();
  Serial.println(F("m <n> \t : select mode <n>"));
  Serial.println();
  Serial.println(F("b+ \t : increase brightness"));
  Serial.println(F("b- \t : decrease brightness"));
  Serial.println(F("b <n> \t : set brightness to <n>"));
  Serial.println();
  Serial.println(F("s+ \t : increase speed"));
  Serial.println(F("s- \t : decrease speed"));
  Serial.println(F("s <n> \t : set speed to <n>"));
  Serial.println();
  Serial.println(F("c 0x007BFF \t : set color to 0x007BFF"));
  Serial.println();
  Serial.println();
  Serial.println(F("Have a nice day."));
  Serial.println(F("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"));
  Serial.println();
}


/*
 * Prints all available WS2812FX blinken modes.
 */
void printModes() {
  Serial.println(F("Supporting the following modes: "));
  Serial.println();
  for(int i=0; i < ws2812fx.getModeCount(); i++) {
    Serial.print(i);
    Serial.print(F("\t"));
    Serial.println(ws2812fx.getModeName(i));
  }
  Serial.println();
}


/*
 * Reads new input from serial to cmd string. Command is completed on \n
 */
void serialEvent() {
  while(Serial.available()) {
    char inChar = (char) Serial.read();
    if(inChar == '\n') {
      cmd_complete = true;
    } else {
      cmd += inChar;
    }
  }
}
