"use client";
import { faqData } from "@/utils/constants";
import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";

function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null); // initially no item is open

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="container mx-auto max-w-5xl px-4 mt-20">
      <div className="space-y-6">
        <h2 className="text-center text-4xl md:text-6xl pb-4 text-gradient font-bold bg-gradient-to-r from-primary-600 via-primary-400 to-primary-500 bg-clip-text text-transparent mb-4">
          Frequently Asked Questions
        </h2>

        <div className="divide-y divide-primary-200 px-16">
          {faqData.map((item, index) => (
            <div key={index} className="py-2 ">
              <button
                onClick={() => toggleQuestion(index)}
                className="w-full py-4 text-left flex items-start justify-between gap-4 hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:bg-gray-50"
              >
                <span className="text-[15px] leading-6 font-medium text-primary-600 flex-1 hover:no-underline">
                  {item.question}
                </span>
                <ChevronDownIcon
                  className={`w-4 h-4 text-primary-500 shrink-0 mt-0.5 transition-transform duration-300 ease-in-out ${
                    openIndex === index ? "rotate-180" : "rotate-0"
                  }`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="pb-4 pt-0">
                  <div
                    className={`text-primary-400 leading-relaxed transform transition-transform duration-300 ease-in-out ${
                      openIndex === index ? "translate-y-0" : "-translate-y-2"
                    }`}
                  >
                    {item.answer}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Faq;
