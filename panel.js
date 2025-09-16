const supabase = window.supabaseInstance;

document.getElementById('Form-Add').addEventListener('submit', async function(e) {
    e.preventDefault();

    const titulo = document.getElementById('h1').value;
    const parrafo = document.getElementById('Phar').value;
    const texto2 = document.getElementById('Phar2').value;
    const archivoimg = document.getElementById('archivoimg');
    const archivo = archivoimg.files[0];
        let imagen_url = '';
    let nombreArchivoimg = null;

    if (archivo) {
        const fileName = `${Date.now()}_${archivo.name}`;
        const { data, error: uploadError } = await supabase.storage.from('Img').upload(fileName, archivo);
        if (uploadError) {
            console.error('Error subiendo imagen:', uploadError);
            alert('Error al subir la imagen');
            return;
        }
        nombreArchivoimg = fileName;
        // Definir la URL de la imagen subida
        //Esta URL cambia
            imagen_url = `https://etqhjkvmazpxrpsudeaa.supabase.co/storage/v1/object/public/Img/${nombreArchivoimg}`;
        // Mostrar la imagen en el preview (img)
        const previewImg = document.getElementById('previewImgme');
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
            // Usar imagen_url si existe
            let imgTag = tema.imagen_url ? `<img src="${tema.imagen_url}" style="max-width:200px;" />` : '';
            div.innerHTML = `<h3>${tema.titulo || tema.h1 || ''}</h3>${imgTag}<p>Texto 1: ${tema.parrafo || tema.Phar || ''}</p><p>Texto 2: ${tema.texto2 || tema.Phar2 || ''}</p>`;
            contenedor.appendChild(div);
        });
    }
}

async function mostrardatosPublico() {
    let { data, error } = await supabase.from('entradas').select('*');
    if (error) {
        console.error("Error obteniendo datos:", error);
        return;
    }
    // Selecciona el contenedor de la sección Inicio
    const contenedor = document.querySelector('#inicio .contenedor-entradas');
    if (!contenedor) return;
    contenedor.innerHTML = "";
    data.forEach(tema => {
        let div = document.createElement('div');
        let imgTag = tema.imagen_url ? `<img src="${tema.imagen_url}" style="max-width:200px;" />` : '';
        div.innerHTML = `<h3>${tema.titulo || tema.h1 || ''}</h3>${imgTag}<p>Texto 1: ${tema.parrafo || tema.Phar || ''}</p><p>Texto 2: ${tema.texto2 || tema.Phar2 || ''}</p>`;
        contenedor.appendChild(div);
    });
}

async function procesarExcel() {
    const input = document.getElementById('archivoExcel');
    const file = input.files[0];
    if (!file) {
        alert('Selecciona un archivo Excel primero.');
        return;
    }
    const reader = new FileReader();
    reader.onload = async function(e) {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        // Guardar cada fila en la base de datos
        for (const fila of jsonData) {
            const { titulo, parrafo, texto2, } = fila;
            // Si los nombres de columna son diferentes, ajusta aquí
            await supabase.from('entradas').insert([
                {
                    titulo:titulo || '',
                    parrafo: parrafo || '',
                    texto2: texto2 || '',
                }
            ]);
        }
        // Actualizar el preview
        mostrardatos();
        alert('Datos importados correctamente');
    };
    reader.readAsArrayBuffer(file);
}

async function mostrar(tipo) {
    let { data, error } = await supabase.from('entradas').select('*');
    if (error) {
        console.error("Error obteniendo datos:", error);
        return;
    }
    const contenedor = document.getElementById('preview');
    contenedor.innerHTML = "";
    // Filtrar por tipo
    const filtrados = data.filter(tema => tema.tipo === tipo);
    filtrados.forEach(tema => {
        let div = document.createElement('div');
        let imgTag = tema.imagen_url ? `<img class="img-pre" src="${tema.imagen_url}" style="max-width:200px;" />` : '';
        div.innerHTML = `<h3 class="titulo-pre">${tema.titulo || tema.h1 || ''}</h3>${imgTag}
        <p class="text1">Texto 1: ${tema.parrafo || tema.Phar || ''}</p>
        <p class="text2">Texto 2: ${tema.texto2 || tema.Phar2 || ''}</p>`;
        contenedor.appendChild(div);
    });
}async function DeleteElements() {
    
}


window.procesarExcel = procesarExcel;
window.mostrar = mostrar;
window.mostrardatosPublico = mostrardatos;

mostrardatos();


//Funcion de eliminar datos 
document.getElementById('Form-Delete').addEventListener('submit', async function(e) {
  e.preventDefault();
  // Detecta qué botón fue presionado
  const borrarTodo = e.submitter && e.submitter.id === 'Del-All';
  if (borrarTodo) {
    // Borrar todos los datos
    const { error } = await supabase.from('entradas').delete().neq('id', 0);
    if (error) {
      alert('Error borrando todos los contenidos');
      console.error(error);
    } else {
      alert('Todos los contenidos borrados correctamente');
      mostrardatos();
    }
    return;
  }
  // Borrar por id y nombre
  const id = document.getElementById('deleteId').value;
  const nombre = document.getElementById('Name-Content').value;
  if (!id || !nombre) {
    alert('Debes ingresar el id y el nombre del artículo.');
    return;
  }
  const { error } = await supabase
    .from('entradas')
    .delete()
    .match({ id, titulo: nombre });
  if (error) {
    alert('Error borrando el contenido');
    console.error(error);
  } else {
    alert('Contenido borrado correctamente');
    mostrardatos();
  }
});
