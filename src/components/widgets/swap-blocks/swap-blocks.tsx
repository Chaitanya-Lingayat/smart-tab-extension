import { useEffect, useRef } from 'react';
import { createSwapy } from 'swapy';
import TodoList from '~/components/widgets/todo-list';
import { Calendar } from '../../ui/calendar';
import { MagicCard } from '../../ui/magic-card';
import GoogleEvents from '../google-events';
import { LeetCodeWidget } from '../LeetCodeWidget';

export let swapy: any;

const sections = [
    {
        id: 'section-4',
        slot: 'qux',
        item: 'd',
        content: <div className="w-full overflow-x-hidden"><LeetCodeWidget /></div>
    },
    {
        id: 'section-3',
        slot: 'baz',
        item: 'c',
        content: <div className="w-full overflow-x-hidden"><TodoList /></div>
    },
    {
        id: 'section-1',
        slot: 'foo',
        item: 'a',
        content: (
            <div className="flex flex-col sm:flex-row justify-between w-full gap-2 sm:gap-4">
                <div className="w-full min-w-0 sm:w-[400px]">
                    <Calendar />
                </div>
                {/* <div className="w-full sm:flex-1">
                    <GoogleEvents />
                </div> */}
            </div>
        )
    },
    // {
    //     id: 'section-2',
    //     slot: 'bar',
    //     item: 'b',
    //     content: (
    //         <Marquee
    //             pauseOnHover
    //             className="top-10 [--duration:20s] [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] "
    //         >
    //             {files.map((f, idx) => (
    //                 <figure
    //                     key={idx}
    //                     className={cn(
    //                         "relative w-32 cursor-pointer overflow-hidden rounded-xl border p-4",
    //                         "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
    //                         "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
    //                         "transform-gpu blur-[1px] transition-all duration-300 ease-out hover:blur-none",
    //                     )}
    //                 >
    //                     <div className="flex flex-row items-center gap-2">
    //                         <div className="flex flex-col">
    //                             <figcaption className="text-sm font-medium dark:text-white ">
    //                                 {f.name}
    //                             </figcaption>
    //                         </div>
    //                     </div>
    //                     <blockquote className="mt-2 text-xs">{f.body}</blockquote>
    //                 </figure>
    //             ))}
    //         </Marquee>
    //     )
    // },


];

const SwapBlocks = () => {
    const swapBlocksRef = useRef<HTMLDivElement>(null);
    const isSwapyInitialized = useRef(false);

    useEffect(() => {
        if (swapBlocksRef.current && !isSwapyInitialized.current) {
            swapy = createSwapy(swapBlocksRef.current, {
                animation: 'dynamic'
            });
            swapy.enable(true);
            isSwapyInitialized.current = true;
        }
    }, []);

    return (
        <div ref={swapBlocksRef} className="w-full px-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
                {sections.map((section) => (
                    <div key={section.id} className={`${section.id} w-full`} data-swapy-slot={section.slot}>
                        <div className={`content-${section.item} w-full`} data-swapy-item={section.item}>
                            <MagicCard>
                                {section.content}
                            </MagicCard>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SwapBlocks;