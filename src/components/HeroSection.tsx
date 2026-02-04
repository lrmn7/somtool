"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import PixelatedButton from "@/components/PixelatedButton";

const HeroSection = () => {
  const [greeting, setGreeting] = useState("gsomnia");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting("gsomnia, good morning 🌅");
    } else if (hour < 18) {
      setGreeting("gsomnia, good afternoon ☀️");
    } else {
      setGreeting("gsomnia, good evening 🌙");
    }
  }, []);

  return (
    <section className="text-center py-16 mt-14">
      <p className="text-gray-400 text-sm mb-2">{greeting}</p>
      <h1 className="text-5xl md:text-6xl mb-6">Welcome To SOMT👀L</h1>
      <p className="text-lg mb-8 max-w-3xl mx-auto">
        Dive into Somnia Testnet: Everything You Need, Made Playful.
      </p>

      <div className="flex justify-center gap-6">
        <Link href="/send">
          <PixelatedButton>MultiSend</PixelatedButton>
        </Link>
        <Link href="/faucet">
          <PixelatedButton>Faucet</PixelatedButton>
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
