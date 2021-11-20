#include <Wire.h>
#include <LiquidCrystal_I2C.h>
LiquidCrystal_I2C lcd(0x27, 16, 2);


void setup() {
 Serial.begin(9600);
 lcd.begin();
 lcd.display();
 pinMode(34,INPUT);
}
 
 
void loop() {
  int sensor = analogRead(34);
  float volte = sensor * (5/1024.0);
    //volte = volt/800;
    volte = round_to_dp(volt,1);
  float nt = -1120.4 *( volte * volte) + (5742.3 * volte) -4352.9;
  lcd.setCursor(0, 0);
  lcd.print("turbidity:");
  lcd.println(volte);
  Serial.println(volte);
  Serial.println(nt);
  delay(500);
}
