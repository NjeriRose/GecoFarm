import React, { useState } from 'react';
import { HelpCircle, BookOpen, MessageSquare, Send } from 'lucide-react';

const SupportSettings: React.FC = () => {
  const [issueForm, setIssueForm] = useState({
    title: '',
    description: '',
    type: 'bug',
    priority: 'medium',
    email: 'john.smith@gecofarm.com'
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setIssueForm({
      ...issueForm,
      [name]: value
    });
  };
  
  const handleSubmitIssue = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would submit the issue to a backend
    alert('Issue submitted successfully');
    setIssueForm({
      ...issueForm,
      title: '',
      description: ''
    });
  };

  return (
    <div className="space-y-8">
      {/* Admin Guide */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="bg-gray-50 px-4 py-5 border-b border-gray-200 sm:px-6 flex items-center">
          <BookOpen className="h-5 w-5 text-gray-400 mr-2" />
          <h3 className="text-lg font-medium text-gray-900">Admin Guide / Documentation</h3>
        </div>
        <div className="px-4 py-5 sm:p-6">
          <p className="text-sm text-gray-500 mb-4">
            Access guides and documentation to help you use Geco Farm System effectively.
          </p>
          
          <div className="space-y-4">
            <div className="rounded-md bg-gray-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <BookOpen className="h-5 w-5 text-green-600" />
                </div>
                <div className="ml-3">
                  <h4 className="text-sm font-medium text-gray-900">Administrator Manual</h4>
                  <p className="mt-1 text-xs text-gray-500">
                    Complete guide to managing your farm system as an administrator.
                  </p>
                  <div className="mt-2">
                    <a href="#" className="text-sm text-green-600 hover:text-green-500 flex items-center">
                      Download PDF <span className="ml-1 text-xs">(4.2 MB)</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="rounded-md bg-gray-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <BookOpen className="h-5 w-5 text-green-600" />
                </div>
                <div className="ml-3">
                  <h4 className="text-sm font-medium text-gray-900">Quick Start Guide</h4>
                  <p className="mt-1 text-xs text-gray-500">
                    Get started quickly with core features and workflows.
                  </p>
                  <div className="mt-2">
                    <a href="#" className="text-sm text-green-600 hover:text-green-500 flex items-center">
                      View Online Guide
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="rounded-md bg-gray-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <BookOpen className="h-5 w-5 text-green-600" />
                </div>
                <div className="ml-3">
                  <h4 className="text-sm font-medium text-gray-900">Video Tutorials</h4>
                  <p className="mt-1 text-xs text-gray-500">
                    Step-by-step video tutorials for common tasks and features.
                  </p>
                  <div className="mt-2">
                    <a href="#" className="text-sm text-green-600 hover:text-green-500 flex items-center">
                      Access Video Library
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Report Issue */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="bg-gray-50 px-4 py-5 border-b border-gray-200 sm:px-6 flex items-center">
          <HelpCircle className="h-5 w-5 text-gray-400 mr-2" />
          <h3 className="text-lg font-medium text-gray-900">Report an Issue or Request Feature</h3>
        </div>
        <div className="px-4 py-5 sm:p-6">
          <form onSubmit={handleSubmitIssue} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Issue Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={issueForm.title}
                onChange={handleInputChange}
                required
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm border px-3 py-2"
                placeholder="Brief description of the issue"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                  Type
                </label>
                <select
                  id="type"
                  name="type"
                  value={issueForm.type}
                  onChange={handleInputChange}
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm border px-3 py-2"
                >
                  <option value="bug">Bug Report</option>
                  <option value="feature">Feature Request</option>
                  <option value="question">Question</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
                  Priority
                </label>
                <select
                  id="priority"
                  name="priority"
                  value={issueForm.priority}
                  onChange={handleInputChange}
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm border px-3 py-2"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="critical">Critical</option>
                </select>
              </div>
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={issueForm.description}
                onChange={handleInputChange}
                required
                rows={4}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm border px-3 py-2"
                placeholder="Please provide detailed information about the issue or feature request..."
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Your Email (for follow-up)
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={issueForm.email}
                onChange={handleInputChange}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm border px-3 py-2"
              />
            </div>
            
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center"
              >
                <Send size={16} className="mr-2" />
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      
      {/* Contact Developer */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="bg-gray-50 px-4 py-5 border-b border-gray-200 sm:px-6 flex items-center">
          <MessageSquare className="h-5 w-5 text-gray-400 mr-2" />
          <h3 className="text-lg font-medium text-gray-900">Contact Developer or System Admin</h3>
        </div>
        <div className="px-4 py-5 sm:p-6">
          <p className="text-sm text-gray-500 mb-4">
            Need immediate help? Contact our support team directly.
          </p>
          
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-md bg-gray-50 p-4">
              <h4 className="text-sm font-medium text-gray-900">Technical Support</h4>
              <p className="mt-1 text-xs text-gray-500">Available 24/7 for critical issues</p>
              <div className="mt-2 space-y-1">
                <a href="mailto:support@gecofarm.com" className="text-sm text-green-600 hover:text-green-500 block">
                  support@gecofarm.com
                </a>
                <a href="tel:+254123456789" className="text-sm text-green-600 hover:text-green-500 block">
                  +254 123 456 789
                </a>
              </div>
            </div>
            
            <div className="rounded-md bg-gray-50 p-4">
              <h4 className="text-sm font-medium text-gray-900">System Administrator</h4>
              <p className="mt-1 text-xs text-gray-500">For account and access issues</p>
              <div className="mt-2 space-y-1">
                <a href="mailto:admin@gecofarm.com" className="text-sm text-green-600 hover:text-green-500 block">
                  admin@gecofarm.com
                </a>
                <a href="tel:+254987654321" className="text-sm text-green-600 hover:text-green-500 block">
                  +254 987 654 321
                </a>
              </div>
            </div>
          </div>
          
          <div className="mt-4 text-xs text-gray-500">
            Support hours: Monday-Friday, 8:00 AM - 6:00 PM EAT (GMT+3)
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportSettings; 