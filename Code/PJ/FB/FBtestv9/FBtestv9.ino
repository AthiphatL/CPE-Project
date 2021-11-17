
#include <LiquidCrystal_I2C.h>
#include "FirebaseESP32.h"
#include "FirebaseESP32HTTPClient.h"
#include "FirebaseJson.h"
#include "jsmn.h"

//#include "FB_HTTPClient32.h"
//#include "FirebaseESP32.h"
//#include "FirebaseJson.h"
#include "ArduinoJson.h"
//#include <WiFi.h>
#include "FirebaseESP32.h"
#include <Wire.h> 
//#include <LiquidCrystal_I2C.h>
#include <OneWire.h>
#include <DallasTemperature.h>
#include <WiFi.h>
#include <time.h>
#define ONE_WIRE_BUS 16//กำหนดขาที่จะเชื่อมต่อ Sensor
#define FIREBASE_HOST "turbidityss.firebaseio.com"
#define FIREBASE_AUTH "30rQ5vNAnn1sh32YB9XtVrJrkYWjGf7jnHbdu8Su"
#define WIFI_SSID "minmin20189"
#define WIFI_PASSWORD "0972415492"
#include <HTTPClient.h>


//google script
String GOOGLE_SCRIPT_ID = "AKfycbxqMBCPK0zCzjGHnHYs6bydaIf-zkPhR3lpoxgDbe5beVVURpo"; // Replace by your GAS service id

const char * root_ca=\
"-----BEGIN CERTIFICATE-----\n" \
"MIIDujCCAqKgAwIBAgILBAAAAAABD4Ym5g0wDQYJKoZIhvcNAQEFBQAwTDEgMB4G\n" \
"A1UECxMXR2xvYmFsU2lnbiBSb290IENBIC0gUjIxEzARBgNVBAoTCkdsb2JhbFNp\n" \
"Z24xEzARBgNVBAMTCkdsb2JhbFNpZ24wHhcNMDYxMjE1MDgwMDAwWhcNMjExMjE1\n" \
"MDgwMDAwWjBMMSAwHgYDVQQLExdHbG9iYWxTaWduIFJvb3QgQ0EgLSBSMjETMBEG\n" \
"A1UEChMKR2xvYmFsU2lnbjETMBEGA1UEAxMKR2xvYmFsU2lnbjCCASIwDQYJKoZI\n" \
"hvcNAQEBBQADggEPADCCAQoCggEBAKbPJA6+Lm8omUVCxKs+IVSbC9N/hHD6ErPL\n" \
"v4dfxn+G07IwXNb9rfF73OX4YJYJkhD10FPe+3t+c4isUoh7SqbKSaZeqKeMWhG8\n" \
"eoLrvozps6yWJQeXSpkqBy+0Hne/ig+1AnwblrjFuTosvNYSuetZfeLQBoZfXklq\n" \
"tTleiDTsvHgMCJiEbKjNS7SgfQx5TfC4LcshytVsW33hoCmEofnTlEnLJGKRILzd\n" \
"C9XZzPnqJworc5HGnRusyMvo4KD0L5CLTfuwNhv2GXqF4G3yYROIXJ/gkwpRl4pa\n" \
"zq+r1feqCapgvdzZX99yqWATXgAByUr6P6TqBwMhAo6CygPCm48CAwEAAaOBnDCB\n" \
"mTAOBgNVHQ8BAf8EBAMCAQYwDwYDVR0TAQH/BAUwAwEB/zAdBgNVHQ4EFgQUm+IH\n" \
"V2ccHsBqBt5ZtJot39wZhi4wNgYDVR0fBC8wLTAroCmgJ4YlaHR0cDovL2NybC5n\n" \
"bG9iYWxzaWduLm5ldC9yb290LXIyLmNybDAfBgNVHSMEGDAWgBSb4gdXZxwewGoG\n" \
"3lm0mi3f3BmGLjANBgkqhkiG9w0BAQUFAAOCAQEAmYFThxxol4aR7OBKuEQLq4Gs\n" \
"J0/WwbgcQ3izDJr86iw8bmEbTUsp9Z8FHSbBuOmDAGJFtqkIk7mpM0sYmsL4h4hO\n" \
"291xNBrBVNpGP+DTKqttVCL1OmLNIG+6KYnX3ZHu01yiPqFbQfXf5WRDLenVOavS\n" \
"ot+3i9DAgBkcRcAtjOj4LaR0VknFBbVPFd5uRHg5h6h+u/N5GJG79G+dwfCMNYxd\n" \
"AfvDbbnvRG15RjF+Cv6pgsH/76tuIMRQyV+dTZsXjAzlAcmgQWpzU/qlULRuJQ/7\n" \
"TBj0/VLZjmmx6BEP3ojY+x1J96relc8geMJgEtslQIxq/H5COEBkEveegeGTLg==\n" \
"-----END CERTIFICATE-----\n";
///////////////////////////
// Config time
int timezone = 7;
char ntp_server1[20] = "ntp.ku.ac.th";
char ntp_server2[20] = "fw.eng.ku.ac.th";
char ntp_server3[20] = "time.uni.net.th";

OneWire oneWire(ONE_WIRE_BUS);
DallasTemperature sensors(&oneWire);
// Set the LCD address to 0x27 for a 16 chars and 2 line display
LiquidCrystal_I2C lcd(0x27, 16, 2);
int sensorPin = 34;
float volt;
float ntu;
int dst = 0;
int Status;
 

FirebaseData firebaseData;

void setup(){
  
  Initialization();
  WiFiConnection();

 // Serial.begin(9600);
  //lcd.begin();
  Serial.println("Dallas Temperature IC Control Library");
  sensors.begin();


  // Turn on the blacklight and print a message.
  lcd.backlight();
  /*//time
  configTime(timezone * 3600, dst, ntp_server1, ntp_server2, ntp_server3);
  Serial.println("Waiting for time");
  while (!time(nullptr)) 
  {
    Serial.print(".");
    delay(500);
  }*/
  Serial.println();
//  Serial.println("Now: " + NowString());
  Serial.print("Connected with IP: ");
  Serial.println(WiFi.localIP());
  Serial.println();

  Firebase.begin("turbidityss.firebaseio.com", "30rQ5vNAnn1sh32YB9XtVrJrkYWjGf7jnHbdu8Su");
  Firebase.reconnectWiFi(true);
 }

int counter = 0;
float counter2 = 0.5;

void Initialization(){
  
  Serial.begin(115200); 
 }

void WiFiConnection(){
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connecting to Wi-Fi");
  while (WiFi.status() != WL_CONNECTED)
  {
    Serial.print(".");
    delay(300);
  }
  Serial.println();
  Serial.print("Connected with IP: ");
  Serial.println(WiFi.localIP());
  Serial.println();

  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
  Firebase.reconnectWiFi(true);
}
//GOOGLE SHEET
float TurbiFunc()
{
  return ntu;
}
float TempFunc()
{
  return sensors.getTempCByIndex(0);
}
/////////////
void loop(){

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
   /* lcd.setCursor(0,0);
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
    delay(1000);

    if(Firebase.setFloat(firebaseData, "/Temperature",sensors.getTempCByIndex(0)))
    {
 
    Serial.println(" *C");
    delay(1000);
    }
    if(Firebase.setInt(firebaseData, "/Turbidity",ntu))
    { 
        Serial.println(ntu);
    }

     if(Firebase.pushFloat(firebaseData, "/Temperature(Get)",sensors.getTempCByIndex(0)))
    {
 
    Serial.println(" *C");
    delay(1000);
    }
    if(Firebase.pushInt(firebaseData, "/Turbidity(Get)",ntu))
    { 
        Serial.println(ntu);
    }

   ///////////////////////////////////
    if(0 < ntu < 5)
    {
     if(Firebase.setString(firebaseData, "/Status",Status))
    {
 
    Serial.println("Clean");
    lcd.setCursor(0,1);
    lcd.print("Clean");
    }
        Serial.println("Clean");
    }
    else if( 5 < ntu < 50)
    {
      if(Firebase.setString(firebaseData, "/Status",Status))
    {
    
    Serial.println("Less turbidity");
    lcd.setCursor(0,1);
    lcd.print("Less turbidity");
    }
        Serial.println("Less turbidity");
    }
    else if(50 < ntu < 500)
    {
     if(Firebase.setString(firebaseData, "/Status",Status))
    {
 
    Serial.println("Turbidity");
    lcd.setCursor(0,1);
    lcd.print("Turbidity");
    }
        Serial.println("Turbidity");
    }
     else if(500 < ntu < 3000)
    {
     if(Firebase.setString(firebaseData, "/Status",Status))
    {
 
    Serial.println("VeryTurbidity");
    lcd.setCursor(0,1);
    lcd.print("VeryTurbidity");
    }
        Serial.println("VeryTurbidity");
    }
    else if(ntu > 3000)
    {
      if(Firebase.setString(firebaseData, "/Status",Status))
    {
 
    Serial.println("Warning");
    lcd.setCursor(0,1);
    lcd.print("VeryTurbidity");
    }
        Serial.println("Warning");
    }
   /* if(Firebase.push(firebaseData, "/Time",NowString()))
    {

    }*/
   /*
  StaticJsonBuffer<200> jsonBuffer;
  //DynamicJsonBuffer jsonBuffer;
  JsonObject& root = jsonBuffer.createObject();
  root["temperature"] = sensors.getTempCByIndex(0);
  root["Turbidity"] = ntu;
  root["time"] = NowString();
  // append a new value to /Turbidity
  String name = Firebase.push("/TurbiditySS", root);
  
  // handle error
  if (Firebase.failed()) 
  {
      Serial.print("pushing /TurbiditySS failed:");
      Serial.println(Firebase.error());  
      return;
  }
  
  Serial.print("pushed: /TurbiditySS/");
  Serial.println(name);
  delay(2000);
  */
/*
   if(Firebase.getInt(firebaseData, "/Count")){
    if(firebaseData.dataType() == "int"){
      Serial.print("data = ");
      Serial.println(firebaseData.intData());
    }
  }

   if(Firebase.getFloat(firebaseData, "/Count2")){
    if(firebaseData.dataType() == "float"){
      Serial.print("data = ");
      Serial.println(firebaseData.floatData());
    }
  }

    if(Firebase.getString(firebaseData, "/Count3")){
    if(firebaseData.dataType() == "string"){
      Serial.print("data = ");
      Serial.println(firebaseData.stringData());
    }
  }

  */
  //GOOGLE SHEET
   sendData("&Turbidity=" + String(TurbiFunc())+"&Temperature="+String(TempFunc()));
//sendData("&info1=" + fakeFunc1()+"&info2="+String(fakeFunc2())+"&temp="+String(getFakeTemperature()));
  
  delay(1000);

}

void SendAlarm()//use this function to notify if something wrong (example sensor says -128C)
// don't forget to set true for enableSendingEmails in google script
{
   sendData("alarm=fixme"); 
}
//GOOGLE SCRIPT
void sendData(String params) {
   HTTPClient http;
   String url="https://script.google.com/macros/s/"+GOOGLE_SCRIPT_ID+"/exec?"+params;
   Serial.print(url);
    Serial.print("Making a request");
    http.begin(url, root_ca); //Specify the URL and certificate
    int httpCode = http.GET();  
    http.end();
    Serial.println(": done "+httpCode);

}
float round_to_dp( float in_value, int decimal_place )
{
  float multiplier = powf( 10.0f, decimal_place );
  in_value = roundf( in_value * multiplier ) / multiplier;
  return in_value;
}


//Time

/*String NowString() {
  time_t now = time(nullptr);
  struct tm* newtime = localtime(&now);

  String tmpNow = "";
  tmpNow += String(newtime->tm_hour);
  tmpNow += ":";
  tmpNow += String(newtime->tm_min);
  tmpNow += ":";
  tmpNow += String(newtime->tm_sec);
  return tmpNow;
  
}*/
