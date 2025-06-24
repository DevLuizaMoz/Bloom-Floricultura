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
  // Elementos do DOM
  const cartButton = document.getElementById('cartButton');
  const favoriteButton = document.getElementById('favoriteButton');
  const cartPanel = document.getElementById('cartPanel');
  const favoritesPanel = document.getElementById('favoritesPanel');
  const closeButtons = document.querySelectorAll('.close-panel');
  const notification = document.getElementById('notification');
  
  // Estado da aplicação
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  
  // Atualiza contadores
  function updateCounters() {
    document.querySelector('.cart-count').textContent = cart.length;
    document.querySelector('.favorite-count').textContent = favorites.length;
  }
  
  // Mostra notificação
  function showNotification(message) {
    notification.textContent = message;
    notification.classList.add('active');
    
    setTimeout(() => {
      notification.classList.remove('active');
    }, 3000);
  }
  
  // Atualiza o painel do carrinho
  function updateCartPanel() {
    const cartItems = document.getElementById('cartItems');
    const emptyMessage = cartItems.querySelector('.empty-message');
    
    if (cart.length === 0) {
      if (!emptyMessage) {
        cartItems.innerHTML = '<p class="empty-message">Seu carrinho está vazio</p>';
      }
      document.querySelector('.cart-total').textContent = 'R$0,00';
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

    document.querySelector('.cart-total').textContent = `R$${total.toFixed(2)}`;

    // Eventos para os novos botões de quantidade
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
  
  // Atualiza o painel de favoritos
  function updateFavoritesPanel() {
    const favoritesItems = document.getElementById('favoritesItems');
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
  
  // Adiciona produto ao carrinho
  function addToCart(product) {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        ...product,
        quantity: 1
      });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartPanel();
    updateCounters();
    showNotification(`${product.name} adicionado ao carrinho`);
  }
  
  // Adiciona/remove produto dos favoritos
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
  }
  
  // Event Listeners para carrinho e favoritos
  function setupProductButtons() {
    document.querySelectorAll('.btn-add-to-cart').forEach(button => {
      button.addEventListener('click', function() {
        const productElement = this.closest('.product-item');
        if (!productElement) return;
        
        const nameElement = productElement.querySelector('.product-name');
        const priceElement = productElement.querySelector('.product-price');
        const imageElement = productElement.querySelector('.product-image');
        
        let imageUrl = '';
        if (imageElement) {
          const bgImage = imageElement.style.backgroundImage;
          const match = bgImage ? bgImage.match(/url\(["']?(.*?)["']?\)/) : null;
          imageUrl = match ? match[1] : '';
        }
        
        const product = {
          id: productElement.getAttribute('data-id') || 'prod-' + Math.random().toString(36).substr(2, 9),
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
        if (imageElement) {
          const bgImage = imageElement.style.backgroundImage;
          const match = bgImage ? bgImage.match(/url\(["']?(.*?)["']?\)/) : null;
          imageUrl = match ? match[1] : '';
        }
        
        const product = {
          id: productElement.getAttribute('data-id') || 'prod-' + Math.random().toString(36).substr(2, 9),
          name: nameElement ? nameElement.textContent : 'Produto sem nome',
          price: priceElement ? parseFloat(priceElement.textContent.replace('R$', '').replace(',', '.')) : 0,
          image: imageUrl
        };
        
        toggleFavorite(product);
        this.classList.toggle('active');
      });
    });
  }
  
  // Event Listeners para painéis - ATUALIZADO PARA FUNCIONAR COM DIVS INTERNAS
  cartButton.addEventListener('click', function(e) {
    // Evita que o clique no ícone ou contador dispare o evento
    if (e.target === cartButton || e.target.classList.contains('icon-cart')) {
      cartPanel.classList.add('active');
      favoritesPanel.classList.remove('active');
    }
  });
  
  favoriteButton.addEventListener('click', function(e) {
    // Evita que o clique no ícone ou contador dispare o evento
    if (e.target === favoriteButton || e.target.classList.contains('icon-favorite')) {
      favoritesPanel.classList.add('active');
      cartPanel.classList.remove('active');
    }
  });
  
  closeButtons.forEach(button => {
    button.addEventListener('click', function() {
      cartPanel.classList.remove('active');
      favoritesPanel.classList.remove('active');
    });
  });
  
  document.addEventListener('click', function(e) {
    if (!cartPanel.contains(e.target) && e.target !== cartButton && !cartButton.contains(e.target)) {
      cartPanel.classList.remove('active');
    }
    
    if (!favoritesPanel.contains(e.target) && e.target !== favoriteButton && !favoriteButton.contains(e.target)) {
      favoritesPanel.classList.remove('active');
    }
  });
  
  // Inicialização
  updateCounters();
  updateCartPanel();
  updateFavoritesPanel();
  setupProductButtons();
});