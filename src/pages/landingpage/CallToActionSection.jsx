const CallToActionSection = () => {
    return (
      <div className="py-12 bg-gradient-to-r from-green-400 to-green-700 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">Ready to take control of your money?</h2>
        <p className="mb-6">Join hundreds of smart users who track and plan their financial future — stress-free.</p>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="bg-white text-green-700 px-6 py-3 rounded-full font-semibold hover:bg-gray-100"
        >
          Start Now
        </button>
      </div>
    );
  };
  

  export default CallToActionSection