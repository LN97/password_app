'use client'
import { useUser } from "@clerk/nextjs";
import { SignInButton , SignOutButton, UserButton } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function UserAuthBar () {
    const { isSignedIn, user , isLoaded } = useUser();

    console.log( user )
    return (
      <div>
        { isSignedIn ? (
            <div>

                <UserButton />
{/*                 
                 <Avatar>
                    <AvatarImage src={ user.imageUrl } />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>

                <SignOutButton /> */}
            </div>
               
        ) : (
            <div>
                <SignInButton />
            </div>
        )}
       
      </div>
    );
}