# PowerLabs Shopping Cart - React + TypeScript + Vite

[Shopping Cart Demo](public/screenshot.jpg)

## Project Overview

A fully functional shopping cart application built with modern web technologies that allows users to:
- Browse a catalog of products
- Manage items in their shopping cart
- Apply discount coupons
- View order totals with discounts applied

## Key Features

- Product Catalog
  - Fetch and display products from JSON file
  - Responsive grid layout
  - Loading and error states

- Shopping Cart
  - Add/remove products
  - Adjust quantities
  - Real-time total calculation
  - Empty cart state

- Discount System
  - Coupon code validation ("POWERLABSx" for 13.2% off)
  - Visual feedback for valid/invalid codes
  - Discount amount display

- UI/UX
  - Material-UI components
  - Responsive design
  - Intuitive navigation

## Technology Stack

- Frontend Framework: React 18
- Build Tool: Vite
- Language: TypeScript
- UI Library: Material-UI (MUI)
- State Management: React Context API
- Routing: React Router
- Package Manager: npm

## Getting Started

### Prerequisites

npm create vite@latest Powerlabs-Test-Project -- --template react-ts
cd Powerlabs-Test-Project
npm install @mui/material @emotion/react @emotion/styled @mui/icons-material react-router-dom

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Edeh-Chinecherem/PowerLabs-Test-Project.git
   cd powerlabs-test-project
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser at:
   ```
   http://localhost:5173
   ```

## Project Structure

```
src/
├── components/
│   ├── Cart.tsx           # Shopping cart interface
│   ├── CouponInput.tsx    # Discount code input
│   ├── Navbar.tsx         # Navigation header
│   └── ProductList.tsx    # Product catalog
├── context/
│   └── CartContext.tsx    # Global state management
├── data/
│   └── products.json      # Mock product data
├── types/
│   └── types.ts           # Type definitions
├── App.tsx                # Main application component
└── main.tsx               # Application entry point
```

## Customization

### Modify Products

Edit `src/data/products.json` to change the product catalog:
```json
[
  {
    "id": 1,
    "name": "Wireless Earbuds",
    "price": 79.99
  },
  // Add more products as needed
]
```

### Change Styling

Modify Material-UI theme in `src/main.tsx`:
```tsx
import { createTheme, ThemeProvider } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
  },
});


```

## Available Scripts
`npm run dev` Start development server 
`npm run build` Create production build
`npm run preview` Preview production build 


## Deployment

### GitHub Pages

1. Install gh-pages:
   ```bash
   npm install gh-pages --save-dev
   ```

2. Add to `package.json`:
   ```json
   "homepage": "https://Edeh-Chinecherem.github.io/PowerLabs-Test-Project",
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```

3. Deploy:
   ```bash
   npm run deploy
   ```

## 🧪 Testing the Application

1. **Product Display**
   - Verify all products load correctly
   - Check responsive behavior

2. **Cart Functionality**
   - Add multiple products
   - Test quantity adjustments
   - Remove items
   - Verify empty cart state

3. **Coupon System**
   - Test valid coupon "POWERLABSx"
   - Try invalid coupons
   - Verify discount calculations

4. **Navigation**
   - Test routing between pages
   - Check cart counter updates

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

## ✉️ Contact

Project Maintainer: [Your Name](mailto:your.email@example.com)  
Project Link: [https://github.com/your-username/powerlabs-shopping-cart](https://github.com/your-username/powerlabs-shopping-cart)

---

**Note**: Replace placeholder values (your-username, repo-name, contact info) with your actual project details. Include screenshots in your repository to enhance the README visually.