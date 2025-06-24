import DashboardLayout from "@/components/layouts/DashboardLayout";
import SpinnerLoader from "@/components/SpinnerLoader";
import axiosInstance from "@/utils/axiosInstance";
import { AnimatePresence, motion } from "framer-motion";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { LuListCollapse } from "react-icons/lu";
import { useParams } from "react-router-dom";
import AnswerDrawer from "./components/AnswerDrawer";
import QuestionCard from "./components/QuestionCard";
import RoleInfoHeader from "./components/RoleInfoHeader";

const InterviewPrep = () => {
  const { sessionId } = useParams();

  const [sessionData, setSessionData] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [openAnswerCard, setOpenAnswerCard] = useState(false);
  const [answer, setAnswer] = useState(null);
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(null);

  const didChange = useRef(null);
  const [isUpdateLoader, setIsUpdateLoader] = useState(false);

  const toggleAnswer = (ans, index) => {
    if (answer === null || didChange.current !== ans) {
      setAnswer(ans);
      setOpenAnswerCard(true);
      didChange.current = ans;
      setSelectedQuestionIndex(index);
    } else if (didChange.current === ans) {
      setOpenAnswerCard((prev) => !prev);
      setSelectedQuestionIndex((prev) => (openAnswerCard ? null : index));
    }
  };

  const fetchSessionDetails = async () => {
    try {
      const res = await axiosInstance.get(`/api/sessions/${sessionId}`);
      if (res.data) {
        setSessionData(res.data.session);
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const uploadMoreQuestions = async () => {
    try {
      setIsUpdateLoader(true);

      const aiRes = await axiosInstance.post("/api/ai/generate-questions", {
        role: sessionData?.role,
        experience: sessionData?.experience,
        topicsToFocus: sessionData?.topicsToFocus,
        numberofQuestions: 10,
      });

      const generatedQuestions = aiRes.data;

      const res = await axiosInstance.post("/api/questions/add", {
        sessionId,
        questions: generatedQuestions,
      });

      if (res.data) {
        toast.success("Added More Q&A");
        fetchSessionDetails();
      }
    } catch (error) {
      if (error.message && error.response?.data?.message) {
        console.log(error.response.data.message);
      } else {
        setErrorMsg("Something went wrong. Please try again.");
      }
    } finally {
      setIsUpdateLoader(false);
    }
  };

  useEffect(() => {
    if (sessionId) {
      fetchSessionDetails();
    }
  }, [sessionId]);

  return (
    <DashboardLayout>
      <RoleInfoHeader
        role={sessionData?.role || ""}
        topicsToFocus={sessionData?.topicsToFocus || ""}
        experience={sessionData?.experience || "-"}
        questions={sessionData?.questions?.length || "-"}
        description={sessionData?.description || ""}
        lastUpdated={
          sessionData?.updatedAt
            ? moment(sessionData.updatedAt).format("Do MMM YYYY")
            : ""
        }
      />

      <div className="container mx-auto pt-1 pb-4 md:px-0 ">
        <div className="grid grid-cols-12 gap-4 mt-5 mb-10">
          <div className={`${openAnswerCard ? "md:col-span-7" : "md:col-span-8"}`}>
            <h2 className="text-lg p-2 font-semibold color-black">Interview Q & A</h2>

            <AnimatePresence>
              {sessionData?.questions?.map((data, index) => (
                <motion.div
                  key={data._id || index}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{
                    duration: 0.5,
                    type: "spring",
                    stiffness: 100,
                    delay: index * 0.1,
                    damping: 15,
                  }}
                  layout
                  layoutId={`questions-${data._id || index}`}
                >
                  <QuestionCard
                    question={data?.question}
                    setAnswer={() => toggleAnswer(data?.answer, index)}
                    isSelected={selectedQuestionIndex === index}
                  />

                  {sessionData?.questions?.length === index + 1 && (
                    <div className="flex items-center justify-center mt-5">
                      <button
                        className="flex items-center gap-3 text-sm text-white font-medium bg-black px-5 py-2 mr-2 rounded cursor-pointer"
                        disabled={isUpdateLoader}
                        onClick={uploadMoreQuestions}
                      >
                        {isUpdateLoader ? <SpinnerLoader /> : <LuListCollapse className="text-lg" />}
                        Load More
                      </button>
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="col-span-5">
            {openAnswerCard && <AnswerDrawer answer={answer} />}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default InterviewPrep;
