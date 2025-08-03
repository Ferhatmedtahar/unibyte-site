import About from "@/modules/About";
import Events from "@/modules/Events";
import Hero from "@/modules/hero/Hero";
import WhatWeDo from "@/modules/WhatWeDo";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <WhatWeDo />
      <Events />
      {/* <Art /> */}
      {/* <Art />
      <Slider />
      <Contact /> */}
    </main>
  );
}
