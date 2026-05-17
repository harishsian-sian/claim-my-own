I can see the Lovable project is already using the correct Shopify Storefront token managed by the Shopify connector, not the token you pasted.

Findings:
- Shopify admin API can see **Legit Muscle Stack** and it is **ACTIVE**.
- The storefront/public API cannot see it yet: searching Storefront API returns **0 products**, and the `bundles` collection returns **0 products**.
- That means the issue is not the Lovable code token. The product is not published/available to the storefront sales channel that the Storefront API reads, or it is not actually included in the `bundles` collection as a storefront-visible item.

Plan:
1. Keep the secure connector token already in code: `33b408a7018fba50742f111f637c4485` for `ded508-e8.myshopify.com`.
2. Do not add the `shpat_...` admin token to frontend code, because that is a private admin token and would expose your store.
3. Update the storefront code only if needed to make bundle loading more robust:
   - Keep collection-based loading for `/collections/bundles`.
   - Add a safe fallback on the homepage bundle carousel to search Shopify products by `title:bundle OR title:stack` if the `bundles` collection is empty.
   - This would let products like **Legit Muscle Stack** appear automatically once they become Storefront-visible, even if the collection setup lags.
4. After implementation, verify through the Storefront API that:
   - `/collections/bundles` loads collection products when Shopify publishes them.
   - The homepage bundle section falls back cleanly if the collection is still empty.

Shopify admin action you still need to do:
- Open **Legit Muscle Stack** in Shopify.
- Go to **Publishing / Sales channels**.
- Make sure it is published to the storefront channel used by your headless storefront, and preferably **Online Store** too.
- Open **Products → Collections → Bundles** and confirm the product is inside that collection.

Once you approve, I’ll implement the safe fallback without exposing the private admin token.