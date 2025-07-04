import React, { useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import PropTypes from 'prop-types';

const QRCodeGenerator = ({ value, size = 200, className = '' }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current && value) {
      QRCode.toCanvas(canvasRef.current, value, {
        width: size,
        margin: 2,
        color: {
          dark: '#166534', // green‑800
          light: '#FFFFFF',
        },
      });
    }
  }, [value, size]);

  return (
    <div className={`flex justify-center ${className}`}>
      <canvas ref={canvasRef} className="border border-gray-200 rounded-lg" />
    </div>
  );
};

/* ---------- PropTypes for runtime checks ---------- */
QRCodeGenerator.propTypes = {
  value: PropTypes.string.isRequired,
  size: PropTypes.number,
  className: PropTypes.string,
};

export default QRCodeGenerator;
