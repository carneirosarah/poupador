import React, {useEffect} from 'react'
import {Image} from 'react-native'
import {LoadingIcon, Container} from './styles'
import AsyncStorage from '@react-native-community/async-storage'
import { useNavigation } from '@react-navigation/native'
import Api from '../../Api'

export default () => {
    
    const navigation = useNavigation();

    useEffect( () => {
        
        const checkToken = async () => {
            const token = await AsyncStorage.getItem('token')

            if (token) {

                let response = await Api.tokenValidate(token)

                if (response.token) {

                    await AsyncStorage.setItem('token', response.token)
                    navigation.reset({
                        routes:[{name:'Main'}]
                    })

                } else {

                    navigation.navigate('SignIn')
                }

            } else {

                navigation.navigate('SignIn')
            }
        }

        checkToken();
    }, [])
    return(
        <Container>
            <Image source={ require('../../assets/pigIcon.png') } style = {{ width:200, height:200 }}/>
            <LoadingIcon size="large" color="#565353" />
        </Container>
    )
}