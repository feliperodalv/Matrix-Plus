
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const registerLink = document.getElementById('register-link');
const backToLogin = document.getElementById('back-to-login');
const googleLogin = document.getElementById('google-login');
const facebookLogin = document.getElementById('facebook-login');
const forgotPassword = document.getElementById('forgot-password');


registerLink.addEventListener('click', (e) => {
  e.preventDefault();
  loginForm.style.display = 'none';
  registerForm.style.display = 'flex';
});

backToLogin.addEventListener('click', (e) => {
  e.preventDefault();
  registerForm.style.display = 'none';
  loginForm.style.display = 'flex';
});

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  Swal.fire({
    title: 'Entrando...',
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    }
  });

  auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      Swal.close();
      window.location.href = "index.html";
    })
    .catch((error) => {
      Swal.close();
      Swal.fire({
        icon: 'error',
        title: 'Erro ao fazer login',
        text: error.message,
      });
    });
});


registerForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const email = document.getElementById('register-email').value.trim();
  const password = document.getElementById('register-password').value.trim();

  Swal.fire({
    title: 'Cadastrando...',
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    }
  });

  auth.createUserWithEmailAndPassword(email, password)
    .then(() => {
      Swal.close();
      Swal.fire({
        icon: 'success',
        title: 'Cadastro realizado!',
        text: 'Agora faça o login para continuar.',
      });
      registerForm.style.display = 'none';
      loginForm.style.display = 'flex';
    })
    .catch((error) => {
      Swal.close();
      Swal.fire({
        icon: 'error',
        title: 'Erro ao cadastrar',
        text: error.message,
      });
    });
});


googleLogin.addEventListener('click', (e) => {
  e.preventDefault();

  const provider = new firebase.auth.GoogleAuthProvider();

  Swal.fire({
    title: 'Conectando com Google...',
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    }
  });

  auth.signInWithPopup(provider)
    .then(() => {
      Swal.close();
      window.location.href = "index.html";
    })
    .catch((error) => {
      Swal.close();
      Swal.fire({
        icon: 'error',
        title: 'Erro ao fazer login com Google',
        text: error.message,
      });
    });
});

// 🔵 Login com Facebook
facebookLogin.addEventListener('click', (e) => {
  e.preventDefault();

  const provider = new firebase.auth.FacebookAuthProvider();

  Swal.fire({
    title: 'Conectando com Facebook...',
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    }
  });

  auth.signInWithPopup(provider)
    .then(() => {
      Swal.close();
      window.location.href = "index.html";
    })
    .catch((error) => {
      Swal.close();
      Swal.fire({
        icon: 'error',
        title: 'Erro ao fazer login com Facebook',
        text: error.message,
      });
    });
});

// 💙 Recuperação de senha
forgotPassword.addEventListener('click', (e) => {
  e.preventDefault();

  Swal.fire({
    title: 'Recuperar senha',
    input: 'email',
    inputLabel: 'Digite seu email cadastrado',
    inputPlaceholder: 'email@exemplo.com',
    showCancelButton: true,
    confirmButtonText: 'Enviar link',
    cancelButtonText: 'Cancelar',
  }).then((result) => {
    if (result.isConfirmed) {
      const email = result.value;
      if (!email) {
        Swal.fire('Erro', 'Você precisa digitar um email.', 'error');
        return;
      }

      Swal.fire({
        title: 'Enviando...',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      auth.sendPasswordResetEmail(email)
        .then(() => {
          Swal.close();
          Swal.fire('Email enviado!', 'Verifique sua caixa de entrada para redefinir sua senha.', 'success');
        })
        .catch((error) => {
          Swal.close();
          Swal.fire('Erro', error.message, 'error');
        });
    }
  });
});
