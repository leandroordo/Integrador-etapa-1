function procesar() {
  guardarProducto();
}

function guardarProducto() {
  const name = document.getElementById("name").value;
  const price = document.getElementById("price").value;
  const stock = document.getElementById("stock").value;
  const brand = document.getElementById("brand").value;
  const category = document.getElementById("category").value;
  const shortDescription = document.getElementById("short_description").value;
  const longDescription = document.getElementById("long_description").value;
  const freeDelivery = document.getElementById("free_delivery").checked;
  const fromAge = document.getElementById("fromAge").value;
  const toAge = document.getElementById("toAge").value;
  const photo = document.getElementById("photo").value
    ? document
        .getElementById("photo")
        .value.split(/(\\|\/)/g)
        .pop()
    : "";

  var newProduct = {
    name,
    price,
    stock,
    brand,
    category,
    shortDescription,
    longDescription,
    freeDelivery,
    fromAge,
    toAge,
    photo,
  };

  //Leer los productos que están guardados
  var allProducts = [];
  const existingProductsString = localStorage.getItem("productos");

  if (existingProductsString) {
    allProducts = JSON.parse(existingProductsString);
  }

  allProducts.push(newProduct);
  var newProductsString = JSON.stringify(allProducts);

  localStorage.setItem("productos", newProductsString);
}
