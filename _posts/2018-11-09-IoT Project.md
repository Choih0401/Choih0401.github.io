# NFC 모듈을 이용한 영상 재생

> Title : NFC 및 Processing을 이용한 사진 및 영상 재생
> Date : 2018. 11. 01 ~ 2018. 11. 09
> Problem : 영상이 끝난는지 판별하는 방법
> Solution : 영상이 끝나면 Serial로 STOP라는 문자열을 보낸다.

### Arduino Code
```c
#include <SPI.h>
#include <MFRC522.h>
 
#define SS_PIN 10
#define RST_PIN 9
MFRC522 mfrc522(SS_PIN, RST_PIN);   // Create MFRC522 instance.
int a;
unsigned long ret_time = 0;
unsigned long set_time = 0;
void setup()
{
  Serial.begin(9600);
  SPI.begin();      // Initiate  SPI bus
  mfrc522.PCD_Init();   // Initiate MFRC522
}
void loop() {
  ret_time = (unsigned long)millis();
  if (ret_time > set_time) {
    if (a == 1) {
      Serial.write(a);
      if (ret_time - set_time >= 11000 && ret_time - set_time <= 11100) {
        Serial.write("STOP\n");
        a = 0;
        delay(100);
      }
    }
    else if (a == 2) {
      if (ret_time - set_time >= 14000 && ret_time - set_time <= 14100) {
        Serial.write("STOP\n");
        a = 0;
        delay(100);
      }
    }
    else if (a == 3) {
      if (ret_time - set_time >= 10000 && ret_time - set_time <= 10100) {
        Serial.write("STOP\n");
        a = 0;
        delay(100);
      }
    }
    else if (a == 4) {
      if (ret_time - set_time >= 39000 && ret_time - set_time <= 39100) {
        Serial.write("STOP\n");
        a = 0;
        delay(100);
      }
    }
    else if (a == 5) {
      if (ret_time - set_time >= 45000 && ret_time - set_time <= 45100) {
        Serial.write("STOP\n");
        a = 0;
        delay(100);
      }
    }
    else if (a == 6) {
      if (ret_time - set_time >= 20000 && ret_time - set_time <= 20100) {
        Serial.write("STOP\n");
        a = 0;
        delay(100);
      }
    }
    else if (a == 7) {
      if (ret_time - set_time >= 43000 && ret_time - set_time <= 43100) {
        Serial.write("STOP\n");
        a = 0;
        delay(100);
      }
    }
    else if (a == 8) {                                         //  ↓ 이건 앞에 적은 수에 100을 더한 수를 적어주세요!
      if (ret_time - set_time >= 14000 && ret_time - set_time <= 14100) { // 이 부분을 시간들에 맞춰서 바꿔주시면 됩니다
        Serial.write("STOP\n"); // ↑ 이건 14초라는 뜻입니다 ms 단위라서 초 단위에 1000을 곱해주시면 됩니다
        a = 0;
        delay(100);
      }
    }
  }
  if ( ! mfrc522.PICC_IsNewCardPresent())
  {
    return;
  }
  // Select one of the cards
  if ( ! mfrc522.PICC_ReadCardSerial())
  {
    return;
  }
  String content = "";
  byte letter;
  for (byte i = 0; i < mfrc522.uid.size; i++)
  {
    content.concat(String(mfrc522.uid.uidByte[i] < 0x10 ? " 0" : " "));
    content.concat(String(mfrc522.uid.uidByte[i], HEX));
  }
  content.toUpperCase();
  if (content.substring(1) == "12 F2 A2 28") {
    Serial.write("ONE\n"); set_time = (unsigned long)millis(); a = 1; delay(2000);
  } else if (content.substring(1) == "43 EF 55 2B") {
    Serial.write("TWO\n"); set_time = (unsigned long)millis(); a = 2;delay(2000);
  } else if (content.substring(1) == "A2 CA DC 27") {
    Serial.write("THREE\n"); set_time = (unsigned long)millis(); a = 3;delay(2000);
  } else if (content.substring(1) == "F3 74 1C 2A") {
    Serial.write("FOUR\n"); set_time = (unsigned long)millis(); a = 4;delay(2000);
  } else if (content.substring(1) == "53 24 E8 2B") {
    Serial.write("FIVE\n"); set_time = (unsigned long)millis(); a = 5;delay(2000);
  } else if (content.substring(1) == "53 82 08 2B") {
    Serial.write("SIX\n"); set_time = (unsigned long)millis(); a = 6;delay(2000);
  } else if (content.substring(1) == "53 3D 3C 2B") {
    Serial.write("SEVEN\n"); set_time = (unsigned long)millis(); a = 7;delay(2000);
  } else if (content.substring(1) == "F3 FC 1B 2A") {
    Serial.write("EIGHT\n"); set_time = (unsigned long)millis(); a = 8;delay(2000);
  }
}
```

### Processing Code
```java
import processing.serial.*;
import processing.video.*; 
 
Serial myPort;
String val;    
int a = 10;
 
Movie video,video2,video3,video4,video5,video6,video7,video8,video9,video10;
 
void setup() {
  frameRate(60);
  size(1920,1080);
  video = new Movie(this,"1.mp4");
  video2 = new Movie(this,"2.mp4");
  video3 = new Movie(this,"3.mp4");
  video4 = new Movie(this,"4.mp4");
  video5 = new Movie(this,"5.mp4");
  video6 = new Movie(this,"6.mp4");
  video7 = new Movie(this,"7.mp4");
  video8 = new Movie(this,"8.mp4");
  video9 = new Movie(this,"9.mp4");
  video10 = new Movie(this,"10.mp4");
  video.loop(); video.stop(); video2.loop(); video2.stop(); video3.loop(); video3.stop(); video4.loop(); video4.stop(); video5.loop(); video5.stop(); video6.loop(); video6.stop(); video7.loop(); video7.stop(); video8.loop();  video8.stop(); video9.loop(); video9.stop(); video10.loop();
  String portName = Serial.list()[0];
  myPort = new  Serial(this, "COM10", 9600);
  myPort.bufferUntil('\n');
}
 
void serialEvent (Serial myPort) {
  if (myPort.available() > 0) {
    video.stop(); video2.stop(); video3.stop(); video4.stop(); video5.stop(); video6.stop(); video7.stop(); video8.stop(); video9.stop(); video10.stop();
    val = myPort.readString().trim();
  }
  if (val.equals("ONE")) {
    a = 1;
    video.stop();
    video.noLoop();
    video.play();
  } else if(val.equals("TWO")){
    a = 2;
    video2.stop();
    video2.noLoop();
    video2.play();
  } else if(val.equals("THREE")){
    a = 3;
    video3.stop();
    video3.noLoop();
    video3.play();
  } else if(val.equals("FOUR")){
    a = 4;
    video4.stop();
    video4.noLoop();
    video4.play();
  } else if(val.equals("FIVE")){
    a = 5;
    video5.stop();
    video5.noLoop();
    video5.play();
  } else if(val.equals("SIX")){
    a = 6;
    video6.stop();
    video6.noLoop();
    video6.play();
  } else if(val.equals("SEVEN")){
    a = 7;
    video7.stop();
    video7.noLoop();
    video7.play();
  } else if(val.equals("EIGHT")){
    a = 8;
    video8.stop();
    video8.noLoop();
    video8.play();
  } else if(val.equals("NINE")){
    a = 9;
    video9.stop();
    video9.noLoop();
    video9.play();
  } 
  
  
  else if(val.equals("STOP")){
    video.stop(); video2.stop(); video3.stop();video4.stop(); video5.stop(); video6.stop(); video7.stop(); video8.stop(); video9.stop();
    a = 10;
    video10.stop();
    video10.loop();
    video10.play();
  } 
  print(val);
 
}
void draw() {
  background(0);
  if(a == 1){
      image(video,0,0);
  }else if(a == 2){
      image(video2,0,0);
  }else if(a == 3){
      image(video3,0,0);
  }else if(a == 4){
      image(video4,0,0);
  }else if(a == 5){
      image(video5,0,0);
  }else if(a == 6){
      image(video6,0,0);
  }else if(a == 7){
      image(video7,0,0);
  }else if(a == 8){
      image(video8,0,0);
  }else if(a == 9){
      image(video9,0,0);
  }else if(a == 10){
      image(video10,0,0);
  }
} 
 
void movieEvent(Movie video) {
  video.read();
}
```
