import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import moment from "moment";
import { AnimatePresence, motion } from "framer-motion";
import { LuCircleAlert, LuListCollapse } from "react-icons/lu";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import DashboardLayout from "../../layouts/DashboardLayout";
import RoleInfoHeader from "../../components/RoleInfoHeader";
import QuestionCard from "../../components/Cards/QuestionCard";
import AiResponsePreview from "../../components/AiResponsePreview";
import Drawer from "../../components/Drawer";
import SkeletonLoader from "../../components/SkeletonLoader";
import toast from "react-hot-toast";

const InterviewPrep = () => {
  const { sessionId } = useParams();

  const [sessionData, setSessionData] = useState(null);
  const [errMsg, setErrMsg] = useState(null);

  const [explanation, setExplanation] = useState(null);
  const [openLearnMoreDrawer, setOpenLearnMoreDrawer] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isUpdateLoader, setIsUpdateLoader] = useState(false);

  const fetchSessionDetailsById = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.SESSION.GET_ONE(sessionId)
      );

      if (response.data && response.data.session) {
        setSessionData(response.data.session);
      }
    } catch (err) {
      setErrMsg(
        // add toast here
        err.response?.data?.message ||
          err.message ||
          "Something Went Wrong! Please Try Again Later"
      );
    }
  };

  const toggleQuestionPinStatus = async (questionId) => {
    try {
      const response = await axiosInstance.post(
        API_PATHS.QUESTION.PIN(questionId)
      );

      if (response.data && response.data.question) {
        await fetchSessionDetailsById();
        console.log("successful");
      }
    } catch (err) {
      setErrMsg(
        err.response?.data?.message ||
          err.message ||
          "Something Went Wrong! Please Try Again Later"
      );
    }
  };

  const generateConceptExplanation = async (questionData) => {
    try {
      console.log(questionData);
      setOpenLearnMoreDrawer(true);
      setErrMsg("");
      setIsLoading(true);

      if (
        questionData.note &&
        questionData.note.title?.trim() !== "" &&
        questionData.note.explanation?.trim() !== ""
      ) {
        setExplanation(questionData.note);
        return;
      }

      const response = await axiosInstance.post(
        API_PATHS.AI.GENERATE_EXPLANATION,
        { question: questionData.question }
      );

      const note = response.data;

      // Set explanation on UI
      setExplanation(note);

      // Save note to DB
      await axiosInstance.post(
        API_PATHS.QUESTION.UPDATE_NOTE(questionData._id),
        { note }
      );

      setSessionData((prev) => ({
        ...prev,
        questions: prev.questions.map((q) =>
          q._id === questionData._id ? { ...q, note } : q
        ),
      }));

      console.log("Note saved successfully");
    } catch (error) {
      setExplanation(null);
      setErrMsg(
        error.response?.data?.message ||
          error.message ||
          "Something went wrong! Please try again later."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const uploadMoreQuestions = async () => {
    setIsUpdateLoader(true);
    try {
      const aiResponse = await axiosInstance.post(
        API_PATHS.AI.GENERATE_QUESTIONS,
        {
          role: sessionData?.role,
          experience: sessionData?.experience,
          topicsToFocus: sessionData?.topicsToFocus,
          numberOfQuestions: 10,
        }
      );

      const questions = aiResponse.data;

      await axiosInstance.post(API_PATHS.QUESTION.ADD_TO_SESSION, {
        sessionId: sessionData._id,
        questions,
      });

      await fetchSessionDetailsById();

      toast.success("Added 10 more questions!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add questions");
    } finally {
      setIsUpdateLoader(false);
    }
  };

  useEffect(() => {
    if (sessionId) {
      fetchSessionDetailsById();
    }

    return () => {};
  }, []);

  return (
    <DashboardLayout>
      <RoleInfoHeader
        role={sessionData?.role || ""}
        topicsToFocus={sessionData?.topicsToFocus || ""}
        experience={sessionData?.experience || ""}
        questions={sessionData?.questions?.length || "-"}
        description={sessionData?.description}
        lastUpdated={
          sessionData?.updatedAt
            ? moment(sessionData.updatedAt).format("Do MMM YYYY")
            : ""
        }
      />

      <div className="container px-6 mx-auto pt-4 pb-8 md:px-8">
        <h2 className="text-xl font-semibold text-black">Interview Q & A</h2>

        <div className="grid grid-cols-12 gap-4 pt-4">
          <div
            className={`col-span-12 ${
              openLearnMoreDrawer ? "md:col-span-7" : "md:col-span-8"
            }`}
          >
            <AnimatePresence initial={false}>
              {sessionData?.questions?.map((data) => (
                <motion.div
                  key={data._id}
                  layout={!isUpdateLoader} // 🔥 prevents lag during updates
                  layoutId={`question-${data._id}`} // stable for perfect animation
                  initial={{ opacity: 0, y: -2 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{
                    duration: 0.35,
                    type: "spring",
                    stiffness: 100,
                    damping: 15,
                  }}
                >
                  <QuestionCard
                    question={data?.question}
                    answer={data?.answer}
                    onLearnMore={() => generateConceptExplanation(data)}
                    isPinned={data.isPinned}
                    onTogglePin={() => toggleQuestionPinStatus(data._id)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        <button
          onClick={() => uploadMoreQuestions()}
          className={`mt-4 flex items-center py-3.5 px-4 rounded-lg gap-4 bg-black text-white m-auto md:ml-0 ${
            isUpdateLoader ? "" : "cursor-pointer hover:bg-linear-to-r hover:from-indigo-400 hover:bg-indigo-500"
          }`}
          disabled={isUpdateLoader}
        >
          {isUpdateLoader ? (
            <div className="questions-loader" />
          ) : (
            <LuListCollapse className="text-base md:text-lg" />
          )}
          <div className="tracking-wide font-medium text-xs md:text-sm">
            Load More
          </div>
        </button>

        <div>
          <Drawer
            isOpen={openLearnMoreDrawer}
            onClose={() => setOpenLearnMoreDrawer(false)}
            title={!isLoading && explanation?.title}
          >
            {errMsg && (
              <p className="flex gap-2 text-sm text-red-700 font-medium">
                <LuCircleAlert className="mt-1 " /> {errMsg}
              </p>
            )}

            {isLoading && <SkeletonLoader />}
            {!isLoading && explanation && (
              <AiResponsePreview content={explanation?.explanation} />
            )}
          </Drawer>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default InterviewPrep;
