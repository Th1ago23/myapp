import {
  Container,
  Description,
  Amount,
  Local,
  Footer,
  Category,
  Date,
} from "./styles";

import { SpendingStorageDTO } from "../../spending/SpendingStorageDTO";

type Props = {
  data: SpendingStorageDTO
}

export function TransactionExpenses({ data }: Props) {
  return (
    <Container>
      <Description>{data.fiscalNote}</Description>
      <Amount>{data.impostId}</Amount>
      <Local>{data.fiscalValue}</Local>

      <Footer>
        <Category>{data.stateFiscal}</Category>
        <Date>{data.supplier}</Date>
      </Footer>

    </Container>
  )
}