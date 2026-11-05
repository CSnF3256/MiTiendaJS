// ✏️ Edita aquí tus productos
const PRODUCTS = [
  { id: 1, name: "Audífonos Bluetooth", cat: "Tecnología", price: 35.90, icon: "🎧" },
  { id: 2, name: "Mochila urbana", cat: "Accesorios", price: 42.00, icon: "🎒" },
  { id: 3, name: "Zapatillas deportivas", cat: "Calzado", price: 59.99, icon: "👟" },
  { id: 4, name: "Cámara instantánea", cat: "Tecnología", price: 89.50, icon: "📷" },
  { id: 5, name: "Reloj clásico", cat: "Accesorios", price: 120.00, icon: "⌚" },
  { id: 6, name: "Taza de cerámica", cat: "Hogar", price: 8.75, icon: "☕" },
  { id: 7, name: "Lámpara de escritorio", cat: "Hogar", price: 24.30, icon: "💡" },
  { id: 8, name: "Libro de cocina", cat: "Libros", price: 18.00, icon: "📖" }
];

const money = n =>
  new Intl.NumberFormat("es-EC", { style: "currency", currency: "USD" }).format(n);

const $ = id => document.getElementById(id);

// El carrito es un objeto { idProducto: cantidad }
let cart = {};
try {
  cart = JSON.parse(localStorage.getItem("cart") || "{}") || {};
} catch (e) {
  cart = {};
}

function save() {
  try {
    localStorage.setItem("cart", JSON.stringify(cart));
  } catch (e) {}
}

function renderProducts() {
  $("products").innerHTML = PRODUCTS.map(p => `
    <article class="card">
      <div class="emoji">${p.icon}</div>
      <span class="cat">${p.cat}</span>
      <h3>${p.name}</h3>
      <div class="price">${money(p.price)}</div>
      <button class="add" data-add="${p.id}">Agregar al carrito</button>
    </article>
  `).join("");
}

function renderCart() {
  const ids = Object.keys(cart).filter(id => cart[id] > 0);
  let total = 0;
  let count = 0;

  $("items").innerHTML = ids.length
    ? ids.map(id => {
        const p = PRODUCTS.find(x => x.id == id);
        if (!p) return "";
        const q = cart[id];
        total += p.price * q;
        count += q;
        return `
          <div class="item">
            <div class="emoji">${p.icon}</div>
            <div>
              <b>${p.name}</b>
              <small>${money(p.price)} c/u</small>
              <div class="qty">
                <button data-dec="${id}" aria-label="Quitar uno">−</button>
                <span>${q}</span>
                <button data-inc="${id}" aria-label="Agregar uno">+</button>
              </div>
            </div>
            <div class="sub">
              <b>${money(p.price * q)}</b>
              <button class="rm" data-rm="${id}">Eliminar</button>
            </div>
          </div>
        `;
      }).join("")
    : '<p class="empty">Tu carrito está vacío 🛒</p>';

  $("total").textContent = money(total);
  $("count").textContent = count;
}

function change(id, delta) {
  cart[id] = Math.max(0, (cart[id] || 0) + delta);
  if (cart[id] === 0) delete cart[id];
  save();
  renderCart();
}

function toggleCart(open) {
  $("drawer").classList.toggle("open", open);
  $("overlay").classList.toggle("open", open);
}

// Un solo "click" escucha todos los botones de productos y carrito
document.addEventListener("click", e => {
  const btn = e.target.closest("button");
  if (!btn) return;
  if (btn.dataset.add) change(btn.dataset.add, 1);
  else if (btn.dataset.inc) change(btn.dataset.inc, 1);
  else if (btn.dataset.dec) change(btn.dataset.dec, -1);
  else if (btn.dataset.rm) {
    delete cart[btn.dataset.rm];
    save();
    renderCart();
  }
});

$("openCart").onclick = () => toggleCart(true);
$("closeCart").onclick = () => toggleCart(false);
$("overlay").onclick = () => toggleCart(false);

$("clear").onclick = () => {
  cart = {};
  save();
  renderCart();
};

$("pay").onclick = () => {
  if (!Object.keys(cart).length) {
    alert("Tu carrito está vacío.");
    return;
  }
  alert("¡Gracias por tu compra! Total: " + $("total").textContent);
  cart = {};
  save();
  renderCart();
  toggleCart(false);
};

renderProducts();
renderCart();
