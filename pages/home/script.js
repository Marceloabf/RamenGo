const brothsUrl = "https://api.tech.redventures.com.br/broths";
const proteinsUrl = "https://api.tech.redventures.com.br/proteins";
const orderUrl = "https://api.tech.redventures.com.br/orders";

const headers = {
  "x-api-key": "ZtVdh8XQ2U8pWI2gmZ7f796Vh8GllXoN7mr0djNf",
};

let activeBrothCard = null;
let activeproteinCard = null;

function createCard(item, type) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.dataset.id = item.id;

  const img = document.createElement("img");
  img.src = item.imageInactive;
  img.alt = item.name;
  img.dataset.inactiveSrc = item.imageInactive;
  img.dataset.activeSrc = item.imageActive;

  card.appendChild(img);

  const name = document.createElement("p");
  name.classList.add("ingredientsName");
  name.textContent = item.name;

  const description = document.createElement("p");
  description.textContent = item.description;

  const price = document.createElement("span");
  price.textContent = `US$ ${item.price}`;

  card.appendChild(name);
  card.appendChild(description);
  card.appendChild(price);

  card.addEventListener("click", () => {
    let activeCard, setActiveCard;

    if (type === "broth") {
      activeCard = activeBrothCard;
      setActiveCard = (card) => {
        activeBrothCard = card;
      };
    } else {
      activeCard = activeproteinCard;
      setActiveCard = (card) => {
        activeproteinCard = card;
      };
    }

    if (activeCard && activeCard !== card) {
      const activeImg = activeCard.querySelector("img");
      activeImg.src = activeImg.dataset.inactiveSrc;
      activeCard.classList.remove("activeCard");
    }

    if (img.src === img.dataset.inactiveSrc) {
      img.src = img.dataset.activeSrc;
      card.classList.add("activeCard");
      setActiveCard(card);
    } else {
      img.src = img.dataset.inactiveSrc;
      card.classList.remove("activeCard");
      setActiveCard(null);
    }
  });

  return card;
}

function displayCards(items, type) {
  const cardsContainer = document.getElementById(`${type}CardsContainer`);
  items.forEach((item) => {
    const card = createCard(item, type);
    cardsContainer.appendChild(card);
  });
}

function getBroths() {
  fetch(brothsUrl, { headers })
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then((data) => {
      displayCards(data, "broth");
    })
    .catch((error) => {
      console.error(error);
    });
}

function getProteins() {
  fetch(proteinsUrl, { headers })
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then((data) => {
      displayCards(data, "protein");
    })
    .catch((error) => {
      console.error(error);
    });
}

function handleOrder() {
  if (!activeBrothCard || !activeproteinCard) {
    alert("Você deve selecionar um caldo e uma proteína para fazer o pedido.");
    return;
  }

  const brothId = activeBrothCard.dataset.id;
  const proteinId = activeproteinCard.dataset.id;

  const orderData = {
    brothId: brothId,
    proteinId: proteinId,
  };

  const loadingIndicator = document.getElementById("loading");
  loadingIndicator.style.display = "block"; 

  fetch(orderUrl, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(orderData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      loadingIndicator.style.display = "none"; 
      window.location.href = `../order/index.html?description=${data.description}&img=${data.image}`;
    })
    .catch((error) => {
      console.error(error);
      loadingIndicator.style.display = "none"; 
      alert("Erro ao fazer o pedido. Por favor, tente novamente.");
    });
}

document.getElementById("orderButton").addEventListener("click", handleOrder);

getBroths();
getProteins();

function scrollToCard(containerId, cardIndex, btn) {
  const container = document.getElementById(containerId);

  const cards = container.getElementsByClassName("card");
  const card = cards[cardIndex];
  
  const containerWidth = container.clientWidth;

  const cardWidth = card.offsetWidth;
  const scrollPosition = card.offsetLeft - containerWidth / 2 + cardWidth / 2;

  container.scrollTo({
    left: scrollPosition,
    behavior: "smooth",
  });

  if (containerId === "brothCardsContainer") {
    const buttons = document.querySelectorAll("#broth .cardControls button");
    buttons.forEach((button) => button.classList.remove("activeButton"));
    btn.classList.add("activeButton");
  } else {
    const buttons = document.querySelectorAll("#protein .cardControls button");
    buttons.forEach((button) => button.classList.remove("activeButton"));
    btn.classList.add("activeButton");
  }
}
