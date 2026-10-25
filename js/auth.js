const signupForm = document.getElementById('signupForm');
const signupStatus = document.getElementById('signupStatus');
const signupButton = signupForm.querySelector('button[type="submit"]');

signupForm.addEventListener('submit', async event => {
  event.preventDefault();

  if (signupButton.disabled) return;

  const email = document.getElementById('signupEmail').value.trim();
  const passwordInput = document.getElementById('signupPassword');

  signupButton.disabled = true;
  signupStatus.textContent = 'Kayıt isteği gönderiliyor…';

  try {
    const { error } = await window.LL_SUPABASE.auth.signUp({
      email,
      password: passwordInput.value,
      options: {
        emailRedirectTo: 'http://localhost:8000/'
      }
    });

    if (error) throw error;

    signupStatus.textContent =
      'Devam etmek için e-posta kutunu kontrol et 💌';
    passwordInput.value = '';
  } catch (error) {
    signupStatus.textContent = 'Kayıt başarısız: ' + error.message;
  } finally {
    signupButton.disabled = false;
  }
});

signupButton.disabled = false;

const loginForm = document.getElementById('loginForm');
const loginStatus = document.getElementById('loginStatus');
const loginButton = loginForm.querySelector('button[type="submit"]');

loginForm.addEventListener('submit', async event => {
    event.preventDefault();

    if (loginButton.disabled) return;

    const email =document.getElementById('loginEmail').value.trim();
    const passwordInput =document.getElementById('loginPassword');

    loginButton.disabled = true;
    loginStatus.textContent = 'Giriş yapılıyor…';

    try {
        const { error } = await window.LL_SUPABASE.auth.signInWithPassword({email,password: passwordInput.value});

        if (error) throw error;

        loginStatus.textContent = 'Giriş yaptın 💌';
        passwordInput.value = '';
    }

    catch (error) {
        loginStatus.textContent = 'Giriş başarısız: ' + error.message;
    }

    finally {
        loginButton.disabled = false;
    }
});

loginButton.disabled = false;

const sessionStatus = document.getElementById('sessionStatus');
const signOutButton = document.getElementById('signOutButton');
const loginHeading = document.getElementById('loginHeading');

const welcomePanel = document.getElementById('welcomePanel');
const authPanel = document.getElementById('authPanel');
const editorShell = document.getElementById('shell');

let pageMode = 'welcome';
let activeSession = null;

let recoveringPassword = false;
const recoveryPanel = document.getElementById('recoveryPanel');

function renderPage() {
  recoveryPanel.hidden = !recoveringPassword;

if (recoveringPassword) { 
  welcomePanel.hidden = true;
  authPanel.hidden = true;
  editorShell.hidden = true;
  document.getElementById('openAccount').hidden = true;
  return;
}
    const signedIn = Boolean(activeSession);

    welcomePanel.hidden = signedIn || pageMode !== 'welcome';
    authPanel.hidden = !signedIn && pageMode !== 'account';
    editorShell.hidden = !signedIn && pageMode !== 'guest';
    document.getElementById('openAccount').hidden =
    signedIn || pageMode !== 'guest';
    document.getElementById('backToGuest').hidden =
    signedIn || pageMode !== 'account';
}

document.getElementById('chooseAccount').addEventListener('click',() => { 
    pageMode = 'account';
    renderPage();
});

document.getElementById('chooseGuest').addEventListener('click', () => {
    pageMode = 'guest';
    renderPage();
})

window.LL_SUPABASE.auth.onAuthStateChange((event, session) => {
    activeSession = session;

    if (event === 'PASSWORD_RECOVERY') {
  recoveringPassword = true;
  }

    if (event === 'SIGNED_OUT') {
    recoveringPassword = false;
  }

    if (!session) pageMode = 'welcome'

    renderPage();

  const signedIn = Boolean(session);

  sessionStatus.textContent = signedIn
    ? 'LoveLab’e hoş geldin 💌'
    : 'Giriş yapabilir veya hesap oluşturabilirsin.';

  signupForm.hidden = signedIn;
  loginForm.hidden = signedIn;
  loginHeading.hidden = signedIn;
  signOutButton.hidden = !signedIn;

  if (!signedIn) {
    signupStatus.textContent = '';
    loginStatus.textContent = '';
  }
});

signOutButton.addEventListener('click', async () => {
  if (signOutButton.disabled) return;

  signOutButton.disabled = true;

  try {
    const { error } = await window.LL_SUPABASE.auth.signOut({
      scope: 'local'
    });

    if (error) throw error;
  } catch (error) {
    sessionStatus.textContent = 'Çıkış başarısız: ' + error.message;
  } finally {
    signOutButton.disabled = false;
  }
});

document.getElementById('openAccount').addEventListener('click', () => {
  pageMode = 'account';
  renderPage();
  authPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

document.getElementById('backToGuest').addEventListener('click', () => {
  pageMode = 'guest';
  renderPage();
});

const recoveryForm = document.getElementById('recoveryForm');
const recoveryStatus = document.getElementById('recoveryStatus');
const recoveryButton = recoveryForm.querySelector('button[type="submit"]');

recoveryForm.addEventListener('submit', async event => {
  event.preventDefault();

  if (recoveryButton.disabled) return;

  if (!recoveringPassword || !activeSession) {
    recoveryStatus.textContent = 'Önce e-postandaki sıfırlama bağlantısını aç.';
    return;
  }

  const passwordInput = document.getElementById('newPassword');

  recoveryButton.disabled = true;
  recoveryStatus.textContent = 'Şifre güncelleniyor…';

  try {
    const { error } = await window.LL_SUPABASE.auth.updateUser({
      password: passwordInput.value
    });

    if (error) throw error;

    passwordInput.value = '';
    recoveryStatus.textContent = '';
    recoveringPassword = false;
    renderPage();
    sessionStatus.textContent = 'Şifren güncellendi 💌';
  } catch (error) {
    recoveryStatus.textContent = 'Şifre güncellenemedi: ' + error.message;
  } finally {
    recoveryButton.disabled = false;
  }
});

recoveryButton.disabled = false;

const forgotPassword = document.getElementById('forgotPassword');

forgotPassword.addEventListener('click', async () => {
  if (forgotPassword.disabled) return;

  const emailInput = document.getElementById('loginEmail');

  if (!emailInput.reportValidity()) return;

  forgotPassword.disabled = true;
  loginStatus.textContent = 'Sıfırlama isteği gönderiliyor…';

  try {
    const { error } = await window.LL_SUPABASE.auth.resetPasswordForEmail(
      emailInput.value.trim(),
      { redirectTo: 'http://localhost:8000/' }
    );

    if (error) throw error;

    loginStatus.textContent =
      'Bu adres için işlem yapılabiliyorsa sıfırlama e-postası gönderildi 💌';
  } catch (error) {
    loginStatus.textContent = 'İstek gönderilemedi: ' + error.message;
  } finally {
    forgotPassword.disabled = false;
  }
});

forgotPassword.disabled = false;