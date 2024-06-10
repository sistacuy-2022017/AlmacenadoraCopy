
export const validarLogin = (req, res, next) => {
    let token = global.userToken;
    //let token = localStorage.getItem('userToken');
    if (!token) {
        throw new Error('No ha iniciado sesión');
    }

    next();

}