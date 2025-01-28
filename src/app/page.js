"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [videojuegos, setVideojuegos] = useState([]);

  async function fetchVideojuegos() {
    const response = await fetch("/api/videojuegos");
    const videojuegosAPI = await response.json();

    setVideojuegos(videojuegosAPI);

    console.log(videojuegosAPI);
  }

  useEffect(() => {
    fetchVideojuegos();
  }, []);

  async function deleteVideojuego(idBorrar) {
    if (window.confirm("Seguro que desea borrar el videojuego?")) {
      const response = await fetch("/api/videojuegos", {
        method: "DELETE",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          id: idBorrar,
        }),
      });

      fetchVideojuegos()
    }
  }

  return (
    <div>
      <h3>Lista de videojuegos ordenada</h3>
      {videojuegos.map((video) => (
        <p key={video.id}>
          <Link href={"/videojuego/"+video.id}>
          {video.titulo} - {video.plataforma}
          </Link>
          <button onClick={() => deleteVideojuego(video.id)}>Borrar</button>
        </p>
      ))}
      <br/>
      <br/>
      <button><Link href={"/create"}>Agregar videojuego</Link></button>
    </div>
  );
}
