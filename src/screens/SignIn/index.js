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


export default () => {

    const [email, setEmailField] = useState('')
    const [pass, setPassField] = useState('')
    const navigation = useNavigation();

    const onMessageButtonClick = () => {

        navigation.reset({
            routes: [{name:'SignUp'}]
        })
    }

    const onSignButtonClick = () => {
        
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