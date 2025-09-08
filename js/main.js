document.addEventListener('DOMContentLoaded', () => {
  console.log("TusAliados - Proyecto inicial cargado correctamente");

  // ==== Menú hamburguesa ====
  const toggle = document.querySelector('.nav__toggle');
  const nav = document.querySelector('.nav');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('show');
      // actualizar aria-expanded
      toggle.setAttribute('aria-expanded', isOpen);
      // opcional: bloquear scroll cuando está abierto
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Cerrar menú al hacer clic en un enlace
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('show');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  // ==== Botones de suscripción ====
  document.querySelectorAll('.plan a').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      alert("Gracias por tu interés. Pronto habilitaremos el sistema de pagos.");
    });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  // ==== Login form (MVP) ====
  const loginForm = document.getElementById('formLogin');
  if (loginForm) {
    const err = document.getElementById('login-error');

    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      err.textContent = '';

      const email = loginForm.email.value.trim();
      const password = loginForm.password.value;

      if (!email || !password) {
        err.textContent = 'Completa tu correo y contraseña.';
        return;
      }
      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      if (!emailOk) { err.textContent = 'Ingresa un correo válido.'; return; }
      if (password.length < 6) { err.textContent = 'La contraseña debe tener al menos 6 caracteres.'; return; }

      // 👉 Aquí conectará el backend:
      // fetch('/api/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password })
      // })
      // .then(r => r.json())
      // .then(data => {
      //   if (data.status === 'ok') {
      //     // guardar token si aplica y redirigir
      //     // localStorage.setItem('token', data.token);
      //     window.location.href = 'profesionales.html';
      //   } else {
      //     err.textContent = data.message || 'No pudimos iniciar sesión.';
      //   }
      // })
      // .catch(() => { err.textContent = 'Error de red. Intenta más tarde.'; });

      console.log('Ready to POST', { email, password }); // ← elimina esto cuando el back esté listo
    });
  }
});