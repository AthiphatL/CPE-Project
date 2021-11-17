import React from 'react'
import { StyleSheet, Text, View,Image } from 'react-native'
import { HeadFN } from './component/HeadFn';

export default function Tigerw() {
    return (
        <View>
            <View ><Image style={styles.photoin} source={require('./Photosc/tignew.png')}/></View>
            <View style={styles.textto}>
            <HeadFN style={styles.title}>Tiger Worm</HeadFN>
            <Text>ลักษณะโดยทั่วไป</Text>
            <Text>•ลำตัวมีสีแดงหรือสีม่วงเข้ม</Text>
            <Text>•ลำตัวมีสีน้ำตาลแดงปนเทา</Text>
            <Text>•สืบพันธุ์โดยอาศัยเพศ</Text>
            <Text>•จับคู่ผสมพันธุ์บริเวณผิวดิน และการพัฒนาของไข่เป็นตัว</Text>
            <Text>ไส้เดือนได้โดยไม่มีการปฏิสนธิทั้งมีงานการศึกษาพบว่า</Text>
            <Text>ไส้เดือนสีน้ำเงินเป็นชนิดของไส้เดือน</Text>
            <Text>ที่สามารถเพิ่มจำนวนชุดของโครโมโซมได้มากกว่า2ชุด</Text>
            <Text>•มีน้ำกลางลำตัวมีสีเหลืองอ่อนและมีกลิ่นหอมอ่อนๆเหมือน</Text>
            <Text>ดอกโมกและมีฤทธิ์ในการกำจัดเชื้อราที่ผลิตสารพิษ</Text>
            <Text>•ใช้เวลาในการฟักเป็นตัวเร็วที่สุด 2 – 3 ชั่วโมง</Text>
            <Text>•ใช้เวลาในการเติบโตเต็มวัย 3 – 6 เดือน</Text>
            <Text>•อาศัยอยู่บริเวณผิวดิน ใต้กองมูลสัตว์ เศษหญ้า</Text>
            <Text>กินเศษซากอินทรียวัตถุที่เน่าสลาย และมูลสัตว์เป็นอาหาร</Text>
            <Text>ประโยชน์ของไส้เดือนดิน</Text>
            <Text>ไส้เดือนสีน้ำเงินมีความสามารถในการกำจัดขยะอินทรีย์และ</Text>
            <Text>ผลิตปุ๋ยหมักได้ใกล้เคียงกันกับไส้เดือนที่นิยมเลี้ยงกันทั่วโลก</Text>
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
    marginTop:20,
    resizeMode: 'stretch',
    marginLeft:140,
    flexDirection:'column',
    justifyContent:'center',
    height:100,
    width:150,
    borderRadius:10,
},
})
