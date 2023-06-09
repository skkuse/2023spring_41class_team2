export const getCookie = (name: string) => {
    const cookies = document.cookie.split(';');
    const cookie = cookies.find((cookie) =>
        cookie.trim().startsWith(`${name}=`)
    );

    return cookie?.split('=')[1];
};
