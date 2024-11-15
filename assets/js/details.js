const URL = "https://striveschool-api.herokuapp.com/api/product/";

const getProductDetails = (productId) => {
  fetch(`${URL}${productId}`, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzM3MDEzMjhhZDEyOTAwMTU4NzZiYjgiLCJpYXQiOjE3MzE2NTgwMzQsImV4cCI6MTczMjg2NzYzNH0.6evbY875A79CTndIgENVp_XlIhOfOAKLyaQcexHVOGo"
    }
  })
    .then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error("Errore nel recupero dei dettagli del prodotto.");
      }
    })
    .then((product) => {
      const headerSection = document.createElement("section");
      headerSection.className = "product-header";

      const title = document.createElement("h1");
      title.className = "product-title";
      title.innerText = "Dettaglio Prodotto: " + product.name;

      headerSection.appendChild(title);
      document.body.insertBefore(headerSection, document.querySelector("main"));

      // Dettaglio prodotto
      const productDetailContainer = document.getElementById("productDetail");
      const detailImage = document.createElement("img");
      detailImage.src = product.imageUrl;
      detailImage.className = "product-detail-image";

      const detailContent = document.createElement("div");
      detailContent.className = "product-detail-content";

      const detailTitle = document.createElement("h2");
      detailTitle.innerText = product.name;

      const detailDescription = document.createElement("p");
      detailDescription.innerText = product.description;

      const detailPrice = document.createElement("p");
      detailPrice.className = "price";
      detailPrice.innerText = `${product.price}€`;

      // Bottone Modifica
      const editBtn = document.createElement("button");
      editBtn.className = "btn";
      editBtn.innerText = "Modifica";
      editBtn.onclick = () => window.open(`../../backoffice.html?appId=${product._id}`, "_self");

      // Appends
      detailContent.append(detailTitle, detailDescription, detailPrice, editBtn);
      productDetailContainer.append(detailImage, detailContent);
    })
    .catch((err) => {
      console.error("Errore:", err);
      alert("Si è verificato un errore nel recupero dei dettagli.");
    });
};

window.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("appId");

  if (productId) {
    getProductDetails(productId);
  } else {
    alert("ID prodotto non trovato.");
  }
});
