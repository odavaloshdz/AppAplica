import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, XCircle } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const PricingPage = () => {
  const { isDarkMode } = useTheme();

  const plans = [
    {
      name: 'Starter',
      price: 49,
      description: 'Perfect for small businesses',
      features: [
        { name: '5 Users', included: true },
        { name: '1,000 Products', included: true },
        { name: '5GB Storage', included: true },
        { name: 'Email Support', included: true },
        { name: 'API Access', included: false },
        { name: 'Custom Domain', included: false },
      ],
    },
    {
      name: 'Professional',
      price: 99,
      description: 'Best for growing companies',
      popular: true,
      features: [
        { name: '10 Users', included: true },
        { name: '5,000 Products', included: true },
        { name: '20GB Storage', included: true },
        { name: 'Priority Support', included: true },
        { name: 'API Access', included: true },
        { name: 'Custom Domain', included: true },
      ],
    },
    {
      name: 'Enterprise',
      price: 199,
      description: 'For large scale operations',
      features: [
        { name: 'Unlimited Users', included: true },
        { name: 'Unlimited Products', included: true },
        { name: '100GB Storage', included: true },
        { name: '24/7 Support', included: true },
        { name: 'API Access', included: true },
        { name: 'Custom Domain', included: true },
      ],
    },
  ];

  return (
    <div className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
            Simple, transparent pricing
          </h1>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
            Choose the perfect plan for your business
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-lg shadow-lg ${
                isDarkMode ? 'bg-gray-800' : 'bg-white'
              } ${
                plan.popular
                  ? 'ring-2 ring-blue-500'
                  : 'border border-gray-200 dark:border-gray-700'
              }`}
            >
              <div className="p-6">
                {plan.popular && (
                  <span className="inline-flex px-4 py-1 rounded-full text-sm font-semibold tracking-wide uppercase bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                    Most Popular
                  </span>
                )}
                <h2 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">
                  {plan.name}
                </h2>
                <p className="mt-2 text-gray-500 dark:text-gray-400">
                  {plan.description}
                </p>
                <p className="mt-8">
                  <span className="text-4xl font-bold text-gray-900 dark:text-white">
                    ${plan.price}
                  </span>
                  <span className="text-base font-medium text-gray-500 dark:text-gray-400">
                    /month
                  </span>
                </p>

                {/* Features */}
                <ul className="mt-6 space-y-4">
                  {plan.features.map((feature) => (
                    <li
                      key={feature.name}
                      className="flex items-start"
                    >
                      {feature.included ? (
                        <CheckCircle2 className="h-6 w-6 text-green-500 flex-shrink-0" />
                      ) : (
                        <XCircle className="h-6 w-6 text-gray-400 flex-shrink-0" />
                      )}
                      <span className={`ml-3 text-base ${
                        feature.included
                          ? 'text-gray-700 dark:text-gray-200'
                          : 'text-gray-500 dark:text-gray-400'
                      }`}>
                        {feature.name}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  <Link
                    to="/register"
                    className={`w-full inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-base font-medium ${
                      plan.popular
                        ? 'text-white bg-blue-600 hover:bg-blue-700'
                        : 'text-blue-600 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/30'
                    }`}
                  >
                    Get started
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-24">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white text-center">
            Frequently asked questions
          </h2>
          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            {/* Add FAQ items here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;