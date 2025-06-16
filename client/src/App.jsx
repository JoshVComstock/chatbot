import RestaurantChatbot from "./page/home";
import BolivianRestaurant from "./page/informativa";
import Login from "./page/login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
export default function app() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BolivianRestaurant />} />
        <Route path="/chatbot" element={<RestaurantChatbot />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
