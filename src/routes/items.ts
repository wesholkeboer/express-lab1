import express from "express";
import CartItem from "../models/CartItem";

const itemsRouter = express.Router();

export const cartItems = [
  {
    id: 1,
    product: "yarn",
    price: 10,
    quantity: 5,
  },
  {
    id: 2,
    product: "red bull",
    price: 3,
    quantity: 3,
  },
  {
    id: 3,
    product: "milk",
    price: 3,
    quantity: 14,
  },
  {
    id: 4,
    product: "Fancy shit",
    price: 99,
    quantity: 99,
  },
];

itemsRouter.get("/cart-items", (req, res) => {
  let filtered = cartItems;
  const { maxPrice, prefix, pageSize } = req.query;
  if (maxPrice) {
    filtered = filtered.filter((item) => {
      return item.price <= parseFloat(maxPrice as string);
    });
  }
  if (prefix) {
    filtered = filtered.filter((item) => {
      return item.product.startsWith(prefix as string);
    });
  }
  if (pageSize) {
    filtered = filtered.slice(0, parseInt(pageSize as string));
  }
  res.status(201);
  res.json(filtered);
});

itemsRouter.get("/cart-items/:id", (req, res) => {
  const id: string = req.params.id;
  if (id) {
    const index: number = cartItems.findIndex((item) => {
      return item.id === parseInt(id);
    });
    if (index === -1) {
      res.status(404);
      res.json("ID Not Found");
    } else {
      res.status(201);
      res.json(cartItems[index]);
    }
  }
});

itemsRouter.post("/cart-items", (req, res) => {
  let newCartItem: CartItem = req.body;
  cartItems.push(newCartItem);
  newCartItem.id = cartItems.length;
  console.log(newCartItem.id);
  res.status(201);
  res.json(newCartItem);
});

itemsRouter.put("/cart-items/:id", (req, res) => {
  const id: string = req.params.id;
  const updatedCartItem: CartItem = req.body;
  if (id) {
    const index: number = cartItems.findIndex((item) => {
      return item.id === parseInt(id);
    });
    cartItems[index] = updatedCartItem;
    res.status(200);
    res.json(updatedCartItem);
  }
});

itemsRouter.delete("/cart-items/:id", (req, res) => {
  const id: string = req.params.id;
  if (id) {
    const index: number = cartItems.findIndex((item) => {
      return item.id === parseInt(id);
    });
    cartItems.splice(index, 1);
  }
  res.status(204);
  res.json(cartItems);
});

export default itemsRouter;