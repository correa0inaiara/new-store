export {}

export type Roles = "admin" | "seller" | "customer"

export enum ROLES_ENUM {
    ADMIN,
    SELLER,
    CUSTOMER
}

declare global {
    interface CustomJwtSessionClaims {
        metadata: {
            role?: Roles
        }
    }
}