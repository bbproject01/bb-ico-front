import React from 'react';

export const DisclaimerCustom: React.FC = () => (
  <>
    By connecting your wallet you agree to the{' '}
    {/* eslint-disable-next-line react/react-in-jsx-scope */}
    <a target="_blank" rel="noopener noreferrer" href="https://dicio.com/">
      Terms of Service
    </a>{' '}
    and
    {/* eslint-disable-next-line react/react-in-jsx-scope */}
    <a target="_blank" rel="noopener noreferrer" href="https://dicio.com/">
      Privacy Policy
    </a>
  </>
);
