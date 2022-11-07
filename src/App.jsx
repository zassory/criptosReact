import { useEffect , useState } from 'react';
import styled from '@emotion/styled';
import ImagenCripto from '../img/imagen-criptos.png';

import { Formulario , Resultado , Spinner } from './components';

const Contenedor = styled.div`
  max-width:900px;
  margin: 0 auto;
  width:90%;
  @media (min-width: 992px){
    display: grid;
    grid-template-columns: repeat(2,1fr);
    column-gap:2rem;
  }
`
const Imagen = styled.img`
  max-width:400px;
  width:80%;
  margin: 100px auto 0 auto;
  display: block;
`

const Heading = styled.h1`
  font-family:'Lato',sans-serif;
  color:#FFF;
  text-align:center;
  font-weight: 700;
  margin-top:80px;
  margin-bottom:50px;
  font-size:34px;

  &::after {
    content:'';
    width:100px;
    height:6px;
    background-color: #66A2FE;
    display: block;
    margin: 10px  auto  0 auto;
  }
`

export const App = () => {

  const [ monedas , setMonedas ] = useState({});//Select
  const [ resultado , setResultado ] = useState({});//Select

  const [ cargando , setCargando ] = useState(false);

  useEffect(()=> {
    if(Object.keys(monedas).length > 0){

      const cotizarCripto = async() => {

        setCargando( true );
        setResultado({});

        const { moneda , criptoMoneda } = monedas;
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${ criptoMoneda }&tsyms=${ moneda }`;
        const response = await fetch( url );
        const result = await response.json();

        setResultado(result.DISPLAY[criptoMoneda][moneda]);

        setCargando( false );
      }
       cotizarCripto();
    }
  },[ monedas ]);

  return (
    <Contenedor>
      <Imagen 
        src={ ImagenCripto }
        alt="Imagenes criptomonedas"
      />
      <div>
        <Heading>Cotiza Criptomonedas al Instante</Heading>

        <Formulario 
          setMonedas = { setMonedas }
        />

        { cargando && <Spinner /> }
        { resultado.PRICE && <Resultado resultado={ resultado }/> }

      </div>
    </Contenedor>
  )
}
