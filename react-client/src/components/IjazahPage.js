import React, { Component } from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import Logo from '../images/logo-umn-blue.png';
import '../App.css';
import Stempel from '../images/stempel.png';
import Ttd1 from '../images/ttd1.png'
import Ttd2 from '../images/ttd2.png'
// import AlegreyaSans from '../AlegreyaSans-ExtraBold.ttf'

// Font.register({
//     family: 'AlegreyaSans', 
//     // src: 'https://fonts.googleapis.com/css2?family=Alegreya+Sans:wght@900&display=swap', 
//     src: 'https://github.com/google/fonts/blob/master/ofl/alegreyasans/AlegreyaSans-ExtraBold.ttf'
// });

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#FFFFF6',
    padding:30
  },
  section: {
    padding: 10,
    width: 580
  },
  logo:{
    width: 90, 
    height: 162, 
    marginVertical: 15,
  },
  photo:{
    width: 90, 
    height: 120, 
    marginTop: 70, 
    marginHorizontal: 10,   
  },
  title:{
    fontSize: 24,
    alignSelf: "center",
    // fontFamily: 'AlegreyaSans',
  },
  content:{
      marginTop: 30,
  },
  labelLong:{
    fontSize: 10,
    width: 120
  },
  labelMed:{
    fontSize: 10,
    width: 70
  },
  labelShort:{
    fontSize: 10,
    width: 40
  },
  labelLongEng:{
    fontSize: 7,
    width: 120,
    paddingVertical:1,
    fontStyle: 'italic',
  },
  labelMedEng:{
    fontSize: 7,
    width: 70,
    paddingVertical:1,
    fontStyle: 'italic',
  },
  labelShortEng:{
    fontSize: 7,
    width: 40,
    paddingVertical:1,
    fontStyle: 'italic',
  },
  text:{
    fontSize: 10.5,
  },
  textSmall:{
    fontSize: 7,
    paddingVertical:1,
    paddingLeft: 1,
    fontStyle: 'italic',
  },   
  textBig:{
    fontSize: 13
  },   
  
  subContent: {
      marginVertical: 3
  },
  horizonal: {
      flexDirection: "row"
  },
  vertical: {
      flexDirection: "column"
  },
  column_2: {
      width:290,
      marginRight: 80
  },
  column_3_1: {
      width:100,
      marginRight: 20,
      marginTop: 40
  },
  column_3_2: {
    width: 170,
    height: 80,
    marginRight: 80
  },
  ttd:{
    width: 120
  },
  number:{
    marginTop: 300,
    fontSize: 10
  }
});

export default class IjazahPage extends Component {

    getMonthName = (monthNumber, lang) => {
        let monthName = ''

        if(lang === 0){ //Indonesia
            if(monthNumber === '01') monthName = "Januari"
            else if(monthNumber === '02') monthName = "Februari"
            else if(monthNumber === '03') monthName = "Maret"
            else if(monthNumber === '04') monthName = "April"
            else if(monthNumber === '05') monthName = "Mei"
            else if(monthNumber === '06') monthName = "Juni"
            else if(monthNumber === '07') monthName = "Juli"
            else if(monthNumber === '08') monthName = "Agustus"
            else if(monthNumber === '09') monthName = "September"
            else if(monthNumber === '10') monthName = "Oktober"
            else if(monthNumber === '11') monthName = "November"
            else if(monthNumber === '12') monthName = "Desember"
        } else if (lang === 1){ //Inggris
            if(monthNumber === '01') monthName = "January"
            else if(monthNumber === '02') monthName = "February"
            else if(monthNumber === '03') monthName = "March"
            else if(monthNumber === '04') monthName = "April"
            else if(monthNumber === '05') monthName = "May"
            else if(monthNumber === '06') monthName = "June"
            else if(monthNumber === '07') monthName = "July"
            else if(monthNumber === '08') monthName = "August"
            else if(monthNumber === '09') monthName = "September"
            else if(monthNumber === '10') monthName = "October"
            else if(monthNumber === '11') monthName = "November"
            else if(monthNumber === '12') monthName = "December"
        }
        return monthName;
    }

    getJenjangName = (jenjang, lang) => {
        let jenjangName = '';

        if (lang === 0){
            if(jenjang === 'sarjanas1') jenjangName = "Sarjana Strata 1"
            else if (jenjang === 'diplomad3') jenjangName = "Diploma 3"
        } else if (lang === 1){
            if(jenjang === 'sarjanas1') jenjangName = "Undergraduate"
            else if (jenjang === 'diplomad3') jenjangName = "Diploma 3"
        }

        return jenjangName
    }

    getFakultasName = (fakultas, lang) => {
        let fakultasName = '';

        if(lang === 0){
            if (fakultas === 'fti') fakultasName = "Teknik & Informatika"
            else if (fakultas === 'fbisnis') fakultasName = "Bisnis"
            else if (fakultas === 'filkom') fakultasName = "Ilmu Komunikasi"
            else if (fakultas === 'fsds') fakultasName = "Seni & Design"
            else if (fakultas === 'perhotelan') fakultasName = "D3 Perhotelan"
        } else if(lang === 1){
            if (fakultas === 'fti') fakultasName = "Engineering and Informatics"
            else if (fakultas === 'fbisnis') fakultasName = "Business"
            else if (fakultas === 'filkom') fakultasName = "Communication Studies"
            else if (fakultas === 'fsds') fakultasName = "Art and Design"
            else if (fakultas === 'perhotelan') fakultasName = "Hospitality"
        }

        return fakultasName;
    }

    getGelarName = (gelar) => {
        let gelarName = '';

        if (gelar === 'S.Kom.') gelarName = "Sarjana Komputer"
        else if (gelar === 'S.E.') gelarName = "Sarjana Ekonomi"
        else if (gelar === 'S.I.Kom.') gelarName = "Sarjana Ilmu Komunikasi"
        else if (gelar === 'S.Ds.') gelarName = "Sarjana Design"
        else if (gelar === 'A.Md.Par.') gelarName = "Ahli Madya Parawisata"

        return gelarName;
    }

    getProdiName = (prodi) => {
        let prodiName = '';

        if (prodi === 'Informatika') prodiName = "Informatics"
        else if (prodi === 'Sistem Informasi') prodiName = "Information System"
        else if (prodi === 'Teknik Komputer') prodiName = "Computer Engineering"
        else if (prodi === 'Teknik Elektro') prodiName = "Electric Engineering"
        else if (prodi === 'Teknik Fisika') prodiName = "Physics Engineering"
        else if (prodi === 'Manajemen') prodiName = "Management"
        else if (prodi === 'Akuntansi') prodiName = "Accounting"
        else if (prodi === 'Komunikasi Strategis') prodiName = "Strategic Communication"
        else if (prodi === 'Jurnalistik') prodiName = "Journalism"
        else if (prodi === 'Design Komunikasi Visual') prodiName = "Visual Communication Design"
        else if (prodi === 'Film') prodiName = "Film"
        else if (prodi === 'Animasi') prodiName = "Animation"
        else if (prodi === 'Perhotelan') prodiName = "Hospitality"

        return prodiName;
    }

    render(){

        if(this.props.data !== undefined) {
            console.log(this.props.data);

            var data = this.props.data;
            var tempTtl = data.ttl.split("-");
            var tempTtd = data.ttd.split("-");
            var tempTin = data.tin.split("-")
            
            //Indonesia
            var monthTtl = this.getMonthName(tempTtl[1], 0);
            var monthTtd = this.getMonthName(tempTtd[1], 0);
            var monthTin = this.getMonthName(tempTin[1], 0);
            var ttl = tempTtl[2] + " " + monthTtl + " " + tempTtl[0];
            var ttd = tempTtd[2] + " " + monthTtd + " " + tempTtd[0];
            var tin = tempTin[2] + " " + monthTin + " " + tempTin[0];
            var jenjang = this.getJenjangName(data.jenjang, 0);
            var gelar = this.getGelarName(data.gelar);
            var fakultas = this.getFakultasName(data.fakultas, 0);

            //Inggris            
            var monthTtl1 = this.getMonthName(tempTtl[1], 1);
            var monthTtd1 = this.getMonthName(tempTtd[1], 1);
            var monthTin1 = this.getMonthName(tempTin[1], 1);
            var ttl1 = monthTtl1 + " " + tempTtl[2] + ", " + tempTtl[0];
            var ttd1 = monthTtd1 + " " + tempTtd[2] + ", " + tempTtd[0];
            var tin1 = monthTin1 + " " + tempTin[2] + ", " + tempTin[0];
            var jenjang1 = this.getJenjangName(data.jenjang, 1);
            var fakultas1 = this.getFakultasName(data.fakultas, 1);
            var prodi1 = this.getProdiName(data.prodi);

            // var stempel = 


            return(
                <Document>
                    <Page size="A4" style={styles.page} orientation="landscape">
                        <View>
                            <Image cache={false} src={this.props.data.photo} style={styles.photo}/>   
                            <Text style={styles.number}>{data.niu}</Text>
                        </View>


                        <View>
                            <View style={styles.section}>
                                <Text style={styles.title}>Universitas Multimedia Nusantara</Text>

                                <View style={styles.content}>

                                    <View style={styles.subContent}>
                                        <View style={styles.horizonal}>
                                            <Text style={styles.labelLong}>Memberi ijazah kepada</Text>
                                            <Text style={styles.text}>: </Text>
                                            <Text style={styles.textBig}>{data.nama}</Text>
                                        </View>

                                        <Text style={styles.labelLongEng}>Issued this certificate to</Text>
                                    </View>
                                    
                                    <View style={styles.subContent}>
                                        <View style={styles.horizonal}>
                                            <Text style={styles.labelLong}>Tempat dan Tanggal Lahir</Text>
                                            <Text style={styles.text}>: </Text>
                                            <Text style={styles.text}>{data.tempattl}, {ttl}</Text>
                                        </View>
                                        <View style={styles.horizonal}>
                                            <Text style={styles.labelLongEng}>Place and Date of Birth</Text>
                                            <Text style={styles.textSmall}>: </Text>
                                            <Text style={styles.textSmall}>{data.tempattl}, {ttl1}</Text>
                                        </View>
                                    </View>
                                    
                                    <View style={styles.subContent}>
                                        <View style={styles.horizonal}>
                                            <Text style={styles.labelLong}>Nomor Induk Mahasiswa</Text>
                                            <Text style={styles.text}>: </Text>
                                            <Text style={styles.textBig}>{data.nim}</Text>
                                        </View>
                                        <Text style={styles.labelLongEng}>Student Number</Text>
                                    </View>
                                    
                                    <View style={styles.subContent}>
                                        <View style={styles.horizonal}>
                                            <Text style={styles.labelLong}>Jenjang Pendidikan</Text>
                                            <Text style={styles.text}>: </Text>
                                            <Text style={styles.text}>{jenjang} / {gelar} ({data.gelar})</Text>
                                        </View>
                                        <View style={styles.horizonal}>
                                            <Text style={styles.labelLongEng}>Level of Education</Text>
                                            <Text style={styles.textSmall}>: </Text>
                                            <Text style={styles.textSmall}>{jenjang1}</Text>
                                        </View>
                                    </View>
                                    
                                    <View style={styles.subContent}>
                                        <View style={styles.horizonal}>
                                            <Text style={styles.labelLong}>Fakultas</Text>
                                            <Text style={styles.text}>: </Text>
                                            <Text style={styles.text}>{fakultas}</Text>
                                        </View>
                                        <View style={styles.horizonal}>
                                            <Text style={styles.labelLongEng}>Faculty</Text>
                                            <Text style={styles.textSmall}>: </Text>
                                            <Text style={styles.textSmall}>{fakultas1}</Text>
                                        </View>
                                    </View>
                                    
                                    <View style={styles.subContent}>
                                        <View style={styles.horizonal}>
                                            <Text style={styles.labelLong}>Program Studi</Text>
                                            <Text style={styles.text}>: </Text>
                                            <Text style={styles.text}>{data.prodi}</Text>
                                        </View>
                                        <View style={styles.horizonal}>
                                            <Text style={styles.labelLongEng}>Study Program</Text>
                                            <Text style={styles.textSmall}>: </Text>
                                            <Text style={styles.textSmall}>{prodi1}</Text>
                                        </View>
                                    </View>
                                    
                                    <View style={styles.subContent}>
                                        <Text style={styles.text}>Terakreditasi oleh Bada Akreditasi Nasional Perguruan Tinggi Kementrian Pendidikan & Kebudayaan Republik Indonesia</Text>
                                        <Text style={styles.textSmall}>Accredited by the National Accreditaion Board of Higher Education, Ministry of Education anc Culture, Republic of Indonesia</Text>
                                    </View>
                                    
                                    <View style={styles.subContent}>
                                        <View style={styles.horizonal}>
                                            <View style={styles.column_2}>
                                                <View style={styles.horizonal}>
                                                    <Text style={styles.labelLong}>Nomor</Text>
                                                    <Text style={styles.text}>: </Text>
                                                    <Text style={styles.text}>{data.pin}</Text>
                                                </View>
                                                <Text style={styles.labelLongEng}>Number</Text>
                                            </View>

                                            <View style={styles.column_2}>
                                                <View style={styles.horizonal}>
                                                    <Text style={styles.labelShort}>Tanggal</Text>
                                                    <Text style={styles.text}>: </Text>
                                                    <Text style={styles.text}>{tin}</Text>
                                                </View>
                                                <View style={styles.horizonal}>
                                                    <Text style={styles.labelShortEng}>Date</Text>
                                                    <Text style={styles.textSmall}>: </Text>
                                                    <Text style={styles.textSmall}>{tin1}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                    
                                    <View style={styles.subContent}>
                                        <Text style={styles.text}>Ijazah ini diserahkan setelah yang bersangkutan memenuhi semua persyaratan yang ditentukan,</Text>
                                        <Text style={styles.textSmall}>This certificate is conferred to the person named above after having fulfilled all of the requirements prescribed,</Text>
                                    </View>
                                    
                                    <View style={styles.subContent}>
                                        <Text style={styles.text}>dan kepadanya dilimpahkan segala wewenang dan hak yang berhubungan dengan ijazah yang dimilikinya.</Text>
                                        <Text style={styles.textSmall}>and therefore he/she has all the rights and privileges thereunto appertaining</Text>
                                    </View>
                                    
                                    <View style={styles.subContent}>
                                        <View style={styles.horizonal}>
                                            <View style={styles.column_2}>
                                                <View style={styles.horizonal}>
                                                    <Text style={styles.labelLong}>Diberikan di</Text>
                                                    <Text style={styles.text}>: </Text>
                                                    <Text style={styles.text}>{data.tempattd}</Text>
                                                </View>
                                                <Text style={styles.labelLongEng}>Given in</Text>
                                            </View>

                                            <View style={styles.column_2}>
                                                <View style={styles.horizonal}>
                                                    <Text style={styles.labelMed}>, pada tanggal</Text>
                                                    <Text style={styles.text}>: </Text>
                                                    <Text style={styles.text}>{ttd}</Text>
                                                </View>
                                                <View style={styles.horizonal}>
                                                    <Text style={styles.labelMedEng}>on</Text>
                                                    <Text style={styles.textSmall}>: </Text>
                                                    <Text style={styles.textSmall}>{ttd1}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>

                                    <View style={styles.subContent}>
                                        <View style={styles.horizonal}>
                                            <Image cache={false} src={Stempel} style={styles.column_3_1}/>   

                                            <View style={styles.column_3_2}>
                                                <Text style={styles.labelLong}>Dekan</Text>
                                                <Text style={styles.labelLongEng}>Dean</Text>
                                                <Image cache={false} src={Ttd1} style={styles.ttd}/> 
                                                <Text style={styles.labelLong}>Nama Dekan UMN</Text>
                                            </View>

                                            <View style={styles.column_3_2}>
                                                <Text style={styles.labelMed}>Rektor</Text>
                                                <Text style={styles.labelMedEng}>Rector</Text>
                                                <Image cache={false} src={Ttd2} style={styles.ttd}/> 
                                                <Text style={styles.labelLong}>Nama Rektor UMN</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>

                        {/* <View> */}
                            <Image cache={false} src={Logo} style={styles.logo}/>
                        {/* </View> */}

                           
                    </Page>
                </Document>
            )
        } else {
            return (
                <Document>
                    
                </Document>
            );
        }   
    }
}

// ReactPDF.render(<IjazahPage />, `${__dirname}/example.pdf`);