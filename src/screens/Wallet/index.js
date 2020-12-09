import React, { useState, useEffect } from 'react'
import {Container,
        Scroller,
        Header,
        HeaderTitle,
        HeaderReceived,
        HeaderBalance,
        HeaderSpent,
        LoadingIcon,
        ListArea
} from './styles'
import TransactionItem from '../../components/TransactionItem'
import {Image, RefreshControl} from 'react-native'
import Api from '../../Api'
import AsyncStorage from '@react-native-community/async-storage'
import jwt from "jwt-decode"
import TransactionModal from '../../components/TransactionModal'


export default () => {

    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState({})
    const [transactions, setTransactions] = useState([])
    const [received, setReceived] = useState('')
    const [balance, setBalance] = useState('')
    const [spent, setSpent] = useState('')
    const [refreshing, setRefreshing] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [transaction, setTransaction] = useState({})

    useEffect (() => {
        getTransactions()
    }, [])

    const getUser = async () => {
        let token = await AsyncStorage.getItem('token')
        token = jwt(token)
        console.log(token)
        setUser({
            name: token.name,
            email: token.email,
            id: token.id
        })
        
        return token.id
    }

    const getTransactions = async () => {

        setLoading(true)
        
        let id

        if (user.id) {

            id = user.id
        } else {
            
            id = await getUser()
        }

        let res = await Api.getTransactions(id)

        if (res.error) {
            alert("Erro: " + res.error)
        } else {
            console.log(res)
            setTransactions(res.transactions)
        }

        res = await Api.getTotalSpent(id)
        
        if (res.error) {
            alert("Erro: " + res.error)
        } else {
            console.log(res)
            setSpent(res.transaction[0].valor_total_gasto)
        }

        res = await Api.getBalance(id)
        
        if (res.error) {
            alert("Erro: " + res.error)
        } else {
            console.log(res)
            setBalance(res.transaction[0].saldo)
        }

        res = await Api.getTotalReceived(id)
        
        if (res.error) {
            alert("Erro: " + res.error)
        } else {
            console.log(res)
            setReceived(res.transaction[0].valor_total_recebido)
        }

        setLoading(false)
    }

    const onRefresh = () => {
        setRefreshing(false)
        getTransactions()
    }

    function onUpdateTransaction(obj) {
        setTransaction(obj)
        setShowModal(true)
    }
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
            <Scroller refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
            }>
                <ListArea>
                    {
                        transactions.map( (transaction, k) => (
                            <TransactionItem key={k} data={transaction} onRefresh={onRefresh} onUpdateTransaction={onUpdateTransaction}
                            />
                        ))
                    }
                </ListArea>
            </Scroller>
            <TransactionModal 
                show = {showModal}
                setShow = {setShowModal}
                transaction = {transaction}
            />
        </Container>
    )
}