
const shopContent = document.getElementById('shopContent');
const cart = [];

productos.forEach((product) => {
    const content = document.createElement('div');
    content.innerHTML = `
        <img src="${product.img}">
        <h3>${product.productName}</h3>
        <p>${product.price} $</p>
    `;
    // Crear botón Comprar
    const buyButton = document.createElement('button');
    buyButton.innerText = 'Comprar';
    buyButton.classList.add('buy-btn');
 
    content.appendChild(buyButton);
    shopContent.appendChild(content);

    buyButton.addEventListener('click', () => {
        cart.push({
            id: product.id,
            productName: product.productName,
            price: product.price,
            quanty: product.quanty,
            img: product.img
        });
        console.log(cart);
    });
});
