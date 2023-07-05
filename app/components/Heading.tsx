'use client'

interface HedingProps {
    title:string;
    subTitle?: string;
    center?: boolean;
}
const Heading: React.FC<HedingProps> = ({
    title,
    subTitle,
    center
}) => {
    return (
        <div className={center ? 'text-center' : 'text-start'}>
            <div className="text-2xl font-bold">
                {title}
                <div className="font-light text-neutral-500 mt-2 text-xl">
                    {subTitle}
                </div>
            </div>

        </div>
    )
}
export default Heading