'use client';

import { useState } from 'react';

export default function EmailSignup() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // This is a placeholder - integrate with your email service (Mailchimp, ConvertKit, etc.)
    setStatus('success');
    setEmail('');
    
    setTimeout(() => {
      setStatus('idle');
    }, 3000);
  };

  return (
    <div className="bg-gradient-to-br from-nfl-accent to-nfl-secondary p-8 rounded-lg">
      <h3 className="text-3xl font-display text-white mb-3">
        GET THE UNFILTERED TRUTH
      </h3>
      <p className="text-white/90 mb-6">
        Weekly NFL breakdowns that'll make you question everything you thought you knew.
        No fluff, no corporate speak, just pure football chaos.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          className="flex-1 px-4 py-3 rounded-lg bg-white text-black placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
        />
        <button
          type="submit"
          className="px-6 py-3 bg-nfl-dark text-white font-bold rounded-lg hover:bg-black transition-colors"
        >
          SUBSCRIBE
        </button>
      </form>

      {status === 'success' && (
        <p className="mt-3 text-white font-medium animate-fadeIn">
          ✓ Hell yeah! Check your email to confirm.
        </p>
      )}
      {status === 'error' && (
        <p className="mt-3 text-white font-medium animate-fadeIn">
          ✗ Something went wrong. Try again.
        </p>
      )}
    </div>
  );
}
