import { UserAuth } from "@//types/menu";
import { auth } from "@clerk/nextjs/server";

export async function getUserAuth (): Promise<UserAuth | unknown> {
    try {
        const { isAuthenticated, sessionClaims } = await auth()
        let user: UserAuth = {
            isAuthenticated: false,
            role: undefined
        }
        if (isAuthenticated) {
            user.isAuthenticated = true
            user.role = sessionClaims.metadata.role
        }
        return user
    } catch (error: unknown) {
        console.error('Deu erro ao identificar se o usuário está logado')
        return error
    }
}