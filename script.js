console.log(`Oi, amigo curioso! Procurando alguma coisa por aqui?

Cuidado por onde procura, o guaxinim fez uma bagunça nesse código! Ele me contou que %cescondeu alguma coisa muito bem.`,
'font-size:14px; font-weight:bold; color:#53764F;');
console.log(`Se encontrar algo suspeito, me manda uma mensagem:

linkedin.com/in/ricardo-pessoa-215923372`)

//CARREGAMENTO
window.addEventListener("load", function() {
    const telaDeCarregamento = document.getElementById("telaDeCarregamento");
    const conteudo = document.querySelector(".conteudo");

    conteudo.style.display = "block";

    requestAnimationFrame(() => {
        telaDeCarregamento.style.opacity = "0";
    });

    setTimeout(() => {
    conteudo.classList.add("visivel");
}, 200);

    telaDeCarregamento.addEventListener("transitionend", () => {
        telaDeCarregamento.style.display = "none";
    }, { once: true });
});

//IMG
function isSafari() {
  const ua = navigator.userAgent;
  return /^((?!chrome|android).)*safari/i.test(ua);
}

if (isSafari()) {
  document.querySelectorAll('.webM').forEach((video) => {
    const img = video.nextElementSibling;

    video.style.display = 'none';
    if (img) img.style.display = 'block';
  });
}

//NAVBAR
function navMobile(){
  document.querySelector('.navbarul-mobile').classList.add('aberta');
  document.querySelector('.menu').classList.add('some');
}

function navFechar(){
  document.querySelector('.navbarul-mobile').classList.remove('aberta');
  document.querySelector('.menu').classList.remove('some');
}

function irParaPagina(page){
    document.querySelectorAll('.pagina').forEach(secao => {
        secao.classList.toggle('ativa', secao.id === page);
    });

    document.querySelectorAll('.navbarul-mobile li a[data-page]').forEach(link => {
        link.classList.toggle('active', link.dataset.page === page);
    });

    ajustarAlturaConteudo();

    localStorage.setItem('paginaAtual', page);
}


//resize
function ajustarAlturaConteudo(){
    const paginaAtiva = document.querySelector('.pagina.ativa');
    const conteudo = document.querySelector('.conteudo');

    if(paginaAtiva && conteudo){
        conteudo.style.height = paginaAtiva.scrollHeight + 'px';
    }
}

window.addEventListener('DOMContentLoaded', ajustarAlturaConteudo);
window.addEventListener('resize', ajustarAlturaConteudo);

//CONFIG
function configClick(){
const config = document.querySelector('.aba-config');
config.classList.toggle('aberta');
config.classList.toggle('some');
document.querySelector('.notificacao').classList.add('clicada');
}


//DARK MODE
function toggleDarkMode(){
  const root = document.documentElement;
  const isDark = root.getAttribute('data-theme') === 'dark';
  const newTheme = isDark ? 'light' : 'dark';

  root.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
}

const savedTheme = localStorage.getItem('theme');
const prefereEscuro = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (savedTheme) {
  document.documentElement.setAttribute('data-theme', savedTheme);
} else if (prefereEscuro) {
  document.documentElement.setAttribute('data-theme', 'dark');
}

//MUSICA
  const musica = document.getElementById('musica');
  const popupMusica = document.querySelector('.tocandomusica');

  musica.volume =0.4;
      
function toggleMusic(){
  const btnMusica = document.querySelector('.btnMusic');

  if (musica.paused) {
    musica.play();
    btnMusica.classList.add('tocando');
    showMusicPopup();
  } else {
    musica.pause();
    btnMusica.classList.remove('tocando');
  }
}

function showMusicPopup(){
  popupMusica.classList.add('popup');

  setTimeout(() => {
    popupMusica.classList.remove('popup');
  }, 2500);
}

//LINGUA
let traducoes = {};

fetch('./traducao.json')
  .then(res => res.json())
  .then(data => {
    traducoes = data;

  
    const savedLang = localStorage.getItem('lang') || 'br';
    aplicarIdioma(savedLang);
  })
  .catch(err => console.error('Ops! Erro ao traduzir:', err));

function aplicarIdioma(lang){
  document.querySelectorAll('[data-key]').forEach(el => {
    const key = el.getAttribute('data-key');
    if (traducoes[lang]?.[key]) {
      el.innerHTML = traducoes[lang][key];
    }
  });
}

function toggleLanguage(){
  const currentLang = localStorage.getItem('lang') || 'br';
  const newLang = currentLang === 'br' ? 'en' : 'br';

  aplicarIdioma(newLang);
  localStorage.setItem('lang', newLang);
}


//CARROSSEL
document.querySelectorAll('.carrossel').forEach(carrossel => {
  const track = carrossel.querySelector('ul');
  const slides = carrossel.querySelectorAll('li');
  let index = 0;
  let auto = setInterval(() => irPara(index + 1), 4000);

  function irPara(i) {
    index = (i + slides.length) % slides.length;
    track.style.transform = `translateX(-${index * 100}%)`;
  }

  function resetAuto() {
    clearInterval(auto);
    auto = setInterval(() => irPara(index + 1), 4000);
  }

  carrossel.querySelector('.depois').addEventListener('click', () => { irPara(index + 1); resetAuto(); });
  carrossel.querySelector('.antes').addEventListener('click', () => { irPara(index - 1); resetAuto(); });
});


//COPIAR EMAIL
document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('btn-copiar-email');
    const popover = document.getElementById('copiar-email');

    const p1 = atob('cmljYXJkb3Blc3NvYTA0');      
    const p2 = String.fromCharCode(64);     
    const p3 = atob('Z21haWwuY29t');  

    btn.addEventListener('click', async () => {
        const email = p1 + p2 + p3;

        const rect = btn.getBoundingClientRect();
        popover.style.left = `${rect.left + rect.width / 2}px`;
        popover.style.top = `${rect.bottom + 4}px`;
        popover.style.transform = 'translate(-50%, 0)';

        try {
            await navigator.clipboard.writeText(email);
        } catch (err) {
            console.error('Erro ao copiar:', err);
        }

        setTimeout(() => {
            popover.hidePopover();
        }, 1500);
    });
});