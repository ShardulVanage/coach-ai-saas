import { PlusCircleIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Cta = () => {
    return (
        <section className="cta-section">
            <div className="cta-badge bg-gradient-to-tl from-pink-500 via-red-500 to-yellow-500 text-white">Start learning your way.</div>
            <h2 className="text-3xl font-bold">
                Build and Personalize Learning Companion
            </h2>
            <p>Pick a name, subject, voice, & personality — and start learning through voice conversations that feel natural and fun.</p>
            <Image src="images/cta.svg" alt="cta" width={362} height={232} />
            <button className="btn-primary bg-neutral-100 text-black">
                <PlusCircleIcon/>
                <Link href="/companions/new">
                    <p>Build a New Companion</p>
                </Link>
            </button>
        </section>
    )
}
export default Cta