
import { LuPlus } from "react-icons/lu";
import { GrSearch } from "react-icons/gr";
import { LuUsers2 } from "react-icons/lu";
import { NavLink } from "react-router-dom";
import { CiLogout } from "react-icons/ci";
import date from "date-and-time"
import toast from "react-hot-toast";

export const stories = [
    {
        src: `https://avatar.iran.liara.run/public/girl?username=adeolaakeju`,
        userId: "nifemiakeju"
    },
    {
        src: `https://avatar.iran.liara.run/public/girl?username=adeolaakeju`,
        userId: "nifemiakeju"
    },
    {
        src: `https://avatar.iran.liara.run/public/girl?username=adeolaakeju`,
        userId: "nifemiakeju"
    },
    {
        src: `https://avatar.iran.liara.run/public/girl?username=adeolaakeju`,
        userId: "nifemiakeju"
    },
    {
        src: `https://avatar.iran.liara.run/public/girl?username=adeolaakeju`,
        userId: "nifemiakeju"
    },
    {
        src: `https://avatar.iran.liara.run/public/girl?username=adeolaakeju`,
        userId: "nifemiakeju"
    },
    {
        src: `https://avatar.iran.liara.run/public/girl?username=adeolaakeju`,
        userId: "nifemiakeju"
    },
    {
        src: `https://avatar.iran.liara.run/public/girl?username=adeolaakeju`,
        userId: "nifemiakeju"
    },
    {
        src: `https://avatar.iran.liara.run/public/girl?username=adeolaakeju`,
        userId: "nifemiakeju"
    },
    {
        src: `https://avatar.iran.liara.run/public/girl?username=adeolaakeju`,
        userId: "nifemiakeju"
    },
    {
        src: `https://avatar.iran.liara.run/public/girl?username=adeolaakeju`,
        userId: "nifemiakeju"
    },

    {
        src: `https://avatar.iran.liara.run/public/girl?username=adeolaakeju`,
        userId: "nifemiakeju"
    },
    {
        src: `https://avatar.iran.liara.run/public/girl?username=adeolaakeju`,
        userId: "nifemiakeju"
    },
    {
        src: `https://avatar.iran.liara.run/public/girl?username=adeolaakeju`,
        userId: "nifemiakeju"
    },
    {
        src: `https://avatar.iran.liara.run/public/girl?username=adeolaakeju`,
        userId: "nifemiakeju"
    },
    {
        src: `https://avatar.iran.liara.run/public/girl?username=adeolaakeju`,
        userId: "nifemiakeju"
    },
    {
        src: `https://avatar.iran.liara.run/public/girl?username=adeolaakeju`,
        userId: "nifemiakeju"
    },
    {
        src: `https://avatar.iran.liara.run/public/girl?username=adeolaakeju`,
        userId: "nifemiakeju"
    },
    {
        src: `https://avatar.iran.liara.run/public/girl?username=adeolaakeju`,
        userId: "nifemiakeju"
    },

]



export const AddStoryButton = () => {
    return (
        <>
            <button onClick={()=>toast.error("Stories coming soon...")} className="h-10 w-10 border border-gray-500 flex-shrink-0   rounded-md flex justify-center items-center">
                <span className="w-[90%] rounded-md bg-gray-100 h-[90%] flex justify-center items-center">
                    <LuPlus className="text-gray-500" />
                </span>
            </button>
        </>
    )
}

export const Story = ({ imgSrc }: { imgSrc: string }) => {
    return (<>
        <div className="h-10 w-10 border border-[#DE6666]  rounded-md flex justify-center items-center" onClick={()=>toast.error("Stories coming soon...")}>
            <span className="w-9 rounded-md bg-gray-100 h-9 flex justify-center items-center">
                <img src={imgSrc || `https://avatar.iran.liara.run/public/girl?username=adeolaakeju`} className="w-[90%] rounded-md bg-gray-100 h-[90%] flex justify-center items-center" />
            </span>

            {/* <LuPlus className="text-gray-500" /> */}

        </div>
    </>)
}


export const Header = ({data}:any) => {

    
    return (
        <>
            <div className="w-full flex px-7 py-5 items-center justify-between">
                <h1 className="font-bold ">{data?.user?.username}</h1>

                <button onClick={()=>toast.error("Profile coming soon...")}>
                   <img className="w-9 h-9 object-cover rounded-full" src={data?.user?.profilePicture} alt="" />
                </button>

            </div>
        </>
    )
}


export const Stories = () => {
    return (
        <>
            <div className="w-full flex items-center gap-5 overflow-auto">
                <span>
                    <AddStoryButton />
                </span>

                <div className="flex gap-2 no-scrollbar items-center w-screen overflow-auto scroll">
                    {
                        stories.map(({ src }) => {
                            return <Story imgSrc={src} />
                        })
                    }
                </div>
            </div>
        </>
    )
}


export const Search = ({loading, searchText, setSearchText, data  }:any) => {
   



    return (
        <>
            <div>
                <div className="w-full px-5 py-2 relative flex items-center gap-2 bg-[#F7F7FC]">
                    <GrSearch className="text-gray-600" />
                    <input value={searchText} onChange={(e)=>setSearchText(e.target.value)} placeholder="Search" type="text" className="text-gray-600 bg-transparent w-full outline-none placeholder:text-gray-600" />
                </div>
                <div>
                    {loading && `Searching for ${searchText}`}
                </div>
                {searchText && <div className="w-full relative z-30 bg-white py-5">
                   <p className="text-sm">
                        Search results for "{searchText}"
                    </p>
                    {
                        !!searchText && data?.length > 0 && data?.map((receiver:any)=>{

                            return <Conversation type="userSearch" receiver={receiver} />

                        })
                    }
                </div>}

            </div>
        </>
    )
}



const Conversation = ({lastMessage, receiver, type="conversation"}:any) => {



    const messageTime = date.format(new Date(lastMessage?.createdAt),"hh:mm A") || ""

    
    
    return (
        <>
            <NavLink to={`/chat/${receiver._id}`}>
                <div className="w-full flex items-center gap-2 px-7 py-3 cursor-pointer hover:bg-gray-100">
                    <div className="w-12 h-12 rounded-lg flex-shrink-0 relative flex justify-center items-center  bg-slate-200">
                        {<img className="w-full absolute object-cover h-full" src={receiver.profilePicture || stories[0].src} alt="" />}
                    </div>
                    <div className="flex w-full flex-col gap-1 items-start">
                        <div className="flex w-full justify-between">
                            <h1 className="font-semibold text-sm">{receiver.username}</h1>
                            {type==="conversation" && <h6 className="text-xs text-gray-300">{messageTime}</h6>}
                        </div>
                       { type==="conversation" && <p className="text-xs text-gray-500">{`${lastMessage?.message}`.slice(0, 50) + `...`}</p>}
                    </div>
                </div>
            </NavLink>
        </>
    )
}


export const Conversations = ({data}:any) => {
   
    
    return (
        <>
            <div className="flex w-full overflow-y-auto flex-col fixed top-[190px] right-0 bottom-20 no-scrollbar">
                {
                    data?.map(({receiver, lastMessage}:any)=>{

                        return  <Conversation lastMessage={lastMessage} receiver={receiver} />

                    })
                }
                
            </div>
           
        </>
    )
}

export const Navigation = ({logout}:any) => {

    
    return (
        <>
            <div className="w-full flex items-center justify-between px-10 py-7 fixed bottom-0 bg-white border-0 shadow">
                <div>
                    <NavLink to={"#"} onClick={()=>toast.error("Groups coming soon...")}>
                        <LuUsers2 />
                    </NavLink>
                </div>
                <div>
                    <h1>
                        Conversations
                    </h1>
                </div>
                <div className="flex items-center">
                    <button onClick={logout}>
                    <CiLogout />
                    </button>
                </div>

            </div>
        </>
    )
}


