'use client'

import useCountries from "@/app/Hooks/useCountries";
import { SafeUser } from "@/app/types";
import Heading from "../Heading";
import Image from "next/image";
import HeartButton from "../HeartButton";

interface ListingHeadProps{
    title:string;
    locationValue:string;
    imageSrc:string;
    id:string;
    currentUser?:SafeUser | null;

}


const ListingHead:React.FC<ListingHeadProps> = ({
    title,
    locationValue,
    imageSrc,
    id,
    currentUser
})  => {
    const {getByValue} = useCountries();
    const location = getByValue(locationValue);

    return (
        <>
        <Heading
            title={title}
            subTitle={`${location?.region}, ${location?.label}`}
        />

        <div className="w-full h-[60vh] overflow-hidden rounded-xl relative">
            <Image 
            alt = "Image"
            src={imageSrc}
            fill
            className="object-cover w-full"
            />
            <div className="absolute top-4 right-3">
                <HeartButton
                listingId={id}
                currentUser={currentUser}
                />
            </div>

        </div>

        </>
    )
}

export default ListingHead;