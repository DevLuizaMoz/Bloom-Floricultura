document.addEventListener('DOMContentLoaded', function() {
    // Configuração da navbar com verificação de existência
    const navbar = document.querySelector('.nav');
    if (navbar) {
        const triggerPoint = 70;
        
        function handleScroll() {
            if (window.scrollY > triggerPoint) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
        
        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Verifica o estado inicial
    }

    // Configuração do vídeo loop com verificação
    const videoBloom = document.querySelector('.video-bloom');
    if (videoBloom) {
        videoBloom.addEventListener('ended', function() {
            this.currentTime = 0;
            this.play();
        });
    }

    // Configuração do scroll suave
    document.documentElement.style.scrollBehavior = "smooth";


    // Seção carrinho e favoritos
    const cartButton = document.getElementById('cartButton');
    const favoriteButton = document.getElementById('favoriteButton');
    const cartPanel = document.getElementById('cartPanel');
    const favoritesPanel = document.getElementById('favoritesPanel');
    const closeButtons = document.querySelectorAll('.close-panel');
    const notification = document.getElementById('notification');
    
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    
    // Função para atualizar contadores
    function updateCounters() {
        const cartCount = document.querySelector('.cart-count');
        const favoriteCount = document.querySelector('.favorite-count');
        
        if (cartCount) {
            cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
        }
        if (favoriteCount) {
            favoriteCount.textContent = favorites.length;
        }
    }
    
    // Função para mostrar notificação
    function showNotification(message) {
        if (!notification) return;
        
        notification.textContent = message;
        notification.classList.add('active');
        
        setTimeout(() => {
            notification.classList.remove('active');
        }, 3000);
    }
    
    // Função para atualizar o painel do carrinho
    function updateCartPanel() {
        const cartItems = document.getElementById('cartItems');
        if (!cartItems) return;
        
        const emptyMessage = cartItems.querySelector('.empty-message');
        
        if (cart.length === 0) {
            if (!emptyMessage) {
                cartItems.innerHTML = '<p class="empty-message">Seu carrinho está vazio</p>';
            }
            const cartTotal = document.querySelector('.cart-total');
            if (cartTotal) {
                cartTotal.textContent = 'R$0,00';
            }
            return;
        }

        if (emptyMessage) {
            emptyMessage.remove();
        }

        let total = 0;
        cartItems.innerHTML = '';
        
        cart.forEach((item, index) => {
            total += item.price * item.quantity;
            
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.innerHTML = `
                <div class="cart-item-image" style="background-image: url('${item.image}')"></div>
                <div class="cart-item-details">
                    <div class="cart-item-title">${item.name}</div>
                    <div class="cart-item-price">R$${item.price.toFixed(2)}</div>
                    <div class="cart-item-quantity-controls">
                        <button class="quantity-decrease" data-index="${index}">-</button>
                        <span class="quantity-value">${item.quantity}</span>
                        <button class="quantity-increase" data-index="${index}">+</button>
                    </div>
                    <button class="remove-item" data-index="${index}">Remover</button>
                </div>
            `;
            
            cartItems.appendChild(itemElement);
        });

        const cartTotal = document.querySelector('.cart-total');
        if (cartTotal) {
            cartTotal.textContent = `R$${total.toFixed(2)}`;
        }

        document.querySelectorAll('.quantity-decrease').forEach(button => {
            button.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                if (cart[index].quantity > 1) {
                    cart[index].quantity--;
                    localStorage.setItem('cart', JSON.stringify(cart));
                    updateCartPanel();
                    updateCounters();
                }
            });
        });

        document.querySelectorAll('.quantity-increase').forEach(button => {
            button.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                cart[index].quantity++;
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCartPanel();
                updateCounters();
            });
        });

        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                const removedItem = cart[index];
                cart.splice(index, 1);
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCartPanel();
                updateCounters();
                showNotification(`${removedItem.name} removido do carrinho`);
            });
        });
    }
    
    // Função para atualizar o painel de favoritos
    function updateFavoritesPanel() {
        const favoritesItems = document.getElementById('favoritesItems');
        if (!favoritesItems) return;
        
        const emptyMessage = favoritesItems.querySelector('.empty-message');
        
        if (favorites.length === 0) {
            if (!emptyMessage) {
                favoritesItems.innerHTML = '<p class="empty-message">Você não tem favoritos ainda</p>';
            }
            return;
        }
        
        if (emptyMessage) {
            emptyMessage.remove();
        }
        
        favoritesItems.innerHTML = '';
        
        favorites.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.className = 'favorite-item';
            itemElement.innerHTML = `
                <div class="favorite-item-image" style="background-image: url('${item.image}')"></div>
                <div class="favorite-item-details">
                    <div class="favorite-item-title">${item.name}</div>
                    <div class="favorite-item-price">R$${item.price.toFixed(2)}</div>
                    <button class="remove-item" data-index="${index}">Remover</button>
                    <button class="add-to-cart-from-fav" data-index="${index}">Adicionar ao Carrinho</button>
                </div>
            `;
            
            favoritesItems.appendChild(itemElement);
        });
        
        document.querySelectorAll('.favorite-item .remove-item').forEach(button => {
            button.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                const removedItem = favorites[index];
                favorites.splice(index, 1);
                localStorage.setItem('favorites', JSON.stringify(favorites));
                updateFavoritesPanel();
                updateCounters();
                updateFavoriteIcons();
                showNotification(`${removedItem.name} removido dos favoritos`);
            });
        });
        
        document.querySelectorAll('.add-to-cart-from-fav').forEach(button => {
            button.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                const product = favorites[index];
                addToCart(product);
            });
        });
    }
    
    // Função para adicionar ao carrinho
    function addToCart(product) {
        const existingItemIndex = cart.findIndex(item => item.id === product.id);
        
        if (existingItemIndex >= 0) {
            cart[existingItemIndex].quantity += 1;
            showNotification(`${product.name} adicionado novamente (Total: ${cart[existingItemIndex].quantity}x)`);
        } else {
            cart.push({
                ...product,
                quantity: 1
            });
            showNotification(`${product.name} adicionado ao carrinho`);
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartPanel();
        updateCounters();
    }
    
    // Função para alternar favoritos
    function toggleFavorite(product) {
        const existingIndex = favorites.findIndex(item => item.id === product.id);
        
        if (existingIndex >= 0) {
            favorites.splice(existingIndex, 1);
            showNotification(`${product.name} removido dos favoritos`);
        } else {
            favorites.push(product);
            showNotification(`${product.name} adicionado aos favoritos`);
        }
        
        localStorage.setItem('favorites', JSON.stringify(favorites));
        updateFavoritesPanel();
        updateCounters();
        updateFavoriteIcons();
    }
    
    // Função para atualizar ícones de favorito
    function updateFavoriteIcons() {
        document.querySelectorAll('.product-item').forEach(productElement => {
            const productId = productElement.getAttribute('data-id');
            const favoriteIcon = productElement.querySelector('.icon-favorite-products');
            
            if (favoriteIcon) {
                const isFavorite = favorites.some(item => item.id === productId);
                favoriteIcon.classList.toggle('active', isFavorite);
            }
        });
    }
    
    // Configura os botões de produtos
    function setupProductButtons() {
        document.querySelectorAll('.btn-add-to-cart').forEach(button => {
            button.addEventListener('click', function() {
                const productElement = this.closest('.product-item');
                if (!productElement) return;
                
                const nameElement = productElement.querySelector('.product-name');
                const priceElement = productElement.querySelector('.product-price');
                const imageElement = productElement.querySelector('.product-image');
                
                let imageUrl = '';
                const bgImage = window.getComputedStyle(imageElement).backgroundImage;
                const match = bgImage.match(/url\(["']?([^"']+)["']?\)/);
                if (match && match[1]) {
                    imageUrl = match[1];
                }
                
                const product = {
                    id: productElement.getAttribute('data-id'),
                    name: nameElement?.textContent || 'Produto sem nome',
                    price: priceElement ? parseFloat(priceElement.textContent.replace('R$', '').replace(',', '.')) : 0,
                    image: imageUrl
                };
                
                addToCart(product);
            });
        });
        
        document.querySelectorAll('.btn-favorite').forEach(button => {
            button.addEventListener('click', function() {
                const productElement = this.closest('.product-item');
                if (!productElement) return;
                
                const nameElement = productElement.querySelector('.product-name');
                const priceElement = productElement.querySelector('.product-price');
                const imageElement = productElement.querySelector('.product-image');
                
                let imageUrl = '';
                const bgImage = window.getComputedStyle(imageElement).backgroundImage;
                const match = bgImage.match(/url\(["']?([^"']+)["']?\)/);
                if (match && match[1]) {
                    imageUrl = match[1];
                }
                
                const product = {
                    id: productElement.getAttribute('data-id'),
                    name: nameElement?.textContent || 'Produto sem nome',
                    price: priceElement ? parseFloat(priceElement.textContent.replace('R$', '').replace(',', '.')) : 0,
                    image: imageUrl
                };
                
                toggleFavorite(product);
            });
        });
    }
    
    // Event Listeners para painéis
    if (cartButton && cartPanel) {
        cartButton.addEventListener('click', function(e) {
            e.stopPropagation();
            if (e.target === cartButton || e.target.classList.contains('icon-cart')) {
                cartPanel.classList.toggle('active');
                favoritesPanel.classList.remove('active');
            }
        });
    }
    
    if (favoriteButton && favoritesPanel) {
        favoriteButton.addEventListener('click', function(e) {
            e.stopPropagation();
            if (e.target === favoriteButton || e.target.classList.contains('icon-favorite')) {
                favoritesPanel.classList.toggle('active');
                cartPanel.classList.remove('active');
            }
        });
    }
    
    if (closeButtons) {
        closeButtons.forEach(button => {
            button.addEventListener('click', function() {
                cartPanel?.classList.remove('active');
                favoritesPanel?.classList.remove('active');
            });
        });
    }
    
    // Fecha os painéis ao clicar fora
    document.addEventListener('click', function(e) {
        if (cartPanel && !cartPanel.contains(e.target) && e.target !== cartButton && !cartButton?.contains(e.target)) {
            cartPanel.classList.remove('active');
        }
        
        if (favoritesPanel && !favoritesPanel.contains(e.target) && e.target !== favoriteButton && !favoriteButton?.contains(e.target)) {
            favoritesPanel.classList.remove('active');
        }
    });
    
    // Previne que cliques dentro dos painéis fechem os mesmos
    if (cartPanel) {
        cartPanel.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
    
    if (favoritesPanel) {
        favoritesPanel.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
    
    // Inicialização
    updateCounters();
    updateCartPanel();
    updateFavoritesPanel();
    updateFavoriteIcons();
    setupProductButtons();

    // Configuração do carrossel de produtos
    document.querySelectorAll('.product-list').forEach(list => {
        let isDragging = false;
        let startPos = 0;
        let currentScroll = 0;
        let velocity = 0;
        let animationFrame;
        let lastTime = 0;
        
        // Controle de Toque
        list.addEventListener('touchstart', (e) => {
            isDragging = true;
            startPos = e.touches[0].clientX;
            currentScroll = list.scrollLeft;
            cancelAnimationFrame(animationFrame);
        }, { passive: true });
        
        list.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            const x = e.touches[0].clientX;
            const walk = (x - startPos) * 1.5;
            list.scrollLeft = currentScroll - walk;
        }, { passive: true });
        
        list.addEventListener('touchend', () => {
            isDragging = false;
            applyInertia();
        }, { passive: true });
        
        // Controle de Mouse
        list.addEventListener('mousedown', (e) => {
            isDragging = true;
            startPos = e.clientX;
            currentScroll = list.scrollLeft;
            list.style.cursor = 'grabbing';
            cancelAnimationFrame(animationFrame);
            e.preventDefault();
        });
        
        list.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            const x = e.clientX;
            const walk = (x - startPos) * 2;
            list.scrollLeft = currentScroll - walk;
        });
        
        list.addEventListener('mouseup', () => {
            isDragging = false;
            list.style.cursor = 'grab';
            applyInertia();
        });
        
        list.addEventListener('mouseleave', () => {
            isDragging = false;
            list.style.cursor = 'grab';
        });
        
        // Efeito de inércia
        function applyInertia() {
            const now = performance.now();
            const delta = now - lastTime;
            lastTime = now;
            
            if (delta > 0) {
                velocity = (list.scrollLeft - currentScroll) / delta;
                currentScroll = list.scrollLeft;
                inertiaAnimation();
            }
        }
        
        function inertiaAnimation() {
            velocity *= 0.95;
            
            if (Math.abs(velocity) > 0.5) {
                list.scrollLeft += velocity * 16;
                animationFrame = requestAnimationFrame(inertiaAnimation);
            }
        }
    });
});