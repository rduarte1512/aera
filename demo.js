const codeInput = document.querySelector('#discount-code');
const codeButton = document.querySelector('#apply-discount');
const codeMessage = document.querySelector('.discount-message');
const offLabel = document.querySelector('#discount-price');
const shipLabel = document.querySelector('#shipping-price');
const finalLabel = document.querySelector('#total-price');
const optionTiles = document.querySelectorAll('.choice-tile');
const iconBox = document.querySelector('.preview-icon');
const optionLabel = document.querySelector('#selected-method-label');
const optionTitle = document.querySelector('#selected-method-title');
const optionCopy = document.querySelector('#selected-method-copy');
const demoForm = document.querySelector('.demo-panel');
const demoMsg = document.querySelector('.checkout-message');

const baseValue = 59.9;
let shipValue = 4.9;
let offValue = 0;

function euros(value) {
  return `${value.toFixed(2).replace('.', ',')} €`;
}

function refreshTotal() {
  if (!offLabel || !shipLabel || !finalLabel) return;
  offLabel.textContent = `-${euros(offValue)}`;
  shipLabel.textContent = euros(shipValue);
  finalLabel.textContent = euros(Math.max(baseValue + shipValue - offValue, 0));
}

function useCode() {
  if (!codeInput || !codeMessage) return;
  const code = codeInput.value.trim().toUpperCase();

  shipValue = 4.9;
  offValue = 0;

  if (code === 'AERA10') {
    offValue = baseValue * 0.1;
    codeMessage.textContent = 'AERA10 aplicado: 10% de desconto.';
  } else if (code === 'PRIMEIRA15') {
    offValue = baseValue * 0.15;
    codeMessage.textContent = 'PRIMEIRA15 aplicado: 15% de desconto.';
  } else if (code === 'FRETEGRATIS') {
    shipValue = 0;
    codeMessage.textContent = 'FRETEGRATIS aplicado: envio grátis.';
  } else if (!code) {
    codeMessage.textContent = 'Escreve um código para aplicar.';
  } else {
    codeMessage.textContent = 'Código inválido. Experimenta AERA10, PRIMEIRA15 ou FRETEGRATIS.';
  }

  refreshTotal();
}

if (codeButton) {
  codeButton.addEventListener('click', useCode);
}

if (codeInput) {
  codeInput.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
      event.preventDefault();
      useCode();
    }
  });
}

optionTiles.forEach(tile => {
  tile.addEventListener('click', () => {
    optionTiles.forEach(item => {
      item.classList.remove('active');
      item.setAttribute('aria-pressed', 'false');
    });

    tile.classList.add('active');
    tile.setAttribute('aria-pressed', 'true');

    const icon = tile.querySelector('span')?.textContent || '✓';
    const title = tile.querySelector('strong')?.textContent || 'Opção';
    const detail = tile.querySelector('small')?.textContent || 'Selecionado';

    if (iconBox) iconBox.textContent = icon;
    if (optionLabel) optionLabel.textContent = `${title} selecionado`;
    if (optionTitle) optionTitle.textContent = detail;
    if (optionCopy) optionCopy.textContent = 'Opção visual ativa para demonstração da experiência de compra.';
    if (demoMsg) demoMsg.textContent = '';
  });
});

if (demoForm) {
  demoForm.addEventListener('submit', event => {
    event.preventDefault();
    if (demoMsg) demoMsg.textContent = 'Simulação concluída com sucesso.';
  });
}

refreshTotal();
