import axios from "axios";
import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
import Share from "./Share";
import ShareDialog from "./ShareDialog";

const Marketplace = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const [shares, setShares] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = shares.slice(indexOfFirstItem, indexOfLastItem);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

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
      console.log(limitedShares);
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

  // 01. symbol
  // :
  // "IBM"
  // 02. open
  // :
  // "220.5500"
  // 03. high
  // :
  // "223.6600"
  // 04. low
  // :
  // "220.5500"
  // 05. price
  // :
  // "222.6500"
  // 06. volume
  // :
  // "3873578"
  // 07. latest trading day
  // :
  // "2025-01-03"
  // 08. previous close
  // :
  // "219.9400"
  // 09. change
  // :
  // "2.7100"
  // 10. change percent
  // :
  // "1.2322%"

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
        <a href="/" className="text-sm text-white font-semibold">
          Marketplace
        </a>
        <a href="/" className="text-sm text-white font-semibold">
          Profile
        </a>
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
      {isDialogOpen && (
        <ShareDialog item={selectedItem} onClose={closeDialog} />
      )}
    </div>
  );
};

export default Marketplace;
