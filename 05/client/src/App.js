import "./App.css";
import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Modal from "./pages/Modal";
import RentElement from "./pages/RentElement";
import HomeHost from "./pages/HomeHost";
import HostingListing from "./pages/HostingListing";
import HostForm from "./pages/HostForm";
import HeaderHost from "./components/HeaderHost";
import HostingListingEditing from "./pages/HostingListingEditing";
import ClientTrips from "./pages/ClientTrips";
import HostingReservations from "./pages/HostingReservations";
import ConfirmationPay from "./pages/ConfirmationPay";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/modal" element={<Modal />} />
          <Route exact path="/rent" element={<RentElement />}>
            <Route path=":id" element={<RentElement />}>
              
            </Route>
          </Route>
          <Route path="/rent/:id/confirmationPay" element={<ConfirmationPay />} />
          <Route exact path="/becomehost" element={<HostForm />} />
          <Route path="/hosting" element={<HeaderHost />}>
            <Route index element={<HomeHost />} />
            <Route path="listing" element={<HostingListing />} />
            <Route path="reservs" element={<HostingReservations />} />
            <Route path="editing">
              <Route path=":id" element={<HostingListingEditing />} />
            </Route>
          </Route>
          <Route path="/trips" element={<ClientTrips />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
