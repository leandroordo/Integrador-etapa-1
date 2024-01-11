//Generar los cards de los productos
const products = [
  {
    photo: {
      src: "images/productos/1.jpg",
      alt: "varita mágica",
    },
    name: "Varita mágica",
    desciption: "Varita mágica que hace magia de verdad",
    price: "4200",
  },
  {
    photo: {
      src: "images/productos/2.jpg",
      alt: "polvillo de hadas",
    },
    name: "Polvillo de hadas",
    desciption: "El original polvillo de hadas de Tinkerbell para poder volar",
    price: "1700",
  },
  {
    photo: {
      src: "images/productos/3.png",
      alt: "alfombra mágica",
    },
    name: "Alfombra mágica",
    desciption: "Alfombra mágica para volar. Importada de Arabia.",
    price: "8550",
  },
  {
    photo: {
      src: "images/productos/4.jpg",
      alt: "moto voladora",
    },
    name: "Motocicleta voladora",
    desciption: "Moto con alas y cohetes. Puede volar por los cielos",
    price: "450000",
  },
  {
    photo: {
      src: "images/productos/5.jpg",
      alt: "unicornio",
    },
    name: "Unicornio de colores",
    desciption:
      "Unicornio real con cabello de colores. Incluye una bolsa de comida de unicornios de regalo.",
    price: "450000",
  },
  {
    photo: {
      src: "images/productos/6.jpg",
      alt: "habichuelas",
    },
    name: "Habichuelas mágicas",
    desciption:
      "Paquete de 4 habichuelas mágicas. Para obtener plantas hasta las nubes.",
    price: "3670",
  },
  {
    photo: {
      src: "images/productos/7.jpg",
      alt: "escoba vooladora",
    },
    name: "Escoba voladora",
    desciption: "Auténtica escoba voladora de brujas.",
    price: "2800",
  },
  ,
  {
    photo: {
      src: "images/productos/8.jpg",
      alt: "Lentes de rayos X",
    },
    name: "Lentes de rayos X",
    desciption:
      "Espectaculares lentes de rayos X que permiten ver a través de las paredes.",
    price: "4500",
  },
];

const otrosProductosString = localStorage.getItem("productos");
if (otrosProductosString) {
  const otrosProductos = JSON.parse(otrosProductosString);

  for (const product of otrosProductos) {
    const producto = {
      photo: {
        src: `images/productos/${product.photo}`,
        alt: product.name,
      },
      name: product.name,
      desciption: product.shortDescription,
      price: product.price,
    };

    products.push(producto);
  }
}

function generateCards(products) {
  let productsHTML = "";

  products.forEach((obj) => {
    let productHTML = `
        <div class="product__card">
            <div class="card__image">
              <img
                src="${obj.photo.src}"
                alt="${obj.photo.alt}"
                class="card__image-fluid"
              />
            </div>
            <div class="card__description">
              <h3 class="card__description-title">
                <a href="#">${obj.name}</a>
              </h3>
              <div class="card__description-text">
                ${obj.desciption}
              </div>
              <div class="card__description-price">$ ${obj.price}</div>
              <a href="#" class="button button-rounded"
                >Comprar
                <svg class="cart" width="18" height="18">
                  <use xlink:href="#cart"></use>
                </svg>
              </a>
            </div>
          </div>
        `;
    productsHTML += productHTML;
  });

  return productsHTML;
}

const cardsHTML = generateCards(products);
const container = document.getElementById("products_container");
container.innerHTML = cardsHTML;
