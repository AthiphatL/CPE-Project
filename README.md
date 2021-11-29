# CPE-Project

<p>61012139 อธิภัทร เหลือชั่ง</p> <p>Hardware (Arduino,Embeded)</p>
<p>61024304 จักริน แหลมจันทึก</p> <p>Software (Node-red, API, PHP,SQL)</p>
<p> 61024246 ธิณกร อุบลจินดา</p> <p>Application Design(React-native)</p>

=======
=======

>>>>>>> Hardware
<p>Hardware</p>
<p>61012139 อธิภัทร เหลือชั่ง</p>



<p>อุปกรณ์</p>
<p>1.DHT22</p>
<<<<<<< HEAD
<img src="Tools/DHT22.jpg" style="width:300px;height:300px;">

<p>2.LCD</p>
<img src="Tools/LCD.jpg" style="width:300px;height:300px;">

  <p>3.Battery 12v</p>
<img src="Tools/battery.jpg" style="width:300px;height:300px;">
  
  <p>4.Soil moisture sensor module</p>
<img src="Tools/moiture Sensor.jpg" style="width:300px;height:300px;">
  
  <p>5.Relay 1 channel module 5v</p>
<img src="Tools/relay.jpg" style="width:300px;height:300px;">
  
  <p>6.Pump 12v</p>
<img src="Tools/pump.jpg" style="width:300px;height:300px;">
  
 <p>7.ESP32</p>
<img src="Tools/esp32.png" style="width:300px;height:300px;">
  
  <p>8.กล่องบรรจุภาชนะ</p>
<img src="Tools/Screenshot 2021-11-20 163629.png" style="width:300px;height:300px;">


<p>รูปประกอบ HARDWARE</p>
  <img src="photo/1.jpg" >
  <img src="photo/2.JPG" >
  <img src="photo/3.JPG" >
  <img src="photo/4.JPG" >
  <img src="photo/5.JPG" >
  <img src="photo/6.JPG" >
=======


=======
>>>>>>> App


<p>Application Design(React-native)</p>
<p> 61024246 ธิณกร อุบลจินดา</p>
หน้า Login 
<img src="photo/login.PNG" >
หน้า Register
<img src="photo/register.PNG" >
หน้า Main เอาไว้เชื่อมไปยังหน้าอื่นๆ
<img src="photo/main.PNG" >
หน้า Profiles เอาไว้สำหรับแสดงข้อมูลผู้ใช้
<img src="photo/profiles.PNG" >
หน้า status เอาไว้โชว์ค่าที่ hardware ส่งขึ้นมา
<img src="photo/status.PNG" >
หน้า Type จะโชว์ชนิดของไส้เดือนที่นิยมเลี้ยงในไทย
<img src="photo/type.PNG" >
หน้า Weight เอาไว้สำหรับ Input นำหนักลงไปแล้วจะเอามาแสดงด้านล่าง
<img src="photo/weight.PNG" >
หน้า Dashboard จะโชว์กราฟของค่าที่ hardware ส่งมา
<img src="photo/dashboard.PNG" >
หน้า history จะแสดงค่า temp ,humid, time ทุกๆ3ชม.
<img src="photo/history.PNG" >
=======

=======
<p>SOFTWARE</p>
<p>61024304 จักริน แหลมจันทึก</p>

<h1>API</h1>
<img src="Software(backend) Photo/API.PNG" >
<h4>user = เก็บค่าข้อมูลการสมัครและเอาไปแสดงค่าแบบเรียกใช้ ID</h4></br>
<h4>history = นำค่าอุณภูมิ ความชื้นและเวลามาแสดงทุกๆ3ชั่วโมง</h4></br>
<h4>weight = นำน้ำหนักและเวลามาแสดง</h4></br>

<h1>MySQL(Temp)</h1>
<img src="Software(backend) Photo/MySQL_TEMP.PNG" >
<h4>Table Temp</h4>
<h4>เก็บค่า ID(เช็คแก้ไขและเรียกดึงข้อมูลเป็นชุดตามID)temp(อุณภูมิ) humi(ความชื้น) Time(เวลา) </h4>


<h1>MySQL(User)</h1>
<img src="Software(backend) Photo/MySQL_User.PNG" >
<h4>Table User</h4>
<h4>เก็บค่า ID(เช็คแก้ไขและเรียกดึงข้อมูลเป็นชุดตามID) fistname(ชื่อจริง) lastname(นามสกุล) username(ตั้งชื่อ) password(ตั้งรหัส) </h4>
<h4>email(อีเมล์) phone(เบอร์โทร)</h4>


<h1>MySQL(User)</h1>
<img src="Software(backend) Photo/Weight SQ.png" >
<h4>เก็บค่า Weight(น้ำหนัก) </h4>
<h1>Node Red</h1>
<img src="Software(backend) Photo/Node_red.PNG" >
<h4>ใช้ฟังชันส่งค่าแยกไปตามตารางในMySQL</h4>
=======

