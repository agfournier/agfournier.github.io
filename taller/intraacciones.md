---
title: "Taller: Intra-acciones. Entrelazamientos y reconfiguraciones"
key: 
layout: talleres
---


<br>  
<br>

# INTRA-ACCIONES<br>Entrelazamientos y reconfiguraciones
Tabakalera medialab 10,11/4/25


<br>
<br>

## Instalación de Arduino
[Descarga Arduino IDE](https://www.arduino.cc/en/software)


<br>
<br>

## Sensor de luz, LDR

<br>

![esquema ldr](images/ldr.jpg)

```java
void setup() {
 pinMode(A0, INPUT);
 Serial.begin(9600);
}

void loop() {
 int valor = analogRead(A0);
 Serial.println(valor);
 delay(10);
}
``` 

<br>

> **_Serial Monitor:_**  La herramienta con la que recibir los datos que Arduino envía.

<br>
<br>

## Añadimos un altavoz

<br>

![esquema ldr](images/altavoz.png)


```java
void setup() {
 pinMode(A0, INPUT);
 pinMode(3, OUTPUT);
 Serial.begin(9600);
}

void loop() {
 int valor = analogRead(A0);
 Serial.println(valor);
 delay(10);

 if (valor < 400) tone(3, 440); // intra-accion: definimos un umbral
 else noTone(3);
}
```
<br>

O que cuando salgas de una zona con un rango de luz determinado, el altavoz pite:

<br>

```java
void setup() {
 pinMode(A0, INPUT);
 pinMode(3, OUTPUT);
 Serial.begin(9600);
}

void loop() {
 int valor = analogRead(A0);
 Serial.println(valor);

 if (valor > 300 && valor < 600) { // intra-accion: sistema de Zonas, Anselm Adams
   noTone(3);
 }
 else tone(3, 440);
}
```

![](images/adams-zone-system.png)


<br>

versión Theremin:

<br>

```java
void setup() {
 pinMode(A0, INPUT);
 pinMode(3, OUTPUT);
 Serial.begin(9600);
}

void loop() {
 int valor = analogRead(A0);
 Serial.println(valor);

 if (valor > 300 && valor < 400) {
   tone(3, map(valor, 300, 400, 440, 880));
 }
 else noTone(3);
}
 
```

<br>
<br>

## ¿Qué pasa si pegamos el sensor a la pantalla?

<br>

Imágenes como sensores. *Environments of images*. Monitorización y circulación.

<br>

#### 1. Dejar que el sensor acompañe un rato a la pantalla

<br>

#### 2. Webcam

<br>

#### 3. Con un vídeo 

P. ej. [este fragmento de Michael Snow, *La Region Centrale*](https://www.youtube.com/embed/uYr_SvIKKuI)
<br>
<iframe width="1000" height="750" src="https://www.youtube.com/embed/uYr_SvIKKuI" title="Michael Snow - La Région Centrale (1971)" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe><br>

<br>

#### 4. Con imágenes satélite

Por ejemplo: [aquí](https://www.google.com/maps/@30.6689607,7.1025301,3280m/data=!3m1!1e3!5m1!1e4?entry=ttu&g_ep=EgoyMDI1MDQwNi4wIKXMDSoJLDEwMjExNDUzSAFQAw%3D%3D)<br>
<iframe src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d17266.273229289323!2d7.102573015344233!3d30.667594919693702!3m2!1i1024!2i768!4f13.1!5e1!3m2!1ses!2ses!4v1744238745594!5m2!1ses!2ses" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>

<br>
<br>

## Sound sensor

<br>

![esquema sound sensor](images/soundsensor.jpg)

```java
// pin 4 sensor sonido
// pin 3 altavoz
// pin 13 led

void setup() {
 Serial.begin(9600);
 pinMode(3, OUTPUT);
 pinMode(A0, INPUT);
 pinMode(13, OUTPUT);
}

void loop() {
 int valorSensor = analogRead(A0);
 if (valorSensor > 500) {
   digitalWrite(13, HIGH);
   tone(3, 440);
 }
 else {
   digitalWrite(13, LOW);
   noTone(3);
 }
 Serial.println(valorSensor);
 delay(10);
}
```

<br>

> **_APENAS ESCUCHA_**  Sirve para detectar sonidos por encima de un umbral... Pero también la respiración! (--> Stern-Gerlach)

<br>

![](images/stern-gerlach.jpg)
![](images/stern-gerlach-resultado.png)

<br>
<br>


## Sound Sensor: suavizamos la señal

<br>


![](images/easing-algoritmo.jpg)

<br>

```java
// pin A0 sensor sonido
// pin 3 altavoz
// pin 13 led
int valor = 0;

void setup() {
 Serial.begin(9600);
 pinMode(3, OUTPUT);
 pinMode(A0, INPUT);
 pinMode(13, OUTPUT);
}

void loop() {
 int valorSensor = analogRead(A0);
 valor = valor + 0.1 * ( valorSensor - valor );
  if (valor > 500) {
   digitalWrite(13, HIGH);
   tone(3,440);
 } else {
   digitalWrite(13, LOW);
   noTone(3);
 }
 Serial.println(valor);
}
```

<br>

> **_INTRA-ACCION?_**  Cambiamos el signo de la condición: **if (valor < 500)** En cierto sentido (experiencia médica acumulada?) el dispositivo puede interpretarse como que te indica cuándo respirar. Cuando pita/se enciende, tienes que aspirar. Soplas y se calla/se apaga. Vuelve a pitar/encenderse ...

<br>

<br>
<br>

## Display OLED

<br>

Una pantalla pequeña que nos va a servir para lo que haremos a continuación...

<br>

![esquema oled](images/oled.jpg)

```java

// pin A0 sensor sonido
// pin 3 altavoz
// pin 13 led
// pines A4 A5 OLED

#include <math.h>

// Display
//GND - GND
//VCC - VCC
//SDA - Pin A4
//SCL - Pin A5
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>
#define ANCHO_PANTALLA 128  // ancho pantalla OLED
#define ALTO_PANTALLA 64    // alto pantalla OLED
Adafruit_SSD1306 display(ANCHO_PANTALLA, ALTO_PANTALLA, &Wire, -1);

int valor = 0;

void setup() {
 Serial.begin(9600);
 
 // DISPLAY
 Serial.println("Iniciando pantalla OLED");
 if (!display.begin(SSD1306_SWITCHCAPVCC, 0x3C)) {
   Serial.println("No se encuentra la pantalla OLED");
 }

 // MICROFONO, ALTAVOZ, LED
 pinMode(A0, INPUT);
 pinMode(3, OUTPUT);
 pinMode(13, OUTPUT);
}

void loop() {

 // MICROFONO 
 int valorSensor = analogRead(A0);
 valor = valor + 0.1 * (valorSensor - valor);
  if (valor > 500) {
   digitalWrite(13, HIGH);
   tone(3,440);
 } else {
   digitalWrite(13, LOW);
   noTone(3);
 }
 Serial.println(valor); 

 // DISPLAY
 display.clearDisplay();               // Limpiar buffer
 display.setTextSize(2);               // Tamaño del texto
 display.setTextColor(SSD1306_WHITE);  // Color del texto
 display.setCursor(10, 20);              // Posición del texto
 display.println( valor );             // Escribir texto
 display.display();                    // Enviar a pantalla
}
```

<br>
<br>


## Bluetooth

<br>

![esquema bluetooth](images/bluetooth-sonido-oled.jpg)

```java
#include <math.h>

// pin A0 sensor sonido
// pin 3 altavoz
// pin 13 led
// pines A4 A5 OLED
// pines 10 11 RX,TX BLUETOOTH

//BLUETOOTH
#include <SoftwareSerial.h>
SoftwareSerial BTserial(10, 11);  // RX | TX
const long baudRate = 38400;


// Display
//GND - GND
//VCC - VCC
//SDA - Pin A4
//SCL - Pin A5
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>
#define ANCHO_PANTALLA 128  // ancho pantalla OLED
#define ALTO_PANTALLA 64    // alto pantalla OLED
Adafruit_SSD1306 display(ANCHO_PANTALLA, ALTO_PANTALLA, &Wire, -1);
String stringDisplayed = "";

int valor = 0;
long last = 0;

void setup() {
 Serial.begin(9600);
 
 // DISPLAY
 Serial.println("Iniciando pantalla OLED");
 if (!display.begin(SSD1306_SWITCHCAPVCC, 0x3C)) {
   Serial.println("No se encuentra la pantalla OLED");
 }

 // MICROFONO, ALTAVOZ, LED
 pinMode(A0, INPUT);
 pinMode(3, OUTPUT);
 pinMode(13, OUTPUT);

 // BLUETOOTH
 BTserial.begin(baudRate);
 Serial.print("BTserial started at ");
 Serial.println(baudRate);
 Serial.println(" ");
}

void loop() {

 // MICROFONO //////////////////////////////////////////
 int valorSensor = analogRead(A0);
 valor = valor + 0.1 * (valorSensor - valor);
  if (valor > 500) {
   digitalWrite(13, HIGH);
   tone(3,440);
 } else {
   digitalWrite(13, LOW);
   noTone(3);
 }
 Serial.println(valor); 

 // MENSAJE PARA ENVIAR POR BLUETOOTH AL OTRO ARDUINO ///
 int enviado = 0;
 if (valor > 500) enviado = 1;

 if (millis() - last > 100) {
   BTserial.println(enviado);
   last = millis();
 }

 // RECIBE DATOS DE BLUETOOTH ///////////////////////////
 while (BTserial.available()) {
   stringDisplayed = BTserial.readStringUntil('\n');
 }
 if (inString != "") {
   Serial.println(stringDisplayed);
   int recibido = stringDisplayed.toInt();
 }

 // DISPLAY /////////////////////////////////////////////
 display.clearDisplay();               // Limpiar buffer
 display.setTextSize(2);               // Tamaño del texto
 display.setTextColor(SSD1306_WHITE);  // Color del texto
 display.setCursor(10, 20);              // Posición del texto
 display.println( stringDisplayed );   // Escribir texto
 display.display();                    // Enviar a pantalla
}

```

<br>

¿Y si hacemos ahora que suene / ilumine si la otra persona respira?

1) Tenemos que quitar la lógica anterior del sonido / led. El if (valor > 500) digitalWrite y tone.

2) Tenemos que añadir esta otra lógica:
- Si el mensaje recibido es 1, que el altavoz suene ("tone()") y el led se encienda ("digitalWrite(.. HIGH)")
- Si es cero, "noTone", "digitalWrite(.. LOW)"

<br>


```java
#include <math.h>

// pin A0 sensor sonido
// pin 3 altavoz
// pin 13 led
// pines A4 A5 OLED
// pines 10 11 RX,TX BLUETOOTH

//BLUETOOTH
#include <SoftwareSerial.h>
SoftwareSerial BTserial(10, 11);  // RX | TX
const long baudRate = 38400;


// Display
//GND - GND
//VCC - VCC
//SDA - Pin A4
//SCL - Pin A5
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>
#define ANCHO_PANTALLA 128  // ancho pantalla OLED
#define ALTO_PANTALLA 64    // alto pantalla OLED
Adafruit_SSD1306 display(ANCHO_PANTALLA, ALTO_PANTALLA, &Wire, -1);
String stringDisplayed = "";

int valor = 0;
long last = 0;

void setup() {
 Serial.begin(9600);
 
 // DISPLAY
 Serial.println("Iniciando pantalla OLED");
 if (!display.begin(SSD1306_SWITCHCAPVCC, 0x3C)) {
   Serial.println("No se encuentra la pantalla OLED");
 }

 // MICROFONO, ALTAVOZ, LED
 pinMode(A0, INPUT);
 pinMode(3, OUTPUT);
 pinMode(13, OUTPUT);

 // BLUETOOTH
 BTserial.begin(baudRate);
 Serial.print("BTserial started at ");
 Serial.println(baudRate);
 Serial.println(" ");
}

void loop() {

 // MICROFONO //////////////////////////////////////////
 int valorSensor = analogRead(A0);
 valor = valor + 0.1 * (valorSensor - valor);
 Serial.println(valor); 

 // MENSAJE PARA ENVIAR POR BLUETOOTH AL OTRO ARDUINO ///
 int enviado = 0;
 if (valor > 500) enviado = 1;

 if (millis() - last > 100) {
   BTserial.println(enviado);
   last = millis();
 }

 // RECIBE DATOS DE BLUETOOTH ///////////////////////////
 while (BTserial.available()) {
   stringDisplayed = BTserial.readStringUntil('\n');
 }
 
 int recibido = 0;
 if (stringDisplayed != "") {
   Serial.println(stringDisplayed);
   recibido = stringDisplayed.toInt();
 }

  if (recibido == 1) {
   digitalWrite(13, HIGH);
   tone(3,440);
 } else {
   digitalWrite(13, LOW);
   noTone(3);
 }

 // DISPLAY /////////////////////////////////////////////
 display.clearDisplay();               // Limpiar buffer
 display.setTextSize(2);               // Tamaño del texto
 display.setTextColor(SSD1306_WHITE);  // Color del texto
 display.setCursor(10, 20);              // Posición del texto
 display.println( stringDisplayed );   // Escribir texto
 display.display();                    // Enviar a pantalla
}

```

<br>

> **_INTRA-ACCION?_**  Dos respiraciones acopladas por un espacio previo de diseño.

<br>

¿Qué pasa si se invierte la lógica? if (valor < 500)

```java

 int enviado = 0;
 if (valor < 500) enviado = 1;

```

<br>
<br>


## Giroscopio

<br>

![esquema giroscopio](images/giroscopio-bluetooth-oled.jpg)

```java
#include <math.h>

// pin A0 sensor sonido
// pin 3 altavoz
// pin 13 led
// pines A4 A5 OLED
// pines 10 11 RX,TX BLUETOOTH

//BLUETOOTH
#include <SoftwareSerial.h>
SoftwareSerial BTserial(10, 11);  // RX | TX
const long baudRate = 38400;


// Display
//GND - GND
//VCC - VCC
//SDA - Pin A4
//SCL - Pin A5
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>
#define ANCHO_PANTALLA 128  // ancho pantalla OLED
#define ALTO_PANTALLA 64    // alto pantalla OLED
Adafruit_SSD1306 display(ANCHO_PANTALLA, ALTO_PANTALLA, &Wire, -1);
String stringDisplayed = "";

// GIROSCOPIO
#include <SPI.h>
#include <Wire.h>
#include "I2Cdev.h"
#include "MPU6050.h"
const int mpuAddress = 0x68;  // Puede ser 0x68 o 0x69
MPU6050 mpu(mpuAddress);
int ax, ay, az;
int gx, gy, gz;


int valor = 0;
long last = 0;

void setup() {
 Serial.begin(9600);
 
 // DISPLAY
 Serial.println("Iniciando pantalla OLED");
 if (!display.begin(SSD1306_SWITCHCAPVCC, 0x3C)) {
   Serial.println("No se encuentra la pantalla OLED");
 }

 // MICROFONO, ALTAVOZ, LED
 pinMode(A0, INPUT);
 pinMode(3, OUTPUT);
 pinMode(13, OUTPUT);

 // BLUETOOTH
 BTserial.begin(baudRate);
 Serial.print("BTserial started at ");
 Serial.println(baudRate);
 Serial.println(" ");

 // GIROSCOPIO
 Wire.begin();
 mpu.initialize();
 Serial.println(mpu.testConnection() ? F("IMU iniciado correctamente") : F("Error al iniciar IMU"));

}

void loop() {

  // GIROSCOPIO: lee las aceleraciones
 mpu.getAcceleration(&ax, &ay, &az);

 // GIROSCOPIO: Calcula los angulos de inclinacion
 float accel_ang_x = atan(ax / sqrt(pow(ay, 2) + pow(az, 2))) * (180.0 / 3.14);
 float accel_ang_y = atan(ay / sqrt(pow(ax, 2) + pow(az, 2))) * (180.0 / 3.14);


 // ENVÍA Y RECIBE DATOS POR BLUETOOTH //////////////////
if (millis() - last > 100) {
   last = millis();
   BTserial.println(round(accel_ang_x));
 } else {
   String inString = "";
   while (BTserial.available()) {
     inString = BTserial.readStringUntil('\n');
   }
   if (inString != "") {
     stringDisplayed = inString;
   }
 }



 // DISPLAY /////////////////////////////////////////////
 display.clearDisplay();               // Limpiar buffer
 display.setTextColor(SSD1306_WHITE);  // Color del texto
 display.setTextSize(1);               // Tamaño del texto 
 display.setCursor(0, 0);              // Posición del texto
 display.println( accel_ang_y );       // Escribir texto
 display.setTextSize(2);               // Tamaño del texto 
 display.setCursor(50, 20);            // Posición del texto
 display.println( accel_ang_x );       // Escribir texto 
 display.display();                    // Enviar a pantalla
}

```

<br>
<br>

## Giroscopio y bluetooth

<br>

Dos giroscopios conectados. Si el ángulo es distinto (supera un umbral), el altavoz pita y el led se enciende. Si no, están apagados.

<br>

```java
#include <math.h>

// pin A0 sensor sonido
// pin 3 altavoz
// pin 13 led
// pines A4 A5 OLED
// pines 10 11 RX,TX BLUETOOTH

//BLUETOOTH
#include <SoftwareSerial.h>
SoftwareSerial BTserial(10, 11);  // RX | TX
const long baudRate = 38400;


// Display
//GND - GND
//VCC - VCC
//SDA - Pin A4
//SCL - Pin A5
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>
#define ANCHO_PANTALLA 128  // ancho pantalla OLED
#define ALTO_PANTALLA 64    // alto pantalla OLED
Adafruit_SSD1306 display(ANCHO_PANTALLA, ALTO_PANTALLA, &Wire, -1);
String stringDisplayed = "";

// GIROSCOPIO
#include <SPI.h>
#include <Wire.h>
#include "I2Cdev.h"
#include "MPU6050.h"
const int mpuAddress = 0x68;  // Puede ser 0x68 o 0x69
MPU6050 mpu(mpuAddress);
int ax, ay, az;
int gx, gy, gz;


int valor = 0;
long last = 0;

void setup() {
 Serial.begin(9600);
 
 // DISPLAY
 Serial.println("Iniciando pantalla OLED");
 if (!display.begin(SSD1306_SWITCHCAPVCC, 0x3C)) {
   Serial.println("No se encuentra la pantalla OLED");
 }

 // MICROFONO, ALTAVOZ, LED
 pinMode(A0, INPUT);
 pinMode(3, OUTPUT);
 pinMode(13, OUTPUT);

 // BLUETOOTH
 BTserial.begin(baudRate);
 Serial.print("BTserial started at ");
 Serial.println(baudRate);
 Serial.println(" ");

 // GIROSCOPIO
 Wire.begin();
 mpu.initialize();
 Serial.println(mpu.testConnection() ? F("IMU iniciado correctamente") : F("Error al iniciar IMU"));

}

void loop() {

  // GIROSCOPIO: lee las aceleraciones
 mpu.getAcceleration(&ax, &ay, &az);

 // GIROSCOPIO: Calcula los angulos de inclinacion
 float accel_ang_x = atan(ax / sqrt(pow(ay, 2) + pow(az, 2))) * (180.0 / 3.14);
 float accel_ang_y = atan(ay / sqrt(pow(ax, 2) + pow(az, 2))) * (180.0 / 3.14);


 // RECIBE DATOS DE BLUETOOTH ///////////////////////////
 while (BTserial.available()) {
   stringDisplayed = BTserial.readStringUntil('\n');
 }
 if (inString != "") {
   Serial.println(stringDisplayed);
   int recibido = stringDisplayed.toInt();
 }

  if (recibido == 1) {
   digitalWrite(13, HIGH);
   tone(3,440);
 } else {
   digitalWrite(13, LOW);
   noTone(3);
 }

 // DISPLAY /////////////////////////////////////////////
 display.clearDisplay();               // Limpiar buffer
 display.setTextColor(SSD1306_WHITE);  // Color del texto
 display.setTextSize(1);               // Tamaño del texto 
 display.setCursor(0, 0);              // Posición del texto
 display.println( round(accel_ang_x) );       // Escribir texto
 display.setTextSize(2);               // Tamaño del texto 
 display.setCursor(50, 20);            // Posición del texto
 display.println( stringDisplayed );       // Escribir texto 
 display.display();                    // Enviar a pantalla
}

 if (abs(stringDisplayed.toFloat() - round(accel_ang_x)) > 10) { 
  digitalWrite(13, HIGH);
  tone(3, 440);
 }
 else {
  digitalWrite(13, LOW);
  noTone(3);
 }

 delay(10);
}
```
