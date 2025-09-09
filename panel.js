// Inicializar Supabase
import { supabase } from "../Private/supabase.js";
    // Agregar reunión manualmente
    document.getElementById('Form-Add').addEventListener('submit', async function(e) {
        e.preventDefault();

        let Tema = document.getElementById('h1').value;
        let Parrafo1 = document.getElementById('Phar').value;
        let Parrafo2 = document.getElementById('Phar2').value;
        let archivoImg = document.getElementById('archivoimg').value;

        const { error } = await supabase.from('Tabla').insert([{ h1, Phar, Phar2, archivoimg, }]);

        if (error) console.error("Error guardando:", error);
        else {
            alert("Elementos guardados correctamente");
            mostrarElementos();
        }
    });

    // Mostrar datos almacenados
    async function mostrarReuniones() {
        let { data, error } = await supabase.from('tabla').select('*');

        if (error) console.error("Error obteniendo datos:", error);
        else {
            const contenedor = document.getElementById('preview');
            contenedor.innerHTML = "";

            data.forEach(reunion => {
                let div = document.createElement('div');
                div.innerHTML = `<h3>${tema.h1} - ${tema.archivoimg}</h3><p>Texto: ${tema.Phar.join(", ")}</p>`;
                contenedor.appendChild(div);
            });
        }
    }

    // Cargar elementos
    mostrardatos();
