import { supabase } from "@/app/supabase";

/**
 * Function para la lista
 * @returns
 */
export async function GET() {
  const { data, error } = await supabase.from("videojuego").select("*");

  let videojuegos = data;

  if (error) {
    return new Response(
      JSON.stringify({ error: "Ha ocurrido un error:" + error.message })
    );
  }
  return new Response(JSON.stringify(videojuegos), { status: 200 });
}

/**
 * Function para borrar
 * @param {} request
 * @returns
 */
export async function DELETE(request) {
  const body = await request.json();
  const id = body.id;

  const { data, error } = await supabase
    .from("videojuego")
    .delete()
    .eq("id", id);

  if (error) {
    return new Response(
      JSON.stringify({ error: "Ha ocurrido un error:" + error.message })
    );
  }

  return new Response(JSON.stringify({ success: "Borrado correctamente" }));
}

/**
 * Funcion para agregar
 * @param {*} request
 * @returns
 */
export async function POST(request) {
  const body = await request.json();
  const videojuego = body.videojuego;

  if (videojuego.titulo == "") {
    return new Response(
      JSON.stringify({ error: "Titulo no puedo estar vacio" }),
      { status: 400 }
    );

  } else if (videojuego.plataforma == "") {
    return new Response(
      JSON.stringify({ error: "Plataforma no puedo estar vacio" }),
      { status: 400 }
    );

  } else if (videojuego.genero == "") {
    return new Response(
      JSON.stringify({ error: "Genero no puedo estar vacio" }),
      { status: 400 }
    );
  }

  if (!videojuego.fecha_lanzamiento.match("[0-9]{4}-[0-2]{2}-[0-9]{2}")) {
    return new Response(JSON.stringify({ error: "La fecha no es valida" }));
  }

  const { data, error } = await supabase.from("videojuego").insert(videojuego);

  if (error) {
    return new Response(
      JSON.stringify({ error: "Ha ocurrido un error:" + error.message })
    );
  }

  return new Response(JSON.stringify({ success: "Agregado correctamente" }));
}
