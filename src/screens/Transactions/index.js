import React, { useState, useEffect } from 'react'
import {Image} from 'react-native'
import { Container,
         PageHeader,
         PageBody,
         InputArea,
         Input,
         ActionButton,
         ActionButtonText
} from '../Transactions/styles'
import Radio from '../../components/RadioButton'
import DatePicker from 'react-native-datepicker'
import Api from '../../Api'
import AsyncStorage from '@react-native-community/async-storage'
import jwt from "jwt-decode"

export default () => {

    const [user, setUser] = useState({})
    const [categoria, setCategoriaField] = useState('')
    const [val, setValField] = useState('')
    const [desc, setDescField] = useState('')
    const [type, setType] = useState('')
    const [date, setDate] = useState('')

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

    const onChangeType = (newType) => {
        setType(newType)
    }

    const onNewTransaction = async () => {

        try {

            if (categoria.length && type.length && date.length && parseFloat(val)) {

                let response = await Api.postTransaction(type, date, categoria, desc, parseFloat(val), user.id)
                
                if (response.transaction) {

                    alert('Transação incluída com sucesso!!')
                } else {

                    alert('Não foi possível incluir a transação')
                }
            } else {
                
                alert('Para prosseguir insira uma categoria, um tipo, uma data e um valor valido')
            }
        } catch(erro) {

            alert('Não foi possível incluir a transação')
            console.log(erro)

        } finally {

            setCategoriaField('')
            setValField('')
            setDescField('')
            setType('')
            setDate('')
        }
    }
    return (
        <Container>
            <PageHeader>
                <Image source={ require('../../assets/pigIcon.png') } style = {{ width:100, height:100 }}/>
            </PageHeader>
            <PageBody>
                <Radio onChangeType={onChangeType} ></Radio>

                <DatePicker
                    style={{width: 200, color: '#565353'}}
                    date={date}
                    format="YYYY-MM-DD"
                    minDate="2020-01-01"
                    maxDate="2020-12-31"
                    onDateChange={d => setDate(d)}
                    customStyles={{
                        dateInput: {
                            borderWidth: 0
                        },
                        dateText: {
                            fontSize: 18
                        }
                    }}
                >
                </DatePicker>

                <InputArea>
                    <Input
                        placeholder="Categoria"
                        placeholderTextColor="#565353"
                        value={categoria}
                        onChangeText={e => setCategoriaField(e)}
                    />
                </InputArea>

                <InputArea>
                    <Input
                        placeholder="Valor"
                        placeholderTextColor="#565353"
                        value={val}
                        onChangeText={e => setValField(e)}
                        keyboardType = 'numeric'
                    />
                </InputArea>

                <InputArea  style = {{ height:100 }}>
                    <Input
                        placeholder="Descrição"
                        placeholderTextColor="#565353"
                        value={desc}
                        onChangeText={e => setDescField(e)}
                        multiline
                        maxLength={100}
                    />
                </InputArea>

                <ActionButton onPress={onNewTransaction}>
                    <ActionButtonText> Finalizar </ActionButtonText>
                </ActionButton>
            </PageBody>
        </Container>
    )
}