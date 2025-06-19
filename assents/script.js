document.addEventListener('DOMContentLoaded', function() {
  const btnContarHistoria = document.getElementById('btnContarHistoria');
  const btnVoltar = document.getElementById('btnVoltar');
  const textoInicial = document.getElementById('textoInicial');
  const historiaContent = document.getElementById('historiaContent');
  const conteudoHistoria = document.getElementById('conteudoHistoria');
  
  // Conteúdo da história
  const historiaDaBloom = `
    <h2>A Origem da Bloom</h2>
    <p>Tudo começou em 1995, quando Maria das Flores, nossa fundadora, decidiu transformar seu amor por plantas em um negócio. Com apenas um pequeno espaço na garagem de sua casa, ela começou a cultivar violetas e orquídeas.</p>
    
    <h2>Os Primeiros Anos</h2>
    <p>Nos primeiros cinco anos, a Bloom enfrentou muitos desafios, mas o cuidado especial de Maria com cada planta conquistou os corações dos clientes. Em 2000, mudamos para nossa primeira loja física no centro da cidade.</p>
    
    <h2>Expansão e Reconhecimento</h2>
    <p>Em 2010, a Bloom foi eleita a melhor floricultura da região, e em 2015 inauguramos nosso jardim de exposições com mais de 500 espécies de flores e plantas ornamentais.</p>
    
    <h2>Bloom Hoje</h2>
    <p>Atualmente, além da loja física, mantemos um viveiro com mais de 2 hectares e uma equipe apaixonada por trazer beleza e alegria para a vida das pessoas através das flores.</p>
    
    <div class="galeria-historia">
      <img src="fundo-floricultura.jpg" alt="Interior da floricultura Bloom" style="max-width:100%; border-radius:4px; margin-top:15px;">
    </div>
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