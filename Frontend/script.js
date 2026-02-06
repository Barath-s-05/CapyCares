// ================================
// CapyCares Website JavaScript
// ================================

// BACKEND BASE URL (FIXED)
const API_BASE = 'http://localhost:8080/api';

// --------------------
// Password validation
// --------------------
function isValidPassword(password) {
    return (
        password.length >= 8 &&
        /[A-Z]/.test(password) &&
        /[0-9]/.test(password)
    );
}

// --------------------
// Student Login
// --------------------
async function performStudentLogin(email, password) {
    try {
        const response = await fetch(`${API_BASE}/auth/student/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (data.success) {
            showMessage('Login successful! Redirecting...', 'success');
            localStorage.setItem('userToken', data.token);
            localStorage.setItem('userData', JSON.stringify(data.user));

            setTimeout(() => {
                window.location.href = 'student-dashboard.html';
            }, 1200);
        } else {
            showMessage(data.error || 'Login failed', 'error');
        }
    } catch (err) {
        console.error(err);
        showMessage('Login failed', 'error');
    }
}

// --------------------
// Student Signup
// --------------------
async function performStudentSignup(name, email, password, confirmPassword) {
    try {
        const response = await fetch(`${API_BASE}/auth/student/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password, confirmPassword })
        });

        const data = await response.json();

        if (data.success) {
            showMessage('Account created successfully!', 'success');
            localStorage.setItem('userToken', data.token);
            localStorage.setItem('userData', JSON.stringify(data.user));

            setTimeout(() => {
                window.location.href = 'student-dashboard.html';
            }, 1500);
        } else {
            showMessage(data.error || 'Signup failed', 'error');
        }
    } catch (err) {
        console.error(err);
        showMessage('Signup failed', 'error');
    }
}

// --------------------
// Admin Login
// --------------------
async function performAdminLogin(email, password) {
    try {
        const response = await fetch(`${API_BASE}/auth/admin/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (data.success) {
            showMessage('Admin login successful', 'success');
            localStorage.setItem('userToken', data.token);
            localStorage.setItem('userData', JSON.stringify(data.user));

            setTimeout(() => {
                window.location.href = 'counselor-dashboard.html';
            }, 1200);
        } else {
            showMessage(data.error || 'Login failed', 'error');
        }
    } catch (err) {
        console.error(err);
        showMessage('Login failed', 'error');
    }
}

// --------------------
// Message Popup
// --------------------
function showMessage(message, type = 'info') {
    const old = document.querySelector('.message-popup');
    if (old) old.remove();

    const colors = {
        success: '#4CAF50',
        error: '#F44336',
        info: '#FF7518',
        warning: '#FF9800'
    };

    const div = document.createElement('div');
    div.className = 'message-popup';
    div.textContent = message;
    div.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${colors[type]};
        color: white;
        padding: 14px 20px;
        border-radius: 10px;
        font-weight: 600;
        z-index: 9999;
    `;

    document.body.appendChild(div);

    setTimeout(() => div.remove(), 3000);
}

// --------------------
// Form Bindings
// --------------------
document.addEventListener('DOMContentLoaded', () => {

    const signupForm = document.getElementById('studentSignupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', e => {
            e.preventDefault();

            const name = signupForm.querySelector('[placeholder="Full Name"]').value.trim();
            const email = signupForm.querySelector('[placeholder="Email Address"]').value.trim();
            const password = signupForm.querySelector('[placeholder="Password"]').value;
            const confirmPassword = signupForm.querySelector('[placeholder="Confirm Password"]').value;

            if (!email.endsWith('@cmrit.ac.in')) {
                return showMessage('Use @cmrit.ac.in email', 'error');
            }

            if (!isValidPassword(password)) {
                return showMessage('Weak password', 'error');
            }

            if (password !== confirmPassword) {
                return showMessage('Passwords do not match', 'error');
            }

            performStudentSignup(name, email, password, confirmPassword);
        });
    }

    const loginForm = document.getElementById('studentLoginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', e => {
            e.preventDefault();

            const email = loginForm.querySelector('input[type="email"]').value.trim();
            const password = loginForm.querySelector('input[type="password"]').value;

            performStudentLogin(email, password);
        });
    }
});
