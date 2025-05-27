document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const loginError = document.getElementById("loginError");
  const loginErrore = document.getElementById("loginErrore");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      e.stopPropagation();

      const email = emailInput.value.trim();
      const password = passwordInput.value;
      const keepSession = document.getElementById("keepSession").checked;

      const users = JSON.parse(localStorage.getItem("users")) || [];
      const matchedUser = users.find(
        (user) => user.email === email && user.password === password
      );
      const userByEmail = users.find(user => user.email === email);

      if (!userByEmail) {
        // El correo no existe
        loginErrore.textContent = "El correo no está registrado.";
        loginErrore.style.display = "block";
        loginError.style.display = "none";
        emailInput.classList.add("is-invalid");
        passwordInput.classList.remove("is-invalid");
      } else if (password.length < 6) {
        // Contraseña demasiado corta
        loginError.textContent = "La contraseña debe tener al menos 6 caracteres.";
        loginError.style.display = "block";
        loginErrore.style.display = "none";
        emailInput.classList.remove("is-invalid");
        passwordInput.classList.add("is-invalid");
      } else if (!matchedUser) {
        // Contraseña incorrecta (pero longitud suficiente)
        loginError.textContent = "La contraseña es incorrecta.";
        loginError.style.display = "block";
        loginErrore.style.display = "none";
        emailInput.classList.remove("is-invalid");
        passwordInput.classList.add("is-invalid");
      } else {
        // Login correcto
        emailInput.classList.remove("is-invalid");
        passwordInput.classList.remove("is-invalid");
        loginError.style.display = "none";
        loginErrore.style.display = "none";
        const storage = keepSession ? localStorage : sessionStorage;
        storage.setItem("loggedInUser", email);
        localStorage.setItem('showLoginSuccess', 'true');
        let redirect = localStorage.getItem('redirectAfterLogin');
        localStorage.removeItem('redirectAfterLogin');
        // Si el redirect es register.html o no existe, ve a index.html
        if (!redirect || redirect.includes('register.html')) {
          redirect = 'index.html';
        }
        window.location.href = redirect;
      }

      emailInput.classList.remove("is-valid");
      passwordInput.classList.remove("is-valid");
      form.classList.add("was-validated");
    });

    // Limpia el error al escribir
    emailInput.addEventListener("input", () => {
      emailInput.classList.remove("is-invalid", "is-valid");
      loginError.style.display = "none";
      loginErrore.style.display = "none";
    });
    passwordInput.addEventListener("input", () => {
      passwordInput.classList.remove("is-invalid", "is-valid");
      loginError.style.display = "none";
      loginErrore.style.display = "none";
    });
  }

  // Guardar referrer si no existe redirectAfterLogin y el referrer es válido
  if (
    !localStorage.getItem('redirectAfterLogin') &&
    document.referrer &&
    !document.referrer.includes('login.html')
  ) {
    try {
      const ref = new URL(document.referrer, window.location.origin);
      if (ref.origin === window.location.origin) {
        localStorage.setItem('redirectAfterLogin', ref.pathname);
      }
    } catch (e) {
      // Si document.referrer no es válido, no hacer nada
    }
  }
});
