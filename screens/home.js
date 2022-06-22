import React from "react";
import { View, Text, Button ,StyleSheet ,TouchableOpacity} from "react-native";
import { useNavigation } from '@react-navigation/native';


export const Home = () => {
    const navigation = useNavigation();

    return (
        <View>
            <Text style={styles.txt}>QR APP</Text>

            <TouchableOpacity
            style = {styles.btn}
              
                onPress={() => {
                    navigation.navigate('NewPage');
                }}
            ><Text style={{color:'#ffffff'}}>Creat New Page</Text></TouchableOpacity>



            <TouchableOpacity
            style = {styles.btn}
                
                onPress={() => {
                    navigation.navigate('EditPage');
                }}
            
                ><Text style={{color:'#ffffff'}}>Edit Page</Text></TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    txt:{
        fontSize :40,
        fontWeight : 'bold',
        textAlign:'center',
        justifyContent:'center',
        color:"#2e7d32"

    },

    btn:{
        alignItems: "center",
        backgroundColor:'#60ad5e',
        padding: 10,
        margin :20,
        height:40,
    
      },
})