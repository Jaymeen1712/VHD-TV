const Loading = () => {
  return (
    <div className="flex flex-1 items-center justify-center gap-8 bg-neutral-900">
      {/* Logo Animation */}
      <div className="flex items-center justify-center text-7xl">
        <span className="font-bold text-primary ">V</span>
        <span className="ml-1 animate-pulse font-bold -tracking-widest text-white">
          HD
        </span>
      </div>
      <div className="flex items-center justify-center">
        {/* Loading Spinner */}
        <div className="relative">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-neutral-700 border-t-primary"></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
