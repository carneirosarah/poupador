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
import UserIcon from '../../assets/person.svg'
import Api from '../../Api'
import AsyncStorage from '@react-native-community/async-storage'


export default () => {

    const [email, setEmailField] = useState('')
    const [pass, setPassField] = useState('')
    const [name, setNameField] = useState('')
    const navigation = useNavigation();

    const onMessageButtonClick = () => {

        navigation.reset({
            routes: [{name:'SignIn'}]
        })
    }

    const onSignButtonClick = async () => {
        
        let regex = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/
        
        if (name.length && pass.length && regex.test(email)) {

            let response = await Api.signUp(name, email, pass)
            console.log(response)
            
            if (response.token) {

                await AsyncStorage.setItem('token', response.token)
                navigation.reset({
                    routes:[{name:'Main'}]
                })

            } else {

                alert('Erro: ' + response.error)
            }
        } else {

            alert('Para realizar cadastro, insira o nome, o email e a senha')
        }
    }

    return (
        <Container>
        
            <Image source={ require('../../assets/pigIcon.png') } style = {{ width:200, height:200 }}/>

            <InputArea>

                <SignInput 
                    IconSvg={UserIcon} 
                    pholder="Nome"
                    val={name}
                    changeText={e => setNameField(e)}
                />

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

                    <CustomButtonText> Cadastrar </CustomButtonText>
                </CustomButton>
            </InputArea>

            <SignMessageButton  onPress={onMessageButtonClick}>

                <SignMessageButtonText> Já possui uma conta?</SignMessageButtonText>
                <SignMessageButtonTextBold> Login </SignMessageButtonTextBold>

            </SignMessageButton>

        </Container>
    )
}