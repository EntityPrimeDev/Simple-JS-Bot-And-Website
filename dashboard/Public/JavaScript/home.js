const logOut = document.querySelector('.logrout');

logOut.onclick = () => {
    sessionStorage.clear();
    location.href="/"
}
