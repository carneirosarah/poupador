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
import SeeAll from '../../components/WalletSeeAll'

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
    const [seeAll, setSeeAll] = useState(false)

    useEffect (() => {
        
        if (seeAll) {

            getTransactions()
        
        } else {

            const now = new Date();
            setSelectedYear(now.getFullYear())
            setSelectedMonth(now.getMonth())

            const dates = setDates(now.getMonth(), now.getFullYear())
            getTransactionsPerDate(dates[0], dates[1])
        }
    }, [seeAll])

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

            if (res.transaction.length) {

                setSpent(res.transaction[0].valor_total_gasto)
            } else {

                setSpent(0)
            }
        }

        res = await Api.getBalance(id)
        
        if (res.error) {

            alert("Erro: " + res.error)
        } else {

            console.log(res)

            if (res.transaction.length) {
                
                setBalance(res.transaction[0].saldo)
            } else {

                setBalance(0)
            }
        }

        res = await Api.getTotalReceived(id)
        
        if (res.error) {

            alert("Erro: " + res.error)
        } else {

            console.log(res)

            if (res.transaction.length) {

                setReceived(res.transaction[0].valor_total_recebido)
            } else {

                setReceived(0)
            }
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

            if (res.transaction.length) {

                setSpent(res.transaction[0].valor_total_gasto)
            } else {

                setSpent(0)
            }
        }

        res = await Api.getBalanceByPeriod(id, date_begin, date_finish)
        
        if (res.error) {

            alert("Erro: " + res.error)
        } else {

            console.log(res)

            if (res.transaction.length) {

                setBalance(res.transaction[0].saldo)
            } else {

                setBalance(0)
            }
        }

        res = await Api.getTotalReceivedByPeriod(id, date_begin, date_finish)
        
        if (res.error) {
            alert("Erro: " + res.error)
        } else {
            console.log(res)

            if (res.transaction.length) {

                setReceived(res.transaction[0].valor_total_recebido)
            } else {

                setReceived(0)
            }
        }

        setLoading(false)
    }

    const setDates = (mounth, year) => {

        const date_begin = year + '-' + lpad(mounth + 1, '0', 2) + '-' + '01'
        let date_finish

        if ( mounth + 1 == 1 || mounth + 1 == 3 || mounth + 1 == 5 || mounth + 1 == 7 || mounth + 1 == 8 || mounth + 1 == 10 || mounth + 1 == 12) {
            
            date_finish = year + '-' + lpad(mounth + 1, '0', 2) + '-' + '31'

        } else if (mounth + 1 === 2 && (year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0))) {

            date_finish = year + '-' + lpad(mounth + 1, '0', 2) + '-' + '29'

        } else if (mounth + 1 === 2) {

            date_finish = year + '-' + lpad(mounth + 1, '0', 2) + '-' + '28'

        } else {

            date_finish = year + '-' + lpad(mounth + 1, '0', 2) + '-' + '30'
        }

        return [date_begin, date_finish]
    }

    const onRefresh = () => {
        setRefreshing(false)
        getTransactions()
    }

    function onUpdateTransaction(obj) {
        setTransaction(obj)
        setShowModal(true)
    }

    const onPrevDateClick = () => {
        
        let aux = new Date(selectedYear, selectedMonth, 1)
        aux.setMonth(aux.getMonth() - 1)
        
        setSelectedYear(aux.getFullYear())
        setSelectedMonth(aux.getMonth())

        const dates = setDates(aux.getMonth(), aux.getFullYear())
        getTransactionsPerDate(dates[0], dates[1])
    }

    const onNextDateClick = () => {

        let aux = new Date(selectedYear, selectedMonth, 1)
        aux.setMonth(aux.getMonth() + 1)
        
        setSelectedYear(aux.getFullYear())
        setSelectedMonth(aux.getMonth())

        const dates = setDates(aux.getMonth(), aux.getFullYear())
        getTransactionsPerDate(dates[0], dates[1])
    }

    const onClickSeeAll = (state) => {
        setSeeAll(state)
    }

    function lpad(str, padString, length) {

        if (typeof str !== 'string') {
            str = String(str)
        }

        while(str.length < length) {str = padString + str}

        return str
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

            {!loading && !seeAll &&
                <DateSelector>
                    <DatePrevArea onPress={onPrevDateClick}>
                        <NavPrevIcon width="35" heigth="35" fill="#000000"/>
                    </DatePrevArea>
                    <DateTitleArea>
                        <DateTitle>{months[selectedMonth]} {selectedYear}</DateTitle>
                    </DateTitleArea>
                    <DateNextArea onPress={onNextDateClick}>
                        <NavNextIcon width="35" heigth="35" fill="#000000"/>
                    </DateNextArea>
                </DateSelector>
            }

            {!loading && 
                <SeeAll onClickSeeAll={onClickSeeAll} seeAll={seeAll} />
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