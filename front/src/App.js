import LoginBuyers from "./buyers/LoginBuyers";
import Loginseller from "./sellers/LoginSeller";
import SignupBuyers from "./buyers/SignupBuyers";
import SignupSeller from "./sellers/SignupSeller";
import PathChoice from "./PathChoice/PathChoice";
import Login from "./admins/Login";
import Signup from "./admins/Signup";
import Accept from "./admins/admindashboard/pages/Accept";
import Buyers from "./admins/admindashboard/pages/Buyers";
import Products from "./admins/admindashboard/pages/Products";
import Sellers from "./admins/admindashboard/pages/Sellers";
import StaticPagesList from "./admins/admindashboard/pages/StaticPagesList";
import EditStaticPage from "./admins/admindashboard/pages/EditStaticPage";
import AddStaticPage from "./admins/admindashboard/pages/addStaticPage";
import AdminLayout from "./admins/admindashboard/pages/AdminLayout";
import Help from "./staticPages/Help";
import About from "./staticPages/About"
import Policies from "./staticPages/Policies"
import Report from "./staticPages/Report"
import Analytics from "./sellers/analytics/Analytics"
import Discount from "./sellers/discount/Discount"
import MainPage from "./sellers/mainPage/MainPage";
import Orders from "./sellers/orders/Orders"
import SellerProduct from "./sellers/sellerproducts/sellerProduct"
import SellerProfile from "./sellers/sellerProfile/SellerProfile"
import Bascket from "./buyers/bascket/Bascket";
import OneProduct from "./buyers/oneproduct/OneProduct";
import Product from "./buyers/products/Product";
import Profile from "./buyers/profile/Profile";

import { Routes, Route } from 'react-router-dom';


function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<PathChoice />} />

      {/* Authentication */}
          <Route path="/login-buyer" element={<LoginBuyers />} />
          <Route path="/login-seller" element={<Loginseller />} />
          <Route path="/signup-buyer" element={<SignupBuyers />} />
          <Route path="/signup-seller" element={<SignupSeller />} />
          <Route path="/signup-admin" element={<Signup />} />
          <Route path="/login-admin" element={<Login />} />

          {/* Authentication */}

          {/* Admin dashboard */}
          <Route path="/layout" element={<AdminLayout />} />
          <Route path="/accept" element={<Accept />} />
          <Route path="/buyers" element={<Buyers />} />
          <Route path="/products" element={<Products />} />
          <Route path="/sellers" element={<Sellers />} />
          <Route path="/page" element={<StaticPagesList />} ></Route>
          <Route path="/edit/:id" element={<EditStaticPage />}></Route>
          <Route path="/addStaticPage" element={<AddStaticPage />}></Route>
          {/* Admin dashboard */}

          {/* static pages  */}
          <Route path="/help" element={<Help />}></Route>
          <Route path="/report" element={<Report />}></Route>
          <Route path="/policies" element={<Policies/>}></Route>
          <Route path="/about" element={<About />}></Route>
          {/* static pages  */}

          {/* sellers UI  */}
 
 <Route path="/sellerUI-page/:sellerId" element={<MainPage />} />
      <Route path="/orders/" element={<Orders />} />
      <Route path="/seller-profile" element={<SellerProfile />} />
      <Route path="/discount" element={<Discount />} />
      <Route path="/analytics" element={<Analytics />} />
      <Route path="/seller-products" element={<SellerProduct />} />
          {/* sellers UI  */} 
          
        {/* buyers UI  */}
        <Route path="/bascket" element={<Bascket />} ></Route>
        <Route path="/productss" element={<Product />} ></Route>
        <Route path="/product/:id" element={<OneProduct />} ></Route>
        <Route path="/buyer-profile" element={<Profile />} />

        
        {/* buyers UI  */}
          
       </Routes>
       </>
  );
}

export default App;

