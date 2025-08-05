import About from "@/modules/About";
import Community from "@/modules/community/Community";
import Events from "@/modules/Events";
import Faq from "@/modules/Faq";
import Hero from "@/modules/hero/Hero";
import JoinUs from "@/modules/JoinUs";
import Members from "@/modules/members/Members";
import WhatWeDo from "@/modules/WhatWeDo";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <WhatWeDo />
      <Events />
      <Community />
      <Members />
      <Faq />
      <JoinUs />
    </main>
  );
}
