"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, CheckCircle2, X } from "lucide-react";
import { useState } from "react";
import { Tweet } from "react-tweet";

export default function Component() {
  const [email, setEmail] = useState("");
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit email");
      }

      console.log("Email submitted:", email);
      setShowConfirmation(true);
      setEmail("");
      setShowEmailInput(false);
    } catch (error) {
      console.error("Error submitting email:", error);
      setErrorMessage("Failed to submit email. Please try again later.");
      setShowError(true);
      // Handle error (e.g., show an error message to the user)
    }
  };
  const features = [
    "🚀 Quick setup – upload, price, sell. Done.",
    "💰 Earn more – no subscription, cheapest fees ever 😉",
    "📊 Track growth",
    "🎨 Built for creators",
    "📧 Email marketing tools",
    "🎯 Integrated ad platform",
    "🤝 Affiliate marketing",
    "💡 Tips and best practices",
    "🤖 AI-powered recommendations",
    "🌟 Simple to use",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-100 flex flex-col items-center justify-between p-4 md:p-8">
      <div className="w-full max-w-6xl mx-auto mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-blue-600 leading-tight mb-6"
          >
            Monetise your creativity
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto"
          >
            We&apos;re building a marketplace to help creators sell digital
            products (videos, music, images, ebooks, docs). 🎨💻📚
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex justify-center"
        >
          <Card className="bg-white shadow-xl overflow-hidden border-2 border-blue-600 w-full max-w-2xl">
            <CardHeader className="bg-blue-600 text-white py-6">
              <CardTitle className="text-2xl font-bold text-center">
                Dapfy Features
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                    className="flex items-center space-x-3"
                  >
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm md:text-base">{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="bg-gray-50 p-6">
              <AnimatePresence mode="wait">
                {!showEmailInput ? (
                  <motion.div
                    key="button"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full"
                  >
                    <Button
                      onClick={() => setShowEmailInput(true)}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg py-6"
                    >
                      🔥 Join the Waitlist
                    </Button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="w-full space-y-4"
                  >
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full"
                    />
                    <Button
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6"
                    >
                      Submit
                    </Button>
                  </motion.form>
                )}
              </AnimatePresence>
            </CardFooter>
          </Card>
        </motion.div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-blue-600 mb-4 text-center">
          We&apos;ve Joined the AWS Activate Program! 🤩
        </h2>
        <Tweet id="1834316748599840980" />
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        className="text-center text-gray-600 text-sm mt-12"
      >
        <p className="max-w-2xl mx-auto">
          Our mission is to serve humanity by helping creators turn their
          passion into money. Dapfy&apos;s vision is to always remain free to
          use.
        </p>
      </motion.div>

      <div className="text-center text-gray-600 mt-8">
        <p>
          Contact us:{" "}
          <a
            href="mailto:hello@dapfy.com"
            className="text-blue-600 hover:underline"
          >
            hello@dapfy.com
          </a>
        </p>
        <p className="mt-2">© DAPFY.COM, S.R.L. 2024</p>
      </div>

      <AnimatePresence>
        {showConfirmation && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          >
            <div className="bg-white p-8 rounded-lg shadow-lg relative max-w-md w-full">
              <button
                onClick={() => setShowConfirmation(false)}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
              <h2 className="text-2xl font-bold text-blue-600 mb-4">
                You&apos;re on our list! 🎉
              </h2>
              <p className="text-gray-600 mb-4">
                Thanks for joining! We&apos;ll keep you updated on all things
                Dapfy.
              </p>
              <div className="flex items-center justify-center space-x-2 mt-6">
                <a
                  href="https://www.tiktok.com/@dapfycom"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors duration-200"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                  >
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                  </svg>
                  <span>Please follow our journey on TikTok 🙏</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}

        {showError && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          >
            <div className="bg-white p-8 rounded-lg shadow-lg relative max-w-md w-full">
              <button
                onClick={() => setShowError(false)}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
              <div className="flex items-center space-x-3 mb-4">
                <AlertCircle className="h-8 w-8 text-red-500" />
                <h2 className="text-2xl font-bold text-red-600">Error</h2>
              </div>
              <p className="text-gray-600 mb-4">{errorMessage}</p>
              <Button
                onClick={() => setShowError(false)}
                className="w-full bg-red-600 hover:bg-red-700 text-white"
              >
                Close
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
