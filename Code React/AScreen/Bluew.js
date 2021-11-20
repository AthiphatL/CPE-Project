import React from 'react'
import { StyleSheet, Text, View,Image } from 'react-native'
import { HeadFN } from './component/HeadFn';

export default function Bluew() {
    return (
        <View>
            <View ><Image style={styles.photoin} source={require('./Photosc/Bwnew.png')}/></View>
            <View style={styles.textto}>
            <HeadFN style={styles.title}>Blue Worm</HeadFN>
            <Text>ลักษณะโดยทั่วไป</Text>
            <Text>•ลำตัวมีขนาด 35 – 130 x 3 – 5 มิลลิเมตร</Text>
            <Text>•ลำตัวมีสีแดง ร่องระหว่างปล้องและบริเวณปลายมีสีเหลือง</Text>
            <Text>•มีอายุยืนยาว 4 – 5 ปี แต่มักอยู่ได้ 1 – 2 ปีเมื่อเลี้ยงภายในบ่อ</Text>
            <Text>•สืบพันธุ์โดยอาศัยเพศ</Text>
            <Text>•สร้างถุงไข่ได้โดยเฉลี่ยประมาณ 150 – 198 ถุง/ตัว/ปี</Text>
            <Text>•สร้างไข่ได้ประมาณ 900 ฟอง/ตัว/ปี</Text>
            <Text>•ใช้เวลาในการฟักเป็นตัวประมาณ 32 – 40 วัน</Text>
            <Text>(ขึ้นอยู่กับฤดูกาล)โดยเฉลี่ยฟัก 3 ตัว/ถุงไข</Text>
            <Text>•ใช้เวลาในการเติบโตเต็มวัย 3 – 6 เดือน ( ขึ้นอยู่กับฤดูกาล )</Text>
            <Text>•อาศัยอยู่บริเวณผิวดิน กินเศษซากอินทรียวัตถุที่เน่าสลาย</Text>
            <Text>และมีอนุภาคขนาดเล็กผู้คนใช้ไส้เดือนไทเกอร์ในการ </Text>
            <Text>กำจัดขยะอินทรีย์ซึ่งมีหลายเหตุผลที่ทำให้เลือกใช้ไส้เดือนดิน</Text>
            <Text>สายพันธุ์นี้คือไส้เดือนสายพันธุ์ที่มีอยู่ทั่วไปในบริเวณที่มี</Text>
            <Text>ขยะอินทรีย์อยู่โดยพวกมันจะสร้างกลุ่มและเจริญเติบโต</Text>
            <Text>อยู่ในกองขยะอินทรีย์เหล่านั้นและมีความทนทานต่อช่วง</Text>
            <Text>อุณหภูมิที่กว้างและสามารถดำรงชีวิตอยู่ในขยะอินทรีย์</Text>
            <Text>ที่มีความชื้นได้หลายระดับ</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    title:{
    marginBottom:10,
},
textto:{
    margin:30,
},
photoin:{
    resizeMode: 'stretch',
    marginTop:15,
    marginLeft:130,
    flexDirection:'column',
    justifyContent:'center',
    height:130,
    width:150,
    borderRadius:10,
},
})

