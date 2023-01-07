import { ExtractJwt, Strategy as JWTStrategy } from "passport-jwt";
import { UserEntity } from "../entities/UserEntity";
import "dotenv";

export default new JWTStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET
  
}, 
async (payload, done) => {
    try {
        const user = await UserEntity.findOneBy({id: payload.id})
        if (user){
            return done(null, user)
        }else {
            done(null, false)
        }
    } catch (error) {
        return done(error)
    }
}
);
