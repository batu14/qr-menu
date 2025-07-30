import React, { useState, useRef } from "react";
import QRCode from "react-qr-code";
import html2canvas from "html2canvas";

import { FaDownload, FaShareAlt, FaPrint } from "react-icons/fa";


const index = () => {
  const [qrCode, setQrCode] = useState(window.location.origin);
  const qrRef = useRef();

  const downloadQR = () => {
    const qrElement = qrRef.current;
    
    html2canvas(qrElement).then((canvas) => {
      const link = document.createElement("a");
      link.download = "qr-code.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    });
  };

  const shareQR = async () => {
    try {
      const qrElement = qrRef.current;
      const canvas = await html2canvas(qrElement);
      const blob = await new Promise(resolve => canvas.toBlob(resolve));
      
      if (navigator.share) {
        await navigator.share({
          files: [new File([blob], 'qr-code.png', { type: 'image/png' })],
          title: 'QR Kod',
        });
      }
    } catch (error) {
      console.error("Paylaşım sırasında hata oluştu:", error);
    }
  };

  const printQR = () => {
    const printWindow = window.open('', '', 'width=800,height=600');
    printWindow.document.write('<html><head><title>QR Kod Yazdır</title>');
    printWindow.document.write('<style>');
    printWindow.document.write(`
      body { 
        display: flex; 
        justify-content: center; 
        align-items: center; 
        min-height: 100vh; 
        margin: 0; 
        padding: 20px;
      }
      .qr-container {
        text-align: center;
      }
      .qr-title {
        margin-bottom: 20px;
        font-size: 24px;
      }
    `);
    printWindow.document.write('</style></head><body>');
    printWindow.document.write('<div class="qr-container">');
    printWindow.document.write('<h1 class="qr-title">QR Kod</h1>');
    printWindow.document.write(qrRef.current.innerHTML);
    printWindow.document.write('</div></body></html>');
    printWindow.document.close();
    
    printWindow.onload = function() {
      printWindow.focus();
      printWindow.print();
      printWindow.close();
    };
  };

  return (
    <div className="w-full flex-col h-screen flex items-center justify-center gap-12">
      <div className="w-full flex items-center justify-center" ref={qrRef}>
        <QRCode value={qrCode} />
      </div>
      
      <div className="flex flex-col lg:flex-row gap-4 w-full items-center justify-center p-10">
        <button 
          onClick={downloadQR}
          className="px-4 py-2 w-full bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center justify-center gap-2"
        >
            <FaDownload />
          QR Kodu İndir
        </button>
        <button 
          onClick={shareQR}
          className="px-4 py-2 w-full bg-green-500 text-white rounded hover:bg-green-600 flex items-center justify-center gap-2"
        >
            <FaShareAlt />
          QR Kodu Paylaş
        </button>
        <button 
          onClick={printQR}
          className="px-4 py-2 w-full bg-purple-500 text-white rounded hover:bg-purple-600 flex items-center justify-center gap-2"
        >
            <FaPrint />
          QR Kodu Yazdır
        </button>
      </div>
    </div>
  );
};

export default index;
