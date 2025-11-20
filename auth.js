document.addEventListener('DOMContentLoaded', function() {
    // Check URL for action parameter
    const urlParams = new URLSearchParams(window.location.search);
    const action = urlParams.get('action');
    
    // Get form elements
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const loginTab = document.getElementById('login-tab');
    const registerTab = document.getElementById('register-tab');
    
    // Show appropriate form based on URL or default to login
    if (action === 'register') {
        showRegisterForm();
    } else {
        showLoginForm();
    }
    
    // Tab click handlers
    if (loginTab && registerTab) {
        loginTab.addEventListener('click', showLoginForm);
        registerTab.addEventListener('click', showRegisterForm);
    }
    
    // Form submission handlers
    if (document.getElementById('loginForm')) {
        document.getElementById('loginForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            
            // Here you would typically send this to your backend
            console.log('Login attempt with:', email, password);
            
            // For demo purposes, just show an alert
            alert('Login functionality would be implemented here. For now, just pretend you logged in successfully!');
            
            // Redirect to homepage after "successful" login
            window.location.href = 'index.html';
        });
    }
    
    if (document.getElementById('registerForm')) {
        document.getElementById('registerForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const firstName = document.getElementById('register-firstname').value;
            const lastName = document.getElementById('register-lastname').value;
            const email = document.getElementById('register-email').value;
            const password = document.getElementById('register-password').value;
            const confirmPassword = document.getElementById('register-confirm-password').value;
            
            // Simple validation
            if (password !== confirmPassword) {
                alert('Passwords do not match!');
                return;
            }
            
            if (password.length < 8) {
                alert('Password must be at least 8 characters!');
                return;
            }
            
            // Here you would typically send this to your backend
            console.log('Registration attempt with:', { firstName, lastName, email, password });
            
            // For demo purposes, just show an alert
            alert('Account created successfully! (This is just a demo - no account was actually created)');
            
            // Redirect to homepage after "successful" registration
            window.location.href = 'index.html';
        });
    }
    
    function showLoginForm() {
        if (loginForm && registerForm && loginTab && registerTab) {
            loginForm.classList.remove('hidden');
            registerForm.classList.add('hidden');
            loginTab.classList.add('bg-blue-100', 'text-blue-600');
            loginTab.classList.remove('text-gray-700');
            registerTab.classList.remove('bg-blue-100', 'text-blue-600');
            registerTab.classList.add('text-gray-700');
        }
    }
    
    function showRegisterForm() {
        if (loginForm && registerForm && loginTab && registerTab) {
            registerForm.classList.remove('hidden');
            loginForm.classList.add('hidden');
            registerTab.classList.add('bg-blue-100', 'text-blue-600');
            registerTab.classList.remove('text-gray-700');
            loginTab.classList.remove('bg-blue-100', 'text-blue-600');
            loginTab.classList.add('text-gray-700');
        }
    }
});