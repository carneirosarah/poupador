import React, { useState, useEffect } from 'react'
import {Container,
        Scroller,
        Header,
        HeaderTitle,
        HeaderReceived,
        HeaderBalance,
        HeaderSpent,
        LoadingIcon,
        ListArea,
        DateSelector,
        DatePrevArea,
        DateTitleArea,
        DateTitle,
        DateNextArea
} from './styles'
import TransactionItem from '../../components/TransactionItem'
import {Image, RefreshControl} from 'react-native'
import Api from '../../Api'
import AsyncStorage from '@react-native-community/async-storage'
import jwt from "jwt-decode"
import TransactionModal from '../../components/TransactionModal'
import NavPrevIcon from '../../assets/navigate_before.svg'
import NavNextIcon from '../../assets/navigate_next.svg'

const months = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro'
]

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
    const [selectedYear, setSelectedYear] = useState(0)
    const [selectedMonth, setSelectedMonth] = useState(0)

    useEffect (() => {
        const now = new Date();
        setSelectedYear(now.getFullYear())
        setSelectedMonth(now.getMonth())
        getTransactionsPerDate()
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

    const getTransactionsPerDate = async (date_begin, date_finish) => {

        setLoading(true)
        
        let id

        if (user.id) {

            id = user.id
        } else {
            
            id = await getUser()
        }

        let res = await Api.getTransactionsByPeriod(id, date_begin, date_finish)

        if (res.error) {
            alert("Erro: " + res.error)
        } else {
            console.log(res)
            setTransactions(res.transactions)
        }

        res = await Api.getTotalSpentByPeriod(id, date_begin, date_finish)
        
        if (res.error) {
            alert("Erro: " + res.error)
        } else {
            console.log(res)
            setSpent(res.transaction[0].valor_total_gasto)
        }

        res = await Api.getBalanceByPeriod(id, date_begin, date_finish)
        
        if (res.error) {
            alert("Erro: " + res.error)
        } else {
            console.log(res)
            setBalance(res.transaction[0].saldo)
        }

        res = await Api.getTotalReceivedByPeriod(id, date_begin, date_finish)
        
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
            {!loading &&
                <DateSelector>
                    <DatePrevArea>
                        <NavPrevIcon width="35" heigth="35" fill="#000000"/>
                    </DatePrevArea>
                    <DateTitleArea>
                        <DateTitle>{selectedYear}</DateTitle>
                    </DateTitleArea>
                    <DateNextArea>
                        <NavNextIcon width="35" heigth="35" fill="#000000"/>
                    </DateNextArea>
                </DateSelector>
            }
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
                onRefresh={onRefresh}
            />
        </Container>
    )
}