import React from "react";
import styled from "@emotion/styled";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import PropTypes from 'prop-types';

const Mensaje = styled.p`
  margin-top: 2rem;
  background-color: rgb(127, 224, 237);
  padding: 1rem;
  text-align: center;
`;
const DivCotizado = styled.div`
  margin-top: 2rem;
  padding: 0.5rem;
  border: 1px solid #26c6da;
  background: rgb(127, 224, 237);
  text-align: center;
  position: relative;
`;
const TextoCotizado = styled.p`
  color: #00838f;
  padding: 1rem;
  text-transform: uppercase;
  font-weight: bold;
  margin: 0;
  font-size: 1.1rem;
`;

const Resultado = ({ cotizacion }) =>
  cotizacion === 0 ? (
    <Mensaje>Elige marca, plan y año </Mensaje>
  ) : (
    <DivCotizado>
      <TransitionGroup
      component='span'
      className='resultado'
      >
        <CSSTransition
        classNames='resultado'
        key={cotizacion}
        timeout={{enter:500,exit:500}}
        >
          <TextoCotizado><span>$ {cotizacion}</span></TextoCotizado>
        </CSSTransition>
      </TransitionGroup>
    </DivCotizado>
  );

  Resultado.propTypes ={
    cotizacion: PropTypes.number.isRequired
  }
  

export default Resultado;
