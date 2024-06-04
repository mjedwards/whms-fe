export function logout(): void {
    localStorage.removeItem('jwtToken');
    window.location.href = '/signIn';
}