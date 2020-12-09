import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Container,
         Scroller,
         PageHeader,
         PageBody,
         UserInfoArea,
         UserActionsArea,
         UserInfoName,
         ActionButton,
         ActionButtonText
} from '../Profile/styles'
import AsyncStorage from '@react-native-community/async-storage'
import jwt from "jwt-decode"
import {Image} from 'react-native'
import UserModal from '../../components/UserModal'
import Api from '../../Api'


export default () => {
    
    const [user, setUser] = useState({})
    const [showModal, setShowModal] = useState(false)
    const navigation = useNavigation();

    useEffect (() => {
        
        const getUser = async () => {
            let token = await AsyncStorage.getItem('token')
            token = jwt(token)
            setUser({
                name: token.name,
                email: token.email,
                id: token.id
            })
        }
        getUser()
    }, [])

    const changePassword = () => {
        
        setShowModal(true)
    }

    const deleteUser = async () => {

        try {

            let response = await Api.deleteUser(user.id)

            if (response.status === 200) {

                alert('Conta excluida com sucesso')
                await AsyncStorage.removeItem('token')
                navigation.reset({
                    routes:[{name:'SignIn'}]
                })

            } else {

                alert('Não foi possível excluir')
            }

        } catch(erro) {

            alert('Não foi possível excluir')
            console.log(erro)
        }
        
    }

    const logout = async () => {
        try {

            await AsyncStorage.removeItem('token')
            navigation.reset({
                routes:[{name:'SignIn'}]
            })
        } catch(erro) {
            
            alert('Não foi possível sair')
            console.log(erro)
        }
        
    }
    
    return (
        <Container>
            <Scroller>
                <PageHeader>
                    <Image source={ require('../../assets/pigIcon.png') } style = {{ width:100, height:100 }}/>
                </PageHeader>
                <PageBody>
                    <UserInfoArea>
                        <UserInfoName> {user.name} </UserInfoName>
                    </UserInfoArea>
                    <UserActionsArea>
                        <ActionButton onPress={changePassword}>
                            <ActionButtonText> Alterar Senha </ActionButtonText>
                        </ActionButton>

                        <ActionButton onPress={deleteUser}>
                            <ActionButtonText> Excluir Conta </ActionButtonText>
                        </ActionButton>
                        
                        <ActionButton onPress={logout}>
                            <ActionButtonText> Sair </ActionButtonText>
                        </ActionButton>

                    </UserActionsArea>
                </PageBody>
            </Scroller>
            <UserModal 
                show = {showModal}
                setShow = {setShowModal}
                userId = {user.id}
            />
        </Container>
    )
}