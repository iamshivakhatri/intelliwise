// "use client";
// import React, { useState } from 'react';
// import qrcode from 'qrcode';

// const Qrcode = () => {
//     const [qrImage, setQrImage] = useState<string | null>(null);

//     const generateQRCode = async () => {
//         try {
//             const data = 'http://10.15.214.99:3000/quiz'; // You can replace this with your desired data
//             const qrDataURL = await qrcode.toDataURL(data, { width: 300, height: 300 }); // Set width and height
//             setQrImage(qrDataURL);
//         } catch (error) {
//             console.error('Error generating QR code:', error);
//         }
//     };

//     const saveQRCode = () => {
//         if (qrImage) {
//             // Create a link element
//             const link = document.createElement('a');
//             link.href = qrImage;
//             link.download = 'qrcode.png'; // Set the download filename
//             // Trigger the click event on the link to start the download
//             document.body.appendChild(link);
//             link.click();
//             // Clean up
//             document.body.removeChild(link);
//         }
//     };

//     return (
//         <div>
//             <h1>QR Code</h1>
//             <button onClick={generateQRCode}>Generate QR Code</button>
//             {qrImage && (
//                 <div>
//                     <img src={qrImage} alt="QR Code" style={{ width: '300px', height: '300px' }} /> {/* Set width and height for display */}
//                     <button onClick={saveQRCode}>Save QR Code</button>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Qrcode;
