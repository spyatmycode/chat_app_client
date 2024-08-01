import { useMutation, useQuery } from "@tanstack/react-query"
import { ChatHeader, Chats, ChatTextBox } from "../../components/Chat/Chat"
import { ApiRequest } from "../../services/api.services"
import { SERVER_BASE_URL } from "../../config"
import { useParams } from "react-router-dom"
import { useAuthContext } from "../../providers/Auth.providers"
import { useEffect, useState } from "react"





export const Chat = ()=>{
    const {id} = useParams()
    const {accessToken} = useAuthContext();
    const [isLoading, setLoading] = useState(true)
    const {data, error} = useQuery({
        queryKey:['getChatsForConvos'],
        queryFn:()=> new ApiRequest(`${SERVER_BASE_URL}/api/chat/conversations/${id}`, "get").apiRequest({},{},accessToken)
    })

    const {mutate:sendMessage} = useMutation({
        mutationFn:(data:any)=> new ApiRequest(`${SERVER_BASE_URL}/api/chat/send/${id}`, "post").apiRequest(data,{}, accessToken),
        mutationKey:["fetch-chats-for-convos"]

    })




    const [currentChats, setCurrentChats] = useState<any>([]);

    useEffect(()=>{

        if(data){
            setCurrentChats(data?.data?.data?.chats)
            setLoading(false);
        }

    },[data]);

    const handleSend = async(message:string)=>{

        try {
            setCurrentChats([...currentChats, {message, receiverID:id, position:"end"}]);
            sendMessage({message:message})


        } catch (error) {
            throw error;
        }

    }

   
    

    if(isLoading) return <div>Loading...</div>


    return (
        <>
            <div className="w-full border fixed top-0 bottom-0">
                <ChatHeader data={data.data.data} />
                <Chats data={currentChats} error={error} />
                <ChatTextBox handleSend={handleSend} />

            </div>
        </>
    )
}