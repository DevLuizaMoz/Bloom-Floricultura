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




