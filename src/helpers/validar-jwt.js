import jwt from 'jsonwebtoken';

export const validarJWT = (req, res, next) => {
    let token = req.headers['authorization'] || req.body.token || req.query.token
    console.log("Autorization: ", req.headers['authorization']);

    if (!token) {
        return res.status(401).send('A token is required for authentication')
    }

    try {
        token = token.replace(/^Bearer\s+"|"\s*$/g, '');

        const decoded = jwt.verify(token, process.env.SECRETORPRIVATEKEY)

        req.user = decoded.userId
    } catch (e) {
        console.log(e)
        return res.status(401).send('Invalid Token')
    }

    return next()
}