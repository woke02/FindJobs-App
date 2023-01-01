import jwt from 'jsonwebtoken'
import { UnAuthenticatedError } from "../errors/index.js"

const authenticateUser = async (req, res, next) => {
    const authHeader = req.headers.authorization
    console.log('authenticate user')
    if (!authHeader) {
        throw new UnAuthenticatedError('Authentication Invalid')
    }
    const token = authHeader.split(' ')[1]

    // //Getting token from cookies
    // const token = req.cookies.token
    // if (!token) {
    //     throw new UnAuthenticatedError('Authentication Invalid')
    // }
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.user = { userId: payload.userId }
        next()
    } catch (error) {
        throw new UnAuthenticatedError('Authentication Invalid')
    }

}

export default authenticateUser