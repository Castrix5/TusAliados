// js/auth.js
document.addEventListener('DOMContentLoaded', () => {
  // --- Tabs accesibles
  const tabLogin = document.getElementById('tab-login');
  const tabRegister = document.getElementById('tab-register');
  const panelLogin = document.getElementById('panel-login');
  const panelRegister = document.getElementById('panel-register');

  function activate(tab) {
    const isLogin = tab === 'login';
    tabLogin.setAttribute('aria-selected', String(isLogin));
    tabRegister.setAttribute('aria-selected', String(!isLogin));
    panelLogin.hidden = !isLogin;
    panelRegister.hidden = isLogin;
  }

  // deep-link ?tab=register
  const urlTab = new URLSearchParams(window.location.search).get('tab');
  activate(urlTab === 'register' ? 'register' : 'login');

  tabLogin.addEventListener('click', () => activate('login'));
  tabRegister.addEventListener('click', () => activate('register'));

  // --- Helpers fetch
  async function apiPost(path, body) {
    const res = await fetch(`/api/v1${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      // Si usas cookies httpOnly en el back:
      // credentials: 'include',
      body: JSON.stringify(body),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data?.message || `Error ${res.status}`);
    return data;
  }

  function isEmail(str) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str);
  }

  function redirectAfterLogin(role) {
    if (role === 'PRO') {
      window.location.href = 'pro-onboarding.html'; // o ruta de servidor
    } else {
      window.location.href = 'profesionales.html';
    }
  }

  // --- Login
  const loginForm = document.getElementById('formLogin');
  if (loginForm) {
    const err = document.getElementById('login-error');
    const ok = document.getElementById('login-success');

    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      err.textContent = ''; ok.textContent = '';

      const email = loginForm.email.value.trim();
      const password = loginForm.password.value;

      if (!email || !password) return err.textContent = 'Completa tu correo y contraseña.';
      if (!isEmail(email)) return err.textContent = 'Ingresa un correo válido.';
      if (password.length < 6) return err.textContent = 'La contraseña debe tener al menos 6 caracteres.';

      try {
        const data = await apiPost('/auth/login', { email, password });

        // ⚠️ En producción: tokens en cookies httpOnly (los setea el backend).
        // Para desarrollo, guarda temporalmente para probar:
        localStorage.setItem('ta_access', data.access);
        localStorage.setItem('ta_refresh', data.refresh);

        ok.textContent = '¡Bienvenido! Redirigiendo…';

        // Si tu backend expone /me con el rol:
        // const me = await fetch('/api/v1/me', { headers: { Authorization: `Bearer ${data.access}` } }).then(r=>r.json());
        // redirectAfterLogin(me.role);

        redirectAfterLogin('CLIENT'); // fallback mientras no consultes /me
      } catch (e2) {
        err.textContent = e2.message || 'No pudimos iniciar sesión.';
      }
    });
  }

  // --- Registro
  const regForm = document.getElementById('formRegister');
  if (regForm) {
    const err = document.getElementById('register-error');
    const ok = document.getElementById('register-success');

    regForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      err.textContent = ''; ok.textContent = '';

      const full_name = regForm.full_name.value.trim();
      const email = regForm.email.value.trim();
      const password = regForm.password.value;
      const role = regForm.role.value;

      if (!full_name || !email || !password) return err.textContent = 'Completa todos los campos.';
      if (!isEmail(email)) return err.textContent = 'Ingresa un correo válido.';
      if (password.length < 6) return err.textContent = 'La contraseña debe tener al menos 6 caracteres.';

      try {
        await apiPost('/auth/register', { full_name, email, password, role });
        ok.textContent = 'Cuenta creada. Iniciando sesión…';

        const data = await apiPost('/auth/login', { email, password });
        localStorage.setItem('ta_access', data.access);
        localStorage.setItem('ta_refresh', data.refresh);

        redirectAfterLogin(role);
      } catch (e2) {
        err.textContent = e2.message || 'No pudimos crear tu cuenta.';
      }
    });
  }

  // --- Olvidé contraseña (placeholder)
  const forgot = document.getElementById('link-forgot');
  if (forgot) {
    forgot.addEventListener('click', (e) => {
      e.preventDefault();
      alert('Pronto habilitaremos recuperación por correo.');
    });
  }
});