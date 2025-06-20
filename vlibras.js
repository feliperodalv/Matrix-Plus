// assets/js/vlibras.js

const script = document.createElement('script');
script.src = 'https://vlibras.gov.br/app/vlibras-plugin.js';
script.onload = () => {
  new window.VLibras.Widget('https://vlibras.gov.br/app');
};

document.body.insertAdjacentHTML('beforeend', `
  <div vw class="enabled">
    <div vw-access-button class="active"></div>
    <div vw-plugin-wrapper>
      <div class="vw-plugin-top-wrapper"></div>
    </div>
  </div>
`);
document.body.appendChild(script);
document.body.insertAdjacentHTML('beforeend', `
  <style>
    .vlibras-button {
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 9999;
      background-color: #007bff;
      color: white;
      border-radius: 50%;
      width: 50px;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
    .vlibras-button:hover {
      background-color: #0056b3;
    }
  </style>
`);