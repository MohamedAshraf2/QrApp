import React from "react";
import { View, Text, Button ,StyleSheet} from "react-native";
import { useNavigation } from '@react-navigation/native';


export const Home = () => {
    const navigation = useNavigation();

    return (
        <View>
            <Text style={style.txt}>QR APP</Text>

            <Button
                title="Creat New"
                onPress={() => {
                    navigation.navigate('NewPage');
                }}
            />

            <Button
                title="EDIT"
                onPress={() => {
                    navigation.navigate('EditPage');
                }}
            />
        </View>
    )
}

const style = StyleSheet.create({
    txt:{
        fontSize :40,
        fontWeight : 'bold',
        textAlign:'center',
        justifyContent:'center',

    }
})