const img = (id) => `https://images.unsplash.com/photo-${id}?w=480&h=360&fit=crop&q=80`;

export const menu = [
  {
    category: 'Starters',
    items: [
      { name: 'Burrata & Heirloom Tomato', price: 12, desc: 'Fresh burrata, basil oil, aged balsamic', image: img('1608032077018-c9aad9565d29') },
      { name: 'Crispy Calamari', price: 14, desc: 'Lightly fried, lemon aioli, chili flakes', image: img('1476224203421-9ac39bcb3327') },
      { name: 'Roasted Beet Salad', price: 11, desc: 'Whipped goat cheese, candied walnuts, arugula', image: img('1546069901-ba9599a7e63c') },
    ],
  },
  {
    category: 'Mains',
    items: [
      { name: 'Herb-Crusted Salmon', price: 26, desc: 'Grilled salmon, lemon butter, seasonal vegetables', image: img('1519708227418-c8fd9a32b7a2') },
      { name: 'Braised Short Rib', price: 29, desc: 'Red wine reduction, truffle mash, root vegetables', image: img('1544025162-d76694265947') },
      { name: 'Wild Mushroom Risotto', price: 22, desc: 'Arborio rice, parmesan, truffle oil (v)', image: img('1476124369491-e7addf5db371') },
      { name: 'Pan-Seared Chicken', price: 24, desc: 'Garlic jus, roasted potatoes, charred greens', image: img('1432139555190-58524dae6a55') },
    ],
  },
  {
    category: 'Desserts',
    items: [
      { name: 'Molten Chocolate Cake', price: 10, desc: 'Warm dark chocolate cake, vanilla bean ice cream', image: img('1624353365286-3f8d62daad51') },
      { name: 'Classic Tiramisu', price: 9, desc: 'Espresso-soaked ladyfingers, mascarpone', image: img('1571115177098-24ec42ed204d') },
      { name: 'Seasonal Fruit Tart', price: 9, desc: 'Almond pastry cream, glazed seasonal fruit', image: img('1587314168485-3236d6710814') },
    ],
  },
];
