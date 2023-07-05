import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";

import getCurrentUser from "../actions/getCurrentUser";

import PropertiesClient from "./PropertiesClient";
import getListing from "../actions/getListing";

const propertiesPage = async () => {
    const currentUser = await getCurrentUser();

    if(!currentUser){
        return(
            <ClientOnly>
                <EmptyState 
                title="Unauthorized"
                subTitle="Please login"
                />

            </ClientOnly>
        )
    }

    const listings = await getListing({
        userId: currentUser.id
    })

    if(listings.length ===0) {
        return(
            <ClientOnly>
                <EmptyState 
                title="No properties found"
                subTitle="Looks like you heve no properties."
                />
            </ClientOnly>
        )
    }

    return (
        <ClientOnly>
            <PropertiesClient 
            listings = {listings}
            currentUser = {currentUser}
            
            />
        </ClientOnly>
    )

}

export default propertiesPage;