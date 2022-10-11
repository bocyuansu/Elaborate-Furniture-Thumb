import React from 'react'
import styled from 'styled-components'
import { PageHero } from '../components'
// extra imports
// import { Link } from 'react-router-dom'

const CheckoutPage = () => {
  return (
    <main>
      <PageHero title="結帳" />
      <Wrapper className="page">
        <h1>checkout here</h1>
      </Wrapper>
    </main>
  )
}
const Wrapper = styled.div``
export default CheckoutPage
