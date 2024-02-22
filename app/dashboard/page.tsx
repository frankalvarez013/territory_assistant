import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { redirect } from "next/navigation";
export default async function Page(){
    const session = await getServerSession(authOptions);
    if(!session){
        redirect('/api/auth/signin');
    }
    return <main>
        Dashboard Page
        <h4>{session.user && session.user.name}</h4>
        </main>
}