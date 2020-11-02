import React from "react";
import styled from '@emotion/styled'
import { letraMayuscula } from '../helper';
import PropTypes from 'prop-types';

const Contenedor = styled.div`
 padding:1rem;
 text-align: center;
 background-color: #00838F;
 color: #FFF;
 margin-top: 1rem;
`;

const Texto = styled.li`
 color: #FFF;
  margin: 0;
  font-size: 1.1rem;
  font-weight: bold;
`;

const Resumen = ({ datos }) => {
  const { marca, year, plan } = datos;

  // se usa el return null para que no se siga ejecutando el componente, en caso de que no pase la condicion
  if (marca === "" || year === "" || plan === "") return null;

  return (
    <Contenedor>
      <h2>Resumen del cotizado</h2>
      <ul>
        <Texto>marca: {letraMayuscula(marca)}</Texto>
        <Texto>plan: {letraMayuscula(plan)} </Texto>
        <Texto>año: {year}</Texto>
      </ul>
    </Contenedor>
  );
};

Resumen.propTypes ={
  datos: PropTypes.object.isRequired
}

export default Resumen;
