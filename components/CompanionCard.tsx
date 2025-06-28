'use client';
import { addBookmark, removeBookmark } from "@/lib/actions/companion.actions";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useTransition } from "react";

interface CompanionCardProps {
    id: string;
    name: string;
    topic: string;
    subject: string;
    duration: number;
    color: string;
    bookmarked: boolean;
}

const CompanionCard = ({ id, name, topic, subject, duration, color, bookmarked }: CompanionCardProps) => {
    const pathname = usePathname();
    const [isBookmarked, setIsBookmarked] = useState(bookmarked);
    const [isPending, startTransition] = useTransition();

    const handleBookmark = async () => {
        // Prevent multiple clicks while processing
        if (isPending) return;

        startTransition(async () => {
            try {
                if (isBookmarked) {
                    await removeBookmark(id, pathname);
                    setIsBookmarked(false);
                } else {
                    await addBookmark(id, pathname);
                    setIsBookmarked(true);
                }
            } catch (error) {
                console.error('Bookmark action failed:', error);
                // Optionally show a toast or error message
            }
        });
    };

    return (
        <article className="companion-card">
            <div className="flex justify-between items-center">
                <div 
                    className="subject-badge text-slate-50 bg-gradient-to-tl from-pink-500 via-red-500 to-yellow-500"  
                    style={{ backgroundColor: color }}
                >
                    {subject}
                </div>
                <button 
                    className={`companion-bookmark ${isPending ? 'opacity-50 cursor-not-allowed' : ''}`} 
                    onClick={handleBookmark}
                    disabled={isPending}
                >
                    <Image
                        src={isBookmarked ? "/icons/bookmark-filled.svg" : "/icons/bookmark.svg"}
                        alt="bookmark"
                        width={12.5}
                        height={15}
                    />
                </button>
            </div>

            <h2 className="text-2xl font-bold">{name}</h2>
            <p className="text-sm">{topic}</p>
            <div className="flex items-center gap-2">
                <Image src="/icons/clock.svg" alt="duration" width={13.5} height={13.5} />
                <p className="text-sm">{duration} minutes</p>
            </div>

            <Link href={`/companions/${id}`} className="w-full">
                <button className="btn-primary w-full justify-center">
                    Launch Lesson
                </button>
            </Link>
        </article>
    )
}

export default CompanionCard