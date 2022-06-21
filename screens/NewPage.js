import React, { useState } from "react";
import { View, Text, Button, Image, FlatList } from "react-native";
import * as ImagePicker from 'expo-image-picker';

import { Avatar, Card, Colors, IconButton } from 'react-native-paper';

import { initializeApp } from 'firebase/app';

import { getFirestore,collection,getDocs } from "firebase/firestore";

export const NewPage = () => {
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
    
    
    async function getCities(db){
        const citiesCol = collection(db, 'photos');
        const citySnapshot = await getDocs(citiesCol);
        const cityList = citySnapshot.docs.map(doc => doc.data());
       console.log(cityList); }
       
    try {
        // const citiesCol = collection(db, 'photos');
        // getDocs(citiesCol).then((data)=>{
        //     const X = (data.data());
        //     alert (X)
        //})
        getCities(db)
       
    } catch(e){
        console.log(e)
    }

    const [img, setImage] = useState([]);

    const deleteImage =(index)=>{
        let itemCopy =[...img];
        itemCopy.splice(index,1);
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
            img.push(result.uri)
            setImage((prev) => [...prev]);
        }

        console.log(img)
    };
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button title="Pick an image from camera roll" onPress={pickImage} />
            {
                img.map(
                    (item, index) => {
                        return (
                            <View key={index}> 
                                <Card.Title style={{backgroundColor : 'gray', width:250 } }
                                    title="Card Title"
                                    subtitle="Card Subtitle"
                                   left ={(props) => <Avatar.Image {...props}source={{ uri: item }} />}
                                    right={(props) => <IconButton {...props} icon="close" style={{backgroundColor:Colors.red500}} onPress={() => {deleteImage(index)}} />}
                                />
                                {/* <Image key={index} source={{ uri: item }} style={{ width: 20, height: 20 }} /> */}
                            </View>
                        )
                    }
                )
            }
        </View>
    )
}