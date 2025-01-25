import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed w-full max-w-screen-md top-4 py-2 z-40 bg-white px-2 rounded-full bg-zinc-900/80 ring-1 ring-gray-500/50 backdrop-blur-lg">
      <div className="w-full flex items-center justify-between">
        <div className="text-white">
          <img src="/logo.png" alt="" className="w-[150px]" />
        </div>
        <div className="flex gap-4">
          <button className="text-zinc-300" onClick={() => navigate("/login")}>
            Sign In
          </button>
          <button
            className="bg-emerald-500 px-4 py-2 rounded-full"
            onClick={() => navigate("/register")}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
