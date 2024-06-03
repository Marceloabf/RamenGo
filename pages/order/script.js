function getQueryParams() {
    const params = {};
    const queryString = window.location.search.substring(1);
    const pairs = queryString.split("&");
    pairs.forEach(pair => {
        const [key, value] = pair.split("=");
        params[decodeURIComponent(key)] = decodeURIComponent(value);
    });
    return params;
}

const params = getQueryParams();

const orderPhoto = document.getElementById('orderPhoto')
orderPhoto.setAttribute('src', `${params.img}`);

const orderDescription = document.createElement('p')

const orderName = document.getElementById('orderName')
orderName.textContent = params.description

const returnHome = document.getElementById('orderButton')

returnHome.addEventListener('click', () => {
    window.location.href = '../home/index.html';
});