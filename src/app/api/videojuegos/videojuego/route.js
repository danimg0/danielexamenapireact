import { supabase } from "@/app/supabase"

/**
 * Funcion para el videjuego solo
 * @param {*} request 
 * @returns 
 */
export async function GET(request) {

    const {searchParams} = new URL(request.url)
    const id = searchParams.get("id")

    const {data: searchedId, error} = await supabase.from("videojuego").select("*").eq("id", id).single()

    return new Response(JSON.stringify(searchedId), {status:200})
}

export async function PUT (request) {
    const body = await request.json()
    const {id, videojuego} = body

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
    

    const {data, error} = await supabase.from("videojuego").update(videojuego).eq("id",id)

    if (error) {
        return new Response(JSON.stringify({error: "Ha ocurrido un error: "+error.message}))
    }

    return new Response(JSON.stringify({exito: "modificado correctamente"}), {status:200})
}