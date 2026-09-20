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
    </div>
  );
};

export default Loading;
