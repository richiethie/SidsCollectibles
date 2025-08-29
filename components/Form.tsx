'use client';

import React, { useState } from 'react';
import { RepairRequest } from '@/types/shopify';
import Input from './ui/Input';
import Select from './ui/Select';
import Button from './ui/Button';

interface FormProps {
  onSubmit: (data: RepairRequest) => Promise<void>;
  isLoading?: boolean;
}

const Form: React.FC<FormProps> = ({ onSubmit, isLoading = false }) => {
  const [formData, setFormData] = useState<RepairRequest>({
    name: '',
    email: '',
    phone: '',
    itemDescription: '',
    issueDescription: '',
    preferredContactMethod: 'email',
    urgency: 'medium',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof RepairRequest, string>>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof RepairRequest, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!formData.itemDescription.trim()) {
      newErrors.itemDescription = 'Card description is required';
    }

    if (!formData.issueDescription.trim()) {
      newErrors.issueDescription = 'Damage description is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof RepairRequest, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      try {
        await onSubmit(formData);
      } catch (error) {
        console.error('Form submission error:', error);
      }
    }
  };

  const urgencyOptions = [
    { value: 'low', label: 'Low - No rush needed' },
    { value: 'medium', label: 'Medium - Within 1-2 weeks' },
    { value: 'high', label: 'High - As soon as possible' },
  ];

  const contactMethodOptions = [
    { value: 'email', label: 'Email' },
    { value: 'phone', label: 'Phone' },
  ];

  return (
    <>
      {/* Enhanced mobile-first form styles */}
      <style jsx>{`
        .mobile-form input,
        .mobile-form select,
        .mobile-form textarea {
          width: 100% !important;
          padding: 14px 16px !important;
          border: 1px solid #d1d5db !important;
          border-radius: 8px !important;
          font-size: 16px !important;
          line-height: 1.5 !important;
          color: #111827 !important;
          background-color: #ffffff !important;
          transition: all 0.2s ease-in-out !important;
          -webkit-appearance: none !important;
          appearance: none !important;
          box-sizing: border-box !important;
        }

        @media (min-width: 640px) {
          .mobile-form input,
          .mobile-form select,
          .mobile-form textarea {
            padding: 16px 20px !important;
            font-size: 18px !important;
          }
        }

        .mobile-form input::placeholder,
        .mobile-form textarea::placeholder {
          color: #6b7280 !important;
          opacity: 1 !important;
          font-size: 16px !important;
          -webkit-text-fill-color: #6b7280 !important;
          -webkit-opacity: 1 !important;
        }

        @media (min-width: 640px) {
          .mobile-form input::placeholder,
          .mobile-form textarea::placeholder {
            font-size: 18px !important;
          }
        }

        .mobile-form input:focus,
        .mobile-form select:focus,
        .mobile-form textarea:focus {
          outline: none !important;
          border-color: #3b82f6 !important;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1) !important;
        }

        .mobile-form textarea {
          min-height: 120px !important;
          resize: vertical !important;
        }

        @media (min-width: 640px) {
          .mobile-form textarea {
            min-height: 140px !important;
          }
        }

        .mobile-form select {
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e") !important;
          background-position: right 12px center !important;
          background-repeat: no-repeat !important;
          background-size: 20px 20px !important;
          padding-right: 40px !important;
        }

        .mobile-form label {
          display: block !important;
          font-weight: 600 !important;
          color: #374151 !important;
          margin-bottom: 8px !important;
          font-size: 14px !important;
        }

        @media (min-width: 640px) {
          .mobile-form label {
            font-size: 16px !important;
            margin-bottom: 10px !important;
          }
        }

        .mobile-form .error-input {
          border-color: #ef4444 !important;
          background-color: #fef2f2 !important;
        }

        .mobile-form .error-text {
          color: #ef4444 !important;
          font-size: 14px !important;
          margin-top: 4px !important;
          font-weight: 500 !important;
        }

        .mobile-form button[type="submit"] {
          width: 100% !important;
          padding: 16px 24px !important;
          background-color: #3b82f6 !important;
          color: white !important;
          border: none !important;
          border-radius: 8px !important;
          font-size: 16px !important;
          font-weight: 600 !important;
          cursor: pointer !important;
          transition: background-color 0.2s ease-in-out !important;
          min-height: 50px !important;
        }

        .mobile-form button[type="submit"]:hover:not(:disabled) {
          background-color: #2563eb !important;
        }

        .mobile-form button[type="submit"]:disabled {
          background-color: #9ca3af !important;
          cursor: not-allowed !important;
        }

        @media (min-width: 640px) {
          .mobile-form button[type="submit"] {
            padding: 18px 28px !important;
            font-size: 18px !important;
            min-height: 56px !important;
          }
        }

        @media (min-width: 768px) {
          .mobile-form button[type="submit"] {
            width: auto !important;
            min-width: 200px !important;
          }
        }

        .mobile-form .form-section {
          background-color: #f9fafb !important;
          padding: 16px !important;
          border-radius: 12px !important;
          margin-bottom: 20px !important;
          border: 1px solid #e5e7eb !important;
        }

        @media (min-width: 640px) {
          .mobile-form .form-section {
            padding: 24px !important;
            margin-bottom: 24px !important;
          }
        }

        .mobile-form .section-title {
          font-size: 16px !important;
          font-weight: 600 !important;
          color: #111827 !important;
          margin-bottom: 16px !important;
        }

        @media (min-width: 640px) {
          .mobile-form .section-title {
            font-size: 18px !important;
            margin-bottom: 20px !important;
          }
        }

        .mobile-form .form-grid {
          display: grid !important;
          gap: 16px !important;
          grid-template-columns: 1fr !important;
        }

        @media (min-width: 768px) {
          .mobile-form .form-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 20px !important;
          }
        }

        .mobile-form .field-group {
          margin-bottom: 16px !important;
        }

        @media (min-width: 640px) {
          .mobile-form .field-group {
            margin-bottom: 20px !important;
          }
        }
      `}</style>

      <form onSubmit={handleSubmit} className="mobile-form space-y-4 sm:space-y-6">
        {/* Personal Information */}
        <div className="form-section">
          <h3 className="section-title">Personal Information</h3>
          <div className="form-grid">
            <div className="field-group">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className={errors.name ? 'error-input' : ''}
                placeholder="Enter your full name"
                required
              />
              {errors.name && (
                <p className="error-text">{errors.name}</p>
              )}
            </div>
            
            <div className="field-group">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={errors.email ? 'error-input' : ''}
                placeholder="Enter your email address"
                required
              />
              {errors.email && (
                <p className="error-text">{errors.email}</p>
              )}
            </div>
            
            <div className="field-group">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number *
              </label>
              <input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className={errors.phone ? 'error-input' : ''}
                placeholder="Enter your phone number"
                required
              />
              {errors.phone && (
                <p className="error-text">{errors.phone}</p>
              )}
            </div>
            
            <div className="field-group">
              <label htmlFor="contactMethod" className="block text-sm font-medium text-gray-700 mb-2">
                Preferred Contact Method *
              </label>
              <select
                id="contactMethod"
                value={formData.preferredContactMethod}
                onChange={(e) => handleInputChange('preferredContactMethod', e.target.value)}
              >
                {contactMethodOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Card Information */}
        <div className="form-section">
          <h3 className="section-title">Card Information</h3>
          <div className="space-y-4 sm:space-y-5">
            <div className="field-group">
              <label htmlFor="itemDescription" className="block text-sm font-medium text-gray-700 mb-2">
                Card Description *
              </label>
              <input
                id="itemDescription"
                type="text"
                value={formData.itemDescription}
                onChange={(e) => handleInputChange('itemDescription', e.target.value)}
                className={errors.itemDescription ? 'error-input' : ''}
                placeholder="e.g., 1998 Pokémon Charizard Base Set, 2003 Topps Chrome LeBron James Rookie"
                required
              />
              {errors.itemDescription && (
                <p className="error-text">{errors.itemDescription}</p>
              )}
            </div>
            
            <div className="field-group">
              <label htmlFor="issueDescription" className="block text-sm font-medium text-gray-700 mb-2">
                Damage Description *
              </label>
              <textarea
                id="issueDescription"
                value={formData.issueDescription}
                onChange={(e) => handleInputChange('issueDescription', e.target.value)}
                rows={4}
                className={errors.issueDescription ? 'error-input' : ''}
                placeholder="Describe the damage in detail (e.g., corner wear, surface scratches, centering issues, creases, stains)"
                required
              />
              {errors.issueDescription && (
                <p className="error-text">{errors.issueDescription}</p>
              )}
            </div>
          </div>
        </div>

        {/* Service Preferences */}
        <div className="form-section">
          <h3 className="section-title">Service Preferences</h3>
          <div className="field-group">
            <label htmlFor="urgency" className="block text-sm font-medium text-gray-700 mb-2">
              Urgency Level *
            </label>
            <select
              id="urgency"
              value={formData.urgency}
              onChange={(e) => handleInputChange('urgency', e.target.value)}
            >
              {urgencyOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Additional Notes */}
        <div className="form-section">
          <h3 className="section-title">Additional Information</h3>
          <div className="field-group">
            <label htmlFor="additionalNotes" className="block text-sm font-medium text-gray-700 mb-2">
              Additional Notes (Optional)
            </label>
            <textarea
              id="additionalNotes"
              rows={3}
              placeholder="Any additional information about the card's condition, estimated value, or special handling requirements"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Submitting...' : 'Submit Repair Request'}
          </button>
        </div>

        {/* Form Note */}
        <p className="text-sm text-gray-500 text-center pt-4">
          * Required fields. We'll contact you within 24-48 hours to discuss your card repair request and provide a detailed quote.
        </p>
      </form>
    </>
  );
};

export default Form;