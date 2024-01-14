import jwt from 'jsonwebtoken';

export const signJWT = (userId: string): string =>{
    const secretKey = process.env.JWT_SECRET_KEY;
    if (!secretKey){
        throw new Error("JWT secret key is not defined");
    }
    return jwt.sign({userId},secretKey,{expiresIn:'1h'});
}

export const verifyJWT = (token: string): string | jwt.JwtPayload => {
    const secretKey = process.env.JWT_SECRET_KEY;
    if (!secretKey) {
      throw new Error("JWT secret key is not defined");
    }
    return jwt.verify(token, secretKey);
  };