import axiosInstance from "@/utils/axiosInstance"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Input } from "./ui/input"
import { Label } from "./ui/label"

const CreateSessionForm = () => {
 
    const [role,setRole] = useState("")
    const [experience,setExperience] = useState("")
    const [topicsToFocus,setTopicsToFocus] = useState("")
    const [description,setDescription] = useState("")

    const [isLoading,setIsLoading]=useState(false)
    const [error,setError] = useState(null)

    const navigate= useNavigate()



    const handleCreateSession =async (e) =>{
        e.preventDefault()

        if(!role || !experience || !topicsToFocus) {
            setError("Please fill all the required fields.")
            return
        }

        setError("")
        setIsLoading(true)

        try {
            const aiRes = await axiosInstance.post('/api/ai/generate-questions',{
                role,
                experience,
                topicsToFocus,
                numberofQuestions: 10,
            })
            
            const generatedQuestions = aiRes.data

            const res = await axiosInstance.post('/api/sessions/create',{
                role,
                experience,
                topicsToFocus,
                description,
                questions: generatedQuestions
            })

            if (res.data?.session._id){
                navigate(`/interview-prep/${res.data?.session._id}`)
            }
        } catch (error) {
            if (error.response && error.response.data.message){
                setError(error.response.data.message)
            }else{
                setError("Something went wrong.Please Try Again.")
            }
        }finally{
            setIsLoading(false)
        }
    };

  return (
    <div className="w-[90vw] md:w-[35vw] p-7 flex flex-col justify-center ">
        <h3 className="text-lg font-semibold text-black">Start a New Interview Session</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-3">Fill out a few quick details and unlock your personalized set of interview questions!</p>

        <form onSubmit={handleCreateSession} className="flex flex-col gap-3">
            <Label>Target Role</Label>
            <Input 
                value={role}
                onChange={(e)=>setRole(e.target.value)}
                placeholder="(e.g., Frontend Developer, DevOps, etc.)"
                type={'text'}
            />
            <Label>Years of Experience</Label>
            <Input 
                value={experience}
                onChange={(e)=>setExperience(e.target.value)}
                placeholder="(e.g., 1 year, 3 years)"
                type={'number'}
            />
            <Label>Topics to Focus on</Label>
            <Input 
                value={topicsToFocus}
                onChange={(e)=>setTopicsToFocus(e.target.value)}
                placeholder="(Comma-seperated, e.g.,  React, AWS, Docker)"
                type={'text'}
            />
            <Label>Description</Label>
            <Input 
                value={description}
                onChange={(e)=>setDescription(e.target.value)}
                placeholder="(Any specific goals for this session)"
                type={'text'}
            />

            {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

            <button
                type="submit"
                className="btn-primary w-full mt-2"
                disabled={isLoading}
            > {isLoading ? "Creating.." : "Create Session"}</button>
        </form>
    </div>
  )
}
export default CreateSessionForm