import React, { useState, useEffect } from 'react'
import styled from 'styled-components/native'
import ExpandIcon from '../assets/expand'
import Api from '../Api'
import Radio from './RadioButton'
import DatePicker from 'react-native-datepicker'


const Modal = styled.Modal``
const ModalArea = styled.View`
    flex: 1;
    background-color: rgba(0, 0, 0, 0.5);
    justify-content: flex-end;
`
const ModalBody = styled.View`
    background-color:#ffcdd2;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    height: 80%;
    padding: 10px 20px 40px 20px;
`

const CloseButton = styled.TouchableOpacity`
    width: 40px;
    height: 40px;
`
export const Scroller = styled.ScrollView`
    flex: 1;
`
export const InputArea = styled.View`
    width: 100%;
    height: 60px;
    background-color: #ffebee;
    flex-direction: row;
    border-radius: 10px;
    padding-left: 15px;
    align-items: center;
    margin-bottom: 15px;
`

export const Input = styled.TextInput`
    flex: 1;
    font-size: 16px;
    color: #565353;
    margin-left: 10px;
`

export const ActionButton = styled.TouchableOpacity`
    flex-direction: row;
    width: 100%;
    background-color: #ffebee;
    border-radius: 10px;
    padding: 20px 20px;
    justify-content: center;
    align-items: center;
`

export const ActionButtonText = styled.Text`
    font-size: 16px;
    font-weight: bold;
    color: #565353;
`

export default ({ show, setShow, transaction, onRefresh}) => {
    
    const [categoria, setCategoriaField] = useState('')
    const [val, setValField] = useState('')
    const [desc, setDescField] = useState('')
    const [type, setType] = useState('')
    const [date, setDate] = useState('')

    const handleCloseButton = () => {
        setShow(false)
    }
    const onChangeType = (newType) => {
        setType(newType)
    }
    const onUpdate = async () => {

        try {

            if (categoria.length && type.length && date.length && parseFloat(val)) {

                let response = await Api.updateTransaction(transaction.id_transaction, type, date, categoria, desc, parseFloat(val))
                
                if (response.status === 200) {

                    alert('Transação atualizada com sucesso!!')
                    onRefresh()
                } else {

                    alert('Não foi atualizar incluir a transação')
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
        <Modal
            transparent={true}
            visible={show}
            animationType="slide"
        >
            <ModalArea>
                <ModalBody>
                    <CloseButton onPress={handleCloseButton}>
                        <ExpandIcon width="40" height="40" fill="#000000" />
                    </CloseButton>

                    <Scroller>
                        <Radio onChangeType={onChangeType} ></Radio>
                        <DatePicker
                            style={{width: 300, color: '#565353'}}
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

                        <ActionButton onPress={onUpdate}>
                            <ActionButtonText> Atualizar </ActionButtonText>
                        </ActionButton>
                    </Scroller>
                </ModalBody>
            </ModalArea>
        </Modal>
    )
}