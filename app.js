
        // Productos de ejemplo
        const products = [
            {
                id: 1,
                name: "Auriculares Inalámbricos",
                price: 89.99,
                oldPrice: 119.99,
                image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
                description: "Sonido de alta calidad con cancelación de ruido activa. Perfectos para trabajar o disfrutar de tu música favorita.",
                badge: "Más vendido",
                rating: 4.8
            },
            {
                id: 2,
                name: "Smartwatch Deportivo",
                price: 149.99,
                oldPrice: 199.99,
                image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1399&q=80",
                description: "Monitoriza tu actividad física, recibe notificaciones y controla tu música. Resistente al agua.",
                badge: "Nuevo",
                rating: 4.5
            },
            {
                id: 3,
                name: "Altavoz Bluetooth",
                price: 59.99,
                oldPrice: 79.99,
                image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1331&q=80",
                description: "Sonido potente y claro para tus fiestas y reuniones. Batería de larga duración.",
                badge: "Oferta",
                rating: 4.3
            },
            {
                id: 4,
                name: "Tablet 10 Pulgadas",
                price: 299.99,
                oldPrice: null,
                image: "https://images.unsplash.com/photo-1561154464-82e9adf32764?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
                description: "Pantalla Full HD, procesador rápido y almacenamiento amplio. Perfecta para trabajo y entretenimiento.",
                badge: null,
                rating: 4.7
            }
        ];

        // Carrito de compras
        let cart = [];

        // Función para mostrar productos
        function displayProducts() {
            const productsContainer = document.getElementById('featuredProducts');
            productsContainer.innerHTML = '';
            
            products.forEach(product => {
                const ratingStars = generateRatingStars(product.rating);
                
                const productCard = `
                    <div class="col-md-3 col-sm-6">
                        <div class="card h-100 position-relative">
                            ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
                            <img src="${product.image}" class="card-img-top" alt="${product.name}">
                            <div class="card-body d-flex flex-column">
                                <h5 class="card-title">${product.name}</h5>
                                <div class="rating">
                                    ${ratingStars}
                                    <small class="text-muted">${product.rating}</small>
                                </div>
                                <p class="card-text text-muted flex-grow-1">${product.description}</p>
                                <div class="d-flex justify-content-between align-items-center mt-auto">
                                    <div>
                                        <span class="price">$${product.price}</span>
                                        ${product.oldPrice ? `<span class="price-old">$${product.oldPrice}</span>` : ''}
                                    </div>
                                    <button class="btn btn-primary btn-sm add-to-cart" data-id="${product.id}">
                                        <i class="bi bi-cart-plus"></i> Agregar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                productsContainer.innerHTML += productCard;
            });
            
            // Agregar event listeners a los botones
            document.querySelectorAll('.add-to-cart').forEach(button => {
                button.addEventListener('click', addToCart);
            });
        }

        // Función para generar estrellas de valoración
        function generateRatingStars(rating) {
            let stars = '';
            const fullStars = Math.floor(rating);
            const hasHalfStar = rating % 1 >= 0.5;
            
            for (let i = 0; i < fullStars; i++) {
                stars += '<i class="bi bi-star-fill"></i>';
            }
            
            if (hasHalfStar) {
                stars += '<i class="bi bi-star-half"></i>';
            }
            
            const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
            for (let i = 0; i < emptyStars; i++) {
                stars += '<i class="bi bi-star"></i>';
            }
            
            return stars;
        }

        // Función para agregar al carrito
        function addToCart(event) {
            const productId = parseInt(event.target.closest('.add-to-cart').dataset.id);
            const product = products.find(p => p.id === productId);
            
            if (product) {
                cart.push(product);
                updateCartCount();
                
                // Mostrar notificación
                const notification = document.getElementById('cartNotification');
                const notificationText = document.getElementById('notificationText');
                notificationText.textContent = `¡${product.name} agregado al carrito!`;
                notification.style.display = 'flex';
                
                // Ocultar notificación después de 3 segundos
                setTimeout(() => {
                    notification.style.display = 'none';
                }, 3000);
            }
        }

        // Función para actualizar el contador del carrito
        function updateCartCount() {
            const cartCount = document.getElementById('cartCount');
            cartCount.textContent = cart.length;
        }

        // Función para mostrar/ocultar el botón de volver arriba
        function toggleBackToTop() {
            const backToTopButton = document.getElementById('backToTop');
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
        }

        // Inicializar la página
        document.addEventListener('DOMContentLoaded', function() {
            displayProducts();
            
            // Event listener para el botón del carrito
            document.getElementById('cartButton').addEventListener('click', function(e) {
                e.preventDefault();
                if (cart.length > 0) {
                    const total = cart.reduce((sum, product) => sum + product.price, 0).toFixed(2);
                    alert(`Tienes ${cart.length} productos en tu carrito. Total: $${total}`);
                } else {
                    alert('Tu carrito está vacío. ¡Agrega algunos productos!');
                }
            });
            
            // Event listener para el botón de volver arriba
            document.getElementById('backToTop').addEventListener('click', function(e) {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
            
            // Event listener para el scroll
            window.addEventListener('scroll', toggleBackToTop);
        });
