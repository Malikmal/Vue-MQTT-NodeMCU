/*******************************************************
 * Kelompok 3 
 * Workshop Kompilasi
 * 4 D4 Teknik Komputer A
 * Politeknik Elektronika Negeri Surabaya (EEPIS)
 ********************************************************/

#include <ESP8266WiFi.h>
#include <PubSubClient.h>


//mqtt configuration topic
#define topicPotensio   "tekkoma/potensio/1"
#define topicLed        "tekkoma/led"

// Update these with values suitable for your network.
const char* ssid = "lalalala";
const char* password = "akudewelali";
const char* mqtt_server = "broker.mqttdashboard.com";//"test.mosquitto.org";//"broker.mqtt-dashboard.com";//"test.mosquitto.org";

WiFiClient espClient;
PubSubClient client(espClient);
char msg[50];
int potensio = 0, a = 0;

void setup_wifi() {
  delay(10);
  // We start by connecting to a WiFi network
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  randomSeed(micros());

  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
}

void callback(char* topic, byte* payload, unsigned int length) {
  Serial.print("Message arrived [");
  Serial.print(topic);
  Serial.print("] ");
  for (int i = 0; i < length; i++) {
    Serial.print((char)payload[i]);
  }
  Serial.println();

  // Switch on the LED if an 1 was received as first character
  if ((char)payload[0] == '1') {
    digitalWrite(BUILTIN_LED, LOW);   // Turn the LED on (Note that LOW is the voltage level
  } else {
    digitalWrite(BUILTIN_LED, HIGH);  // Turn the LED off by making the voltage HIGH
  }

}

void reconnect() {
  // Loop until we're reconnected
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    // Create a random client ID
    String clientId = "TekkomAClient-";
    clientId += String(random(0xffff), HEX);
    // Attempt to connect
    if (client.connect(clientId.c_str())) {
      Serial.println("connected");
      // Once connected, publish an announcement...
      client.publish(topicLed, "0");
      // ... and resubscribe
      client.subscribe(topicLed);
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      // Wait 5 seconds before retrying
      delay(2000);
    }
  }
}

void readAnalogPin() {
   if( millis() % 50 != 0 ) // give 50 milliseconds  for potensio time
       return;
  a = analogRead(A0);
  a = map(a, 0, 1023, 0, 255);
  if(abs(potensio - a) >= 5 ) { //my potensio is suck so i filter it
    sprintf (msg,  "%ld", potensio);
    client.publish(topicPotensio, msg);
    sprintf (msg,  "%ld", potensio+12);
    client.publish("tekkoma/potensio/2", msg);
    Serial.println(msg);
    delay(50);
  }
  potensio = a;
}

void setup() {
  pinMode(BUILTIN_LED, OUTPUT);     // Initialize the BUILTIN_LED pin as an output
  Serial.begin(115200);
  setup_wifi();
  client.setServer(mqtt_server, 1883);
  client.setCallback(callback);
}

void loop() {
  if (!client.connected()) {
    reconnect();
  }
  client.loop();
  readAnalogPin();
}