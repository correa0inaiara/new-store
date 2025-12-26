import { SignedIn, SignedOut, SignInButton, SignOutButton, SignUpButton, UserButton } from "@clerk/nextjs"
import Link from "next/link"

export const Authentication = () => {
    return (
        <div className="flex items-center gap-4">
            <SignedOut>
                <SignInButton mode="modal">
                    <button className="m-2.5">Login</button>
                </SignInButton>
                {/* <SignUpButton>
                    <button className="btn">Sign Up</button>
                </SignUpButton> */}
            </SignedOut>
            <SignedIn>
                <UserButton />
                {/* <SignOutButton /> */}
            </SignedIn>
        </div>
    )
}