interface Payload {
    exp: number;
    [key: string]: any;
}
export function isTokenExpired(token: Payload) {
    if (!token) return true;
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp < Date.now() / 1000;
}