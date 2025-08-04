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
    <div className="container mx-auto max-w-5xl px-4 mt-20">
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-center mb-8 text-gradient">
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

        <div className="mt-12 text-center bg-gray-50 rounded-lg p-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">
            Ready to Join Us?
          </h3>
          <p className="text-gray-600 mb-6">
            Still have questions or want to become a member?
          </p>
          <a
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 shadow-lg hover:shadow-xl"
          >
            Contact Us to Join
          </a>
        </div>
      </div>
    </div>
  );
}

export default Faq;
