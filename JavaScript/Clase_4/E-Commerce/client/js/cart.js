const modalContainer = document.getElementById('modal-container');
const modalOverlay = document.getElementById('modal-overlay');
const cartBtn = document.getElementById('cart-btn');
const cartCounter = document.getElementById('cart-counter');

const displayCart = () => {
    modalContainer.innerHTML = ''; 
    modalContainer.style.display = 'block';
    modalOverlay.style.display = 'block';
    
    // modal Header
    const modalHeader = document.createElement('div');

    const modalClose = document.createElement('div');
    modalClose.innerText = '❌';
    modalClose.className = 'modal-close';
    modalHeader.append(modalClose);

    modalClose.addEventListener('click', () => {
        modalContainer.style.display = 'none';
        modalOverlay.style.display = 'none';
    });

    const modalTitle = document.createElement('div');
    modalTitle.innerText = 'Cart';
    modalTitle.className = 'modal-title';
    modalHeader.append(modalTitle);

    modalContainer.append(modalHeader);
    
    // Modal Body
    if (cart.length > 0) {
        cart.forEach((product) => {
            const modalBody = document.createElement('div');
            modalBody.className = 'modal-body';
            modalBody.innerHTML = `
                <div class="product">
                    <img class="product-img" src="${product.img}"/>
                    <div class="product-info">
                        <h4>${product.productName}</h4>
                    </div>
                    <div class="quantity">
                        <span class="quantity-btn-decrease">-</span>
                        <span class="quantity-input">${product.quanty}</span>
                        <span class="quantity-btn-increase">+</span>
                    </div>
                    <div class="price">${product.price * product.quanty} $</div>
                    <div class="delete-product">❌</div>
                </div>
            `;
            modalContainer.append(modalBody);

            const decrease = modalBody.querySelector('.quantity-btn-decrease');
            decrease.addEventListener('click', () => {
                if (product.quanty !== 1) {
                    product.quanty--;
                    displayCart();
                }
                displayCartCounter();
            });

            const increase = modalBody.querySelector('.quantity-btn-increase');
            increase.addEventListener('click', () => {
                product.quanty++;
                displayCart();
                displayCartCounter();
            });

            // Delete product
            const deleteProduct = modalBody.querySelector('.delete-product');
            deleteProduct.addEventListener('click', () => {
                deleteCartProduct(product.id);
            });
        }); 

        // Modal Footer
        const total = cart.reduce((acc, el) => acc + el.price * el.quanty, 0);

        const modalFooter = document.createElement('div');
        modalFooter.className = 'modal-footer';
        modalFooter.innerHTML = `
            <div class="total-price">Total: $${total}</div>
            <button class="checkout-btn" id="checkout-btn">Checkout</button>
            <div id="mercado-pago-button" style="display: none; margin-top: 15px;"></div>
        `;
        modalContainer.append(modalFooter);

        // INTEGRACIÓN MERCADOPAGO 
        const checkoutBtn = modalFooter.querySelector('#checkout-btn');
        const mercadoPagoContainer = modalFooter.querySelector('#mercado-pago-button');

        checkoutBtn.addEventListener('click', async () => {
            try {
                // Ocultar botón checkout y mostrar loader
                checkoutBtn.style.display = 'none';
                mercadoPagoContainer.innerHTML = '<p>Cargando método de pago...</p>';
                mercadoPagoContainer.style.display = 'block';

                const itemsForMercadoPago = cart.map(product => ({
                    description: product.productName,
                    price: product.price,
                    quantity: product.quanty
                }));

                const response = await fetch('http://localhost:8080/create_preference', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        description: "Compra en Mi Tienda",
                        price: total,
                        quantity: 1,
                        items: itemsForMercadoPago
                    })
                });

                const data = await response.json();
                
                if (data.id) {
                    // Mostrar botón de MercadoPago
                    mercadoPagoContainer.innerHTML = `
                        <button onclick="window.location.href='https://www.mercadopago.com.ar/checkout/v1/redirect?preference_id=${data.id}'" 
                                style="background-color: #009ee3; color: white; border: none; padding: 15px 30px; 
                                       border-radius: 5px; font-size: 16px; cursor: pointer; width: 100%;">
                            🛒 Pagar con MercadoPago
                        </button>
                        <p style="font-size: 12px; color: #666; margin-top: 10px;">
                            Modo prueba: Usa tarjetas de prueba de MercadoPago
                        </p>
                    `;
                } else {
                    mercadoPagoContainer.innerHTML = '<p style="color: red;">Error al crear el pago</p>';
                    checkoutBtn.style.display = 'block';
                }

            } catch (error) {
                console.error('Error:', error);
                mercadoPagoContainer.innerHTML = '<p style="color: red;">Error de conexión</p>';
                checkoutBtn.style.display = 'block';
            }
        });

    } else {
        const modalText = document.createElement('h2');
        modalText.className = 'modal-body';
        modalText.innerText = 'Your cart is empty';
        modalContainer.append(modalText);
    } 
};

cartBtn.addEventListener('click', displayCart);

const deleteCartProduct = (id) => {
    const foundId = cart.findIndex((element) => element.id === id);
    cart.splice(foundId, 1);
    displayCart();
    displayCartCounter();
};

const displayCartCounter = () => {
    const cartLength = cart.reduce((acc, el) => acc + el.quanty, 0);
    if(cartLength > 0) {
        cartCounter.style.display = 'block';
        cartCounter.innerText = cartLength;
    } else {
        cartCounter.style.display = 'none';
    }
};