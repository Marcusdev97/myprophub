import React from 'react';
import { ArrowRight } from 'lucide-react';

const ServiceCard = ({ title, description, icon: Icon, whatsappLink }) => (
  <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
    <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
      <Icon className="w-6 h-6 text-blue-600" />
    </div>
    <h3 className="text-xl font-semibold mb-3 text-gray-800">{title}</h3>
    <p className="text-gray-600 mb-6 min-h-[100px]">{description}</p>
    <a 
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
    >
      Learn More
      <ArrowRight className="ml-2 w-4 h-4" />
    </a>
  </div>
);

export default ServiceCard;