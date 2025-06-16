import React, { useEffect, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';

const Links: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const links = [
    {
      title: 'Main Website',
      url: 'https://brandgoto.com/ca',
      icon: '🌐'
    },
    {
      title: 'Instagram',
      url: 'https://instagram.com/brandgoto',
      icon: '📸'
    },
    {
      title: 'LinkedIn',
      url: 'https://linkedin.com/company/brandgoto',
      icon: '💼'
    }
  ];

  useEffect(() => {
    // Simulate loading time for preloader
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">BrandGoto</h1>
          <p className="text-lg text-gray-600">Connect with us</p>
          
          <div className="mt-8 p-4 bg-white rounded-lg shadow-lg inline-block">
            <QRCodeSVG
              value={window.location.href}
              size={200}
              level="H"
              includeMargin={true}
              className="mx-auto"
            />
          </div>
        </div>

        <div className="space-y-4">
          {links.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 flex items-center space-x-4"
            >
              <span className="text-2xl">{link.icon}</span>
              <span className="text-lg font-medium text-gray-900">{link.title}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Links; 