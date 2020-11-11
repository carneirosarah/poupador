import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import {
    Container, 
    InputArea, 
    CustomButton, 
    CustomButtonText, 
    SignMessageButton, 
    SignMessageButtonText, 
    SignMessageButtonTextBold
} from './styles'
import SignInput from '../../components/SignInput'
import {Image} from 'react-native'
import EmailIcon from '../../assets/mail.svg'
import LockIcon from '../../assets/lock.svg'
import Api from '../../Api'
import AsyncStorage from '@react-native-community/async-storage'

export default () => {

    const [email, setEmailField] = useState('')
    const [pass, setPassField] = useState('')
    const navigation = useNavigation();

    const onSignButtonClick = async () => {

        let regex = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/ 
        
        if (pass.length && regex.test(email)) {

            let response = await Api.signIn(email, pass)
            console.log(response)
            
            if (response.token) {

                await AsyncStorage.setItem('token', response.token)
                navigation.reset({
                    routes:[{name:'Main'}]
                })

            } else {

                setEmailField('')
                setPassField('')
                alert('Email e/ou senha inválidos')
                
            }

        } else {

            setEmailField('')
            setPassField('')
            alert('Para efetuar login, insira um email e senha válidos')
        }
        
    }

    const onMessageButtonClick = () => {

        navigation.reset({
            routes: [{name:'SignUp'}]
        })
    }

    return (
        <Container>
        
            <Image source={ require('../../assets/pigIcon.png') } style = {{ width:200, height:200 }}/>

            <InputArea>

                <SignInput 
                    IconSvg={EmailIcon} 
                    pholder="E-mail"
                    val={email}
                    changeText={e => setEmailField(e)}
                />

                <SignInput 
                    IconSvg={LockIcon} 
                    pholder="Senha"
                    val={pass}
                    changeText={p => setPassField(p)}
                    pass={true}
                />

                <CustomButton onPress={onSignButtonClick}>

                    <CustomButtonText> Login </CustomButtonText>
                </CustomButton>
            </InputArea>

            <SignMessageButton  onPress={onMessageButtonClick}>

                <SignMessageButtonText> Não possui uma conta?</SignMessageButtonText>
                <SignMessageButtonTextBold> Cadastre-se </SignMessageButtonTextBold>

            </SignMessageButton>

        </Container>
    )
}