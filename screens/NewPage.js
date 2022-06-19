import React, { useState } from "react";
import { View, Text, Button, Image, FlatList } from "react-native";
import * as ImagePicker from 'expo-image-picker';

import { Avatar, Card, Colors, IconButton } from 'react-native-paper';





export const NewPage = () => {
    const [img, setImage] = useState([]);

    const deleteImage =(index)=>{
        let itemCopy =[...img];
        itemCopy.splice(index,1);
        setImage(itemCopy);
      }

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        // console.log(result);

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
                            <View > 
                                <Card.Title style={{backgroundColor : 'gray', width:250 } }
                                    key={index}
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