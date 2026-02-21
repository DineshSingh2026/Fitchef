import { useState } from 'react';
import { subscribeEmail } from '../api/client';
import { images } from '../lib/images';

const SUCCESS_MSG = "You're on the list. We'll notify you before launch.";
const ERROR_GENERIC = 'Something went wrong. Please try again.';

export default function EarlyAccess() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) {
      setStatus('error');
      setMessage('Please enter your email.');
      return;
    }
    setStatus('loading');
    setMessage('');

    try {
      const data = await subscribeEmail(trimmed);
      if (data.success) {
        setStatus('success');
        setMessage(SUCCESS_MSG);
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.message || ERROR_GENERIC);
      }
    } catch (err) {
      const res = err.response;
      setStatus('error');
      if (res?.status === 409) {
        setMessage('Email already registered.');
      } else if (res?.data?.message) {
        setMessage(res.data.message);
      } else {
        setMessage(ERROR_GENERIC);
      }
    }
  };

  return (
    <section id="early-access" className="relative py-16 sm:py-20 md:py-24 lg:py-28 px-4 sm:px-6 bg-white overflow-hidden">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center w-full min-w-0">
        <div className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-xl aspect-[4/3] max-h-[260px] sm:max-h-[320px] lg:max-h-none w-full min-w-0">
          <img
            src={images.earlyAccess}
            alt="Join early access"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="text-center lg:text-left w-full min-w-0">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-semibold text-ink mb-3 sm:mb-4">
            Be Among the First.
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mb-8 sm:mb-10">
            FitChef is launching soon. Secure your early access invitation.
          </p>

          {status === 'success' ? (
            <div
              className="p-6 rounded-xl border border-gold/30 bg-amber-50/80 text-gold-dark font-medium"
              role="status"
            >
              {SUCCESS_MSG}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3 w-full">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  disabled={status === 'loading'}
                  className="flex-1 min-w-0 w-full px-4 py-3.5 rounded-lg bg-slate-50 border border-slate-200 text-ink placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand/40 focus:border-brand transition-colors disabled:opacity-60 text-base"
                  autoComplete="email"
                  aria-label="Email for early access"
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full sm:w-auto min-h-[48px] px-6 py-3.5 rounded-lg font-medium bg-[#16a34a] text-white hover:bg-[#22c55e] active:bg-[#15803d] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? (
                    <span className="inline-flex items-center gap-2">
                      <Spinner />
                      Submitting…
                    </span>
                  ) : (
                    'Submit'
                  )}
                </button>
              </div>
              {status === 'error' && message && (
                <p className="text-red-600 text-sm" role="alert">
                  {message}
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Spinner() {
  return (
    <svg
      className="animate-spin h-5 w-5"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}
