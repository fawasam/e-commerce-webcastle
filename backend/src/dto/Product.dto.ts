enum Category {
  Electronics = "Electronics",
  Clothing = "Clothing",
  Shoes = "Shoes",
  Books = "Books",
  HomeAppliances = "Home Appliances",
  Toys = "Toys",
  Groceries = "Groceries",
}
export interface CreateProductInput {
  name: string;
  subtitle: string;
  description: string;
  category: Category;
  price: number;
  size: [string];
  images: [string];
}
