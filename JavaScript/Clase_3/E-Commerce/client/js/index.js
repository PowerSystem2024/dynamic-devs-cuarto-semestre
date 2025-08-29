
const shopContent = document.getElementById('shopContent');
const cart = [];

productos.forEach((product) => {
    const content = document.createElement('div');
    content.className = 'card';
    content.innerHTML = `
        <img src="${product.img}">
        <h3>${product.productName}</h3>
        <p>${product.price} $</p>
    `;

    shopContent.appendChild(content);
    
    // Crear botón Comprar
    const buyButton = document.createElement('button');
    buyButton.innerText = 'Buy';
    // buyButton.classList.add('buy-btn');
 
    content.append(buyButton);
    

    buyButton.addEventListener('click', () => {
        const repeat = cart.some((repeatProduct) => repeatProduct.id === product.id);

        if (repeat) {
            cart.map((prod) => {
                if (prod.id === product.id) {
                    prod.quanty++;
                }
            });
        } else {
            cart.push({
            id: product.id,
            productName: product.productName,
            price: product.price,
            quanty: product.quanty,
            img: product.img
            });
        }
    });
});
