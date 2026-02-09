// ================================
// CapyCares Website JavaScript
// ================================

// BACKEND BASE URL (FIXED)
const API_BASE = 'http://localhost:5000/api';

// --------------------
// Logout Function
// --------------------
function logout() {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userData');
    showMessage('Logged out successfully', 'success');
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1000);
}

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
// Admin Signup
// --------------------
async function performAdminSignup(name, email, password, confirmPassword) {
    try {
        const response = await fetch(`${API_BASE}/auth/admin/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password, confirmPassword })
        });

        const data = await response.json();

        if (data.success) {
            showMessage('Admin account created successfully!', 'success');
            localStorage.setItem('userToken', data.token);
            localStorage.setItem('userData', JSON.stringify(data.user));

            setTimeout(() => {
                window.location.href = 'counselor-dashboard.html';
            }, 1500);
        } else {
            showMessage(data.error || 'Admin signup failed', 'error');
        }
    } catch (err) {
        console.error(err);
        showMessage('Admin signup failed', 'error');
    }
}

// --------------------
// Form Bindings
// --------------------
document.addEventListener('DOMContentLoaded', () => {

    // Student Signup Form
    const studentSignupForm = document.getElementById('studentSignupForm');
    if (studentSignupForm) {
        studentSignupForm.addEventListener('submit', e => {
            e.preventDefault();

            const name = studentSignupForm.querySelector('[placeholder="Full Name"]').value.trim();
            const email = studentSignupForm.querySelector('[placeholder="Email Address"]').value.trim();
            const password = studentSignupForm.querySelector('[placeholder="Password"]').value;
            const confirmPassword = studentSignupForm.querySelector('[placeholder="Confirm Password"]').value;

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

    // Student Login Form
    const studentLoginForm = document.getElementById('studentLoginForm');
    if (studentLoginForm) {
        studentLoginForm.addEventListener('submit', e => {
            e.preventDefault();

            const email = studentLoginForm.querySelector('input[type="email"]').value.trim();
            const password = studentLoginForm.querySelector('input[type="password"]').value;

            performStudentLogin(email, password);
        });
    }

    // Admin Login Form
    const adminLoginForm = document.getElementById('adminLoginForm');
    if (adminLoginForm) {
        adminLoginForm.addEventListener('submit', e => {
            e.preventDefault();

            const email = adminLoginForm.querySelector('input[type="email"]').value.trim();
            const password = adminLoginForm.querySelector('input[type="password"]').value;

            if (!email.endsWith('@cmrit.ac.in')) {
                return showMessage('Use @cmrit.ac.in email', 'error');
            }

            performAdminLogin(email, password);
        });
    }

    // Admin Signup Form
    const adminSignupForm = document.getElementById('adminSignupForm');
    if (adminSignupForm) {
        adminSignupForm.addEventListener('submit', e => {
            e.preventDefault();

            const name = adminSignupForm.querySelector('[placeholder="Full Name"]').value.trim();
            const email = adminSignupForm.querySelector('[placeholder="Work Email"]').value.trim();
            const password = adminSignupForm.querySelector('[placeholder="Password"]').value;
            const confirmPassword = adminSignupForm.querySelector('[placeholder="Confirm Password"]').value;

            if (!email.endsWith('@cmrit.ac.in')) {
                return showMessage('Use @cmrit.ac.in email', 'error');
            }

            if (!isValidPassword(password)) {
                return showMessage('Weak password', 'error');
            }

            if (password !== confirmPassword) {
                return showMessage('Passwords do not match', 'error');
            }

            performAdminSignup(name, email, password, confirmPassword);
        });
    }
});
