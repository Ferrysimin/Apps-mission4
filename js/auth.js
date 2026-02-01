const formTitle = document.getElementById("formTitle");
const nameField = document.getElementById("nameField");
const roleField = document.getElementById("roleField");
const toggleBtn = document.getElementById("toggleBtn");
const toggleText = document.getElementById("toggleText");
const btnText = document.getElementById("btnText");
const authForm = document.getElementById("authForm");

let isRegister = false;


toggleBtn.onclick = () => {
  isRegister = !isRegister;

  nameField.classList.toggle("hidden");
  roleField.classList.toggle("hidden");

  btnText.innerText = isRegister ? "Daftar" : "Login";
  toggleText.innerText = isRegister ? "Sudah punya akun?" : "Belum punya akun?";
  formTitle.innerText = isRegister ? "Buat akun baru" : "Masuk ke akun";
  toggleBtn.innerText = isRegister ? "Login" : "Daftar";
};


authForm.onsubmit = (e) => {
  e.preventDefault();

  let users = JSON.parse(localStorage.getItem("users")) || [];

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const role = document.getElementById("role").value;
  const password = document.getElementById("password").value;

  if (!email || !password) return alert("Email & password wajib diisi");
  if (password.length < 6) return alert("Password minimal 6 karakter");

  if (isRegister) {
    if (!name) return alert("Nama wajib diisi");
    if (!role) return alert("Pilih jabatan");

    if (users.find(u => u.email === email))
      return alert("Email sudah terdaftar");

    users.push({ name, email, role, password });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registrasi berhasil, silakan login");
    toggleBtn.click();

  } else {
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) return alert("Email atau password salah");

    localStorage.setItem("currentUser", JSON.stringify(user));
    window.location.href = "dashboard.html";
  }
};
