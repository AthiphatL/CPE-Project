#include "FB_HTTPClient32.h"
#include "FirebaseESP32.h"
#include "FirebaseJson.h"

#include "ArduinoJson.h"
#include <WiFi.h>
#include "FirebaseESP32.h"

#define FIREBASE_HOST "turbidityss.firebaseio.com"
#define FIREBASE_AUTH "30rQ5vNAnn1sh32YB9XtVrJrkYWjGf7jnHbdu8Su"
#define WIFI_SSID "MtQuely"
#define WIFI_PASSWORD "0952492114"
FirebaseData firebaseData;

void setup(){
  
  Initialization();
  WiFiConnection();
  
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

void loop(){

  if(Firebase.setInt(firebaseData, "/Count",counter++)){
      //Serial.println(counter);
    }

  if(Firebase.setFloat(firebaseData, "/Count2",counter2++)){
 
    }

    
  if(Firebase.setString(firebaseData, "/Count3","ACTIVE")){
    }

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
}
