const Navbar = () => {
  return (
    <div className="fixed w-full max-w-screen-md top-4 py-2 z-40 bg-white px-2 rounded-full bg-zinc-900/80 ring-1 ring-gray-500/50 backdrop-blur-lg">
      <div className="w-full flex items-center justify-between">
        <div className="text-white">
          <img src="/logo.png" alt="" />
        </div>
        <div className="text-zinc-300 flex gap-4">
          <a href="/">Home</a>
          <a href="/">About</a>
          <a href="/">Contact</a>
        </div>
        <div className="flex gap-4">
          <button className="text-zinc-300">Sign In</button>
          <button className="bg-emerald-500 px-4 py-2 rounded-full">
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
