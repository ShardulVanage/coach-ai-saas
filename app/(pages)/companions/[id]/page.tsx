import {getCompanion} from "@/lib/actions/companion.actions";
import {currentUser} from "@clerk/nextjs/server";
import {redirect} from "next/navigation";
import {getSubjectColor} from "@/lib/utils";
import Image from "next/image";
import CompanionComponent from "@/components/CompanionComponent";

interface CompanionSessionPageProps {
    params: Promise<{ id: string}>;
}

const CompanionSession = async ({ params }: CompanionSessionPageProps) => {
    const { id } = await params;
    const companion = await getCompanion(id);
    const user = await currentUser();

    const { name, subject, title, topic, duration } = companion;

    if(!user) redirect('/sign-in');
    if(!name) redirect('/companions')

    return (
        <main className="pt-24">
            <article className="flex rounded-2xl justify-between p-6 max-md:flex-col shadow-md bg-slate-50 ">
                <div className="flex items-center gap-6">
                    <div className="size-[72px] flex items-center justify-center rounded-lg max-md:hidden   shadow-lg">
                        <Image src={`/icons/${subject}.svg`} alt={subject} width={35} height={35} />
                    </div>

                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-4">
                            <p className="font-bold text-2xl">
                                {name}
                            </p>
                            <div className="subject-badge max-sm:hidden bg-gradient-to-tl from-pink-500 via-red-500 to-yellow-500">
                                {subject}
                            </div>
                        </div>
                        <p className="text-lg">{topic}</p>
                    </div>
                </div>
                <div className="items-start text-2xl max-md:hidden">
                    {duration} minutes
                </div>
            </article>

            <CompanionComponent
                {...companion}
                companionId={id}
                userName={user.firstName!}
                userImage={user.imageUrl!}
            />
        </main>
    )
}

export default CompanionSession