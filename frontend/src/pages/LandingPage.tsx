import React from "react";
import Navbar from "../components/Navbar";
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import Content from '../components/Content';

const LandingPage: React.FC = () => {
  return (
    <div className="w-full min-h-screen">
      <Navbar />
      <Hero />



      {/* Clientes Section */}
      <section className="bg-black text-yellow-400 py-6 flex justify-around gap-8">
        <h3 className="font-bold">Cliente</h3>
        <h3 className="font-bold">Cliente</h3>
        <h3 className="font-bold">Cliente</h3>
      </section>
      <Content />

      <Footer />
    </div>
  );
};

export default LandingPage;
