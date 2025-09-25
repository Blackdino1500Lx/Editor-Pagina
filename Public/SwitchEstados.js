import { supabase } from "../supabase.js";
// Funcion de captura de accion de boton y espera a que se cargue ese elemento del dom
document.addEventListener('DOMContentLoaded', () => {
  const btnMostrar = document.getElementById('btnMostrarPublico');
  if (btnMostrar) {
    btnMostrar.addEventListener('click', () => {
      mostrardatosPublico();
    });
  }
});
//Funcionalidad de conexcion a La base de datos usando el archivo supabase.js con las credenciales
async function mostrardatosPublico() {
  const { data, error } = await supabase.from('entradas').select('*');
  if (error) {
    console.error("Error obteniendo datos:", error);
    return;
  }
//Renderizado de elementos de contenido
  const contenedor = document.querySelector('#inicio .contenedor-entradas');
  if (!contenedor) return;
  data.forEach(tema => {
    const card = document.createElement('div');
    card.classList.add('card'); // Aquí aplicas la clase CSS
    const titulo = document.createElement('h3');
    titulo.classList.add('titulo-pre');
    titulo.textContent = tema.titulo || tema.h1 || '';

    const img = document.createElement('img');
    img.classList.add('img-pre');
    img.src = tema.imagen_url || '';
    img.alt = 'Imagen';
    img.style.maxWidth = '100%';

    const texto1 = document.createElement('p');
    texto1.classList.add('text1');
    texto1.textContent = `Texto 1: ${tema.parrafo || tema.Phar || ''}`;

    const texto2 = document.createElement('p');
    texto2.classList.add('text2');
    texto2.textContent = `Texto 2: ${tema.texto2 || tema.Phar2 || ''}`;

    // Añadir elementos a la card
    card.appendChild(titulo);
    if (tema.imagen_url) card.appendChild(img);
    card.appendChild(texto1);
    card.appendChild(texto2);

    // Añadir la card al contenedor
    contenedor.appendChild(card);
});

}