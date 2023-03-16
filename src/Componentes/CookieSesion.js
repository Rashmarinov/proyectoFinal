function setSessionCookie(user) {
    const expirationTime = 3600; // duración de la cookie en segundos
    const cookieValue = JSON.stringify(user);
    const date = new Date();
    date.setTime(date.getTime() + (expirationTime * 1000));
    const expires = "; expires=" + date.toUTCString();
    document.cookie = `user_session=${cookieValue}${expires}; path=/`;
}

export default setSessionCookie;