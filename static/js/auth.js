document.addEventListener('DOMContentLoaded', function() {
    const loginBtn = document.getElementById('login-btn');
    const signupBtn = document.getElementById('signup-btn');
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');

    loginBtn.addEventListener('click', function() {
        loginBtn.classList.add('active');
        signupBtn.classList.remove('active');
        loginForm.classList.add('active');
        signupForm.classList.remove('active');
    });

    signupBtn.addEventListener('click', function() {
        signupBtn.classList.add('active');
        loginBtn.classList.remove('active');
        signupForm.classList.add('active');
        loginForm.classList.remove('active');
    });

    signupForm.addEventListener('submit', function(e) {
        const password = signupForm.querySelector('input[name="password"]').value;
        const confirmPassword = signupForm.querySelector('input[name="confirm_password"]').value;

        if (password !== confirmPassword) {
            e.preventDefault();
            alert('Passwords do not match!');
        }
    });
});
