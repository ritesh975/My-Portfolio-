import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import {
  getStorage,
  ref,
  getBlob
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-storage.js";
import { firebaseConfig, PRIVATE_USER_EMAIL } from "./firebase-config.js";

const loginForm = document.getElementById("private-login-form");
const emailInput = document.getElementById("private-email");
const passwordInput = document.getElementById("private-password");
const status = document.getElementById("private-status");
const gate = document.getElementById("private-gate");
const content = document.getElementById("private-content");
const lockButton = document.getElementById("lock-documents");
const togglePassword = document.getElementById("toggle-password");

const isConfigured = Object.values(firebaseConfig).every(value => value && !String(value).startsWith("YOUR_"));

function setStatus(message, type = "error") {
  if (!status) return;
  status.textContent = message;
  status.className = `private-status ${type}`;
}

if (!isConfigured) {
  setStatus("Firebase is not configured yet. Add your Firebase Web App config in js/firebase-config.js.");
} else {
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const storage = getStorage(app);

  const showPrivateArea = user => {
    const allowed = user && user.email?.toLowerCase() === PRIVATE_USER_EMAIL.toLowerCase();
    if (allowed) {
      gate.hidden = true;
      content.hidden = false;
      setStatus("", "success");
    } else {
      gate.hidden = false;
      content.hidden = true;
      if (user) setStatus("This Firebase account is not authorized for private documents.");
    }
  };

  onAuthStateChanged(auth, showPrivateArea);

  loginForm?.addEventListener("submit", async event => {
    event.preventDefault();
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    if (email.toLowerCase() !== PRIVATE_USER_EMAIL.toLowerCase()) {
      setStatus("Use the authorized private-document email address.");
      return;
    }
    try {
      setStatus("Signing in…", "success");
      await signInWithEmailAndPassword(auth, email, password);
      passwordInput.value = "";
    } catch (error) {
      console.error(error);
      setStatus("Login failed. Check the email/password and Firebase Authentication setup.");
    }
  });

  lockButton?.addEventListener("click", async () => {
    try {
      await signOut(auth);
      gate.hidden = false;
      content.hidden = true;
      setStatus("Signed out successfully.", "success");
    } catch (error) {
      console.error(error);
      setStatus("Could not sign out. Please try again.");
    }
  });

  async function loadDocument(card, mode) {
    const path = card.dataset.path;
    const button = card.querySelector(mode === "view" ? ".doc-view" : ".doc-download");
    const oldHtml = button.innerHTML;
    button.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';
    button.disabled = true;
    try {
      const blob = await getBlob(ref(storage, path));
      const url = URL.createObjectURL(blob);
      if (mode === "view") {
        window.open(url, "_blank", "noopener,noreferrer");
        setTimeout(() => URL.revokeObjectURL(url), 60000);
      } else {
        const a = document.createElement("a");
        a.href = url;
        a.download = path.split("/").pop();
        document.body.appendChild(a);
        a.click();
        a.remove();
        setTimeout(() => URL.revokeObjectURL(url), 1000);
      }
    } catch (error) {
      console.error(error);
      setStatus("Document access failed. Check Firebase Storage path and Security Rules.");
    } finally {
      button.innerHTML = oldHtml;
      button.disabled = false;
    }
  }

  document.querySelectorAll(".secure-doc").forEach(card => {
    card.querySelector(".doc-view")?.addEventListener("click", () => loadDocument(card, "view"));
    card.querySelector(".doc-download")?.addEventListener("click", () => loadDocument(card, "download"));
  });
}

togglePassword?.addEventListener("click", () => {
  const isPassword = passwordInput.type === "password";
  passwordInput.type = isPassword ? "text" : "password";
  togglePassword.innerHTML = isPassword ? '<i class="fa-solid fa-eye-slash"></i>' : '<i class="fa-solid fa-eye"></i>';
});
