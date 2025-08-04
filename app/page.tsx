import About from "@/modules/About";
import Community from "@/modules/Community";
import Events from "@/modules/Events";
import Faq from "@/modules/Faq";
import Hero from "@/modules/hero/Hero";
import WhatWeDo from "@/modules/WhatWeDo";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <WhatWeDo />
      <Events />
      <Community />
      <Faq />
    </main>
  );
}
