import { HiOutlineChevronLeft } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { IoIosSend } from "react-icons/io";
import { useState } from "react";

export const ChatHeader = ({ data }: any) => {
    return (
        <>
            <header className="h-14 flex items-center justify-between px-7 bg-white border-b shadow">
                <div className="flex items-center gap-5">
                    <span>
                        <Link to={"/"}>
                            <HiOutlineChevronLeft />
                        </Link>
                    </span>
                    <h1 className="font-semibold">
                        {data?.receiver?.username}
                    </h1>

                </div>
            </header>
        </>
    )
}


export const Chats = ({ data }: any) => {
    
    return (
        <>
            <div>
                <div className="w-full fixed top-14 bottom-14 py-5 overflow-auto no-scrollbar bg-gray-100">

                <div className="text-center w-full text-xs text-gray-7000 py-3">
                        <p>
                            All messages are in fact not encrypted. I can read your chat like mad.
                        </p>
                        <p>
                            - admin.
                        </p>

                    </div>




                    {
                        data?.map(({ message, position }: any, i: number) => {
                            const chatColor = position?.toLowerCase() === "end" ? "success" : ""
                            return (
                                <div key={i} className={`chat chat-${position} text-white`}>
                                    <div className={`chat-bubble text-sm text-gray-100 chat-bubble-${chatColor}`}>{message}</div>
                                </div>
                            )
                        })
                    }

                    


                </div>
            </div>
        </>
    )
}

export const ChatTextBox = ({ handleSend }: any) => {

    const [message, setMessage] = useState("");



    return (
        <>
            <div className="w-full  h-14 flex gap-5 absolute bottom-0 justify-start px-7 items-center ">

                <div className="w-full">
                    <input onChange={(e) => setMessage(e.target.value)} value={message} placeholder="Send a message" type="text" className="outline-none py-1 bg-gray-100 px-5 w-full placeholder:text-gray-300" />
                </div>
                <button onClick={() => { handleSend(message); setMessage("") }}>
                    <IoIosSend size={25} className="cursor-pointer" />
                </button>



            </div>
        </>
    )

}