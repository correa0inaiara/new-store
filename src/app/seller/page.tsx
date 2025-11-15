import { clerkClient } from "@clerk/nextjs/server"

export default async function Seller() {
    const client = await clerkClient()
    const users = (await client.users.getUserList()).data

    return (
        <>
            {users.map((user) => {
                return (
                    <div key={user.id}>
                        <p>
                            Usuário: {user.fullName}
                        </p>
                        <p>
                            Role: {user.publicMetadata.role as string}
                        </p>
                    </div>
                )
            })}
        </>
    )
}