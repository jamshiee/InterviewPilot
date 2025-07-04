import CreateSessionForm from '@/components/CreateSessionForm';
import DashboardLayout from '@/components/layouts/DashboardLayout'
import Modal from '@/components/Modal';
import SummaryCard from '@/components/SummaryCard';
import axiosInstance from '@/utils/axiosInstance';
import { CARD_BG } from '@/utils/data';
import moment from 'moment';
import { useEffect, useState } from 'react';
import {LuPlus} from 'react-icons/lu'
import { useNavigate } from 'react-router-dom'
import DeleteAlertContent from '../InterviewPrep/components/DeleteAlertContent';
import toast from 'react-hot-toast';


const Dashboard = () => {
  const navigate =useNavigate();

  const [openCreateModal,setOpenCreateModal] = useState(false)
  const [sessions,setSessions] = useState([])

  const [openDeleteAlert,setOpenDeleteAlert] = useState({
    open: false,
    data: null
  })

  const fetchAllSessions = async()=>{
    try {
      const res = await axiosInstance.get('/api/sessions/my-sessions')
      setSessions(res.data)
    } catch (error) {
      console.error("Error fetching session data: ",error)
    }
  }

  const deleteSession=async(sessionData)=>{
    try {
      await axiosInstance.delete(`/api/sessions/${sessionData?._id}`)

      toast.success("Session Deleted Successfully")
      setOpenDeleteAlert({
        open: false,
        data: null
      })
      fetchAllSessions()
    } catch (error) {
      console.error("Error Deleting Sessions: ",error)
    }
  }

  useEffect(()=>{
    fetchAllSessions()
  },[])
  return (
    <DashboardLayout>
      <div className=' container mx-auto pt-4 pb-4'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-7 pt-1 pb-6 px-4 md:px-8'>
          {sessions?.map((data,i)=>(
            <SummaryCard
              key={data?._id}
              colors={CARD_BG[i % CARD_BG.length]}
              role={data?.role || ""}
              topicsToFocus={data?.topicsToFocus || ""}
              experience={data?.experience || "-"}
              questions={data?.questions?.length || "-"}
              description ={data?.description || ""}
              lastUpdated={data?.updatedAt ? moment(data.updatedAt).format("Do MMM YYYY") : ""}
              onSelect={()=> navigate(`/interview-prep/${data?._id}`)}
              onDelete={()=> setOpenDeleteAlert({open: true,data})}
            />
          ))}
        </div>

        <button
        className='h-12 md:h-12 flex items-center justify-center gap-3 bg-linear-to-r from-[#FF9324] to-[#e99a4b] text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:bg-black hove:text-white transition-colors cursor-pointer hover:shadow-2xl hover:shadow-orange-300 fixed bottom-10 md:bottom-20 right-10 md:right-20 '
        onClick={()=> setOpenCreateModal(true)}
        >
          <LuPlus className='text-2xl text-white'/>
          Add New
        </button>
      </div>

      <Modal 
        isOpen={openCreateModal}
        onClose={()=>{
          setOpenCreateModal(false)
        }}
        hideHeader
      >
        <div>
          <CreateSessionForm/>
        </div>

      </Modal>

      <Modal 
        isOpen={openDeleteAlert?.open}
        onClose={()=> {
          setOpenDeleteAlert({open: false,data: null})
        }}
        title={"Delete Alert"}
      >
        <div className='w-[30vw]'>
          <DeleteAlertContent
            onDelete={()=>deleteSession(openDeleteAlert.data)}
          />
        </div>
      </Modal>
    </DashboardLayout>
  )
}
export default Dashboard