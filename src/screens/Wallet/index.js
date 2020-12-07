import React, { useState, useEffect } from 'react'
import {Container,
        Scroller,
        Header,
        HeaderTitle,
        HeaderReceived,
        HeaderBalance,
        HeaderSpent,
        LoadingIcon
} from './styles'
import {Image} from 'react-native'
import Api from '../../Api'
import AsyncStorage from '@react-native-community/async-storage'
import jwt from "jwt-decode"


export default () => {

    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState({})
    const [transactions, setTransaction] = useState([])
    const [received, setReceived] = useState('')
    const [balance, setBalance] = useState('')
    const [spent, setSpent] = useState('')

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
        const getTransactions = async () => {
            setLoading(true)
            let res = await Api.getTransactions(user.id)

            if (res.error) {
                alert("Erro: " + res.error)
            } else {
                console.log(res)
                setTransaction(res.transactions)
            }

            setLoading(false)
        }

        getUser()
        getTransactions()
    })

    

    return (
        <Container>
                <Header>
                    <Image source={ require('../../assets/pigIcon.png') } style = {{ width:100, height:100 }}/>
                    {!loading &&
                        <HeaderTitle>
                            <HeaderReceived> R$ {received} </HeaderReceived>
                            <HeaderBalance> R$ {balance} </HeaderBalance>
                            <HeaderSpent> R$ {spent} </HeaderSpent>
                        </HeaderTitle>
                    }
                </Header>
                {loading &&
                    <LoadingIcon size="large" color="#565353" />
                }
                
            <Scroller></Scroller>
        </Container>
    )
}