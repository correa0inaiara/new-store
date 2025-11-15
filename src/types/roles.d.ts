export {}

export type Roles = "seller" | "customer"

declare global {
    interface CustomJwtSessionClaims {
        metadata: {
            role?: Roles
        }
    }
}