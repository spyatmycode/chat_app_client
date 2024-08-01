import { Link, useNavigate } from "react-router-dom"
import { multiStepForm } from "../../../helpers/multistepform.helpers"
import { OnboardData, useOnboardContext } from "../../../providers/Onboarding.providers"
import { SERVER_BASE_URL } from "../../../config"
import toast from "react-hot-toast"
import { useMutation } from "@tanstack/react-query"
import { FC, useEffect, useState } from "react"
import { FaSpinner } from "react-icons/fa"
import { ApiRequest } from "../../../services/api.services"
import { useAuthContext } from "../../../providers/Auth.providers"



export const StepOne: FC = () => {
    const { handleInputChange, onboardData } = useOnboardContext()
    return (
        <>
            <label className="form-control w-full">
                <div className="label">
                    <span className="label-text">Username</span>
                </div>
                <input name="username" onChange={handleInputChange} required type="text" placeholder="Enter username" className="flex items-center w-full px-5 py-4 mb-5 mr-2 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl border" value={onboardData.username} />

            </label>
            <label className="form-control w-full">
                <div className="label">
                    <span className="label-text">Gender</span>
                </div>
                <select name="gender" onChange={handleInputChange} value={onboardData.gender} className="select select-bordered w-full  flex items-center  px-5  mb-5 mr-2 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl border">
                    <option selected>Gender</option>
                    <option value={"male"}>Male</option>
                    <option value={"female"}>Female</option>
                </select>
                {/*  <input onChange={handleInputChange} value={onboardData.gender} name="gender" required type="textr" placeholder="Select gender" className="flex items-center w-full px-5 py-4 mb-5 mr-2 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl border" />
 */}
            </label>
            <label className="form-control w-full">
                <div className="label">
                    <span className="label-text">Phone number</span>
                </div>
                <input onChange={handleInputChange} name="phoneNumber" value={onboardData.phoneNumber} required type="text" placeholder="Enter phone number" className="flex items-center w-full px-5 py-4 mb-5 mr-2 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl border" />

            </label>
        </>
    )
}


export const StepTwo: FC = () => {
    const { handleInputChange, onboardData } = useOnboardContext()
    return (
        <>
            <label className="form-control w-full">
                <div className="label">
                    <span className="label-text">Password</span>
                </div>
                <input name="password" onChange={handleInputChange} value={onboardData.password} required type="password" placeholder="Enter a strong password" className="flex items-center w-full px-5 py-4 mb-5 mr-2 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl border" />

            </label>
            <label className="form-control w-full">
                <div className="label">
                    <span className="label-text">Confirm password</span>
                </div>
                <input onChange={handleInputChange} name="confirmPassword" value={onboardData.confirmPassword} required type="password" placeholder="Repeat the same password" className="flex items-center w-full px-5 py-4 mb-5 mr-2 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl border" />

            </label>

        </>
    )
}

export const CompleteProfile = () => {

    const navigate = useNavigate()

    const stepsHeader = [
        {
            text: "Basic info"
        },
        {
            text: "Account security"
        }
    ]

    const { currentStepIndex, next, previous, canMoveBackward, canMoveFoward, steps } = multiStepForm([
        <StepOne />, <StepTwo />
    ])

    const { onboardData, setOnboardData } = useOnboardContext();

    const {accessToken} = useAuthContext()

    const [loading, setLoading] = useState(true)

    const {mutate:checkForCompletedProfile, isError} = useMutation({
        mutationKey:['check-complete-profile'],
        mutationFn:()=> new ApiRequest(`${SERVER_BASE_URL}/api/auth/complete-profile`,"get").apiRequest({},{},accessToken),
        onSuccess:(data)=>{
            if(data){
                setLoading(false)
               toast.success(`${data?.data.msg}`);
               
            }
        },
        onError:(error:any)=>{
            setLoading(false)
            toast.error(error?.response?.data);
            navigate("/login")
            window.location.reload()

        }
        
    });


    useEffect(()=>{


        const checkingForCompletedProfile = async()=>{
            try {
                checkForCompletedProfile()
            } catch (error) {
                console.error(error)
                setLoading(false)
            }
        }

        checkingForCompletedProfile()

    },[]);




    const { mutate: onboardMutation, isPending }: any = useMutation({
        mutationFn: (data: OnboardData) =>
           new ApiRequest(`${SERVER_BASE_URL}/api/auth/complete-profile`,"post").apiRequest(data,{},accessToken),
        mutationKey: ["onboard"],
        onError: (error: any) => {
            
            toast.error(error.response?.data?.msg || error.message);
        },
        onSuccess: (data: any) => {

            if(!data) return
            
            setOnboardData({});
            toast.success(data.data.msg);
            navigate("/");
        },


    }

    )



    const handleSubmit = async (e: any) => {
        e.preventDefault()
        await onboardMutation({ ...onboardData })

    }



    if(loading){
        return <div>Loading...</div>
    }

    if(isError){
        
    }








    return (
        <>
            <div className="w-full overflow-y-auto  flex flex-col fixed top-0 bottom-0 items-center py-12">
                <form className="flex flex-col items-center p-10 lg:border rounded-sm" onSubmit={handleSubmit} >

                    <h3 className="mb-3 text-4xl font-extrabold text-dark-grey-900">Complete profile</h3>

                    <ul className="steps py-4">
                        {
                            stepsHeader.map(({ text }, i) => (
                                <li key={i} className={`step ${((currentStepIndex) >= i) && "step-primary"}`}>
                                    {text}
                                </li>

                            ))
                        }

                    </ul>

                    <div className="w-full  flex flex-col gap-2">

                        <div className="flex items-center flex-col gap-1">
                            {steps[currentStepIndex]}
                        </div>
                        <div className="w-full flex justify-between flex-col-reverse lg:flex-row">
                            {canMoveBackward && <button onClick={previous} type="button" className="w-full btn text-center btn-neutral px-6  mb-5 text-sm font-bold leading-none text-white transition duration-300 md:w-96 rounded-2xl hover:bg-purple-blue-600 focus:ring-4 focus:ring-purple-blue-100 bg-purple-blue-500">Back</button>}

                            {canMoveFoward && <button onClick={next} type="button" className="w-full btn text-center btn-primary px-6  mb-5 text-sm font-bold leading-none text-white transition duration-300 md:w-96 rounded-2xl hover:bg-purple-blue-600 focus:ring-4 focus:ring-purple-blue-100 bg-purple-blue-500">Next</button>}
                            {

                                !canMoveFoward && <button disabled={isPending} onClick={next} type="submit" className="w-full btn text-center btn-primary px-6  mb-5 text-sm font-bold leading-none text-white transition duration-300 md:w-96 rounded-2xl hover:bg-purple-blue-600 focus:ring-4 focus:ring-purple-blue-100 bg-purple-blue-500">{isPending ? <FaSpinner className="animate-spin" color="white" /> : "Complete"}</button>
                            }
                        </div>
                    </div>
                    <p className="text-sm leading-relaxed text-grey-900">Already registered? <Link to={"/login"} className="font-bold text-grey-700">Log in</Link></p>
                </form>

            </div>
        </>
    )
}