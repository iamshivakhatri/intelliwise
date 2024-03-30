// Inside one of your Next.js pages, for example, pages/QRCodePage.js

import React from 'react';

const QRCodePage = () => {
    // Path to the qrcode.png file
    const qrCodeImagePath = '/qrcode.png'; // Relative path to the image from the public directory

    return (
        <div className="flex justify-center items-center h-screen">
            <div>
                <img src={qrCodeImagePath} alt="QR Code" className="mx-auto max-w-xl max-h-xl" />
            </div>
        </div>
    );
};

export default QRCodePage;
