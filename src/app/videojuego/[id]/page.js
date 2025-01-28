"use client";

import Link from "next/link";
import { use, useEffect, useState } from "react";

export default function Videojuego({ params }) {
  const { id } = use(params);
  const [videojuego, setVideojuego] = useState({});

  async function fetchVideojuego() {
    const response = await fetch("/api/videojuegos/videojuego?id=" + id);
    const data = await response.json();

    setVideojuego(data);
  }

  useEffect(() => {
    fetchVideojuego();
  }, []);

  return (
    <div>
      <h3>{videojuego.titulo}</h3>
      <p>{videojuego.plataforma}</p>
      <p>{videojuego.genero}</p>
      <p>{videojuego.fecha_lanzamiento}</p>
      {videojuego.completado ? <p>Completado</p> : <p>No completado</p>}
      <br />
      <br />
      <button>
        <Link href={"/edit/"+id}>Editar</Link>
      </button>
      <button>
        <Link href={"/"}>Volver atras</Link>
      </button>
    </div>
  );
}
