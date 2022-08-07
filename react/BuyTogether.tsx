import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./styles.module.css";
import { Spinner } from "vtex.styleguide";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

interface BuyTogetherProps {}

interface Combo {
  amount: number;
  available: boolean;
  id: string;
  comboProductId: string;
  items: string[];
  products: Product[];
}

interface Product {
  name: string;
  productId: string;
  skus: Sku[];
}

interface Sku {
  sku: string;
  listPriceFormated: string;
  image: string;
  listPrice: number;
}

const url =
  "https://testelojadesafio--speedware.myvtex.com/checkout/cart/add?sc=1&";

const BuyTogether: StorefrontFunctionComponent<BuyTogetherProps> = ({}) => {
  const [combos, setCombos] = useState<Combo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const getData = async () => {
    try {
      setLoading(true);
      const response = axios.get(
        `https://combos-api.herokuapp.com/combos/available`
      );
      await response.then(({ data }) => {
        console.log("data", data);
        setCombos(data);
      });
      setLoading(false);
    } catch (error) {
      console.error("");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className={styles.combosContainer}>
      {loading ? (
        <Spinner />
      ) : (
        combos.map((comboItem) => (
          <div className={styles.combo} id={comboItem.id} key={comboItem.id}>
            <div className={styles.product}>
              <img src={comboItem.products[0].skus[0].image} alt="teste" />
              <h2>{comboItem.products[0].name}</h2>
              <h3>{comboItem.products[0].skus[0].listPriceFormated}</h3>
            </div>
            <FontAwesomeIcon icon={faPlus} />
            <div className={styles.product}>
              <img src={comboItem.products[1].skus[0].image} alt="teste" />
              <h2>{comboItem.products[1].name}</h2>
              <h3>{comboItem.products[1].skus[0].listPriceFormated}</h3>
            </div>
            <a
              href={`${url}sku=${comboItem.products[1].skus[0].sku}&qty=1&seller=1&sku=${comboItem.products[0].skus[0].sku}&qty=1&seller=1`}
              target="_blank"
              rel="noreferrer"
            >
              <button className={styles.button}>Adicionar ao carrinho</button>
            </a>
          </div>
        ))
      )}
    </div>
  );
};
