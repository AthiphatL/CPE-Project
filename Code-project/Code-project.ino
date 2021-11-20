#include <WiFiClientSecure.h>
#include <WiFi.h> 
#include <WiFiManager.h> 
#include "DHT.h"
#include <ESPmDNS.h>
#include <WiFiUdp.h>
#include <ArduinoOTA.h>


#include "PubSubClient.h"
#include<LiquidCrystal_I2C.h>
const char* mqtt_server = "203.154.82.235";  // IP of the MQTT broker
const char* Humi = "EW/Humid";
const char* Temp = "EW/Temp";
//const char* gps_topic_3 = "excavator/location";
const char* mqtt_username = "ew"; // MQTT username
const char* mqtt_password = "123456"; // MQTT password//
const char* clientID = "MQTT_FX_Client"; // MQTT client ID

#define DHTPIN 2
#define DHTTYPE DHT22
DHT dht(DHTPIN, DHTTYPE);

//const char* ssid = "Manad Luachang";                 // Your personal network SSID
//const char* wifi_password = "0818322697";

int sensor_pin = 36;
int value ;

TaskHandle_t Task1;
TaskHandle_t Task2;

unsigned long period = 7000;
unsigned long last_time = 0;

int lcdColumns = 16;
int lcdRows = 2;
LiquidCrystal_I2C lcd(0x27, lcdColumns, lcdRows);  

float t = dht.readTemperature();
#define Button 23  // led is connected with gpio 23
int Relay1 = 15;

//mqtt
// Initialise the WiFi and MQTT Client objects
WiFiClient wifiClient;
// 1883 is the listener port for the Broker
PubSubClient client(mqtt_server, 1883, wifiClient); 
//mqtt


#define BLYNK_TEMPLATE_ID "TMPLqFFSbaHf"
#define BLYNK_DEVICE_NAME "EW"
#define BLYNK_AUTH_TOKEN "fz6w3E3RWa0me1dHdoj1OVUOemIuhEAn"

#define BLYNK_FIRMWARE_VERSION        "0.1.0"

#define BLYNK_PRINT Serial
//#define BLYNK_DEBUG

#define APP_DEBUG
#include "BlynkEdgent.h"




void connect_MQTT(){
   
  Serial.print("Connecting to ");
  
  Serial.println("WiFi connected");
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());
  if (client.connect(clientID, mqtt_username, mqtt_password)) {
    Serial.println("Connected to MQTT Broker!");
  }
  else {
    Serial.println("Connection to MQTT Broker failed...");
  }
}

void reconnect() {
  while (!client.connected()) {
      Serial.print("Connecting...");
    if (client.connect(clientID, mqtt_username, mqtt_password)) {
      Serial.println("connected");
      client.subscribe("EW/Humid");
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
    }
  }
}

void callback(char* topic, byte* payload, unsigned int length) { 
  Serial.print("Message arrived [");
  Serial.print(topic);
  Serial.print("] ");
  for (int i=0;i<length;i++) {
    Serial.print((char)payload[i]);
  }
  Serial.println();
  
  String messageTemp;
  if (String(topic) == "EW/pump") {
    Serial.print("Changing output to ");
    if(messageTemp == "on"){
      Serial.println("on");
      digitalWrite(Relay1, HIGH);
    }
    else if(messageTemp == "off"){
      Serial.println("off");
      digitalWrite(Relay1, LOW);}
      }}

void Publish_to_mqtt(){               
   if( millis() - last_time > period) {
    last_time = millis(); 
  
    // MQTT can only transmit string s

    String g1= String(value) ;    
    String g2= String(dht.readTemperature()) ;    
    //String g3= String(car_id) ;  


     if (client.publish(Humi, String(g1).c_str())) {
      Serial.println("sent Humi!");
      Serial.println(g1);
    }
      else {
      Serial.println("trying again");
      client.connect(clientID, mqtt_username, mqtt_password);
      client.publish(Humi, String(g1).c_str());
      Serial.println();
    }

     if (client.publish(Temp, String(g2).c_str())) {
      Serial.println("sent Temp!");
      Serial.println(g2);
    }
      else {
      Serial.println("trying again");
      client.connect(clientID, mqtt_username, mqtt_password);
      client.publish(Temp, String(g2).c_str());
      Serial.println();
    }
   }}



void setup()
{
  
Serial.begin(115200);
 
   pinMode(15, OUTPUT);
   BlynkEdgent.begin();

//wifi
    WiFi.mode(WIFI_STA);
    WiFiManager wm;
    bool res;
    res = wm.autoConnect();
   if(!res) {
        Serial.println("Failed to connect");
    } 
    else {
        Serial.println("connected... :)");
    }

 
//    
//  // ส่วนของ OTA
//  ArduinoOTA
//    .onStart([]() {
//      String type;
//      if (ArduinoOTA.getCommand() == U_FLASH)
//        type = "sketch";
//      else          // แบบ U_SPIFFS
//        type = "filesystem";
//      Serial.println("Start updating " + type);
//    })
//    .onEnd([]() {
//      Serial.println("\nEnd");
//    })
//    .onProgress([](unsigned int progress, unsigned int total) {
//      Serial.printf("Progress: %u%%\r", (progress / (total / 100)));
//    })
//    .onError([](ota_error_t error) {
//      Serial.printf("Error[%u]: ", error);
//      if (error == OTA_AUTH_ERROR) Serial.println("Auth Failed");
//      else if (error == OTA_BEGIN_ERROR) Serial.println("Begin Failed");
//      else if (error == OTA_CONNECT_ERROR) Serial.println("Connect Failed");
//      else if (error == OTA_RECEIVE_ERROR) Serial.println("Receive Failed");
//      else if (error == OTA_END_ERROR) Serial.println("End Failed");
//    });


// xTaskCreatePinnedToCore(
//                    TaskGps,   /* Task function. */
//                    "Task1",     /* name of task. */
//                    10000,       /* Stack size of task */
//                    NULL,        /* parameter of the task */
//                    1,           /* priority of the task */
//                    &Task1,      /* Task handle to keep track of created task */
//                    0);          /* pin task to core 0 */                  
//
//   //task 2 
//  xTaskCreatePinnedToCore(
//                    TaskMqtt,   /* Task function. */
//                    "Task2",     /* name of task. */
//                    10000,       /* Stack size of task */
//                    NULL,        /* parameter of the task */
//                    1,           /* priority of the task */
//                    &Task2,      /* Task handle to keep track of created task */
//                    1);          /* pin task to core 1 */
   



//  ArduinoOTA.begin();

  Serial.println("Ready");
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());


  Serial.println("Reading");



 pinMode(Button, INPUT);
 pinMode(Relay1, OUTPUT);
  //dht
  Serial.println(F("DHTxx test!"));
dht.begin();

  lcd.init();
// turn on LCD backlight                      
  lcd.backlight();
connect_MQTT();
client.setCallback(callback);
}  
 
void loop()
{
 
BlynkEdgent.run();
Publish_to_mqtt();

  ArduinoOTA.handle();
 value= analogRead(sensor_pin);
 value = map(value,550,0,0,100);
 Serial.print("Moisture : ");
 Serial.print(value);
 Serial.println("%");




//float f = dht.readTemperature(true);
float t = dht.readTemperature();
//dht
if (isnan(t)) {
Serial.println(F("Failed to read from DHT sensor!"));
}
Serial.print(("Temperature: "));
Serial.print(t);
Serial.print((" C "));
Serial.print((" \n"));

//pin and store in ButtonState variable


//relay
//  int ButtonState = digitalRead(Button); // read the button pin and store in ButtonState variable
//
//  if(ButtonState == HIGH)  // if button is pressed
//  {
//    digitalWrite(Relay1,HIGH); // led will be ON
//    
//  }
//  else   // otherwise
//  {
//    digitalWrite(Relay1, LOW); // LED will be OFF
//   
//  }
//

//
 lcd.setCursor(0, 0);
 lcd.print("Temperature:"); lcd.print(t); lcd.print("C");
 lcd.setCursor(0,1);
lcd.print("Moisture:");lcd.print(value);lcd.print("%");
delay(3000);

 
 //Relay();
 
}

//void TaskGps( void * pvParameters ){
//  Serial.print("Task1 running on core ");
//  Serial.println(xPortGetCoreID());
// while (true) {
// ArduinoOTA.handle();
//// loop 
// }
//}
//
//void TaskMqtt( void * pvParameters ){
//  Serial.print("Task2 running on core ");
//  Serial.println(xPortGetCoreID());
// while (true) {
//   
// loop
// }
//}
void Relay()
{

  int ButtonState = digitalRead(Button); // read the button pin and store in ButtonState variable

  if(ButtonState == HIGH)  // if button is pressed
  {
    digitalWrite(Relay1,HIGH); // led will be ON
    
  }
  else   // otherwise
  {
    digitalWrite(Relay1, LOW); // LED will be OFF
   
  }
delay(0);
}

BLYNK_WRITE(V1)
{
 int pinValue = param.asInt();
 digitalWrite(15,pinValue);
   
}
