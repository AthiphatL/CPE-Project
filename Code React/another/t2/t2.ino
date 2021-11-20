#include <Wire.h> 
#include <LiquidCrystal_I2C.h>
#include <math.h>

// Set the LCD address to 0x27 for a 16 chars and 2 line display
LiquidCrystal_I2C lcd(0x27, 16, 2);
int sensorPin = 34;
float volt;
float ntu;
//int red = 8;
//int yell = 9;
//int green = 10;
void setup()
{
  Serial.begin(9600);

 // pinMode(red,OUTPUT);
 // pinMode(yell,OUTPUT);
 // pinMode(green,OUTPUT);
//  lcd.init();
  lcd.backlight();
  lcd.setCursor(1,0);
  lcd.print("Turibidity Sensor");
}

void loop()
{
    
    volt = 0;
    for(int i=0; i<800; i++)
    {
        volt += ((float)analogRead(sensorPin)/1023)*5;
    }
    volt = volt/800;
    volt = round_to_dp(volt,1);
    if(volt < 2.5){
      ntu = 3000;
      //ntu = -1120.4*square(volt)+5742.3*volt-4353.8; 
    }else{
     
      //ntu = -1120.4*square(volt)+5742.3*volt-4353.8;
      //ntu = 3000; 
    }

if(ntu < 700 ){
    //digitalWrite(green,HIGH);
    //digitalWrite(red,LOW);
    //digitalWrite(yell,LOW);
    lcd.clear(); 
    lcd.setCursor(1,0);
    lcd.print("Turibidity Sensor");
    lcd.setCursor(0,1);
    lcd.print(volt);
   lcd.print(" V"); 
   // lcd.setCursor(0,2);
   // lcd.print(ntu);
   // lcd.print(" NTU");
  //  lcd.setCursor(5,3);
   // lcd.print("Very Good");
    delay(100); 
    }else{ 
    lcd.clear(); 
    lcd.setCursor(1,0);
    lcd.print("Turibidity Sensor");
    lcd.setCursor(0,1);
    lcd.print(volt);
    lcd.print(" V"); 
   // lcd.setCursor(0,2);
   // lcd.print(ntu);
   // lcd.print(" NTU");
    //lcd.setCursor(5,3);
    //lcd.print("Very Bad");
    delay(100); 
    }
}
float round_to_dp( float in_value, int decimal_place )
{
  float multiplier = powf( 10.0f, decimal_place );
  in_value = roundf( in_value * multiplier ) / multiplier;
  return in_value;
}
