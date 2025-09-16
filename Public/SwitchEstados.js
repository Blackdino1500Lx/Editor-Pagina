
//URL y Key cambian
const supabaseUrl = "https://etqhjkvmazpxrpsudeaa.supabase.co";
const supabaseKey = "sb_publishable_crYVs5YVzIpqD3fqdRNcCw_Bvl1bIeg";
let supabase = null;
if (window.supabase) {
  supabase = window.supabase.createClient(supabaseUrl, supabaseKey);
} else if (typeof Supabase !== 'undefined') {
  supabase = Supabase.createClient(supabaseUrl, supabaseKey);
}
window.supabaseInstance = supabase;
export { supabase };

async function estado(){
    try{
        switch (estado){
            case 1 :
        let {data, error} = await supabase.from("entradas").select("*")
        if (error) {
            console.error('error al obtener los datos:' , error)   
        }

        else{
            const contenedor = document.getElementById('contenedorCambiante')
            contenedor
        }
                break;
        }
        



    }catch(error){
        console.log(error)
    }
}   