// Inside one of your Next.js pages, for example, pages/QRCodePage.js
'use client'
import React from 'react';
import { usePathname } from "next/navigation"; // Import usePathname from next/navigation
import { useRouter } from "next/navigation";

const QRCodePage = () => {
    // Path to the qrcode.png file
    const qrCodeImagePath = '/qrcode.png'; // Relative path to the image from the public directory
    const router = useRouter(); // Use usePathname instead of useRouter
    const handlePlayClick = () => {
        // Redirect to the quiz page
        router.push("/quiz");
      };
    return (
        <div className="flex flex-col justify-center items-center h-screen">


                <img src={qrCodeImagePath} alt="QR Code" className="mx-auto max-w-xl max-h-xl" />
                <button
                    onClick={handlePlayClick}
                    className="mx-auto mt-8 px-5 py-4 bg-gradient-to-r from-green-400 to-blue-500 rounded-md text-white font-semibold shadow-md hover:from-green-500 hover:to-blue-600 transition duration-300"
                    style={{ minWidth: "400px" }}
                    >
                    Play on Web
                 </button>

         </div>
    );
};

export default QRCodePage;
