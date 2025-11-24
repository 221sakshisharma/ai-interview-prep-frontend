import { LuPlus } from "react-icons/lu";
import { CARD_BG } from "../../utils/data.js";
import toast from "react-hot-toast";
import { useEffect, useState, useContext } from "react";
import axiosInstance from "../../utils/axiosInstance.js";
import DashboardLayout from "../../layouts/DashboardLayout.jsx";
import { API_PATHS } from "../../utils/apiPaths.js";
import { useNavigate } from "react-router-dom";
import SummaryCard from "../../components/Cards/SummaryCard.jsx";
import moment from "moment";
import Modal from "../../components/Modal.jsx";
import DeleteAlertContent from "./DeleteAlertContent.jsx";

import CreateSessionForm from "./CreateSessionForm.jsx";
const Dashboard = () => {
  const navigate = useNavigate();

  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [sessions, setSessions] = useState([]);

  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    open: false,
    data: null,
  });

  const fetchAllSessions = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.SESSION.GET_ALL);
      setSessions(response.data);
    } catch (err) {
      console.log(err.response?.data?.message || err.message);
    }
  };

  const deleteSession = async (sessionData) => {
    try {
      const response = await axiosInstance.delete(
        API_PATHS.SESSION.DELETE(sessionData._id)
      );
      await fetchAllSessions();
      setOpenDeleteAlert({
        open: false,
        data: null,
      });
    } catch (err) {
      console.log(err.response?.data?.message || err.message);
    }
  };

  useEffect(() => {
    fetchAllSessions();
  }, []);

  return (
    <DashboardLayout>
      <div className="container mx-auto p-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-7 pt-1 pb-6 px-4 md:px-0">
          {sessions?.map((data, index) => (
            <SummaryCard
              key={data?._id}
              colors={CARD_BG[index % CARD_BG.length]}
              role={data?.role || ""}
              topicsToFocus={data?.topicsToFocus || ""}
              experience={data?.experience || ""}
              questions={data?.questions?.length || "-"}
              description={data?.description || ""}
              lastUpdated={
                data?.updatedAt
                  ? moment(data.updatedAt).format("Do MMM YYYY")
                  : ""
              }
              onSelect={() => navigate(`/interview-prep/${data?._id}`)}
              onDelete={() => setOpenDeleteAlert({ open: true, data })}
            />
          ))}
        </div>

        <button
          className="text-white flex items-center justify-center gap-3 bg-linear-to-r from-indigo-400 to-indigo-500 text-sm font-semibold px-7 py-2.5 rounded-full transition-colors cursor-pointer hover:shadow-2xl hover:shadow-indigo-300 fixed bottom-10 right-10 "
          onClick={() => setOpenCreateModal(true)}
        >
          <LuPlus className="text-2xl text-white" />
          Add New
        </button>
      </div>

      <Modal
        isOpen={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
        hideHeader
      >
        <div>
          <CreateSessionForm />
        </div>
      </Modal>

      <Modal
        isOpen={openDeleteAlert.open}
        onClose={() =>
          setOpenDeleteAlert({
            open: false,
            data: null,
          })
        }
        title={"Delete Alert"}
      >
        <div className="w-[30vw]">
          <DeleteAlertContent
            content="Are you sure you want to delete this session details?"
            onDelete={() => {
              deleteSession(openDeleteAlert.data);
            }}
          />
        </div>
      </Modal>
    </DashboardLayout>
  );
};

export default Dashboard;
