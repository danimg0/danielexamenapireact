"use client";

import { useState } from "react";

export default function Formulario() {
  const [inputs, setInputs] = useState({
    nombre: "",
    plataforma: "",
    genero: "",
    fecha: "",
  });

  const [inputCheck, setInputCheck] = useState(false);

  function updateInputs(e) {
    const { name, value } = e.target;
    console.log(inputs.fecha);

    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function updateCheck(e) {
    setInputCheck((prev) => !prev);
  }

  async function agregarVideojuego(e) {
    e.preventDefault();

    if (inputs.nombre == "") {
      alert("El nombre no puede estar vacio");
      return
    } else if (inputs.plataforma == "") {
      alert("La plataforma no puede estar vacio");
      return
    } else if (inputs.genero == "") {
      alert("El genero no puede estar vacio");
      return
    }

    if (!inputs.fecha.match("[0-9]{4}-[0-2]{2}-[0-9]{2}")) {
        alert("La fecha no es valida")
        return
    }

    const response = await fetch("/api/videojuegos", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        videojuego: {
          titulo: inputs.nombre,
          plataforma: inputs.plataforma,
          genero: inputs.genero,
          fecha_lanzamiento: inputs.fecha,
          completado: inputCheck,
        },
      }),
    });

    if (response.ok) {
      setInputCheck(false);
      setInputs({
        nombre: "",
        plataforma: "",
        genero: "",
        fecha: "",
      });
    }
  }

  return (
    <div>
      <h2>Agregar videjuego</h2>
      <form onSubmit={agregarVideojuego}>
        <label>
          Titulo:
          <input
            type="text"
            required
            value={inputs.nombre}
            onChange={updateInputs}
            name="nombre"
          />
        </label>
        <br />
        <label>
          Plataforma:
          <input
            type="text"
            required
            value={inputs.plataforma}
            onChange={updateInputs}
            name="plataforma"
          />
        </label>
        <br />
        <label>
          Genero:
          <input
            type="text"
            required
            value={inputs.genero}
            onChange={updateInputs}
            name="genero"
          />
        </label>
        <br />
        <label>
          Fecha de lanzamiento:
          <input
            type="date"
            required
            value={inputs.fecha}
            onChange={updateInputs}
            name="fecha"
          />
        </label>
        <br />
        <label>
          Completado:
          <input
            type="checkbox"
            checked={inputCheck}
            onChange={updateCheck}
            name="completado"
          />
        </label>
        <br />
        <input type="submit" value={"Agregar videojuego"} />
      </form>
    </div>
  );
}
