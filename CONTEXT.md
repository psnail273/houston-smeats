# SMEATS

SMEATS ("Houston's Smoked Meats") is a small St. Louis smoked-meat business run by its Owner, Houston. Customers order and pay online, then collect their Order at Pickup.

## Language

### People

**Owner**:
The one person who runs SMEATS and manages Smokes, Menu Items, Pickup Hours and Orders through the admin side. Their name is Houston.
_Avoid_: Admin, pitmaster, chef, cook, staff

**Customer**:
A person who places an Order.
_Avoid_: User, buyer, client

**Houston**:
The Owner's name, as in "Houston's Smoked Meats." It is not a place.

### Menu and Smokes

**Menu Item**:
A smoked meat Customers can order, sold in half-pound increments and priced per pound. Brisket is currently the only Menu Item. An Order keeps the price paid even if the Menu Item changes later.
_Avoid_: Product, SKU, dish

**Retired Menu Item**:
A Menu Item the Owner no longer offers. It can't be added to new Smokes but still appears on past Orders.
_Avoid_: Deleted, archived

**Menu Item History**:
The record of every change the Owner made to a Menu Item, and when.

**Smoke**:
A batch of one or more Menu Items that the Owner smokes together, with a Ready Time and an amount in pounds for each Menu Item.
_Avoid_: Cook, batch, run

**Ready Time**:
When a Smoke is (or is expected to be) done. It replaces the idea of an item being "sold out." A Smoke whose Ready Time has passed is what Customers see as "available now."
_Avoid_: Sold out, ETA, Ready Estimate

**Closed Smoke**:
A Smoke that no longer takes Orders, either because the Owner closed it or because its expiry period (default 3 days after Ready Time) has passed.
_Avoid_: Expired, sold out

**Available Amount**:
The pounds of a Menu Item in a Smoke that Customers can still order: the amount smoked minus what existing Orders have already taken.
_Avoid_: Stock, inventory, capacity

**Ordering Paused**:
A state the Owner switches on by hand to stop all new Orders, whatever the Available Amount.

### Orders and Pickup

**Order**:
A Customer's paid request for Menu Items, all from a single Smoke, collected at a single Pickup Slot.
_Avoid_: Purchase, transaction

**Order Max**:
The most of a single Menu Item one Order may contain (default 5 lb, set by the Owner). Larger requests go to the Owner by email.

**Pickup**:
How every Order is fulfilled: the Customer collects it at the Pickup Spot during their Pickup Slot.
_Avoid_: Delivery, dropoff

**Pickup Spot**:
The Owner's home, where Customers collect Orders. It is shown only to Customers who have paid.
_Avoid_: Address, location, store

**Pickup Hours**:
The times the Owner makes available for Pickup: a weekly schedule plus one-off changes for specific dates.

**Pickup Slot**:
The specific time within Pickup Hours that a Customer picks for their Order. It can't be earlier than the Ready Time of the Order's Smoke.
_Avoid_: Appointment, window

**Checkout Hold**:
Pounds temporarily held for a Customer while they're checking out, then released if payment doesn't complete.
_Avoid_: Reservation, cart lock

**Cancellation Window**:
The first hour after an Order is placed, during which the Customer can cancel for a full refund.

**Picked Up**:
An Order the Owner has marked as collected.

**No-show**:
An Order not marked Picked Up by the end of its Pickup Slot's day. It isn't refunded automatically.

**Order Link**:
The private link in the Confirmation Email that lets a Customer manage their Order without an account: cancel it, or move it to another Pickup Slot before the current one starts.
_Avoid_: Account, login

**Delay**:
When the Owner moves a Smoke's Ready Time later. Customers whose Pickup Slot is now too early may choose a new slot or cancel for a full refund, even outside the Cancellation Window.

### Emails

**Confirmation Email**:
The email sent right after payment, with the Order, the Pickup Slot, the Pickup Spot address and the Order Link. Replying to it reaches the Owner.

**Order Message**:
A message a Customer sends to the Owner from the Order Link page. It is attached to that Order.
_Avoid_: Ticket, support request

**Delay Email**:
The email the Owner sends after a Delay, linking the Customer to choose a new Pickup Slot or cancel.
