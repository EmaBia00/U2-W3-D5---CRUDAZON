const URL = "https://striveschool-api.herokuapp.com/api/product/";

const handleCrudazonAPI = (e) => {
  e.preventDefault();

  const productData = {
    name: document.getElementById("name").value,
    description: document.getElementById("description").value,
    brand: document.getElementById("brand").value,
    imageUrl: document.getElementById("image").value,
    price: document.getElementById("price").value
  };

  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("appId");

  const method = productId ? "PUT" : "POST";
  const requestUrl = productId ? `${URL}${productId}` : URL;

  const submitButton = document.getElementById("submit-btn");
  if (method === "PUT") {
    submitButton.classList.remove("btn-primary");
    submitButton.classList.add("btn-success");
    submitButton.textContent = "Modifica";
  } else {
    submitButton.classList.remove("btn-success");
    submitButton.classList.add("btn-primary");
    submitButton.textContent = "Inserisci Prodotto";
  }

  fetch(requestUrl, {
    method: method,
    body: JSON.stringify(productData),
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzM3MDEzMjhhZDEyOTAwMTU4NzZiYjgiLCJpYXQiOjE3MzE2NTgwMzQsImV4cCI6MTczMjg2NzYzNH0.6evbY875A79CTndIgENVp_XlIhOfOAKLyaQcexHVOGo"
    }
  })
    .then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error("Errore nella richiesta");
      }
    })
    .then((product) => {
      alert(productId ? `Prodotto ${productId} aggiornato con successo` : "Creato un nuovo articolo");
      e.target.reset();
      window.location.href = "../../index.html";
    })
    .catch((err) => {
      console.error("Errore:", err);
      alert("Si è verificato un errore, riprova!");
    });
};

const modifyProduct = (productId) => {
  const submitButton = document.getElementById("submit-btn");
  submitButton.classList.remove("btn-primary");
  submitButton.classList.add("btn-success");
  submitButton.innerText = "Modifica";
  const title = document.getElementById("titlePage");
  title.innerText = "Modifica Prodotto:";
  const deleteBtn = document.getElementById("delete-btn");
  deleteBtn.classList.remove("d-none");
  deleteBtn.onclick = function () {
    if (confirm("Sicuro di voler eliminare questo prodotto?")) {
      fetch(`${URL}${productId}`, {
        method: "DELETE",
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzM3MDEzMjhhZDEyOTAwMTU4NzZiYjgiLCJpYXQiOjE3MzE2NTgwMzQsImV4cCI6MTczMjg2NzYzNH0.6evbY875A79CTndIgENVp_XlIhOfOAKLyaQcexHVOGo"
        }
      })
        .then((resp) => {
          if (resp.ok) {
            alert(`Prodotto ${productId} eliminato con successo.`);
            window.location.href = "../../index.html";
          } else {
            throw new Error("Errore nella richiesta di eliminazione.");
          }
        })
        .catch((error) => {
          alert("Si è verificato un errore durante l'eliminazione.");
          console.error("Errore:", error);
        });
    }
  };
};

window.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  form.onsubmit = handleCrudazonAPI;

  const resetBtn = document.getElementById("reset-btn");
  resetBtn.onclick = (e) => {
    if (confirm("Sicuro di voler resettare i campi di questo prodotto?")) {
      e.preventDefault();
      form.reset();
    }
  };

  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("appId");

  if (productId) {
    modifyProduct(productId);

    fetch(`${URL}${productId}`, {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzM3MDEzMjhhZDEyOTAwMTU4NzZiYjgiLCJpYXQiOjE3MzE2NTgwMzQsImV4cCI6MTczMjg2NzYzNH0.6evbY875A79CTndIgENVp_XlIhOfOAKLyaQcexHVOGo"
      }
    })
      .then((resp) => resp.json())
      .then((product) => {
        document.querySelector("#name").value = product.name;
        document.querySelector("#description").value = product.description;
        document.querySelector("#brand").value = product.brand;
        document.querySelector("#image").value = product.imageUrl;
        document.querySelector("#price").value = product.price;
      })
      .catch((err) => {
        console.error("Errore nel recupero del prodotto:", err);
      });
  }
});
