import {auth} from "@clerk/nextjs/server";
import {redirect} from "next/navigation";
import {newCompanionPermissions} from "@/lib/actions/companion.actions";
import Image from "next/image";
import Link from "next/link";
import CompanionForm from "@/components/CompanionsForm";

// Add this to force dynamic rendering
export const dynamic = 'force-dynamic'

const NewCompanion = async () => {
    const { userId } = await auth();
    if(!userId) redirect('/sign-in');

    const canCreateCompanion = await newCompanionPermissions();

    return (
        <main className="min-lg:w-1/2 min-md:w-2/3 items-center justify-center py-24  ">
            {canCreateCompanion ? (
                <article className="w-full gap-4 flex flex-col">
                    <h1>Companion Builder</h1>

                    <CompanionForm />
                </article>
                ) : (
                    <article className="companion-limit border px-8 py-4 rounded-4xl shadow-xl ">
                        <Image src="/images/limit.png" alt="Companion limit reached " width={260} height={230} className="drop-shadow-2xl" />
                        <div className="cta-badge">
                            Upgrade your plan
                        </div>
                        <h1>You’ve Reached Your Limit</h1>
                        <p>You’ve reached your companion limit. Upgrade to create more companions and premium features.</p>
                        <Link href="/subscription" className="btn-primary w-full justify-center" >
                            Upgrade My Plan
                        </Link>
                    </article>
                )}
        </main>
    )
}

export default NewCompanion