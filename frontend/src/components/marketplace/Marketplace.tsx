import axios from "axios";
import { useState, useEffect, FC } from "react";
import { FaSearch } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
import Share from "./Share";
import ShareDialog from "./ShareDialog";
import Modal from "../modals/modal";
import UserForm from "../modals/UserModal";
import mainService from "../../services/service";
import { useNavigate } from "react-router-dom";
import { PanelsProps } from "../../pages/MainPage";
import HistoryModal from "../modals/HistoryModal";

const Marketplace: FC<PanelsProps> = ({ userDetails, setUserDetails }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const naviagte = useNavigate();
  const itemsPerPage = 8;
  const [shares, setShares] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = shares.slice(indexOfFirstItem, indexOfLastItem);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isUserModalActive, setIsUserModalActive] = useState<boolean>(false);
  const [isHistoryModalActive, setIsHistoryModalActive] = useState(false);

  const onClose = () => {
    setIsUserModalActive(false);
  };

  const onHistoryClose = () => {
    setIsHistoryModalActive(false);
  };

  const logout = () => {
    sessionStorage.clear();
    naviagte("/");
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const data = await mainService.getUserData();

      if (JSON.stringify(data) !== JSON.stringify(userDetails)) {
        setUserDetails(data);
      }
    };

    fetchUserData();
  }, [userDetails]);

  useEffect(() => {
    getItems();
  }, []);

  const paginate = (pageNumber: number) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };

  const getItems = async () => {
    try {
      const token = sessionStorage.getItem("access_token");
      const res = await axios.get("http://localhost:8000/api/shares/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const limitedShares = res.data.slice(0, 30);
      setShares(limitedShares);
      setTotalPages(Math.ceil(limitedShares.length / itemsPerPage));
    } catch (error) {
      console.log(error);
    }
  };

  const openDialog = (item: any) => {
    setSelectedItem(item);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setSelectedItem(null);
    setIsDialogOpen(false);
  };

  return (
    <div className="w-full flex flex-col">
      <div className="flex w-full justify-end items-center px-16 gap-8 py-8 bg-zinc-800 ring-1 ring-inset ring-gray-500/40 relative">
        <img src="/logo.png" alt="logo" className="w-[120px] absolute left-8" />
        <div className="flex justify-center relative">
          <div className="">
            <input
              type="text"
              className="w-[500px] max-w-[95%] rounded-lg py-1 px-3 text-sm bg-zinc-700"
              placeholder="Search..."
            />
            <FaSearch className="absolute top-[6px] text-zinc-500 right-10" />
          </div>
        </div>
        <button
          className="text-sm text-white font-semibold"
          onClick={() => setIsUserModalActive(true)}
        >
          Profile
        </button>
        <button
          className="text-sm text-white font-semibold"
          onClick={() => setIsHistoryModalActive(true)}
        >
          History
        </button>
        <button
          className="text-sm text-white font-semibold"
          onClick={() => logout()}
        >
          Logout
        </button>
      </div>
      <div className="mt-4 bg-zinc-800 w-full h-full flex flex-col items-center py-16 ring-1 ring-inset ring-gray-500/40">
        <div className="flex w-full max-w-[95%] flex-col">
          <div className="w-full flex justify-between text-zinc-500 text-sm">
            <div>
              <span>NAME</span>
            </div>
            <div className="flex gap-8">
              <span className="text-center">TYPE</span>
              <span className="text-center">EXCHANGE</span>
              <span className="text-center">SYMBOL</span>
            </div>
          </div>
          <div className="flex flex-col">
            {currentItems.map((item: any, i) => (
              <Share
                key={i}
                asset_type={item.asset_type}
                exchange={item.exchange}
                name={item.name}
                symbol={item.symbol}
                containerClass="even:bg-zinc-900 rounded-xl"
                onClick={() => openDialog(item)}
              ></Share>
            ))}
          </div>
        </div>
        <div className="flex w-[800px] max-w-[95%] flex-col mt-12">
          <div className="w-full flex items-center justify-center">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className={`text-white py-2 px-2 bg-emerald-500 rounded-lg ${
                currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <FaChevronLeft />
            </button>

            <span className="px-4 flex space-x-2">
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index + 1}
                  onClick={() => paginate(index + 1)}
                  className={`px-3 py-1 rounded ${
                    currentPage === index + 1
                      ? "bg-emerald-500 text-white"
                      : "bg-zinc-700 text-zinc-300"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </span>
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`text-white py-2 px-2 bg-emerald-500 rounded-lg ${
                currentPage === totalPages
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      </div>
      {isHistoryModalActive && <HistoryModal onClose={onHistoryClose} />}
      {isDialogOpen && (
        <ShareDialog item={selectedItem} onClose={closeDialog} />
      )}
      {isUserModalActive && (
        <Modal isOpen={isUserModalActive} onClose={onClose}>
          <UserForm
            userDetails={userDetails}
            setUserDetails={setUserDetails}
            onClose={onClose}
          />
        </Modal>
      )}
    </div>
  );
};

export default Marketplace;
