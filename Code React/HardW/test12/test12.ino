#include <Wire.h> 
#include <LiquidCrystal_I2C.h>
#include <OneWire.h>
#include <DallasTemperature.h>
#define ONE_WIRE_BUS 16//กำหนดขาที่จะเชื่อมต่อ Sensor
OneWire oneWire(ONE_WIRE_BUS);
DallasTemperature sensors(&oneWire);
 
// Set the LCD address to 0x27 for a 16 chars and 2 line display
LiquidCrystal_I2C lcd(0x27, 16, 2);
int sensorPin = 34;
float volt;
float ntu;

 
void setup()
{
  Serial.begin(9600);
  lcd.begin();
  Serial.println("Dallas Temperature IC Control Library");
  sensors.begin();
  // Turn on the blacklight and print a message.
  lcd.backlight();
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
    }else{
      ntu = -1120.4*sq(volt)+5742.3*volt-4353.8; 
    }
   /* lcd.clear();
    lcd.setCursor(0,0);
    lcd.print(volt);
    lcd.print(" V");
 */
    lcd.setCursor(0,0);
    lcd.print(ntu);
    lcd.print(" NTU");
    delay(10);
    Serial.println(volt);
    Serial.println(ntu);

    Serial.println("Requesting temperatures...");
    sensors.requestTemperatures(); //อ่านข้อมูลจาก library
    Serial.print("Temperature is: ");
    Serial.print(sensors.getTempCByIndex(0)); // แสดงค่า อูณหภูมิ 
    Serial.println(" *C");
    lcd.setCursor(0,1);
    lcd.print(sensors.getTempCByIndex(0));
    lcd.println(" *C");
    delay(1000);
}
 
float round_to_dp( float in_value, int decimal_place )
{
  float multiplier = powf( 10.0f, decimal_place );
  in_value = roundf( in_value * multiplier ) / multiplier;
  return in_value;
}
