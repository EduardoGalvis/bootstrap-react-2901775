document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  const icon = document.getElementById("profileIcon");
  const toast = document.getElementById("loginSuccessToast");

  // ---------- Lógica del login ----------
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      e.stopPropagation();

      if (!form.checkValidity()) {
        form.classList.add("was-validated");
        return;
      }

      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value;
      const keepSession = document.getElementById("keepSession").checked;

      const users = JSON.parse(localStorage.getItem("users")) || [];
      const matchedUser = users.find(
        (user) => user.email === email && user.password === password
      );

      if (matchedUser) {
        const storage = keepSession ? localStorage : sessionStorage;
        storage.setItem("loggedInUser", email);
        storage.setItem("showLoginSuccess", "true");
        window.location.href = "index.html";
      } else {
        form.classList.add("was-validated");
      }
    });
  }
});
