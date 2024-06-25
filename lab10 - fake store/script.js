document.addEventListener("DOMContentLoaded", function () {
  const productsContainer = document.getElementById("products-container");
  const categorySelect = document.getElementById("categorySelect");

  let allProducts = [];

  function fetchProducts() {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => {
        allProducts = data;
        populateCategories();
        displayProducts(allProducts);
      });
  }

  function populateCategories() {
    const categories = [
      ...new Set(allProducts.map((product) => product.category)),
    ];
    categories.forEach((category) => {
      const option = document.createElement("option");
      option.value = category;
      option.textContent = category;
      categorySelect.appendChild(option);
    });
  }

  function displayProducts(products) {
    productsContainer.innerHTML = ""; // Clear existing products
    products.forEach((product) => {
      const productCard = createProductCard(product);
      productsContainer.appendChild(productCard);
    });
  }

  function createProductCard(product) {
    const colDiv = document.createElement("div");
    colDiv.className = "col-md-4 mb-4";

    const cardDiv = document.createElement("div");
    cardDiv.className = "card";

    const cardImg = document.createElement("img");
    cardImg.className = "card-img-top";
    cardImg.src = product.image;
    cardImg.alt = product.title;

    const cardBodyDiv = document.createElement("div");
    cardBodyDiv.className = "card-body";

    const cardTitle = document.createElement("h5");
    cardTitle.className = "card-title";
    cardTitle.textContent = product.title;

    const cardText = document.createElement("p");
    cardText.className = "card-text";
    cardText.textContent = product.description;

    const cardPrice = document.createElement("p");
    cardPrice.className = "card-text";
    cardPrice.textContent = `$${product.price}`;

    cardBodyDiv.appendChild(cardTitle);
    cardBodyDiv.appendChild(cardText);
    cardBodyDiv.appendChild(cardPrice);
    cardDiv.appendChild(cardImg);
    cardDiv.appendChild(cardBodyDiv);
    colDiv.appendChild(cardDiv);

    return colDiv;
  }

  categorySelect.addEventListener("change", function () {
    const selectedCategory = categorySelect.value;
    const filteredProducts =
      selectedCategory === "all"
        ? allProducts
        : allProducts.filter(
            (product) => product.category === selectedCategory
          );
    displayProducts(filteredProducts);
  });

  fetchProducts();
});
