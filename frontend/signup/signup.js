const API_URL = 'http://localhost:5000/api/routes';
document.getElementById('signupForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch(`${API_URL}/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });

        const result = await response.json();
        const responseMessage = document.getElementById('responseMessage');

        if (response.ok) {
            responseMessage.innerText = result.msg;
            responseMessage.style.color = 'green';
            alert("User Registered Successfully");
            document.getElementById('signupForm').reset();
        } else {
            responseMessage.innerText = result.message;
            responseMessage.style.color = 'red';
            alert(result.message);  // Updated alert to use the error message
            document.getElementById('signupForm').reset();
        }
    } catch (error) {
        document.getElementById('responseMessage').innerText = 'Failed to connect to the server.';
        alert("Server Error");
        document.getElementById('signupForm').reset();
    }
});

document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('loginemail').value;
    const password = document.getElementById('loginpassword').value;

    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const result = await response.json();
        const responseMessage = document.getElementById('responseMessage');

        if (response.ok) {
            // Save the token to localStorage
            localStorage.setItem('token', result.token);
            alert("User Logged In Successfully");
            document.getElementById('loginForm').reset();
        } else {
            alert(result.message);  // Show the error message if login fails
            document.getElementById('loginForm').reset();
        }
    } catch (error) {
        alert("Server Error");
        document.getElementById('loginForm').reset();
    }
});