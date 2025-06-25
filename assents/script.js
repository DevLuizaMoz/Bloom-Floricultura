document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.nav');
    const triggerPoint = 70;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > triggerPoint) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    if (window.scrollY > triggerPoint) {
        navbar.classList.add('scrolled');
    }
});

document.querySelector('.video-bloom').addEventListener('ended', function() {
  this.currentTime = 0;
  this.play();
});



// Area de historia

document.addEventListener('DOMContentLoaded', function() {
  const btnContarHistoria = document.getElementById('btnContarHistoria');
  const btnVoltar = document.getElementById('btnVoltar');
  const textoInicial = document.getElementById('textoInicial');
  const historiaContent = document.getElementById('historiaContent');
  const conteudoHistoria = document.getElementById('conteudoHistoria');
  
  // Conteúdo da história
  const historiaDaBloom = `
  <h2>Os Primeiros Passos</h2>
  <p>Tudo começou em 1985, quando Clara Bloom, nossa fundadora, começou a cultivar flores em seu quintal. Com paixão e dedicação, ela transformou um pequeno hobby em um negócio familiar.</p>
  
  <h2>A Inauguração Oficial</h2>
  <p>Em 27 de agosto de 1987, após dois anos de preparação, inauguramos nossa primeira loja física no coração da cidade. A Bloom nasceu com a missão de trazer beleza natural para o dia a dia das pessoas.</p>
  
  <h2>Crescimento e Consolidação</h2>
  <p>Nos anos 90, nos tornamos referência em floricultura na região, conhecidos pela qualidade de nossas plantas e pelo atendimento personalizado. Em 1995, dobramos o tamanho de nossa loja original.</p>
  
  <h2>Bloom Hoje</h2>
  <p>Mais de três décadas depois, mantemos o mesmo compromisso com a excelência. De um pequeno quintal para um negócio que já atendeu milhares de clientes, continuamos cultivando sonhos e espalhando alegria através das flores.</p>
`;
  
  // Mostrar história
  btnContarHistoria.addEventListener('click', function() {
    conteudoHistoria.innerHTML = historiaDaBloom;
    
    // Esconde o texto inicial com animação
    textoInicial.classList.add('hidden');
    
    // Mostra a história com animação
    setTimeout(function() {
      historiaContent.classList.add('visible');
    }, 50); // Pequeno delay para garantir a animação
  });
  
  // Voltar ao texto inicial
  btnVoltar.addEventListener('click', function() {
    // Esconde a história com animação
    historiaContent.classList.remove('visible');
    
    // Mostra o texto inicial com animação
    setTimeout(function() {
      textoInicial.classList.remove('hidden');
    }, 800); // Tempo igual ao da transição CSS
  });
});


//seção carrinho

document.addEventListener('DOMContentLoaded', function() {
    // Código da navbar (mantido igual)
    const navbar = document.querySelector('.nav');
    const triggerPoint = 70;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > triggerPoint) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    if (window.scrollY > triggerPoint) {
        navbar.classList.add('scrolled');
    }

    // Código do vídeo (mantido igual)
    document.querySelector('.video-bloom')?.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
    });

    // Área de história (mantido igual)
    const btnContarHistoria = document.getElementById('btnContarHistoria');
    const btnVoltar = document.getElementById('btnVoltar');
    const textoInicial = document.getElementById('textoInicial');
    const historiaContent = document.getElementById('historiaContent');
    const conteudoHistoria = document.getElementById('conteudoHistoria');
    
    const historiaDaBloom = `
        <h2>Os Primeiros Passos</h2>
        <p>Tudo começou em 1985, quando Clara Bloom, nossa fundadora, começou a cultivar flores em seu quintal. Com paixão e dedicação, ela transformou um pequeno hobby em um negócio familiar.</p>
        
        <h2>A Inauguração Oficial</h2>
        <p>Em 27 de agosto de 1987, após dois anos de preparação, inauguramos nossa primeira loja física no coração da cidade. A Bloom nasceu com a missão de trazer beleza natural para o dia a dia das pessoas.</p>
        
        <h2>Crescimento e Consolidação</h2>
        <p>Nos anos 90, nos tornamos referência em floricultura na região, conhecidos pela qualidade de nossas plantas e pelo atendimento personalizado. Em 1995, dobramos o tamanho de nossa loja original.</p>
        
        <h2>Bloom Hoje</h2>
        <p>Mais de três décadas depois, mantemos o mesmo compromisso com a excelência. De um pequeno quintal para um negócio que já atendeu milhares de clientes, continuamos cultivando sonhos e espalhando alegria através das flores.</p>
    `;
    
    if (btnContarHistoria && btnVoltar) {
        btnContarHistoria.addEventListener('click', function() {
            conteudoHistoria.innerHTML = historiaDaBloom;
            textoInicial.classList.add('hidden');
            setTimeout(function() {
                historiaContent.classList.add('visible');
            }, 50);
        });
        
        btnVoltar.addEventListener('click', function() {
            historiaContent.classList.remove('visible');
            setTimeout(function() {
                textoInicial.classList.remove('hidden');
            }, 800);
        });
    }

    // Seção carrinho e favoritos - COM MELHORIAS
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
    
    // Função para atualizar o painel do carrinho (mantida igual)
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

        // Eventos para os controles de quantidade
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

        // Evento para remover item
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
    
    // Função para atualizar o painel de favoritos (com alternância de ícone)
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
                updateFavoriteIcons(); // Atualiza os ícones após remoção
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
    
    // Função para adicionar ao carrinho (mantida igual)
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
    
    // Função para alternar favoritos (com atualização de ícones)
    function toggleFavorite(product, button = null) {
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
        
        if (button) {
            button.classList.toggle('active');
        }
    }
    
    // Função para atualizar o estado dos ícones de favorito
    function updateFavoriteIcons() {
        // Atualiza o ícone principal na navbar
        const navFavoriteIcon = document.querySelector('.nav-icons .icon-favorite');
        if (navFavoriteIcon) {
            if (favorites.length > 0) {
                navFavoriteIcon.classList.add('active');
            } else {
                navFavoriteIcon.classList.remove('active');
            }
        }
        
        // Atualiza os ícones dos produtos
        document.querySelectorAll('.btn-favorite').forEach(button => {
            const productElement = button.closest('.product-item');
            if (productElement) {
                const productId = productElement.getAttribute('data-id');
                if (favorites.some(item => item.id === productId)) {
                    button.classList.add('active');
                } else {
                    button.classList.remove('active');
                }
            }
        });
    }
    
    // Configura os botões de produtos (com alternância de ícone)
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
                    name: nameElement ? nameElement.textContent : 'Produto sem nome',
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
                    name: nameElement ? nameElement.textContent : 'Produto sem nome',
                    price: priceElement ? parseFloat(priceElement.textContent.replace('R$', '').replace(',', '.')) : 0,
                    image: imageUrl
                };
                
                toggleFavorite(product, this);
            });
        });
    }
    
    // Event Listeners para painéis (com prevenção de fechamento ao clicar dentro)
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
    updateFavoriteIcons(); // Inicializa os ícones de favorito
    setupProductButtons();
});