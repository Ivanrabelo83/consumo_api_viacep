import React, { useEffect, useState } from 'react';
import './App.css';
import { api } from './services/api';

type AdressInfo = {
  logradouro: string;
  localidade: string;
  bairro: string;
  uf: string;
}

function App() {
  const [adress, setAdress] = useState<AdressInfo>();
  const [zipCode, setZipCode] = useState<string>();
  const [number, setNumber] = useState<string>();
  const validateZipCode = zipCode?.length === 8;

  
  function searchAdress() {
    if (validateZipCode) {
      api.get(`${zipCode}/json/`)
      .then((response) => {
      if (response.data.erro) {
        alert('Cep não encontrado')
      }
        setAdress(response.data)
      })
    .catch(err => console.log(err))
  }
    }
    


  return (
    <main>
      <div className="title">
        <h1>Consultar Endereço</h1>
      </div>
      <form>
        <label htmlFor="zipCode">Cep</label>
        <div className='zipCode'>
          <input
            type="number"
            id="zipCode"
            value={zipCode}
            onChange={(event => setZipCode(event.target.value))}/>
         
          <button
            type='button'
            onClick={searchAdress}
          >
            Buscar Endereço
          </button>
        </div>

        <label htmlFor="street">Logradouro</label>
        <input
          type="text"
          id="street"
        value={adress?.logradouro}/>

        <label htmlFor="number">Numero</label>
        <input
          type="number"
          id="number"
          value={number}
          onChange={(event => setNumber(event.target.value))}
          />

        <label htmlFor="city">Cidade</label>
        <input
          type="text"
          id="city"
          value={adress?.localidade}
        />

        <label htmlFor="district">Bairro</label>
        <input
          type="text"
          id="district"
           value={adress?.bairro}/>

        <label htmlFor="state">Estado</label>
        <input
          type="text"
          id="state"
        value={adress?.uf}/>




      </form>





      </main>










  );
}

export default App;
