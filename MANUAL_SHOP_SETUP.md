# Manual Shop Setup (No Ecommerce Subscription)

This shop is now handled directly on your site with inquiry-based ordering.

## How it works

- Visitors select available paintings on `/shop.html`.
- They fill in name, email, and shipping country.
- They click **Open Email Draft** (mailto) or **Copy Order Summary**.
- You finalize payment and shipping manually.

## One-time config

Edit `public/js/shopProducts.js`:

1. Set your real contact email:
   - `shopConfig.contactEmail`
2. Set payment note text:
   - `shopConfig.paymentMethods`
3. Add/update painting entries in `shopProducts`:
   - `id`, `title`, `price`, `size`, `medium`, `image`, `description`, `status`
4. Mark sold items:
   - `status: 'sold'`

## Notes

- This flow has no automatic stock locks, no automatic payment capture, and no order dashboard.
- Best for one-of-one original paintings where manual confirmation is preferred.
- For higher order volume later, you can still switch to Stripe/PayPal links without rebuilding the page structure.
