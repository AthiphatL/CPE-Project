#include <WiFi.h>
//#include <WiFiManager.h>
#define WIFI_SSID "MrQuely"
#define WIFI_PASSWORD "0952492114"
//const char* ssid = "MrQuely";
//const char* password = "0952492114";
void setup() {
  Serial.begin(115200);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connecting to Wi-Fi");
  while (WiFi.status() != WL_CONNECTED){
     delay(300);
     Serial.print("Connected with IP: ");
    }
   Serial.print("Connected with IP: ");
  Serial.println(WiFi.localIP());
}

void loop() {
  // put your main code here, to run repeatedly:

}
