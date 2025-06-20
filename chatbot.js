const chatbotToggle = document.getElementById('chatbot-toggle');
const chatbotContainer = document.querySelector('.chatbot-container');
const chatbotClose = document.getElementById('chatbot-close');
const chatbotSend = document.getElementById('chatbot-send');
const chatbotInput = document.getElementById('chatbot-input');
const chatbotMessages = document.getElementById('chatbot-messages');

let lastUserIntent = null;

chatbotToggle.addEventListener('click', () => {
  chatbotContainer.style.display = 'flex';
});

chatbotClose.addEventListener('click', () => {
  chatbotContainer.style.display = 'none';
});

chatbotSend.addEventListener('click', sendMessage);
chatbotInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') sendMessage();
});

function sendMessage() {
  const message = chatbotInput.value.trim();
  if (message === '') return;

  appendMessage(message, 'user');
  chatbotInput.value = '';

  setTimeout(() => {
    const response = getBotResponse(message);
    appendMessage(response, 'bot');
  }, 600);
}

function appendMessage(message, sender) {
  const msgDiv = document.createElement('div');
  msgDiv.classList.add(sender === 'bot' ? 'bot-message' : 'user-message');
  msgDiv.textContent = message;
  chatbotMessages.appendChild(msgDiv);
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

const intents = {
  greeting: {
    keywords: ['oi', 'olá', 'ola', 'bom dia', 'boa tarde', 'boa noite'],
    responses: [
      'Olá! Em que posso ajudar você hoje?',
      'Oi! Que bom te ver por aqui. Como posso ajudar?',
      'Olá! Estou aqui para ajudar com o que você precisar.'
    ]
  },
  movie: {
    keywords: ['filme', 'recomenda', 'filmes', 'dica'],
    responses: [
      'Claro! Se você gosta de algo épico, recomendo "Interestelar". Quer algo mais leve? "O Fabuloso Destino de Amélie Poulain" é ótimo!',
      'Se curte suspense, que tal assistir "Garota Exemplar"? Também adoro "Matrix" para uma aventura de ficção científica.',
      'Filmes são minha praia! Posso indicar clássicos, lançamentos ou até mesmo algo mais obscuro. O que você prefere?'
    ]
  },
  loginIssue: {
    keywords: ['1', 'login', 'senha', 'acessar', 'entrar', ],
    responses: [
    'Para acessar sua conta, basta apenas cadastrar a sua conta com E-mail (Google, Facebook, Hotmail, etc) e senha de seis caracteres.'
    ]
  },
  error: {
    keywords: ['2', 'erro', 'problema', 'falha'],
    responses: [
      'Caso esteja com uma falha de login ou senha, redefina a sua senha. Se o problema persistir, entre em contato com o suporte.'
    ]
  },
  bye: {
    keywords: ['tchau', 'até', 'falou', 'adeus', 'bye'],
    responses: [
      'Até mais! Foi ótimo conversar com você. Volte quando quiser.',
      'Tchau! Cuide-se e até a próxima!',
      'Falou! Estou sempre por aqui se precisar.'
    ]
  }
};

const genreSuggestions = {
  'dicas de filmes de aventura': ['Indiana Jones', 'Jumanji', 'Piratas do Caribe', 'O Regresso', 'Viagem ao Centro da Terra'],
  'dicas de filmes de fantasia': ['O Senhor dos Anéis', 'Harry Potter', 'As Crônicas de Nárnia', 'A Bússola de Ouro', 'O Labirinto do Fauno'],
  'dicas de filmes de animação': ['Divertida Mente', 'Shrek', 'Toy Story', 'Up', 'Zootopia'],
  'dicas de filmes de drama': ['Forrest Gump', 'À Espera de um Milagre', 'O Pianista', 'Clube da Luta', 'Cisne Negro'],
  'dicas de filmes de terror': ['Invocação do Mal', 'Corra!', 'Hereditário', 'It: A Coisa', 'O Iluminado'],
  'dicas de filmes de ação': ['John Wick', 'Mad Max: Estrada da Fúria', 'Missão Impossível', 'Gladiador', 'Velozes e Furiosos'],
  'dicas de filmes de comédia': ['Se Beber, Não Case!', 'Superbad', 'As Branquelas', 'Click', 'O Âncora'],
  'dicas de filmes de história': ['O Discurso do Rei', 'Lincoln', 'A Lista de Schindler', 'Coração Valente', '12 Anos de Escravidão'],
  'dicas de filmes de faroeste': ['Os Imperdoáveis', 'Django Livre', 'Três Homens em Conflito', 'Bravura Indômita', 'Era uma Vez no Oeste'],
  'dicas de filmes de thriller': ['Garota Exemplar', 'Seven', 'O Silêncio dos Inocentes', 'O Colecionador de Ossos', 'Prisioneiros'],
  'dicas de filmes de crime': ['Pulp Fiction', 'O Poderoso Chefão', 'Scarface', 'Os Bons Companheiros', 'Os Infiltrados'],
  'dicas de filmes de documentário': ['The Last Dance', 'Free Solo', '13ª Emenda', 'Making a Murderer', 'Cowspiracy'],
  'dicas de filmes de ficção científica': ['Interestelar', 'Matrix', 'Blade Runner', '2001: Uma Odisseia no Espaço', 'Ex Machina'],
  'dicas de filmes de mistério': ['Ilha do Medo', 'O Sexto Sentido', 'Os Outros', 'Fragmentado', 'Entre Facas e Segredos'],
  'dicas de filmes de música': ['Whiplash', 'Bohemian Rhapsody', 'Rocketman', 'La La Land', 'O Som do Silêncio'],
  'dicas de filmes de romance': ['Diário de uma Paixão', 'Orgulho e Preconceito', 'Titanic', 'Simplesmente Amor', 'La La Land'],
  'dicas de filmes de família': ['Procurando Nemo', 'Frozen', 'Matilda', 'Paddington', 'Encanto'],
  'dicas de filmes de guerra': ['O Resgate do Soldado Ryan', '1917', 'Dunkirk', 'Corações de Ferro', 'Até o Último Homem'],
  'dicas de filmes de cinema tv': ['Black Mirror Bandersnatch', 'Friends', 'El Camino: Breaking Bad', 'Stranger Things'],
  'filmes de aventura': ['Indiana Jones', 'Jumanji', 'Piratas do Caribe', 'O Regresso', 'Viagem ao Centro da Terra'],
  'filmes de fantasia': ['O Senhor dos Anéis', 'Harry Potter', 'As Crônicas de Nárnia', 'A Bússola de Ouro', 'O Labirinto do Fauno'],
  'filmes de animação': ['Divertida Mente', 'Shrek', 'Toy Story', 'Up', 'Zootopia'],
  'filmes de drama': ['Forrest Gump', 'À Espera de um Milagre', 'O Pianista', 'Clube da Luta', 'Cisne Negro'],
  'filmes de terror': ['Invocação do Mal', 'Corra!', 'Hereditário', 'It: A Coisa', 'O Iluminado'],
  'filmes de ação': ['John Wick', 'Mad Max: Estrada da Fúria', 'Missão Impossível', 'Gladiador', 'Velozes e Furiosos'],
  'filmes de comédia': ['Se Beber, Não Case!', 'Superbad', 'As Branquelas', 'Click', 'O Âncora'],
  'filmes de história': ['O Discurso do Rei', 'Lincoln', 'A Lista de Schindler', 'Coração Valente', '12 Anos de Escravidão'],
  'filmes de faroeste': ['Os Imperdoáveis', 'Django Livre', 'Três Homens em Conflito', 'Bravura Indômita', 'Era uma Vez no Oeste'],
  'filmes de thriller': ['Garota Exemplar', 'Seven', 'O Silêncio dos Inocentes', 'O Colecionador de Ossos', 'Prisioneiros'],
  'filmes de crime': ['Pulp Fiction', 'O Poderoso Chefão', 'Scarface', 'Os Bons Companheiros', 'Os Infiltrados'],
  'filmes de documentário': ['The Last Dance', 'Free Solo', '13ª Emenda', 'Making a Murderer', 'Cowspiracy'],
  'filmes de ficção científica': ['Interestelar', 'Matrix', 'Blade Runner', '2001: Uma Odisseia no Espaço', 'Ex Machina'],
  'filmes de mistério': ['Ilha do Medo', 'O Sexto Sentido', 'Os Outros', 'Fragmentado', 'Entre Facas e Segredos'],
  'filmes de música': ['Whiplash', 'Bohemian Rhapsody', 'Rocketman', 'La La Land', 'O Som do Silêncio'],
  'filmes de romance': ['Diário de uma Paixão', 'Orgulho e Preconceito', 'Titanic', 'Simplesmente Amor', 'La La Land'],
  'filmes de família': ['Procurando Nemo', 'Frozen', 'Matilda', 'Paddington', 'Encanto'],
  'filmes de guerra': ['O Resgate do Soldado Ryan', '1917', 'Dunkirk', 'Corações de Ferro', 'Até o Último Homem'],
  'filmes de cinema tv': ['Black Mirror Bandersnatch', 'Friends', 'El Camino: Breaking Bad', 'Stranger Things']
};

const countrySuggestions = {
  'global': ['Parasita (Coreia)', 'A Origem (EUA)', 'Amelie Poulain (França)', 'Cidade de Deus (Brasil)', 'O Tigre e o Dragão (China)'],
  'dicas de filmes sul-africanos': ['Tsotsi', 'Four Corners', 'Ellen: Die storie van Ellen Pakkies', 'Krotoa', 'Dis ek, Anna'],
  'dicas de filmes árabes': ['Cairo 678', 'Wadjda', 'Omar', 'O Insulto', 'Caramelo'],
  'dicas de filmes de espanhóis': ['O Labirinto do Fauno', 'Roma', 'Os Olhos de Julia', 'A Pele que Habito', 'Contratiempo'],
  'dicas de filmes armênios': ['The Lark Farm', 'Earthquake', 'Vodka Lemon', 'The Cut', 'If Only Everyone'],
  'dicas de filmes alemães': ['A Vida dos Outros', 'Adeus, Lênin!', 'Corra, Lola, Corra', 'O Submarino', 'A Queda'],
  'dicas de filmes chineses': ['O Tigre e o Dragão', 'Herói', 'O Clã das Adagas Voadoras', 'Adeus, Minha Concubina', 'Lan Yu'],
  'dicas de filmes coreanos': ['Parasita', 'Oldboy', 'Invasão Zumbi', 'Memórias de um Assassino', 'O Hospedeiro'],
  'dicas de filmes dinamarqueses': ['A Caça', 'A Pele de Onça', 'Druk', 'Pusher', 'Adam’s Apples'],
  'dicas de filmes franceses': ['O Fabuloso Destino de Amélie Poulain', 'Intocáveis', 'Azul é a Cor Mais Quente', 'O Profeta', 'La Haine'],
  'dicas de filmes israelenses': ['Beaufort', 'Footnote', 'Waltz with Bashir', 'Fill the Void', 'Ajami'],
  'dicas de filmes indianos': ['Dangal', '3 Idiots', 'PK', 'Baahubali', 'Queen'],
  'dicas de filmes indonésios': ['The Raid', 'The Night Comes for Us', 'Headshot', 'Satan’s Slaves', 'Arisan!'],
  'dicas de filmes americanos': ['O Discurso do Rei', '007 - Skyfall', 'Harry Potter', 'Orgulho e Preconceito', 'Sherlock Holmes'],
  'dicas de filmes italianos': ['A Vida é Bela', 'Cinema Paradiso', 'O Carteiro e o Poeta', 'La Dolce Vita', 'Oito e Meio'],
  'dicas de filmes japoneses': ['A Viagem de Chihiro', 'Sete Samurais', 'Your Name', 'Rashomon', 'A Partida'],
  'dicas de filmes noruegueses': ['Kon-Tiki', 'The Wave', 'Oslo, 31 de Agosto', 'Elling', 'Max Manus'],
  'dicas de filmes brasileiros': ['Central do Brasil', 'Cidade de Deus', 'Tropa de Elite', 'Ainda estou Aqui', 'Bacurau'],
  'dicas de filmes russos': ['Stalker', 'Leviatã', 'O Retorno', 'Guerra e Paz', 'O Sol Enganador'],
  'dicas de filmes suecos': ['Millennium', 'O Caçador', 'Fucking Åmål', 'O Sétimo Selo', 'Ondskan'],
  'filmes sul-africanos': ['Tsotsi', 'Four Corners', 'Ellen: Die storie van Ellen Pakkies', 'Krotoa', 'Dis ek, Anna'],
  'filmes árabes': ['Cairo 678', 'Wadjda', 'Omar', 'O Insulto', 'Caramelo'],
  'filmes de espanhóis': ['O Labirinto do Fauno', 'Roma', 'Os Olhos de Julia', 'A Pele que Habito', 'Contratiempo'],
  'filmes armênios': ['The Lark Farm', 'Earthquake', 'Vodka Lemon', 'The Cut', 'If Only Everyone'],
  'filmes alemães': ['A Vida dos Outros', 'Adeus, Lênin!', 'Corra, Lola, Corra', 'O Submarino', 'A Queda'],
  'filmes chineses': ['O Tigre e o Dragão', 'Herói', 'O Clã das Adagas Voadoras', 'Adeus, Minha Concubina', 'Lan Yu'],
  'filmes coreanos': ['Parasita', 'Oldboy', 'Invasão Zumbi', 'Memórias de um Assassino', 'O Hospedeiro'],
  'filmes dinamarqueses': ['A Caça', 'A Pele de Onça', 'Druk', 'Pusher', 'Adam’s Apples'],
  'filmes franceses': ['O Fabuloso Destino de Amélie Poulain', 'Intocáveis', 'Azul é a Cor Mais Quente', 'O Profeta', 'La Haine'],
  'filmes israelenses': ['Beaufort', 'Footnote', 'Waltz with Bashir', 'Fill the Void', 'Ajami'],
  'filmes indianos': ['Dangal', '3 Idiots', 'PK', 'Baahubali', 'Queen'],
  'filmes indonésios': ['The Raid', 'The Night Comes for Us', 'Headshot', 'Satan’s Slaves', 'Arisan!'],
  'filmes americanos': ['O Discurso do Rei', '007 - Skyfall', 'Harry Potter', 'Orgulho e Preconceito', 'Sherlock Holmes'],
  'filmes italianos': ['A Vida é Bela', 'Cinema Paradiso', 'O Carteiro e o Poeta', 'La Dolce Vita', 'Oito e Meio'],
  'filmes japoneses': ['A Viagem de Chihiro', 'Sete Samurais', 'Your Name', 'Rashomon', 'A Partida'],
  'filmes noruegueses': ['Kon-Tiki', 'The Wave', 'Oslo, 31 de Agosto', 'Elling', 'Max Manus'],
  'filmes brasileiros': ['Central do Brasil', 'Cidade de Deus', 'Tropa de Elite', 'Ainda estou Aqui', 'Bacurau'],
  'filmes russos': ['Stalker', 'Leviatã', 'O Retorno', 'Guerra e Paz', 'O Sol Enganador'],
  'filmes suecos': ['Millennium', 'O Caçador', 'Fucking Åmål', 'O Sétimo Selo', 'Ondskan']
};

function detectIntent(input) {
  const inputLower = input.toLowerCase();
  for (const intent in intents) {
    if (intents[intent].keywords.some(keyword => inputLower.includes(keyword))) {
      return intent;
    }
  }
  return null;
}

function getBotResponse(input) {
  const inputLower = input.toLowerCase();

  // Primeiro, verificar se o usuário quer recomendações de filmes por gênero
  for (const genre in genreSuggestions) {
    if (inputLower.includes(genre)) {
      const movies = genreSuggestions[genre];
      return `Claro! Aqui vão algumas sugestões de filmes de ${genre.replace('dicas de filmes de ', '')} que você pode gostar: ${movies.join(', ')}. Se quiser, posso recomendar mais!`;
    }
  }

  // Verificar se o usuário quer filmes por país
  for (const country in countrySuggestions) {
    if (inputLower.includes(country)) {
      const movies = countrySuggestions[country];
      return `Ótima escolha! Aqui estão alguns ${country}: ${movies.join(', ')}. Se quiser, posso sugerir mais títulos ou de outros países!`;
    }
  }

  // Intent detection (saudações, problemas, despedidas)
  const intent = detectIntent(input);
  if (intent) {
    const responses = intents[intent].responses;
    lastUserIntent = intent;
    return responses[Math.floor(Math.random() * responses.length)];
  }

  // Perguntas frequentes
  if (inputLower.includes('como funciona')) {
    return 'Eu sou um assistente virtual que pode ajudar você a encontrar recomendações de filmes, tirar dúvidas sobre login e muito mais. Pergunte o que quiser!';
  }
  if (inputLower.includes('quem é você') || inputLower.includes('quem te criou') || inputLower.includes("Quem te criou?") || inputLower.includes('o que você faz') || inputLower.includes('quem criou você?') || inputLower.includes('quem fez você?') || inputLower.includes('quem são os criadores do site?')  || inputLower.includes('quem fez esse site?') || inputLower.includes('Quem é você?') || inputLower.includes('O que você faz') || inputLower.includes('Quem criou você?') || inputLower.includes('Quem fez você?') || inputLower.includes('Quem são os criadores do site?')  || inputLower.includes('Quem fez esse site?') || inputLower.includes('quem é você') || inputLower.includes('o que você faz') || inputLower.includes('quem criou você') || inputLower.includes('quem fez você') || inputLower.includes('quem são os criadores do site')  || inputLower.includes('quem fez esse site')) {    
    return 'Eu sou um assistente virtual. Criado por Felipe e Fernando Rodrigues Alves, com intenção de ajudar os usuários e clientes da MatrixPlus, enriquecendo a experiência! Se precisar de ajuda ou alguma dica, é só perguntar!'; 
  }
  if (inputLower.includes('obrigado') || inputLower.includes('valeu') || inputLower.includes('agradeço') || inputLower.includes('muito obrigado') || inputLower.includes('obrigada') || inputLower.includes('valeu mesmo') || inputLower.includes('agradeço muito') || inputLower.includes('muito obrigado mesmo')) {
    return 'De nada! Fico feliz em ajudar. Se precisar de mais alguma coisa, é só chamar.';
  }

  // Caso não entenda a pergunta
  return 'Desculpe, não entendi muito bem. Poderia reformular ou perguntar de outra forma? Estou aqui para ajudar!'

}
