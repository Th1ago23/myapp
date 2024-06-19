import { useState, useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { Alert, FlatList } from 'react-native'

import { Header } from '../../components/Header'
import {
  Container,
  Transactions
} from './styles'

import { TransactionExpenses }
  from '../../components/TransactionsExpenses'

import { spendingGetAll } from '../../spending/spendingGetAll'
import { SpendingStorageDTO } from '../../spending/SpendingStorageDTO'

export function ListExpenses() {
  const [impostId, setImpostId] =
    useState<SpendingStorageDTO[]>([])

  async function loadDataSpending() {
    try {
      const data = await spendingGetAll()
      setImpostId(data)
      //console.log(data)
    } catch (error) {
      console.log(error)
      Alert.alert('Erro', 'Não foi possível ler os dados gravados !!')
    }
  }

  useFocusEffect(useCallback(() => {
    loadDataSpending()
  }, []))

  return (
    <Container>
      <Header title='Listagem de Gastos' />

      {/* <Transactions> */}
      <FlatList
        data={impostId}
        keyExtractor={item => item.id}
        renderItem={({ item }) =>
          <TransactionExpenses data={item} />
        }
        showsVerticalScrollIndicator={false}
      />
      {/* </Transactions> */}

    </Container>
  )
}
