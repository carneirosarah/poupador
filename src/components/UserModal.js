import React, { useState } from 'react'
import styled from 'styled-components/native'
import ExpandIcon from '../assets/expand'
import LockIcon from '../assets/lock.svg'
import SignInput from './SignInput'
import Api from '../Api'


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
    min-height: 300px;
    padding: 10px 20px 40px 20px;
`

const CloseButton = styled.TouchableOpacity`
    width: 40px;
    height: 40px;
`
const ChangePassButton = styled.TouchableOpacity`
    height: 60px;
    background-color: #cb9ca1;
    border-radius: 10px;
    justify-content: center;
    align-items: center;
`
const ChangePassText = styled.Text`
    font-size: 16px;
    font-weight: bold;
    color: #FFFFFF;
`
export default ({ show, setShow, userId}) => {

    const [pass, setPassField] = useState('')
    const [newPass, setNewPassField] = useState('')

    const handleCloseButton = () => {
        setShow(false)
    }

    const changePass = async () => {

        try {

            if (pass.length && newPass.length) {

                console.log(userId)
                let response = await Api.changePass(userId, pass, newPass)

                if (response.status === 200) {

                    alert('Senha atualizada com sucesso')
                    setShow(false)
                    setPassField('')
                    setNewPassField('')

                } else {

                    alert('Não foi possível atualizar a senha')
                    setPassField('')
                    setNewPassField('')
                }
            } else {

                alert('Para prosseguir, iria senha atual e nova senha')
                setPassField('')
                setNewPassField('')
            }

        } catch(erro) {

            alert('Não foi possível atualizar a senha')
            setPassField('')
            setNewPassField('')
            console.log(error)
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
                    <SignInput 
                    IconSvg={LockIcon} 
                    pholder="Senha Atual:"
                    val={pass}
                    changeText={p => setPassField(p)}
                    pass={true}
                />
                <SignInput 
                    IconSvg={LockIcon} 
                    pholder="Nova Senha:"
                    val={newPass}
                    changeText={p => setNewPassField(p)}
                    pass={true}
                />
                <ChangePassButton onPress={changePass}>
                    <ChangePassText> Alterar Senha </ChangePassText>
                </ChangePassButton>
                </ModalBody>
            </ModalArea>
        </Modal>
    )
}