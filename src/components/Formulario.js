import React, { useState } from "react";
// helpers functions
import { obtenerDiferenciaYear, calcularMarca, obtenerPlan } from "../helper";
//libreria
import styled from "@emotion/styled";
import PropTypes from 'prop-types';

const Campo = styled.div`
  display: flex;
  margin-bottom: 1rem;
  align-items: center;
`;
const Label = styled.label`
  flex: 0 0 100px;
`;
const Select = styled.select`
  display: block;
  width: 100%;
  padding: 1rem;
  border: 1px solid #e1e1e1;
  -webkit-appearance: none;
`;
const InputRadio = styled.input`
  margin: 0 1rem;
`;
const Boton = styled.button`
  background-color: #00838f;
  font-size: 1rem;
  width: 100%;
  padding: 1rem;
  color: #fff;
  text-transform: uppercase;
  font-weight: bold;
  border: none;
  transition: background-color 0.3s ease;
  margin-top: 2rem;

  &:hover {
    background-color: #26c6da;
    cursor: pointer;
  }
`;
const Error = styled.div`
  width: 100%;
  padding: 1rem;
  background-color: red;
  color: #fff;
  margin-bottom: 2rem;
  text-align: center;
`;

const Formulario = ({ guardarResumen, guardarCargando }) => {
  const [datos, guardarDatos] = useState({
    marca: "",
    year: "",
    plan: "",
  });
  const [error, guardarError] = useState(false);
  const { marca, year, plan } = datos;

  // reactividad - onChange
  const enviarInfo = (e) => {
    guardarDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  };

  const enviarFormulario = (e) => {
    e.preventDefault();
    if (marca.trim() === "" || year.trim() === "" || plan.trim() === "") {
      guardarError(true);
      return;
    }
    guardarError(false);
    // para obtener todo esto - nos ayudara el helper.js
    // base del seguro
    let resultado = 2000;
    // obtener diferencia de year de los carros
    const diferencia = obtenerDiferenciaYear(year);
    // por cada year restar el 3% de la base
    // x -= equivale a x = x-y
    resultado -= (diferencia * 3 * resultado) / 100;
    //base -= ((diferencia * base)*(3/100)); otra forma
    /* incremento dependiendo de la marca 
     americano 15%, europeo 30%, asiatico 5%*/
    resultado = calcularMarca(marca) * resultado;
    /* planes - basico 20%, completo 50% */
    const incremento = obtenerPlan(plan);
    // toFixed se usa para limitar los decimales que devolvera el float
    resultado = parseFloat(incremento * resultado).toFixed(2);
    // enviamos el resultado y los datos como prop
    // activar el cargando del spinner
    guardarCargando(true);

    setTimeout(() => {
      // escondemos el spinner
      guardarCargando(false);
      //enviamos los props
      guardarResumen({
        cotizacion: Number(resultado),
        datos,
      });
    }, 3000);
    // usamos el setTime para que espere 3s que se ejecute el spinner para enviar las props
  };

  return (
    <form onSubmit={enviarFormulario}>
      {error ? <Error>Todos los campos son obligatorios</Error> : null}

      <Campo>
        <Label for='marca'>marca</Label>
        <Select name='marca' value={marca} onChange={enviarInfo}>
          <option>--seleccionar--</option>
          <option value='americano'>americano</option>
          <option value='europeo'>europeo</option>
          <option value='asiatico'>asiatico</option>
        </Select>
      </Campo>

      <Campo>
        <Label for='year'>año</Label>
        <Select name='year' value={year} onChange={enviarInfo}>
          <option value=''>-- seleccionar --</option>
          <option value='2021'>2021</option>
          <option value='2020'>2020</option>
          <option value='2019'>2019</option>
          <option value='2018'>2018</option>
          <option value='2017'>2017</option>
          <option value='2016'>2016</option>
          <option value='2015'>2015</option>
          <option value='2014'>2014</option>
          <option value='2013'>2013</option>
          <option value='2012'>2012</option>
        </Select>
      </Campo>

      <Campo>
        <Label for='plan'>plan</Label>
        <InputRadio
          type='radio'
          name='plan'
          value='basico'
          checked={plan === "basico"}
          onChange={enviarInfo}
        />
        basico
        <InputRadio
          type='radio'
          name='plan'
          value='completo'
          checked={plan === "completo"}
          onChange={enviarInfo}
        />
        completo
      </Campo>
      <Boton type='submit'>Cotizar</Boton>
    </form>
  );
};

Formulario.propTypes ={
  guardarResumen: PropTypes.func.isRequired,
  guardarCargando: PropTypes.func.isRequired
}

export default Formulario;
