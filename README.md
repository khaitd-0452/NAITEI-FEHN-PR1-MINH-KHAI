# Project 1 - Drink Shop - JSON Server with Axios

This project utilizes the `json-server` library to create a mock REST API and the `axios` library to perform HTTP requests for interacting with the API. The database is structured in JSON format and supports CRUD operations for various resources such as users, addresses, products, carts, orders, and blogs.

## Database Structure

The database is stored in a JSON file (e.g., `db.json`) with the following structure:

- **`users`**: Stores user information.

  - `id` (string): Unique identifier (UUID).
  - `email` (string): User's email.
  - `password` (string): User's password.
  - `role` (string): User's role (e.g., "user", "admin").
  - `username` (string): User's username.
  - `full_name` (string): User's full name.
  - `created_at` (string): Creation timestamp (ISO format).
  - `updated_at` (string): Last update timestamp (ISO format).

- **`addresses`**: Stores user addresses.

  - `id` (string): Unique identifier (UUID).
  - `userId` (string): Foreign key referencing `users.id`.
  - `first_name` (string): First name.
  - `last_name` (string): Last name.
  - `company` (string): Company name.
  - `address` (string): Street address.
  - `city` (string): City.
  - `country` (string): Country.
  - `zipcode` (string): Zip code.
  - `phone` (string): Phone number.
  - `default` (boolean): Indicates if this is the default address.
  - `created_at` (string): Creation timestamp.
  - `updated_at` (string): Last update timestamp.

- **`products`**: Stores product information.

  - `id` (string): Unique identifier (UUID).
  - `name` (string): Product name.
  - `price` (number): Product price.
  - `discount` (number): Discount percentage.
  - `color` (string): Product color.
  - `size` (string): Product size (e.g., "500ml").
  - `description` (string): Product description.
  - `product_info` (string): Additional product info.
  - `highlights` (string): Product highlights.
  - `point` (number): Rating point (1-5).
  - `category` (string): Product category.
  - `subcategory` (string): Product subcategory.
  - `stock` (number): Available stock.
  - `tags` (string[]): Array of tags.
  - `images` (array): Array of image objects (`url` and `alt`).
  - `created_at` (string): Creation timestamp.
  - `updated_at` (string): Last update timestamp.

- **`carts`**: Stores user cart items.

  - `id` (string): Unique identifier (UUID).
  - `userId` (string): Foreign key referencing `users.id`.
  - `productId` (string): Foreign key referencing `products.id`.
  - `quantity` (number): Quantity of the product.
  - `checked` (boolean): Indicates if the item is checked.
  - `created_at` (string): Creation timestamp.
  - `updated_at` (string): Last update timestamp.

- **`orders`**: Stores user orders.

  - `id` (string): Unique identifier (UUID).
  - `userId` (string): Foreign key referencing `users.id`.
  - `status` (string): Order status (e.g., "pending", "shipped").
  - `addressId` (string): Foreign key referencing `addresses.id`.
  - `total_price` (number): Total order price.
  - `payment_method` (string): Payment method (e.g., "paypal").
  - `created_at` (string): Creation timestamp.
  - `updated_at` (string): Last update timestamp.

- **`order_items`**: Stores items in an order.

  - `id` (string): Unique identifier (UUID).
  - `orderId` (string): Foreign key referencing `orders.id`.
  - `productId` (string): Foreign key referencing `products.id`.
  - `quantity` (number): Quantity of the product.
  - `created_at` (string): Creation timestamp.
  - `updated_at` (string): Last update timestamp.

- **`blogs`**: Stores blog posts.

  - `id` (string): Unique identifier (UUID).
  - `userId` (string): Foreign key referencing `users.id`.
  - `title` (string): Blog title.
  - `content` (string): Blog content.
  - `images` (array): Array of image objects (`url` and `alt`).
  - `created_at` (string): Creation timestamp.
  - `updated_at` (string): Last update timestamp.

- **`comments`**: Stores comments on blogs.
  - `id` (string): Unique identifier (UUID).
  - `blogId` (string): Foreign key referencing `blogs.id`.
  - `userId` (string): Foreign key referencing `users.id`.
  - `username` (string): Commenter's username.
  - `email` (string): Commenter's email.
  - `content` (string): Comment content.
  - `created_at` (string): Creation timestamp.
  - `updated_at` (string): Last update timestamp.

---

![Image](https://drive.google.com/uc?export=view&id=1TW-98x4iNf902vgLNX9z2tekrRfExnsd)

#### Create a User

- **Method**: POST
- **Endpoint**: `/users`
- **Body**: JSON object with user data.
- **Example**:
  ```javascript
  const axios = require("axios");
  axios
    .post("http://localhost:5000/users", {
      email: "newuser@example.com",
      password: "newpass",
      role: "user",
      username: "newuser",
      full_name: "New User",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .then((response) => console.log(response.data));
  ```

#### Read All Users

- **Method**: GET
- **Endpoint**: `/users`
- **Example**:
  ```javascript
  axios
    .get("http://localhost:5000/users")
    .then((response) => console.log(response.data));
  ```

#### Read a Specific User

- **Method**: GET
- **Endpoint**: `/users/:id`
- **Example**:
  ```javascript
  axios
    .get("http://localhost:5000/users/ad7d9f5c-a4e0-4c96-b4d1-0b02c98b0aa1")
    .then((response) => console.log(response.data));
  ```

#### Update a User

- **Method**: PUT
- **Endpoint**: `/users/:id`
- **Body**: Updated user data.
- **Example**:
  ```javascript
  axios
    .put("http://localhost:5000/users/ad7d9f5c-a4e0-4c96-b4d1-0b02c98b0aa1", {
      full_name: "Updated User Name",
      updated_at: new Date().toISOString(),
    })
    .then((response) => console.log(response.data));
  ```

#### Delete a User

- **Method**: DELETE
- **Endpoint**: `/users/:id`
- **Example**:
  ```javascript
  axios
    .delete("http://localhost:5000/users/ad7d9f5c-a4e0-4c96-b4d1-0b02c98b0aa1")
    .then((response) => console.log(response.data));
  ```

---

### CRUD for Addresses of a User

#### Create an Address for a User

- **Method**: POST
- **Endpoint**: `/addresses`
- **Body**: Address data with `userId`.
- **Example**:
  ```javascript
  axios
    .post("http://localhost:5000/addresses", {
      userId: "ad7d9f5c-a4e0-4c96-b4d1-0b02c98b0aa1",
      first_name: "John",
      last_name: "Doe",
      company: "ABC Corp",
      address: "123 Main St",
      city: "Hanoi",
      country: "Vietnam",
      zipcode: "10000",
      phone: "123-456-7890",
      default: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .then((response) => console.log(response.data));
  ```

#### Read All Addresses of a User

- **Method**: GET
- **Endpoint**: `/addresses?userId=:userId`
- **Example**:
  ```javascript
  axios
    .get(
      "http://localhost:5000/addresses?userId=ad7d9f5c-a4e0-4c96-b4d1-0b02c98b0aa1"
    )
    .then((response) => console.log(response.data));
  ```

#### Read a Specific Address

- **Method**: GET
- **Endpoint**: `/addresses/:id`
- **Example**:
  ```javascript
  axios
    .get("http://localhost:5000/addresses/3939b072-8c01-4f6c-8346-18849b8963d8")
    .then((response) => console.log(response.data));
  ```

#### Update an Address

- **Method**: PUT
- **Endpoint**: `/addresses/:id`
- **Example**:
  ```javascript
  axios
    .put(
      "http://localhost:5000/addresses/3939b072-8c01-4f6c-8346-18849b8963d8",
      {
        address: "456 New St",
        updated_at: new Date().toISOString(),
      }
    )
    .then((response) => console.log(response.data));
  ```

#### Delete an Address

- **Method**: DELETE
- **Endpoint**: `/addresses/:id`
- **Example**:
  ```javascript
  axios
    .delete(
      "http://localhost:5000/addresses/3939b072-8c01-4f6c-8346-18849b8963d8"
    )
    .then((response) => console.log(response.data));
  ```

---

### CRUD for Products

#### Create a Product

- **Method**: POST
- **Endpoint**: `/products`
- **Example**:
  ```javascript
  axios
    .post("http://localhost:5000/products", {
      name: "Alcohol New",
      price: 100,
      discount: 20,
      color: "Amber",
      size: "750ml",
      description: "New product description",
      product_info: "New product info",
      highlights: "New highlights",
      point: 4,
      category: "Whiskey",
      subcategory: "Single Malt",
      stock: 50,
      tags: ["new", "alcohol"],
      images: [{ url: "https://example.com/new.jpg", alt: "New Product" }],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .then((response) => console.log(response.data));
  ```

#### Read All Products

- **Method**: GET
- **Endpoint**: `/products`
- **Example**:
  ```javascript
  axios
    .get("http://localhost:5000/products")
    .then((response) => console.log(response.data));
  ```

#### Read a Specific Product

- **Method**: GET
- **Endpoint**: `/products/:id`
- **Example**:
  ```javascript
  axios
    .get("http://localhost:5000/products/7f70926d-0573-4bdf-9e0a-458ef05a710d")
    .then((response) => console.log(response.data));
  ```

#### Update a Product

- **Method**: PUT
- **Endpoint**: `/products/:id`
- **Example**:
  ```javascript
  axios
    .put(
      "http://localhost:5000/products/7f70926d-0573-4bdf-9e0a-458ef05a710d",
      {
        price: 90,
        updated_at: new Date().toISOString(),
      }
    )
    .then((response) => console.log(response.data));
  ```

#### Delete a Product

- **Method**: DELETE
- **Endpoint**: `/products/:id`
- **Example**:
  ```javascript
  axios
    .delete(
      "http://localhost:5000/products/7f70926d-0573-4bdf-9e0a-458ef05a710d"
    )
    .then((response) => console.log(response.data));
  ```

---

### CRUD for Carts of a User (with Product Data)

#### Create a Cart Item for a User

- **Method**: POST
- **Endpoint**: `/carts`
- **Example**:
  ```javascript
  axios
    .post("http://localhost:5000/carts", {
      userId: "ad7d9f5c-a4e0-4c96-b4d1-0b02c98b0aa1",
      productId: "7f70926d-0573-4bdf-9e0a-458ef05a710d",
      quantity: 2,
      checked: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .then((response) => console.log(response.data));
  ```

#### Read All Cart Items of a User with Product Data

- **Method**: GET
- **Endpoint**: `/carts?userId=:userId&_expand=product`
- **Example**:
  ```javascript
  axios
    .get(
      "http://localhost:5000/carts?userId=ad7d9f5c-a4e0-4c96-b4d1-0b02c98b0aa1&_expand=product"
    )
    .then((response) => console.log(response.data));
  ```
  - **Response**: Returns an array of cart items with embedded `product` details.

#### Read a Specific Cart Item with Product Data

- **Method**: GET
- **Endpoint**: `/carts/:id?_expand=product`
- **Example**:
  ```javascript
  axios
    .get(
      "http://localhost:5000/carts/ddfc29ff-6b97-4824-ba01-3b258b0be0aa?_expand=product"
    )
    .then((response) => console.log(response.data));
  ```

#### Update a Cart Item

- **Method**: PUT
- **Endpoint**: `/carts/:id`
- **Example**:
  ```javascript
  axios
    .put("http://localhost:5000/carts/ddfc29ff-6b97-4824-ba01-3b258b0be0aa", {
      quantity: 3,
      updated_at: new Date().toISOString(),
    })
    .then((response) => console.log(response.data));
  ```

#### Delete a Cart Item

- **Method**: DELETE
- **Endpoint**: `/carts/:id`
- **Example**:
  ```javascript
  axios
    .delete("http://localhost:5000/carts/ddfc29ff-6b97-4824-ba01-3b258b0be0aa")
    .then((response) => console.log(response.data));
  ```

---

### CRUD for Orders (with Product Data in Order Items)

#### Create an Order

- **Method**: POST
- **Endpoint**: `/orders`
- **Example**:
  ```javascript
  axios
    .post("http://localhost:5000/orders", {
      userId: "ad7d9f5c-a4e0-4c96-b4d1-0b02c98b0aa1",
      status: "pending",
      addressId: "3939b072-8c01-4f6c-8346-18849b8963d8",
      total_price: 200,
      payment_method: "credit_card",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .then((response) => console.log(response.data));
  ```

#### Read All Orders of a User with Order Items and Product Data

- **Method**: GET
- **Endpoint**: `/orders?userId=:userId&_embed=order_items&_expand=address`
- **Additional**: Fetch product data for order items separately.
- **Example**:
  ```javascript
  axios
    .get(
      "http://localhost:5000/orders?userId=ad7d9f5c-a4e0-4c96-b4d1-0b02c98b0aa1&_embed=order_items&_expand=address"
    )
    .then((response) => {
      const orders = response.data;
      const orderItemPromises = orders.flatMap((order) =>
        order.order_items.map((item) =>
          axios.get(
            `http://localhost:5000/order_items/${item.id}?_expand=product`
          )
        )
      );
      Promise.all(orderItemPromises).then((responses) => {
        console.log(
          orders.map((order, i) => ({
            ...order,
            order_items: responses
              .slice(
                i * order.order_items.length,
                (i + 1) * order.order_items.length
              )
              .map((r) => r.data),
          }))
        );
      });
    });
  ```

#### Read a Specific Order with Order Items and Product Data

- **Method**: GET
- **Endpoint**: `/orders/:id?_embed=order_items&_expand=address`
- **Example**:
  ```javascript
  axios
    .get(
      "http://localhost:5000/orders/1dcdd441-f31a-4a47-9b55-5999cc99cf92?_embed=order_items&_expand=address"
    )
    .then((response) => {
      const order = response.data;
      const orderItemPromises = order.order_items.map((item) =>
        axios.get(
          `http://localhost:5000/order_items/${item.id}?_expand=product`
        )
      );
      Promise.all(orderItemPromises).then((responses) => {
        order.order_items = responses.map((r) => r.data);
        console.log(order);
      });
    });
  ```

#### Update an Order

- **Method**: PUT
- **Endpoint**: `/orders/:id`
- **Example**:
  ```javascript
  axios
    .put("http://localhost:5000/orders/1dcdd441-f31a-4a47-9b55-5999cc99cf92", {
      status: "shipped",
      updated_at: new Date().toISOString(),
    })
    .then((response) => console.log(response.data));
  ```

#### Delete an Order

- **Method**: DELETE
- **Endpoint**: `/orders/:id`
- **Example**:
  ```javascript
  axios
    .delete("http://localhost:5000/orders/1dcdd441-f31a-4a47-9b55-5999cc99cf92")
    .then((response) => console.log(response.data));
  ```

---

### CRUD for Blogs

#### Create a Blog

- **Method**: POST
- **Endpoint**: `/blogs`
- **Example**:
  ```javascript
  const axios = require("axios");
  axios
    .post("http://localhost:5000/blogs", {
      userId: "ad7d9f5c-a4e0-4c96-b4d1-0b02c98b0aa1",
      title: "New Blog Post",
      content: "This is a new blog post.",
      images: [{ url: "https://example.com/newblog.jpg", alt: "New Blog" }],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .then((response) => console.log(response.data));
  ```

#### Read All Blogs with Comments

- **Method**: GET
- **Endpoint**: `/blogs?_embed=comments`
- **Example**:
  ```javascript
  axios
    .get("http://localhost:5000/blogs?_embed=comments")
    .then((response) => console.log(response.data));
  ```

#### Read a Specific Blog with Comments

- **Method**: GET
- **Endpoint**: `/blogs/:id?_embed=comments`
- **Example**:
  ```javascript
  axios
    .get(
      "http://localhost:5000/blogs/eb7adc81-c726-46a3-a799-296ff6287af5?_embed=comments"
    )
    .then((response) => console.log(response.data));
  ```

#### Update a Blog

- **Method**: PUT
- **Endpoint**: `/blogs/:id`
- **Example**:
  ```javascript
  axios
    .put("http://localhost:5000/blogs/eb7adc81-c726-46a3-a799-296ff6287af5", {
      content: "Updated blog content.",
      updated_at: new Date().toISOString(),
    })
    .then((response) => console.log(response.data));
  ```

#### Delete a Blog

- **Method**: DELETE
- **Endpoint**: `/blogs/:id`
- **Example**:
  ```javascript
  axios
    .delete("http://localhost:5000/blogs/eb7adc81-c726-46a3-a799-296ff6287af5")
    .then((response) => console.log(response.data));
  ```

---

### CRUD for Comments

#### Create a Comment

- **Method**: POST
- **Endpoint**: `/comments`
- **Body**: Comment data with `blogId` and `userId`.
- **Example**:
  ```javascript
  axios
    .post("http://localhost:5000/comments", {
      blogId: "eb7adc81-c726-46a3-a799-296ff6287af5",
      userId: "ad7d9f5c-a4e0-4c96-b4d1-0b02c98b0aa1",
      username: "user1",
      email: "user1@example.com",
      content: "Great blog post!",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .then((response) => console.log(response.data));
  ```

#### Read All Comments of a Blog with User Data

- **Method**: GET
- **Endpoint**: `/comments?blogId=:blogId&_expand=user`
- **Example**:
  ```javascript
  axios
    .get(
      "http://localhost:5000/comments?blogId=eb7adc81-c726-46a3-a799-296ff6287af5&_expand=user"
    )
    .then((response) => console.log(response.data));
  ```
  - **Response**: Returns an array of comments with embedded `user` details.

#### Read a Specific Comment with User and Blog Data

- **Method**: GET
- **Endpoint**: `/comments/:id?_expand=user&_expand=blog`
- **Example**:
  ```javascript
  axios
    .get(
      "http://localhost:5000/comments/c7a2f7e8a-7e53-4baf-a4da-27291b9f2a6d?_expand=user&_expand=blog"
    )
    .then((response) => console.log(response.data));
  ```
  - **Response**: Returns the comment with embedded `user` and `blog` details.

#### Update a Comment

- **Method**: PUT
- **Endpoint**: `/comments/:id`
- **Example**:
  ```javascript
  axios
    .put(
      "http://localhost:5000/comments/c7a2f7e8a-7e53-4baf-a4da-27291b9f2a6d",
      {
        content: "Updated comment content.",
        updated_at: new Date().toISOString(),
      }
    )
    .then((response) => console.log(response.data));
  ```

#### Delete a Comment

- **Method**: DELETE
- **Endpoint**: `/comments/:id`
- **Example**:
  ```javascript
  axios
    .delete(
      "http://localhost:5000/comments/c7a2f7e8a-7e53-4baf-a4da-27291b9f2a6d"
    )
    .then((response) => console.log(response.data));
  ```

---
