export interface IUser {
    name: string;
    id: number;
    createdAt: Date;
    updatedAt: Date;
    email: string;
    password: string;
    phone: string | null;
    picture: string | null;
    role: "SUPER_ADMIN" | "ADMIN";
    isActive: "ACTIVE" | "INACTIVE" | "BLOCKED";
    isVerified: boolean;
    isDeleted: boolean;
}