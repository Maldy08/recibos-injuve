import { DefaultSession, DefaultUser } from "next-auth"


interface IUser extends DefaultUser {

    token? :string;
    empleado?: number; // Corresponde a EMPLEADO
    name?: string; // Corresponde a NOMBRE
    appat?: string; // Corresponde a APPAT
    apmat?: string; // Corresponde a APMAT
    rfc?: string; // Corresponde a RFC
    curp?: string; // Corresponde a CURP


}

declare module "next-auth" {
    interface User extends IUser {}
    interface Session {
        user? : User;
    }
}

declare module "next-auth/jwt" {
    interface JWT extends IUser {}
}