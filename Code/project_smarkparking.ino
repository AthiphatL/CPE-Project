#include<WiFi.h>
#include <NTPClient.h>
#include <WiFiUdp.h>
#include <FirebaseESP32.h>
#define FIREBASE_HOST "databaseproject-fa6c9.firebaseio.com"
#define FIREBASE_AUTH "iYjH5auEbMjLfToFqvI5k7w99e3jJiuswVwBF7M8"
const char* WIFI_SSID = "not";
const char* WIFI_PASSWORD  = "0876619048";
FirebaseData firebaseData;

//--------------Time--------------
WiFiUDP ntpUDP;
NTPClient timeClient(ntpUDP);

String formattedDate;
String dayStamp;
String timeStamp;
//-----------------WIFI------------

int ledpin = 19;
int analogPin = 15 ;
int i = 0, sec = 0, minutes = 0 , hours = 0, count = 0;
int detect = 0;
String checkTime = "0";

//-----------------Pin-------------
void setup() {


  pinMode(ledpin, OUTPUT);
  pinMode(analogPin, INPUT_PULLUP);
  Serial.begin(115200);

  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
  Firebase.reconnectWiFi(true);

  WiFiConnection();

  timeClient.begin();
  timeClient.setTimeOffset(7*3600);
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
}

void loop() {
  //-----Time--------
  while(!timeClient.update()) {
    timeClient.forceUpdate();
  }
  //-----Time--------
  detect = digitalRead(analogPin);
  Serial.print("detect = ");
  Serial.println(detect);
  delay(100);
  Firebase.setInt(firebaseData, "Display/Detect", detect);
  if (detect == 1) {
    digitalWrite(ledpin, LOW);
    sec++;
    if (Firebase.setInt(firebaseData, "Display/Sec", sec)) {
      if (sec == 30 && i == 0) {
        i++;
        count++;
        
        checkTime = getDay()+getMonth()+getYear()+getHours()+getMinutes()+getSeconds();
        Firebase.setString(firebaseData, "History/"+checkTime+"/Date", getDay()+"/"+getMonth()+"/"+getYear());
        Firebase.setString(firebaseData, "History/"+checkTime+"/CheckIn", (String)timeClient.getFormattedTime());
        
        if (Firebase.getInt(firebaseData, "Display/Count")) {
          if (firebaseData.dataType() == "int") {
            count = count+firebaseData.intData();
            Firebase.setInt(firebaseData, "Display/Count", count);  
            Serial.print("Count = ");
            Serial.println(firebaseData.intData());
          }
        } else {
          Firebase.setInt(firebaseData, "Display/Count", count);
        }
      }
      if (sec >= 60) {
        minutes++;
        sec = 0;
        Firebase.setInt(firebaseData, "Display/Minutes", minutes);
        if (Firebase.getInt(firebaseData, "Display/Minutes")) {
          if (firebaseData.dataType() == "int") {
            Serial.print("Min = ");
            Serial.println(firebaseData.intData());
          }
        }
      }
      if (minutes >= 60) {
        hours++;
        minutes = 0;
        Firebase.setInt(firebaseData, "Display/Hours", hours);
        if (Firebase.getInt(firebaseData, "Display/Hours")) {
          if (firebaseData.dataType() == "int") {
            Serial.print("Hours = ");
            Serial.println(firebaseData.intData());
          }
        }
      }
      if (hours >= 24) {
        hours = 0;
      }
    }
    if (Firebase.getInt(firebaseData, "Display/Sec")) {
      if (firebaseData.dataType() == "int") {
        Serial.print("Sec = ");
        Serial.println(firebaseData.intData());
      }
    }
  } else {
    i = 0;
    count = 0;
    sec = 0;
    minutes = 0;
    hours = 0;
    digitalWrite(ledpin, HIGH);
    Firebase.setInt(firebaseData, "Display/Sec", sec);
    Firebase.setInt(firebaseData, "Display/Minutes", minutes);
    Firebase.setInt(firebaseData, "Display/Hours", hours);
    if(checkTime != "0"){
       Firebase.setString(firebaseData, "History/"+checkTime+"/CheckOut", (String)timeClient.getFormattedTime());
    }
    checkTime = "0";
  }
}

String getYear() {
   time_t rawtime = timeClient.getEpochTime();
   struct tm * ti;
   ti = localtime (&rawtime);

   uint16_t year = ti->tm_year + 2443;
   String yearStr = String(year);

   return yearStr;
}

String getMonth() {
   time_t rawtime = timeClient.getEpochTime();
   struct tm * ti;
   ti = localtime (&rawtime);

   uint8_t month = ti->tm_mon + 1;
   String monthStr = month < 10 ? "0" + String(month) : String(month);

   return monthStr;
}

String getDay() {
   time_t rawtime = timeClient.getEpochTime();
   struct tm * ti;
   ti = localtime (&rawtime);

   uint8_t day = ti->tm_mday;
   String dayStr = day < 10 ? "0" + String(day) : String(day);

   return dayStr;
}

String getHours() {
   time_t rawtime = timeClient.getEpochTime();
   struct tm * ti;
   ti = localtime (&rawtime);

   uint8_t hours = ti->tm_hour;
   String hoursStr = hours < 10 ? "0" + String(hours) : String(hours);

   return hoursStr;
}

String getMinutes() {
   time_t rawtime = timeClient.getEpochTime();
   struct tm * ti;
   ti = localtime (&rawtime);

   uint8_t minutes = ti->tm_min;
   String minuteStr = minutes < 10 ? "0" + String(minutes) : String(minutes);

   return minuteStr;
}

String getSeconds() {
   time_t rawtime = timeClient.getEpochTime();
   struct tm * ti;
   ti = localtime (&rawtime);

   uint8_t seconds = ti->tm_sec;
   String secondStr = seconds < 10 ? "0" + String(seconds) : String(seconds);

   return secondStr;
}
