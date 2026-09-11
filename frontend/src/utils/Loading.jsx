const PageLoader = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-slate-900">
    <div className="flex flex-col items-center space-y-4">
      <div className="relative flex items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-green-700 border-t-transparent" />
        <span className="absolute text-xl font-semibold text-green-700 font-serif">
          🌿
        </span>
      </div>
      <p className="text-sm font-semibold text-[#203527] dark:text-[#a3b899] uppercase tracking-widest animate-pulse font-serif">
        EcoJute
      </p>
    </div>
  </div>
);

export default PageLoader;