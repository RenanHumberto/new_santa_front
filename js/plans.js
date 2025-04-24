const API_URL = 'https://new-santa-back.onrender.com';

document.addEventListener('DOMContentLoaded', async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    window.location.href = 'index.html';
    return;
  }

  try {
    const response = await fetch(`${API_URL}/auth/usuario`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) throw new Error('Erro ao carregar dados do usuário');
    const user = await response.json();

    const currentPlan = user.plano;
    document.getElementById('current-plan').textContent = currentPlan;

    // Atualizar os botões para mostrar "Plano Atual" no plano selecionado
    ['Ouro', 'Prata', 'Bronze', 'Torcedor'].forEach(plan => {
      const btn = document.getElementById(`btn-${plan.toLowerCase()}`);
      if (plan === currentPlan) {
        btn.textContent = 'Plano Atual';
        btn.classList.remove('bg-yellow-400', 'hover:bg-yellow-500');
        btn.classList.add('bg-gray-400', 'cursor-not-allowed');
        btn.disabled = true;
      }
    });
  } catch (error) {
    console.error(error);
    localStorage.removeItem('token');
    window.location.href = 'index.html';
  }
});

async function selectPlan(plan) {
  const token = localStorage.getItem('token');
  const errorMessage = document.getElementById('error-message');

  try {
    const response = await fetch(`${API_URL}/auth/usuario`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) throw new Error('Erro ao carregar dados do usuário');
    const user = await response.json();

    const updateResponse = await fetch(`${API_URL}/cadastro/${user._id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ plano: plan }),
    });

    if (!updateResponse.ok) throw new Error('Erro ao atualizar o plano');
    alert(`Plano atualizado para ${plan} com sucesso!`);
    window.location.reload();
  } catch (error) {
    errorMessage.textContent = error.message;
    errorMessage.classList.remove('hidden');
  }
}