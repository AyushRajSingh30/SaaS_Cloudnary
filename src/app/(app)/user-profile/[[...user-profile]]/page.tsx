import { UserProfile } from '@clerk/nextjs'

const UserProfilePage = () => {

    return (
        <div className='w-full h-full flex justify-center items-center'>
            <UserProfile path="/user-profile" />
        </div>
    )
}


export default UserProfilePage