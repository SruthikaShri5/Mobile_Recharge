const Home = () => {
  return (
    <main className="container mx-auto px-4 py-16">
      <section className="text-center max-w-2xl mx-auto">
        <div className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
          </svg>
        </div>
        <h2 className="text-5xl font-bold gradient-text mb-6">Welcome to Mobile Recharge</h2>
        <p className="text-xl text-purple-200 mb-8">Quick and easy mobile recharge for all operators</p>
        <button className="btn-primary glow-purple">
          Get Started
        </button>
      </section>
    </main>
  );
};

export default Home;
