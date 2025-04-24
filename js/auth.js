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

    console.log('Token recebido:', data.token); // Adicionar log para depuração
    localStorage.setItem('token', data.token);
    console.log('Token salvo no localStorage:', localStorage.getItem('token')); // Adicionar log para depuração

    window.location.href = 'home.html';
  } catch (error) {
    errorMessage.textContent = error.message;
    errorMessage.classList.remove('hidden');
  }
}