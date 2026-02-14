import logoSquare from "../../assets/image/logoSquare.png";

const MainLoader = ({ loadingText}) => {
  return (
    <div className="fixed inset-0 z-50 h-lvh w-lvw flex items-center justify-center bg-white backdrop-blur-md">
      <div className="flex flex-col items-center space-y-8">

        <div className="relative w-[110px] h-[110px]">
          <div className="absolute inset-0 rounded-full border-[8px] border-yellow-400 border-t-transparent border-b-transparent animate-spin" />
          <div className="absolute inset-[-15px] rounded-full border-[8px] border-yellow-200 border-t-transparent border-b-transparent reverseSpin" />
        
          <div className="absolute inset-2 rounded-full bg-white flex items-center justify-center animate-scaleIn">
            <img
              className="w-4/5 h-4/5 object-contain z-30 bg-white rounded-full"
              src={logoSquare}
              alt="logo"
            />
          </div>
        </div>

        {/* Loading Text */}
        <p className="text-xl text-yellow-700 font-semibold animate-pulse tracking-wide">
          {loadingText||"Loading your experience..."}
        </p>
      </div>
    </div>
  );
};

export default MainLoader;
