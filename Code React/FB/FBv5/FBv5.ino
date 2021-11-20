#include "ArduinoJson.h"
#include "FB_HTTPClient32.h"
#include "FirebaseESP32.h"
#include "FirebaseJson.h"
#include "FirebaseJson.h"
#include <Wire.h> 
#include <LiquidCrystal_I2C.h>
#include <OneWire.h>
#include <DallasTemperature.h>
#include <WiFi.h>
#include <time.h>
#include "FirebaseESP32.h"
#include "FirebaseArduino.h"
#define ONE_WIRE_BUS 16//กำหนดขาที่จะเชื่อมต่อ Sensor
/////////////////////////////////
//firebase
#define FIREBASE_HOST "turbidityss.firebaseio.com"
#define FIREBASE_AUTH "30rQ5vNAnn1sh32YB9XtVrJrkYWjGf7jnHbdu8Su"
////////////////////////////////
//wifi
#define WIFI_SSID "MtQuely"
#define WIFI_PASSWORD "0952492114"
////////////////////////////////
// Config time
int timezone = 7;
char ntp_server1[20] = "ntp.ku.ac.th";
char ntp_server2[20] = "fw.eng.ku.ac.th";
char ntp_server3[20] = "time.uni.net.th";

OneWire oneWire(ONE_WIRE_BUS);
DallasTemperature sensors(&oneWire);
FirebaseData firebaseData;
 
// Set the LCD address to 0x27 for a 16 chars and 2 line display
LiquidCrystal_I2C lcd(0x27, 16, 2);
int sensorPin = 34;
float volt;
float ntu;
int dst = 0;
 
void setup()
{
  Serial.begin(9600);
  lcd.begin();
  Serial.println("Dallas Temperature IC Control Library");
  sensors.begin();


  // Turn on the blacklight and print a message.
  lcd.backlight();

//int counter = 0;
//float counter2 = 0.5;

//time
  configTime(timezone * 3600, dst, ntp_server1, ntp_server2, ntp_server3);
  Serial.println("Waiting for time");
  while (!time(nullptr)) 
  {
    Serial.print(".");
    delay(500);
  }
  Serial.println();
  Serial.println("Now: " + NowString());
  Serial.print("Connected with IP: ");
  Serial.println(WiFi.localIP());
  Serial.println();

  Firebase.begin("turbidityss.firebaseio.com", "30rQ5vNAnn1sh32YB9XtVrJrkYWjGf7jnHbdu8Su");
  Firebase.reconnectWiFi(true);
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
    if(volt < 2.5)
    {
      ntu = 3000;
    }else
    {
      ntu = -1120.4*sq(volt)+5742.3*volt-4353.8; 
    }
    lcd.clear();
    lcd.setCursor(0,0);
    lcd.print(volt);
    lcd.print(" V");
 
    lcd.setCursor(0,1);
    lcd.print(ntu);
    lcd.print(" NTU");
    delay(10);
    Serial.println(volt);
    Serial.println(ntu);
/*
    Serial.println("Requesting temperatures...");
    sensors.requestTemperatures(); //อ่านข้อมูลจาก library
    Serial.print("Temperature is: ");
    Serial.print(sensors.getTempCByIndex(0)); // แสดงค่า อูณหภูมิ 
    Serial.println(" *C");
    delay(1000);
*/
    if(Firebase.push(firebaseData, "/Temp",sensors))
    {
    Serial.println("Requesting temperatures...");
    sensors.requestTemperatures(); //อ่านข้อมูลจาก library
    Serial.print("Temperature is: ");
    Serial.print(sensors.getTempCByIndex(0)); // แสดงค่า อูณหภูมิ 
    Serial.println(" *C");
    delay(1000);
    }
    if(Firebase.push(firebaseData, "/Turbidity",ntu))
    {
        Serial.println(ntu);
    }
    
    if(Firebase.push(firebaseData, "/Time",NowString()))
    {

    }
    
  /*StaticJsonBuffer<200> jsonBuffer;
  DynamicJsonBuffer jsonBuffer;
  JsonObject& root = jsonBuffer.createObject();
  root["temperature"] = sensors;
  root["Turbidity"] = ntu;
  root["time"] = NowString();
  // append a new value to /Turbidity
  String name = Firebase.push("TurbiditySS", root);
  */
  // handle error
/*  if (Firebase.failed()) 
  {
      Serial.print("pushing /TurbiditySS failed:");
      Serial.println(Firebase.error());  
      return;
  }
  
  Serial.print("pushed: /TurbiditySS/");
  Serial.println(name);
  delay(2000);
  */
}

 
float round_to_dp( float in_value, int decimal_place )
{
  float multiplier = powf( 10.0f, decimal_place );
  in_value = roundf( in_value * multiplier ) / multiplier;
  return in_value;
}

//Time

String NowString() {
  time_t now = time(nullptr);
  struct tm* newtime = localtime(&now);

  String tmpNow = "";
  tmpNow += String(newtime->tm_hour);
  tmpNow += ":";
  tmpNow += String(newtime->tm_min);
  tmpNow += ":";
  tmpNow += String(newtime->tm_sec);
  return tmpNow;
  
}
