const URL = "https://striveschool-api.herokuapp.com/api/product/";

const getProducts = function () {
  fetch(URL, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzM3MDEzMjhhZDEyOTAwMTU4NzZiYjgiLCJpYXQiOjE3MzE2NTgwMzQsImV4cCI6MTczMjg2NzYzNH0.6evbY875A79CTndIgENVp_XlIhOfOAKLyaQcexHVOGo"
    }
  })
    .then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error(`Error data not found ${resp.statusText}`);
      }
    })
    .then((products) => {
      const containerCards = document.getElementById("productCards");
      products.forEach((prod) => {
        // Colonna
        const col = document.createElement("div");
        col.className = "col-md-4";

        // Card
        const card = document.createElement("div");
        card.className = "card mb-4 shadow-sm";

        const picture = document.createElement("img");
        picture.src = prod.imageUrl;
        picture.className = "bd-placeholder-img card-img-top object-fit-contain mt-3";
        picture.style.height = "200px";
        picture.style.width = "100%";
        picture.style.cursor = "pointer";
        picture.onclick = () => window.open(`../../details.html?appId=${prod._id}`, "_self");

        // CardBody
        const cardBody = document.createElement("div");
        cardBody.className = "card-body";
        cardBody.style.padding = "1.5rem";

        const cardTitle = document.createElement("h5");
        cardTitle.className = "card-title";
        cardTitle.innerText = prod.name;

        const cardDescription = document.createElement("p");
        cardDescription.className = "card-text";
        cardDescription.innerText = prod.description;
        cardDescription.style.height = "80px";

        const cardPrice = document.createElement("p");
        cardPrice.className = "card-text text-primary";
        cardPrice.innerText = prod.price + "€";
        cardPrice.style.marginTop = "60px";

        // Gruppo Bottoni
        const btnGroup = document.createElement("div");
        btnGroup.className = "d-flex gap-2 justify-content-between align-items-center";

        // Bottoni
        const detailBtn = document.createElement("button");
        detailBtn.type = "button";
        detailBtn.className = "btn btn-sm btn-primary";
        detailBtn.innerText = "Details";
        detailBtn.onclick = () => window.open(`../../details.html?appId=${prod._id}`, "_self");
        const editBtn = document.createElement("button");
        editBtn.type = "button";
        editBtn.className = "btn btn-sm btn-success me-auto";
        editBtn.innerText = "Edit";
        editBtn.onclick = () => window.open(`../../backoffice.html?appId=${prod._id}`, "_self");

        // Appends
        btnGroup.append(detailBtn, editBtn);
        cardBody.append(cardTitle, cardDescription, cardPrice, btnGroup);
        card.append(picture, cardBody);
        col.appendChild(card);
        containerCards.appendChild(col);
      });
    })
    .catch((error) => {
      generateAlert(error.message);
      console.log(error);
    });
};

window.addEventListener("DOMContentLoaded", function () {
  getProducts();
});
