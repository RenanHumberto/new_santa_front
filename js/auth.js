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
    if (!response.ok) throw new Error(data.message || 'Login ou senha inválidos');

    console.log('Token recebido:', data.token);
    localStorage.setItem('token', data.token);
    console.log('Token salvo no localStorage:', localStorage.getItem('token'));

    window.location.href = 'home.html';
  } catch (error) {
    errorMessage.textContent = error.message;
    errorMessage.classList.remove('hidden');
  }
}

async function getUser() {
  const token = localStorage.getItem('token');
  console.log('Token no getUser (frontend):', token);
  if (!token) {
    console.log('Token não encontrado, redirecionando para login...');
    window.location.href = 'index.html';
    return null;
  }

  try {
    const response = await fetch(`${API_URL}/auth/usuario`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    console.log('Status da resposta:', response.status);
    console.log('Resposta completa:', response);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Erro ao carregar dados do usuário');
    }

    const user = await response.json();
    console.log('Dados do usuário:', user);
    return user;
  } catch (error) {
    console.error('Erro no getUser (frontend):', error.message);
    localStorage.removeItem('token');
    window.location.href = 'index.html';
    return null;
  }
}

function logout() {
  localStorage.removeItem('token');
  window.location.href = 'index.html';
}

export { login, getUser, logout };