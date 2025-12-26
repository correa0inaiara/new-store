export {}

export type Roles = "admin" | "seller" | "customer"

declare global {
    interface CustomJwtSessionClaims {
        metadata: {
            role?: Roles
        }
    }
}