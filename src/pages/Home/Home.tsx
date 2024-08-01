import { useMutation, useQuery } from "@tanstack/react-query"
import { SERVER_BASE_URL } from "../../config"
import { ApiRequest } from "../../services/api.services"
import { useAuthContext } from "../../providers/Auth.providers"
import { Conversations, Header, Navigation, Search, Stories } from "../../components/Home/Home"
import { useState, useEffect } from "react"





export const Home = () => {

    const { accessToken, tokenDispatch } = useAuthContext()

    const [searchText, setSearchText] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const {data, error, isLoading}= useQuery({
        queryFn: () => new ApiRequest(`${SERVER_BASE_URL}/api/chat/conversations`, "get").apiRequest({}, {}, accessToken as string),
        queryKey: ["conversations"],
        enabled:true
    })
    const { mutate: logout } = useMutation({
        mutationFn: () => new ApiRequest(`${SERVER_BASE_URL}/api/auth/logout`, "get").apiRequest({}, {}, accessToken as string),
        mutationKey: ["logout"],
        onSuccess: (data) => {

            if (data) {
                tokenDispatch({ type: "LOGOUT" });
            }

        }
    })

    const {mutate:searchForUsers, isPending} = useMutation({
        mutationFn:(data:any)=>new ApiRequest(`${SERVER_BASE_URL}/api/users/search/${data.username}`, "get").apiRequest({}, {}, accessToken),
        onSuccess:(data)=>{
            if(data){
               
                setSearchResults(data.data.data)
            }
            
        },

        onError:(error:any)=>{
            console.error(error)
        }
    })

    
    useEffect(()=>{
        const handleSearch = async()=>{
            try {
                searchForUsers({username:searchText})
            } catch (error) {
                throw error
            }
        }

        if(searchText.length > 0){
            handleSearch()
        }

        
    }, [searchText])





    if(isLoading) return <div>Loading Conversations...</div>







    return (
        <>
            <div>
                <Header data={data?.data} />
                <div className="px-7 pb-5 border-b">
                    <Stories />
                </div>
                <div className="px-7 py-3">
                    <Search searchText={searchText} data={searchResults} setSearchText={setSearchText} loading={isPending} handleSearch={searchForUsers} />
                </div>
                <div className="h-full w-full">
                    
                    {error || !data?.data?.success ? <p className="text-center text-xs text-gray-500">No conversations for you, start one</p>:<Conversations data={data?.data?.data}  />}
                    <Navigation logout={logout} />
                </div>
            </div>

        </>
    )
}

