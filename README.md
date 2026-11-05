
# Mi Tienda

Página web de productos con carrito de compras, hecha con HTML, CSS y JavaScript puro, sin librerías ni servidor.

**Demo:** https://tu-proyecto.vercel.app

## Funciones

- Catálogo de productos en tarjetas
- Botón de carrito con contador de artículos
- Panel lateral con los productos agregados, cantidades y total
- Agregar, quitar, eliminar y vaciar el carrito
- El carrito se conserva al recargar la página (`localStorage`)
- Diseño responsive en blanco y mostaza

## Estructura

```
tienda/
├── index.html   # Estructura de la página
├── styles.css   # Estilos y colores
└── script.js    # Productos y lógica del carrito
```

## Cómo usarlo

1. Descarga o clona el repositorio.
2. Abre `index.html` en tu navegador.

No necesitas instalar nada.

## Personalizar

**Productos:** edita el arreglo `PRODUCTS` al inicio de `script.js`. Cada producto tiene `id`, `name`, `cat`, `price` e `icon`.

```js
{ id: 9, name: "Nuevo producto", cat: "Hogar", price: 15.00, icon: "🪴" }
```

**Colores:** cambia las variables al inicio de `styles.css`, por ejemplo `--mostaza`.

**Moneda:** está en dólares (USD). Se cambia en la función `money()` de `script.js`.

## Publicar en Vercel

1. Sube el proyecto a GitHub.
2. En [vercel.com](https://vercel.com), elige **Add New → Project** e importa el repositorio.
3. Pulsa **Deploy**. No hace falta configurar nada más.

## Limitaciones

El botón «Finalizar compra» solo muestra un mensaje de confirmación. No procesa pagos reales.
