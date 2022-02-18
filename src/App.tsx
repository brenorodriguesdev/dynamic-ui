import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Controllers from "./pages/controllers";
import CreateController from "./pages/create-controller";
import CreateService from "./pages/create-service";
import Services from "./pages/services";

export default function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Controllers />} />
        <Route path="/controllers" element={<Controllers />} />
        <Route path="/createController" element={<CreateController />} />
        <Route path="/services" element={<Services />} />
        <Route path="/createService" element={<CreateService />} />
      </Routes>
    </BrowserRouter>

  )
}