export default {
    name: "order",
    title: "Order",
    type: "document",
    fields: [
      {
        name: "customer",
        title: "Customer",
        type: "object",
        fields: [
          { name: "name", type: "string", title: "Name" },
          { name: "email", type: "string", title: "Email" },
          { name: "phone", type: "string", title: "Phone" },
        ],
      },
      {
        name: "shippingAddress",
        title: "Shipping Address",
        type: "object",
        fields: [
          { name: "street", type: "string", title: "Street" },
          { name: "city", type: "string", title: "City" },
          { name: "state", type: "string", title: "State" },
          { name: "zipCode", type: "string", title: "ZIP Code" },
          { name: "country", type: "string", title: "Country" },
        ],
      },
      {
        name: "orderItems",
        title: "Order Items",
        type: "array",
        of: [
          {
            type: "object",
            fields: [
              { name: "product", type: "reference", to: [{ type: "products" }] },
              { name: "quantity", type: "number" },
              { name: "price", type: "number" },
            ],
          },
        ],
      },
      {
        name: "totalAmount",
        title: "Total Amount",
        type: "number",
      },
      {
        name: "status",
        title: "Order Status",
        type: "string",
        options: {
          list: [
            { title: "Pending", value: "pending" },
            { title: "Processing", value: "processing" },
            { title: "Shipped", value: "shipped" },
            { title: "Delivered", value: "delivered" },
            { title: "Cancelled", value: "cancelled" },
          ],
        },
      },
      {
        name: "createdAt",
        title: "Created At",
        type: "datetime",
      },
    ],
  }
  
  