import React, { useState, useEffect } from 'react'
import Text from 'react-native'
import { Container,
         Scroller,
         PageHeader,
         PageBody,
         UserInfoArea,
         UserActionsArea
} from '../Profile/styles'
import AsyncStorage from '@react-native-community/async-storage'
import jwt from "jwt-decode"

export default () => {
    const [user, setUser] = useState({})

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
    })
    
    return (
        <Container>
            <Scroller>
                <PageHeader>

                </PageHeader>
                <PageBody>
                    <UserInfoArea>

                    </UserInfoArea>
                    <UserActionsArea>

                    </UserActionsArea>
                </PageBody>
            </Scroller>
        </Container>
    )
}