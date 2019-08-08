const STRIPE_PUBLISHABLE = process.env.NODE_ENV === 'production'
  ? 'pk_live_MY_PUBLISHABLE_KEY'
  : 'pk_test_9e7yUJfjVLomjKza1VzjJWWv003QDcLdsf';

export default STRIPE_PUBLISHABLE;