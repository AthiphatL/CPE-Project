import React from 'react'
import { StyleSheet, Text, View,Image } from 'react-native'
import { HeadFN } from './component/HeadFn';

export default function Africanw() {
    return (
        <View style={{backgroundColor:'#FBDDA0'}}>
            <View ><Image style={styles.photoin} source={require('./Photosc/Afnew.png')}/></View>
            <View style={styles.textto}>
            <HeadFN style={styles.title}>African night Worm</HeadFN>
            <Text>ลักษณะโดยทั่วไป</Text>
            <Text>•ลำตัวมีขนาด 130-250 x 5-8 มิลลิเมตร</Text>
            <Text>•ลำตัวมีสีน้ำตาลแดงปนเทา</Text>
            <Text>•สืบพันธุ์โดยอาศัยเพศ</Text>
            <Text>•จับคู่ผสมพันธุ์ใต้ดิน</Text>
            <Text>•สร้างถุงไข่ได้โดยเฉลี่ยประมาณ 162-188 ถุง/ตัว/ปี</Text>
            <Text>•ใช้เวลาในการฟักเป็นตัวประมาณ 13-27 วัน</Text>
            <Text>โดยเฉลี่ยฟัก 2 ตัว/ถุงไข่</Text>
            <Text>•ใช้เวลาในการเติบโตเต็มวัย 6-10 เดือน</Text>
            <Text>•อาศัยอยู่บริเวณผิวดิน</Text>
            <Text>•กินเศษซากอินทรียวัตถุที่เน่าสลายเป็นอาหาร</Text>
            <Text>•มีอายุยืนยาว 4-5 ปี</Text>
            <Text>ประโยชน์ของไส้เดือนดิน</Text>
            <Text>1. ด้านสิ่งแวดล้อมเปลี่ยนขยะอินทรีย์เป็นปุ๋ย</Text>
            <Text>2. หมักลดการฝั่งกลบขยะไส้เดือนช่วยพลิกกลับดิน</Text>
            <Text>โดยการกินดินทำให้แร่ธาตุในดินผสมคลุกเคล้าให้เข้ากัน</Text>
            <Text>ช่วยทำาลายชั้นดิน</Text>
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
    width:120,
    borderRadius:10,
},
})
