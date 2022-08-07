import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styles from './styles.module.css'
import { Spinner } from 'vtex.styleguide'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

interface CombosPersonalizadosProps {}

interface Combo {
  amount: number
  available: boolean
  id: string
  comboProductId: string
  items: string[]
  products: Product[]
}

interface Product {
  name: string
  productId: string
  skus: Sku[]
}

interface Sku {
  sku: string
  listPriceFormated: string
  image: string
  listPrice: number
}

const CombosPersonalizados: StorefrontFunctionComponent<CombosPersonalizadosProps> = ({}) => {
  const [combos, setCombos] = useState<Combo[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true)
        const response = axios.get(
          `https://combos-api.herokuapp.com/combos/available`
        )
        await response.then(({ data }) => {
          console.log('data', data)
          setCombos(data)
        })
        setLoading(false)
      } catch (error) {
        console.error('')
      }
    }

    getData()
  }, [])

  if (loading) {
    return (
      <div className={styles.spinnerContainer}>
        <Spinner />
      </div>
    )
  }

  return (
    <div>
      <div className={styles.combo}>
        <div className={styles.product}>
          <img src={combos[0].products[0].skus[0].image} alt="teste" />
          <h2>{combos[0].products[0].name}</h2>
          <h3>{combos[0].products[0].skus[0].listPriceFormated}</h3>
        </div>
        <FontAwesomeIcon icon={faPlus} />
        <div className={styles.product}>
          <img src={combos[0].products[1].skus[0].image} alt="teste" />
          <h2>{combos[0].products[1].name}</h2>
          <h3>{combos[0].products[1].skus[0].listPriceFormated}</h3>
        </div>
        <div>
          <h1>Ofertas do Admin</h1>
          <a
            href={`https://testelojadesafio--speedware.myvtex.com/checkout/cart/add?sc=1&sku=${combos[0].products[0].skus[0].sku}&qty=1&seller=1&sku=${combos[0].products[1].skus[0].sku}&qty=1&seller=1`}
            target="_blank"
            rel="noreferrer"
          >
            <button className={styles.button}>Adicionar ao carrinho</button>
          </a>
        </div>
      </div>
      {/* <div className={styles.combo}>
        <div>
          <div>{combos[1].products[0].name}</div>
          <img src={combos[1].products[0].skus[0].image} alt="teste" />
        </div>
        <div>
          <div>{combos[1].products[1].name}</div>
          <img src={combos[1].products[1].skus[0].image} alt="teste" />
        </div>
        <a href={`https://testelojadesafio--speedware.myvtex.com/checkout/cart/add?sc=1&sku=${combos[1].products[1].skus[0].sku}&qty=1&seller=1&sku=${combos[1].products[0].skus[0].sku}&qty=1&seller=1`} target="_blank" rel="noreferrer">
          <button>Adicionar ao carrinho</button>
        </a>
      </div> */}
    </div>
  )
}

CombosPersonalizados.schema = {
  title: 'editor.pontuacao.title',
  description: 'editor.pontuacao.description',
  type: 'object',
  properties: {},
}

export default CombosPersonalizados

// https://help.vtex.com/pt/tutorial/como-montar-la-url-del-carrito--u3Tj5wagnukYwG84IQU06
