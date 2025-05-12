const emoji = document.getElementById('emoji');
const inputElement = document.getElementById('text-input');
const buttonElement = document.getElementById('check-btn');
const pElement = document.getElementById('result');

// Give the user a visual feedback each time a new word is checked
const flashElement = (el) => {
  el.classList.remove('flash');
  // Trigger reflow to restart animation
  void el.offsetWidth;
  el.classList.add('flash');
};

// To prevents abuses and keep UI tidy
const truncate = (str, maxLength = 15) => {
  return str.length > maxLength ? str.slice(0, maxLength) + '…' : str;
};

const isPalindrome = (word) => {
  // Decompose (separate base characters and accents), remove the accents and remove non-alphanumeric characters.
  // you should be careful with the sequence of these operations, because replace(/[^a-z0-9]/g, '') will remove letters with accents altogether.
  const cleanedWord = word.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]/g, '');
  const reversedWord = cleanedWord.split('').reverse().join('');
  return cleanedWord === reversedWord;
}

const showResult = () => {

  flashElement(pElement);
  flashElement(emoji);

  const word = inputElement.value.trim();
  if (!word) {
    pElement.textContent = '⚠️ Digite uma palavra!'
  } else if (isPalindrome(word)) {
    pElement.textContent = `✅ "${truncate(word)}" é um palíndromo!`;
    emoji.textContent = '🤓';
  } else {
    pElement.textContent = `❌ "${truncate(word)}" não é um palíndromo.`;
    emoji.textContent = '😔';
  }
  return;
}

buttonElement.addEventListener('click', showResult);
inputElement.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    showResult();
  }
});
