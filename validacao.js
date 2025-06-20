function validarSenha() {
  const senha = document.getElementById("senha").value;
  const maiuscula = /[A-Z]/.test(senha);
  const especial = /[^a-zA-Z0-9]/.test(senha);

  document.getElementById("maiuscula").textContent = (maiuscula ? "✅" : "❌") + " Pelo menos uma letra maiúscula";
  document.getElementById("especial").textContent = (especial ? "✅" : "❌") + " Pelo menos um caractere especial";
}


