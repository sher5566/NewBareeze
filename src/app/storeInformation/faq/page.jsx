"use client";

import React, { useState } from "react";
import DynamicIcon from "../../components/global/icons/index";
import { Btn } from "../../components/global/buttons/Button";

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 py-4">
      <Btn
        customStyles="flex justify-between items-center w-full text-left"
        onClick={() => setIsOpen(!isOpen)}
        text={
          <>
            <span className="text-lg font-semibold text-gray-800">
              {question}
            </span>
            <DynamicIcon
              name={isOpen ? "minus" : "plus"}
              color="text-blue-600"
              size="text-xl"
            />
          </>
        }
      />

      {isOpen && <div className="mt-2 text-gray-600 pl-4">{answer}</div>}
    </div>
  );
};

const FAQ = () => {
  const faqs = [
    {
      category: "Orders & Shipping",
      items: [
        {
          question: "How long does shipping take?",
          answer:
            "Standard shipping takes 3-5 business days within Pakistan. Express shipping (1-2 business days) is available at an additional cost.",
        },
        {
          question: "Do you offer free shipping?",
          answer:
            "Yes! We offer free shipping on all orders above PKR 5,000. Orders below this amount have a flat shipping fee of PKR 200.",
        },
        {
          question: "How can I track my order?",
          answer:
            "Once your order is shipped, you'll receive a tracking number via email. You can use this number to track your order through our website or the courier's tracking system.",
        },
      ],
    },
    {
      category: "Products & Quality",
      items: [
        {
          question: "What types of fabric do you offer?",
          answer:
            "We offer a wide range of fabrics including cotton, lawn, chiffon, silk, linen, and more. Our collection includes both printed and plain varieties suitable for all occasions.",
        },
        {
          question: "How can I check the fabric quality?",
          answer:
            "We provide detailed product descriptions including fabric composition, weight, and care instructions. You can also visit our physical store to feel the fabric quality in person.",
        },
        {
          question: "Do you provide fabric samples?",
          answer:
            "Yes, we offer fabric samples for a nominal fee which can be later adjusted against your purchase.",
        },
      ],
    },
    {
      category: "Returns & Exchanges",
      items: [
        {
          question: "What is your exchange policy?",
          answer:
            "We accept exchanges within 7 days of delivery. Items must be unused, in original condition, and with tags attached. Please refer to our Exchange Policy for detailed guidelines.",
        },
        {
          question: "How do I initiate an exchange?",
          answer:
            "Contact our customer service through WhatsApp or phone to get an exchange authorization. They will guide you through the process.",
        },
        {
          question: "What items cannot be exchanged?",
          answer:
            "Cut pieces, altered fabrics, sale items, and custom-ordered materials cannot be exchanged.",
        },
      ],
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Frequently Asked Questions
      </h2>

      <div className="space-y-8">
        {faqs.map((category, index) => (
          <div key={index} className="bg-gray-50 p-6 rounded-lg">
            <div className="flex items-start gap-3 mb-4">
              <DynamicIcon
                name="help-circle"
                color="text-blue-600"
                size="text-2xl"
              />
              <h3 className="text-xl font-semibold text-gray-800">
                {category.category}
              </h3>
            </div>
            <div className="space-y-2">
              {category.items.map((faq, faqIndex) => (
                <FAQItem
                  key={faqIndex}
                  question={faq.question}
                  answer={faq.answer}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
