import { useState } from 'react'
import { Header } from '../../components/Header'
import { Container, Transactions } from './styles'
import { Input } from '../../components/Input'
import { Button } from '../../components/Button'
import { Alert, FlatList } from 'react-native'
import { spendingGetAll } from '../../spending/spendingGetAll'
import { SpendingStorageDTO } from '../../spending/SpendingStorageDTO'
import { TransactionExpenses }
  from '../../components/TransactionsExpenses'

export function SearchExpenses() {
  const [impostId, setImpostId] = useState('')
  const [dataExpenses, setDataExpenses] =
    useState<SpendingStorageDTO[]>([])

  async function handleSearchSpending() {
    if (impostId.trim() === '') {
      return Alert.alert('Atencao', 'Favor digite uma categoria')
    }

    const data = await spendingGetAll()
    const newData = data.filter(dat =>
      dat.impostId.toLowerCase().includes(impostId.toLowerCase()))

    if (newData.length === 0) {
      Alert.alert('Atenção', 'Código !!')
      setImpostId('')
      setDataExpenses([])
      return
    }

    setDataExpenses(newData)
  }

  return (
    <Container>
      <Header title='Pesquisa Gastos' />

      <Input
        placeholder='Categoria'
        placeholderTextColor='#363F5F'
        value={impostId}
        onChangeText={value => setImpostId(value)}
      />

      <Button
        title='Pesquisa'
        onPress={handleSearchSpending}
      />

      <Transactions>
        <FlatList
          data={dataExpenses}
          keyExtractor={item => item.id}
          renderItem={({ item }) =>
            <TransactionExpenses data={item} />
          }
          showsVerticalScrollIndicator={false}
        />
      </Transactions>

    </Container>
  )
}

