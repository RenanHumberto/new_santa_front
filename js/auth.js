const API_URL = 'https://new-santa-back.onrender.com';

async function login() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const errorMessage = document.getElementById('error-message');

  if (!email || !password) {
    errorMessage.textContent = 'Por favor, preencha todos os campos.';
    errorMessage.classList.remove('hidden');
    return;
  }

  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha: password }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Erro ao fazer login');

    localStorage.setItem('token', data.token);
    window.location.href = 'home.html';
  } catch (error) {
    errorMessage.textContent = error.message;
    errorMessage.classList.remove('hidden');
  }
}

async function register() {
  const nome = document.getElementById('nome').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const errorMessage = document.getElementById('error-message');

  if (!nome || !email || !password) {
    errorMessage.textContent = 'Por favor, preencha todos os campos.';
    errorMessage.classList.remove('hidden');
    return;
  }

  try {
    const response = await fetch(`${API_URL}/cadastro`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, email, senha: password }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Erro ao cadastrar');

    alert('Cadastro realizado com sucesso! Faça login para continuar.');
    window.location.href = 'index.html';
  } catch (error) {
    errorMessage.textContent = error.message;
    errorMessage.classList.remove('hidden');
  }
}

function logout() {
  localStorage.removeItem('token');
  window.location.href = 'index.html';
}