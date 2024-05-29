const brothsUrl = 'https://api.tech.redventures.com.br/broths';
const proteinsUrl = 'https://api.tech.redventures.com.br/proteins';


const headers = {
    'x-api-key': 'ZtVdh8XQ2U8pWI2gmZ7f796Vh8GllXoN7mr0djNf'
};

const brothDiv = document.getElementById('broth');
const meatDiv = document.getElementById('meat');

function createCard(item) {
    const card = document.createElement('div');
    card.classList.add('card');

    const img = document.createElement('img');
    img.src = item.imageInactive;
    img.alt = item.name;

    const name = document.createElement('p');
    name.classList.add('ingredientsName');
    name.textContent = item.name;

    const description = document.createElement('p');
    description.textContent = item.description;

    const price = document.createElement('span');
    price.textContent = `US$ ${item.price}`;

    card.appendChild(img);
    card.appendChild(name);
    card.appendChild(description);
    card.appendChild(price);

    return card;
}

function displayCards(items, type) {
    const cardsContainer = document.getElementById(`${type}CardsContainer`);
    items.forEach(item => {
        const card = createCard(item);
        cardsContainer.appendChild(card);
    });
}

function getBroths() {
    fetch(brothsUrl, { headers })
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        })
        .then(data => {
            displayCards(data, "broth");
        })
        .catch(error => {
            console.error(error);
        });
}

function getProteins() {
    fetch(proteinsUrl, { headers })
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        })
        .then(data => {
            displayCards(data, "meat");
        })
        .catch(error => {
            console.error(error);
        });
}


getBroths();
getProteins();