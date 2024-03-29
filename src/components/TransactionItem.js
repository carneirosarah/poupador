import React from 'react'
import styled from 'styled-components/native'
import Api from '../Api'
import DeleteIcon from '../assets/delete.svg'
import EditIcon from '../assets/edit.svg'


const Card = styled.View`
    background-color:#ffebee;
    margin-bottom: 20px;
    padding: 15px;
    flex-direction: row;
    width: 90%;
    justify-content: space-between;
    border-radius: 20px;
`
const ActionArea = styled.View `
    flex-direction: row;
    justify-content: center;
`
const DeleteArea = styled.TouchableOpacity`
    padding: 5px;
`

const EditArea = styled.TouchableOpacity`
    padding: 5px;
`
const LeftColumn = styled.View`
    justify-content: space-between;
`
const RightColumn = styled.View`
    justify-content: space-between;
`
const TCategory = styled.Text`
    color: #000000;
    font-size: 20px;
    font-weight:bold;
    padding: 5px;
`
const TDesc = styled.Text`
    color: #000000;
    font-size: 15px;
    padding: 5px;
`
const TDate = styled.Text`
    color: #000000;
    font-size: 15px;
    padding: 5px;
`
const TValue = styled.Text`
    color: #000000;
    font-size: 20px;
    font-weight:bold;
    padding: 5px;
`

export default ({data, onRefresh, onUpdateTransaction}) => {
    
    function dateFomatter(date) {

        const aux = date.split('T')[0].split('-')
        return aux[2] + '.' + aux[1] + '.' + aux[0]
    }

    onDelete = async (id) => {

        try {

            let res = await Api.deleteTransaction(id)
            console.log(res)
            if (res.status === 200) {

                alert('Transação excluida com sucesso')
                onRefresh()

            } else {

                alert('Não foi possível excluir')
            }

        } catch(erro) {

            alert('Não foi possível excluir')
            console.log(erro)
        }
    }

    function onUpdate(obj) {
        onUpdateTransaction(obj)
    }

    return(
        <Card>
            <LeftColumn>
                <TCategory>{data.category_transaction}</TCategory>
                <TDesc>{data.description_transaction}</TDesc>
            </LeftColumn>
            <RightColumn>
                <ActionArea>
                    <DeleteArea  onPress={() => onDelete(data.id_transaction)}>
                        <DeleteIcon width="20" height="20" fill="#565353"/>
                    </DeleteArea>
                    <EditArea  onPress={() => onUpdate(data)}>
                        <EditIcon width="20" height="20" fill="#565353"/>
                    </EditArea>
                </ActionArea>
                <TDate>{dateFomatter(data.date_transaction)}</TDate>
                <TValue> R$ {data.value_transaction}</TValue>
            </RightColumn>
        </Card>
    );
}