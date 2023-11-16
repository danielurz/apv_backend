import jwt from "jsonwebtoken";

export const generarJWT = id => {
    return jwt.sign({id},process.env.SECRET_JWT, {
        expiresIn: "7d"
    })
}