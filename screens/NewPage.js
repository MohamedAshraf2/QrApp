import React, { useRef, useState } from "react";
import {Pressable, Alert, Modal, TouchableOpacity, View, Text, Button, Image, FlatList, StyleSheet,TextInput } from "react-native";
import * as ImagePicker from 'expo-image-picker';

import { Avatar, Card, Colors, IconButton } from 'react-native-paper';

import { initializeApp } from 'firebase/app';

import { getFirestore, collection, getDocs } from "firebase/firestore";

import { useNavigation } from '@react-navigation/native';

export const NewPage = () => {

    const navigation = useNavigation();

    const [modalVisible, setModalVisible] = useState(false);

    const textinput = useRef(null);
    ////////////////////////////////////////////////////////////////////////
    const firebaseConfig = {
        apiKey: "AIzaSyAwgXWHcAIWCcV6w6myjqTtbBkqPU34LP8",
        authDomain: "qrqr-77f41.firebaseapp.com",
        projectId: "qrqr-77f41",
        storageBucket: "qrqr-77f41.appspot.com",
        messagingSenderId: "91939172618",
        appId: "1:91939172618:web:8b5ae9d1f49009f004caf3"
    };
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);


    async function getCities(db) {
        const citiesCol = collection(db, 'photos');
        const citySnapshot = await getDocs(citiesCol);
        const cityList = citySnapshot.docs.map(doc => doc.data());
        console.log(cityList);
    }

    try {
        getCities(db)

    } catch (e) {
        console.log(e)
    }
    //////////////////////////////////////////////////////////////////////////////////////
    
    const [img, setImage] = useState([]);

    const [url , setUrl]= useState([])

     function makeid(length) { 
         var result = ''; 
         var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-'; 
         var charactersLength = characters.length; 
         for (var i = 0; i < length; i++) { 
         result += characters.charAt(Math.floor(Math.random() * charactersLength)); 
         } 
         return result; 
        }

    async function uploadImageAsync(){ 

        if(img==null){ 
        alert("you must select an image"); 
        return; 
        } 
        const{uri}=img; 
        constfilename=uri.substring(uri.lastIndexOf('/')+1); 
        constblob=awaitnewPromise((resolve,reject)=>{ 
        constxhr=newXMLHttpRequest(); 
        xhr.onload=function(){ 
        resolve(xhr.response); 
        }; 
        xhr.onerror=function(e){ 
        console.log(e); 
        reject(newTypeError("Networkrequestfailed")); 
        }; 
        xhr.responseType="blob"; 
        xhr.open("GET",uri,true); 
        xhr.send(null); 
        }); 
         
        conststorage=getStorage(); 
        constex=filename.split('.'); 
        conststorageRef=ref(storage,'images/'+makeid(50)+'.'+ex[1]); 
        constuploadTask=uploadBytesResumable(storageRef,blob); 
        uploadTask.on('state_changed', 
        (snapshot)=>{ 
        constprogress=(snapshot.bytesTransferred/snapshot.totalBytes)*100; 
        switch(snapshot.state){ 
        case'paused': 
        break; 
        case'running': 
        break; 
        } 
        }, 
        (error)=>{}, 
        ()=>{ 
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{ 
        // image url = downloadURL
        // call add To firestore
                    url.push(downloadURL)
    
        }); 
        } 
        ); 
        }

















    const [text, onChangeText] = useState("no messages yet");

    const deleteImage = (index) => {
        let itemCopy = [...img];
        itemCopy.splice(index, 1);
        setImage(itemCopy);
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
            allowsMultipleSelection: true

        });

        if (!result.cancelled) {
            img.push(result);

            setImage((prev) => [...prev]);
        }

        console.log(img)
    };
    return (
        <View>
        <View style={{ maxHeight: 400, backgroundColor: '#a4a4a4', alignItems: 'center', justifyContent: 'space-evenly' }}>
            <TouchableOpacity     style={styles.btn} onPress={pickImage} ><Text>Pick an image from camera roll</Text></TouchableOpacity>
            {
                // img.map(
                //     (item, index) => {
                //         return (
                //             <View key={index}>
                //                 <Card.Title style={{ backgroundColor: 'gray', width: 250 }}
                //                     title="Card Title"
                //                     subtitle="Card Subtitle"
                //                     left={(props) => <Avatar.Image {...props} source={{ uri: item }} />}
                //                     right={(props) => <IconButton {...props} icon="close" style={{ backgroundColor: Colors.red500 }} onPress={() => { deleteImage(index) }} />}
                //                 />
                //                 {/* <Image key={index} source={{ uri: item }} style={{ width: 20, height: 20 }} /> */}
                //             </View>
                //         )
                //     }
                // )
            }

            {/* <Card.Title style={{ backgroundColor: '#C8E6C9', width: 300 }}
                title=""
                subtitle={img.length+" images Sellected"}
                left={(props) => <Avatar.Image style={{}} {...props} source={{uri: img[0].uri  }} />}
                right={(props) => <IconButton {...props} icon="eye" style={{ backgroundColor:"#FFEB3B" }} onPress={() => setModalVisible(true) } />}
            /> */}
           
        </View>

        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          {
                img.map(
                    (item, index) => {
                        return (
                            <View key={index}>
                                <Card.Title style={{ backgroundColor: 'gray', width: 250 }}
                                    title=''
                                    subtitle="Card Subtitle"
                                    left={(props) => <Avatar.Image {...props} source={{ uri: item.uri }} />}
                                    right={(props) => <IconButton {...props} icon="close"  onPress={() => { deleteImage(index) }} />}
                                />
                                {/* <Image key={index} source={{ uri: item }} style={{ width: 20, height: 20 }} /> */}
                            </View>
                        )
                    }
                )
            }
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
        
        <View style={{ maxHeight: 400, backgroundColor: '#a4a4a4', alignItems: 'center', justifyContent: 'space-evenly',paddingTop:30 }}>
            <TouchableOpacity style={styles.btn} 
            onPress={()=>{textinput.current.focus;} } >
                <Text>Write your message hear</Text>
            </TouchableOpacity>
            <TextInput
            ref={textinput}
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
      />
        </View>
        
        <TouchableOpacity
                style={styles.btn}

                onPress={() => {
                    uploadImageAsync()
                    // navigation.navigate('EditPage');
                }}

            ><Text style={{ color: '#ffffff' }}>Done</Text>
            </TouchableOpacity>


</View>
    )
}


const styles = StyleSheet.create({
    btn: {
        alignItems: "center",
        backgroundColor: '#60ad5e',
        padding: 10,
        margin: 20,
        height: 40,
        justifyContent: 'flex-end'
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
      },
      centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
      },
      buttonOpen: {
        backgroundColor: "#F194FF",
      },
      buttonClose: {
        backgroundColor: "#2196F3",
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      }
})