# Everything is a Smoke, and each Order draws from exactly one Smoke

Brisket that's "available now" isn't stored as separate stock. It's the Available Amount left in a Smoke whose Ready Time has passed, and that Smoke becomes a Closed Smoke after an expiry period or when the Owner closes it. Upcoming batches are Smokes too. We chose one concept over "stock + pre-orders" so availability, Pickup Slot rules and Delays all work the same way whether the meat is already done or still in the smoker. Each Order draws from exactly one Smoke (the menu disables other Smokes once one is picked), so an Order has a single Ready Time and a single Pickup, and a Delay affects whole Orders instead of splitting them.

## Considered Options

- **Separate on-hand stock plus scheduled batches.** Rejected: two parallel availability systems, and moving leftovers from a batch into stock becomes its own process.
- **Letting one Order combine Smokes (e.g., 1 lb now + 2 lb Saturday).** Rejected: the Order's pickup would have to wait for the latest Smoke, and a Delay to one Smoke would affect only part of an Order.
