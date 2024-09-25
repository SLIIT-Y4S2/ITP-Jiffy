function AccessDeniedRedirect() {
    window.location.href = 'https://localhost:3000/error';
    return null;
}

export default AccessDeniedRedirect;