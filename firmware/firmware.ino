/*
  AnalogReadSerial
  Reads an analog input on pin 0, prints the result to the serial monitor.
  Graphical representation is available using serial plotter (Tools > Serial Plotter menu)
  Attach the center pin of a potentiometer to pin A0, and the outside pins to +5V and ground.

  This example code is in the public domain.
*/
int calibration();

// the setup routine runs once when you press reset:
void setup() {
  // initialize serial communication at 9600 bits per second:
  Serial.begin(9600);
  pinMode(LED_BUILTIN, OUTPUT);
}

// the loop routine runs over and over again forever:
void loop() {
  int sensorValue= 0, cnt= 0, on= 0, off= 0;

  //start/calibrate
  digitalWrite(LED_BUILTIN, LOW);
  off= calibration();
  digitalWrite(LED_BUILTIN, HIGH);
  on= calibration();

  //test
  Serial.println(on);
  Serial.println(off);

  /*TODO :
   * define who won
   * easter eggs
   * put switch to manually increment or decrement goals
   * electricite
   */
 -
  while(1){
    sensorValue= analogRead(A0);  // Analog pin 0:
    Serial.println(sensorValue);  // Test print
    if(sensorValue <= (on+off)/2){
      //Serial.println("goal?");
      Serial.println("GOOOOOOOAL MOTHERFUCKER");
    }
    delay(10);
  }
}

int calibration(){
  double i= 0, sum= 0;
  for(i= 0; i < 100; i++){
    sum+= analogRead(A0);
    delay(100);
  }
  return sum/i;
}
