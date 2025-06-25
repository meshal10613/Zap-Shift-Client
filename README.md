# Project Name: ZapShift

- [Client Live URL](http://localhost:5173/)
- [Server Live URL](http://localhost:3000/)

## Project Purpose: ZapShift

ZapShift is a parcel delivery management platform designed to streamline the logistics process for both businesses and individuals. It connects users, riders (delivery personnel), and admins through a centralized system, allowing for efficient, transparent, and trackable parcel delivery services. The platform eliminates manual processes, improves real-time coordination, and enhances the customer experience with faster and more reliable deliveries.

---

## 📊 System Overview Table

| Role               | Key Responsibilities                                                                      | Earnings/Benefits                              |
| ------------------ | ----------------------------------------------------------------------------------------- | ---------------------------------------------- |
| **Merchant**       | - Book parcels<br>- Pay charges<br>- Track status<br>- Review service                     | - Real-time tracking<br>- Feedback opportunity |
| **Admin**          | - Assign agents<br>- Manage routing<br>- Oversee warehouses<br>- Monitor operations       | - System control<br>- Operational oversight    |
| **Delivery Agent** | - Collect/Deliver parcels<br>- Update status<br>- OTP confirmation<br>- Warehouse handoff | - ৳20 per delivery                             |

---

## 🛒 Pricing Structure

| Parcel Type      | Weight    | Within City | Outside City/District |
| ---------------- | --------- | ----------- | --------------------- |
| **Document**     | Any       | ৳60         | ৳80                   |
| **Non-Document** | Up to 3kg | ৳110        | ৳150                  |
| **Non-Document** | >3kg      | +৳40/kg     | +৳40/kg +৳40 extra    |

---

## 🚚 Delivery Workflow

```mermaid
flowchart TD
    A[Agent Collects Parcel] --> B{Within City?}
    B -- Yes --> C[Agent Delivers Parcel]
    B -- No --> D[Agent Sends to Warehouse]
    D --> E[Warehouse Sends to Destination]
    E --> F[Admin Assigns Delivery Agent]
    F --> G[Agent Delivers Parcel]
```

---

## 🗂️ Key Features

- **Automated Pricing & Tracking**
- **Role-based Access & Workflow**
- **OTP-based Secure Delivery**
- **Nationwide Coverage (64 districts)**
- **Transparent Commission Structure**

---

---
