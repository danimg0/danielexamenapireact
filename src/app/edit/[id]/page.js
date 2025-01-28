"use client";

import Link from "next/link";
import { use, useEffect, useState } from "react";

export default function Videojuego({ params }) {
  const { id } = use(params);
  const [videojuego, setVideojuego] = useState({});
  const [inputs, setInputs] = useState({
    nombre: videojuego.titulo,
    plataforma: videojuego.plataforma,
    genero: videojuego.genero,
    fecha: videojuego.fecha_lanzamiento,
  });
  const [inputCheck, setInputCheck] = useState(videojuego.completado);

  async function fetchVideojuego() {
    const response = await fetch("/api/videojuegos/videojuego?id=" + id);
    const data = await response.json();

    setVideojuego(data);
  }

  useEffect(() => {
    fetchVideojuego();
  }, []);

  function updateInputs(e) {
    const { name, value } = e.target;

    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function updateCheck() {
    setInputCheck((prev) => !prev);
  }

  async function editarVideojuego(e) {
    e.preventDefault();

    if (inputs.nombre == "") {
      alert("El nombre no puede estar vacio");
      return;
    } else if (inputs.plataforma == "") {
      alert("La plataforma no puede estar vacio");
      return;
    } else if (inputs.genero == "") {
      alert("El genero no puede estar vacio");
      return;
    }

    if (!inputs.fecha.match("[0-9]{4}-[0-2]{2}-[0-9]{2}")) {
      alert("La fecha no es valida");
      return;
    }

    const response = await fetch("/api/videojuegos/videojuego", {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        id: id,
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
      setInputs({
        nombre: videojuego.titulo,
        plataforma: videojuego.plataforma,
        genero: videojuego.genero,
        fecha: videojuego.fecha_lanzamiento,
      });
      setInputCheck(false)
    }
  }
  return (
    <div>
      <form>
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
      </form>
      <button onClick={editarVideojuego}>Guardar</button>
      <button>
        <Link href={"/"}>Volver atras</Link>
      </button>
    </div>
  );
}
