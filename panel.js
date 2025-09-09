import { supabase } from "../supabase.js";

document.getElementById('Form-Add').addEventListener('submit', async function(e) {
    e.preventDefault();

    const titulo = document.getElementById('h1').value;
    const parrafo = document.getElementById('Phar').value;
    const texto2 = document.getElementById('Phar2').value;
    const archivoInput = document.getElementById('archivoimg');
    const archivo = archivoInput.files[0];
    let archivoimg = null;

        if (archivo) {
            const fileName = `${Date.now()}_${archivo.name}`;
            const { data, error: uploadError } = await supabase.storage.from('Img').upload(fileName, archivo);
            if (uploadError) {
                console.error('Error subiendo imagen:', uploadError);
                alert('Error al subir la imagen');
                return;
            }
            archivoimg = fileName;
            // Definir la URL de la imagen subida
            const imagen_url = `https://etqhjkvmazpxrpsudeaa.supabase.co/storage/v1/object/public/Img/${archivoimg}`;
            // Mostrar la imagen en el preview (img)
            const previewImg = document.getElementById('preview');
            if (previewImg && previewImg.tagName === 'IMG') {
                previewImg.src = imagen_url;
                previewImg.style.display = 'block';
            }
    }

    const { error } = await supabase.from('entradas').insert([{ titulo, parrafo, texto2, imagen_url }]);

    if (error) {
        console.error("Error guardando:", error);
        alert("Error guardando los datos");
    } else {
        alert("Elementos guardados correctamente");
        mostrardatos();
    }
});

async function mostrardatos() {
    let { data, error } = await supabase.from('entradas').select('*');

    if (error) {
        console.error("Error obteniendo datos:", error);
    } else {
        const contenedor = document.getElementById('preview');
        contenedor.innerHTML = "";

        data.forEach(tema => {
            let div = document.createElement('div');
            let imgTag = tema.archivoimg ? `<img src="https://etqhjkvmazpxrpsudeaa.supabase.co/storage/v1/object/public/<Img>/${tema.archivoimg}" style="max-width:200px;" />` : '';
            div.innerHTML = `<h3>${tema.h1}</h3>${imgTag}<p>Texto 1: ${tema.Phar}</p><p>Texto 2: ${tema.Phar2}</p>`;
            contenedor.appendChild(div);
        });
    }
}

mostrardatos();