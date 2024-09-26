//import './App.css';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from './pages/Home';
import ProductPage from "./pages/Shop";

import LoginPage from './pages/auth/LoginPage';
import RegisterPage from "./pages/auth/Register";
import AccountPage from './pages/Account';
import OrderPage from './pages/OrderPage';

import LoginRedirect from './pages/redirect/LoginRedirect'
import AccountRedirect from './pages/redirect/AccountRedirect';
import EmpAccountRedirect from './pages/redirect/EmpAccountRedirect'
import EmpLoginRedirect from './pages/redirect/EmpLoginRedirect'


import CustomersPage from "./pages/dashboard/customerManagement/CustomersPage";
import DashboardHome from './pages/dashboard/DashboardHome'
import CustomerAddPage from "./pages/dashboard/customerManagement/CustomerAddPage"
import CustomerProfilePage from "./pages/dashboard/customerManagement/CustomerProfile";
import AccountUsagePage from './pages/dashboard/customerManagement/AccountUsagePage';
import SiteFeedbackPage from './pages/dashboard/customerManagement/SiteFeedbackPage';
import OldAccountsPage from './pages/dashboard/customerManagement/OldAccountsPage'

//shehan
import Ebill from "./pages/dashboard/transactionManagement/customerEbill";
import AddCustomerPayment from "./pages/dashboard/transactionManagement/AddCustomerPayment";
import SupplierPayment from "./pages/dashboard/transactionManagement/SupplierPaymentPage.js";
import SupplierPaymentForm from "./pages/dashboard/transactionManagement/SupplierPayment.js";
import ViewSupplierPayment from "./pages/dashboard/transactionManagement/viewSupplierPaymentPage.js";
import FinancialOverview from "./pages/dashboard/transactionManagement/financialOverviewPage";
import SupplierPayementReportPage from "./pages/dashboard/transactionManagement/supplierPayementReportPage";

import ShoppingCartPage from "./pages/dashboard/orderManagement/ShoppingCartPage.js";


import OrderedProductsReport from "./pages/dashboard/orderManagement/OrderedProductsReportPage";
import ControlOrdersPage from "./pages/dashboard/orderManagement/ControlOrdersPage";
import OrderReport from "./pages/dashboard/orderManagement/SingleOrderReportPage";

//Vibashana
import InventoryHomePage from "./pages/dashboard/inventoryManagement/InventoryHomePage";
import InventoryProductsPage from "./pages/dashboard/inventoryManagement/InventoryProductsPage";
import InventoryAddNewProductPage from "./pages/dashboard/inventoryManagement/InventroyAddNewProductPage";
import InventoryProductOverviewPage from "./pages/dashboard/inventoryManagement/InventoryProductOverviewPage";
import InventoryUpdateProductPage from "./pages/dashboard/inventoryManagement/InventoryUpdateProductPage";
import InventoryRawMaterialsPage from "./pages/dashboard/inventoryManagement/InventoryRawMaterialsPage";
import InventoryAddRawMaterialPage from "./pages/dashboard/inventoryManagement/InventoryAddRawMaterialPage";
import InventoryRawMaterialOverview from "./pages/dashboard/inventoryManagement/InventoryRawMaterialOverviewPage";
import InventoryNewOrderPage from "./pages/dashboard/inventoryManagement/InventoryNewOrderPage";
import InventoryCartOverviewPage from "./pages/dashboard/inventoryManagement/InventoryCartOverviewPage";
import CustomerProductsPage from "./pages/dashboard/inventoryManagement/CustomerProductsPage";
import CustomerProductOverviewPage from "./pages/dashboard/inventoryManagement/CustomerProductOverviewPage";

import InventoryReportsPage from "./pages/dashboard/inventoryManagement/InventoryReportsPage";
import InventoryPendingOrdersPage from "./pages/dashboard/inventoryManagement/InventoryPendingOrdersPage";
import InventoryPastOrdersPage from "./pages/dashboard/inventoryManagement/InventoryPastOrdersPage";


import Suppliers from "./pages/dashboard/supplierManagement/Suppliers";
import SupplierDetails from "./pages/dashboard/supplierManagement/SupplierDetails";
import AddSupplier from "./pages/dashboard/supplierManagement/AddSupplier";
import Error404 from "./pages/dashboard/supplierManagement/Error404";
import SupplierDashboard from "./pages/dashboard/supplierManagement/SupplierDashboard";
import SupplierInfo from "./pages/dashboard/supplierManagement/SupplierInfo";

import SupplierPaymentReport from "./pages/dashboard/supplierManagement/SupplierPaymentReport";
import PaymentInfo from "./pages/dashboard/supplierManagement/PaymentInfo";
import SupplierRawMaterialReport from "./pages/dashboard/supplierManagement/RawMaterialReport";
import SupplierReports from './pages/dashboard/supplierManagement/SupplierReports';
import SupplierStatus from './pages/dashboard/supplierManagement/SupplierStatus';


//import SupplierPayment from "./pages/dashboard/supplierManagement/SupplierPayment";


import DeliverymanagerHomePage from "./pages/dashboard/deliveryManagement/deliverymanagerHomePage";
import CustomerTrackorderPage from "./pages/dashboard/deliveryManagement/customerTrackorderPage";
import Sampletr from "./pages/dashboard/deliveryManagement/sampletr";
import DashboardHomedelivery from './pages/dashboard/deliveryManagement/DashboardHomedelivery';
import DeliveringOrdersDeliverymanager from './pages/dashboard/deliveryManagement/deliveringOrdersDeliverymanager';
import CompletedOrdersDeliverymanager from './pages/dashboard/deliveryManagement/completedOrdersDeliverymanger';
import ReportPage from './pages/dashboard/deliveryManagement/reportPage';


import EmployeesPage from "./pages/dashboard/employeeManagement/EmployeesPage";
import EmployeeAddPage from "./pages/dashboard/employeeManagement/EmployeeAddPage"
import EmployeeProfilePage from "./pages/dashboard/employeeManagement/EmployeeProfile";
import EmployeeAccountPage from './pages/dashboard/employeeManagement/Account';
import EmployeeLoginPage from './pages/auth/EmpLoginPage';
import EmployeeRegister from './pages/auth/EmpRegister';

import NotAuthorizedPage from './pages/NotAuthorizedPage'

import LeavesAddPage from "./pages/dashboard/LeaveManagement/LeaveAddPage";
import LeavePage from "./pages/dashboard/LeaveManagement/LeavePage";
import LeavesPage from "./pages/dashboard/LeaveManagement/LeavesPage";
import AccessDenidedPage from './pages/dashboard/employeeManagement/AccessDeniedPage';


import FactoryAddPage from "./pages/dashboard/factoryManagement/FactoryAddPage";
import FactoryPage from "./pages/dashboard/factoryManagement/FactoryPage";
import FactoryDetailsPage from "./pages/dashboard/factoryManagement/FactoryDetails";
import MachineAddPage from "./pages/dashboard/machineManagement/MachineAddPage";
import MachinePage from "./pages/dashboard/machineManagement/MachinePage";
import MachineDetailsPage from "./pages/dashboard/machineManagement/MachineDetails";
import MachineStatsPage from "./pages/dashboard/machineManagement/MachineStatsPage";
import OrderRequestPage from "./pages/dashboard/factoryManagement/OrderRequestPage";
import RawInsertPage from "./pages/dashboard/factoryManagement/RawInsertPage";
import ProductStatsPage from "./pages/dashboard/machineManagement/ProductStatsPage";
import ReportsPage from "./pages/dashboard/machineManagement/ReportsPage";
import MachineReportPage from "./pages/dashboard/machineManagement/MachineReportPage";
import FactoryOverviewPage from "./pages/dashboard/factoryManagement/OverviewFactoryPage";
import GoogleOAuth from './pages/auth/GoogleOAuth.js';
import Cookies from 'js-cookie';

function App() {
    if(Cookies.get("cookie-session-user")){
        localStorage.setItem('user', Cookies.get("cookie-session-user"));
        Cookies.remove("cookie-session-user");
    }
    if(!Cookies.get("cookie-session") && JSON.parse(localStorage.getItem('user'))?.hasOwnProperty('authType')){
        localStorage.removeItem('user');
    }

    return(
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <ToastContainer/>
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/product" element={<ProductPage />}/>
                <Route path="/not-authorized" element={<NotAuthorizedPage />}/>

                <Route path="/login-redirect" element={<LoginRedirect />}/>
                <Route path="/account-redirect" element={<AccountRedirect />}/>
                <Route path="/emp-login-redirect" element={<EmpLoginRedirect />}/>
                <Route path="/emp-account-redirect" element={<EmpAccountRedirect />}/>

                {/* Google OAuth Routes */}
                <Route path="/auth/google" element={<GoogleOAuth />} />

                <Route path="/login" element={!localStorage.getItem('user')? <LoginPage />:<Navigate to='/account-redirect'/>}/>
                <Route path="/signup" element={!localStorage.getItem('user')? <RegisterPage />:<Navigate to='/account-redirect'/>}/>
                <Route path="/account" element={localStorage.getItem('user')? <AccountPage />:<Navigate to='/login-redirect'/>}/>
                <Route path="/my-order/:id" element={localStorage.getItem('user')? <OrderPage />:<Navigate to='/login-redirect'/>}/>
                <Route path="/dashboard" element={localStorage.getItem('employee')?<DashboardHome />:<Navigate to='/not-authorized'/>}/>
                <Route path="/customers" element={localStorage.getItem('employee')?<CustomersPage />:<Navigate to='/not-authorized'/>}/>
                <Route path="/customer/:id" element={localStorage.getItem('employee')?<CustomerProfilePage />:<Navigate to='/not-authorized'/>}/>
                <Route path="/add-customer" element={localStorage.getItem('employee')?<CustomerAddPage />:<Navigate to='/not-authorized'/>}/>
                <Route path="/profile-usage" element={localStorage.getItem('employee')?<AccountUsagePage />:<Navigate to='/not-authorized'/>}/>
                <Route path="/site-feedbacks" element={localStorage.getItem('employee')?<SiteFeedbackPage />:<Navigate to='/not-authorized'/>}/>
                <Route path="/old-profiles" element={localStorage.getItem('employee')?<OldAccountsPage />:<Navigate to='/not-authorized'/>}/>         
          


                <Route path="/orderedProductsReport" element={<OrderedProductsReport />}/>
                <Route path="/singleOrderReport/:id" element={<OrderReport />}/>
                <Route path="/orderedProductsReport" element={<OrderedProductsReport />}/>
                <Route path="/controlOrders" element={<ControlOrdersPage />}/>


                <Route path="/cart" element={<ShoppingCartPage />}/>
                <Route path="/ebill/:id/:qty" element={<Ebill />}/>
                <Route path="/AddCustomerPayment" element={<AddCustomerPayment />}/>
                <Route path="/SupplierPayment" element={<SupplierPayment />}/>
                <Route path="/SupplierPaymentForm/:orderID/:supplierID" element={<SupplierPaymentForm />}/>
                <Route path="/ViewSupplierPayment/:orderID/:supplierID/:historyID/:Tdate/:file" element={<ViewSupplierPayment />}/>
                <Route path="/FinancialOverview" element={<FinancialOverview />}/>
                <Route path="/SupplierPayementReportPage" element={<SupplierPayementReportPage />}/>

                <Route path="/inventory-homepage" element={localStorage.getItem('employee')?<InventoryHomePage />:<Navigate to='/not-authorized'/>}/>
                <Route path="/inventory-prod-page" element={localStorage.getItem('employee')?<InventoryProductsPage />:<Navigate to='/not-authorized'/>}/>
                <Route path="/inventory-add-product-page" element={localStorage.getItem('employee')?<InventoryAddNewProductPage />:<Navigate to='/not-authorized'/>}/>
                <Route path="/inventory-product-overview-page/:id" element={localStorage.getItem('employee')?<InventoryProductOverviewPage />:<Navigate to='/not-authorized'/>}/>
                <Route path="/inventory-product-update-page/:id" element={localStorage.getItem('employee')?<InventoryUpdateProductPage />:<Navigate to='/not-authorized'/>}/>
                <Route path="/inventory-raw-materials-page" element={localStorage.getItem('employee')?<InventoryRawMaterialsPage />:<Navigate to='/not-authorized'/>}/>
                <Route path="/inventory-add-raw-material-page" element={localStorage.getItem('employee')?<InventoryAddRawMaterialPage />:<Navigate to='/not-authorized'/>}/>
                <Route path="/inventory-raw-material-overview-page/:id" element={localStorage.getItem('employee')?<InventoryRawMaterialOverview />:<Navigate to='/not-authorized'/>}/>
                <Route path="/inventory-new-order-page" element={localStorage.getItem('employee')?<InventoryNewOrderPage />:<Navigate to='/not-authorized'/>}/>
                <Route path="/inventory-cart-overview-page" element={localStorage.getItem('employee')?<InventoryCartOverviewPage />:<Navigate to='/not-authorized'/>}/>
                <Route path="/inventory-pending-orders-page" element={localStorage.getItem('employee')?<InventoryPendingOrdersPage />:<Navigate to='/not-authorized'/>}/>
                <Route path="/inventory-reports-page" element={localStorage.getItem('employee')?<InventoryReportsPage />:<Navigate to='/not-authorized'/>}/>
                <Route path="/inventory-past-orders-page" element={localStorage.getItem('employee')?<InventoryPastOrdersPage />:<Navigate to='/not-authorized'/>}/>

                <Route path="/products" element={<CustomerProductsPage />} />
                <Route path="/product-overview/:id" element={<CustomerProductOverviewPage/>} />


                <Route path="/supplier-dashboard" element={localStorage.getItem('employee')?<SupplierDashboard/>:<Navigate to='/not-authorized'/>}/>
                <Route path="/suppliers" element={localStorage.getItem('employee')?<Suppliers />:<Navigate to='/not-authorized'/>} />
                <Route path="/update-supplier-details/:id" element={localStorage.getItem('employee')?<SupplierDetails />:<Navigate to='/not-authorized'/>} />
                <Route path="/add-supplier" element={localStorage.getItem('employee')?<AddSupplier />:<Navigate to='/not-authorized'/>} />
                <Route path="/supplier-info/:id" element={localStorage.getItem('employee')?<SupplierInfo />:<Navigate to='/not-authorized'/>} />
                <Route path="/supplier-details" element={<Error404 />} />
                <Route path="/add-supplier-payment" element={localStorage.getItem('employee')?<SupplierPayment />:<Navigate to='/not-authorized'/>}/>
                <Route path="/supplier-reports/:name/:rawMaterial" element={localStorage.getItem('employee')?<SupplierPaymentReport/>:<Navigate to='/not-authorized'/>} />
                <Route path="/supplier-reports/:rawMaterial" element={localStorage.getItem('employee')?<SupplierRawMaterialReport/>:<Navigate to='/not-authorized'/>} />
                <Route path="/supplier-payment-info/:name/:rawMaterial" element={localStorage.getItem('employee')?<PaymentInfo/>:<Navigate to='/not-authorized'/>} />
                <Route path="/supplier-reports" element={localStorage.getItem('employee')?<SupplierReports/>:<Navigate to='/not-authorized'/>} />
                <Route path="/supplier-status-reports/:status" element={localStorage.getItem('employee')?<SupplierStatus/>:<Navigate to='/not-authorized'/>} />


                <Route path="/deliverymanager" element={localStorage.getItem('employee')?<DeliverymanagerHomePage />:<Navigate to='/not-authorized'/>}/>
                <Route path="/dashboardHome" element={localStorage.getItem('employee')?<DashboardHomedelivery />:<Navigate to='/not-authorized'/>}/>
                <Route path="/delivering" element={localStorage.getItem('employee')?<DeliveringOrdersDeliverymanager/>:<Navigate to='/not-authorized'/>}/>
                <Route path="completed" element={localStorage.getItem('employee')?<CompletedOrdersDeliverymanager/>:<Navigate to='/not-authorized'/>}/>                
                <Route path="/:id/trackorder" element={localStorage.getItem('employee')?<CustomerTrackorderPage />:<Navigate to='/not-authorized'/>}/>
                <Route path="/sampletr" element={localStorage.getItem('employee')?<Sampletr/>:<Navigate to='/not-authorized'/>}/>

                <Route path="/ReportsPage" element={localStorage.getItem('employee')?<ReportPage/>:<Navigate to='/not-authorized'/>}/>


                <Route path="/emp-portal" element={!localStorage.getItem('employee')? <EmployeeLoginPage />:<Navigate to='/emp-account-redirect'/>}/>
                <Route path="/emp-create" element={localStorage.getItem('employee')? <RegisterPage />:<Navigate to='/not-authorized'/>}/>
                <Route path="/emp-profile" element={localStorage.getItem('employee')? <EmployeeAccountPage />:<Navigate to='/emp-login-redirect'/>}/>


                <Route path="/employees" element={localStorage.getItem('employee')?<EmployeesPage />:<Navigate to='/not-authorized'/>}/>
                <Route path="/employee/:id" element={localStorage.getItem('employee')?<EmployeeProfilePage />:<Navigate to='/not-authorized'/>}/>
                <Route path="/add-employee" element={localStorage.getItem('employee')?<EmployeeAddPage />:<Navigate to='/not-authorized'/>}/>
                <Route path="/error" element={localStorage.getItem('employee')?<AccessDenidedPage/>:<Navigate to='/not-authorized'/>}/>


                <Route path="/leaves" element={localStorage.getItem('employee')?<LeavesPage />:<Navigate to='/not-authorized'/>}/>
                <Route path="/leave/:id" element={localStorage.getItem('employee')?<LeavePage />:<Navigate to='/not-authorized'/>}/>
                <Route path="/add-leave" element={localStorage.getItem('employee')?<LeavesAddPage />:<Navigate to='/not-authorized'/>}/>


                <Route path="/overview-factory" element={<FactoryOverviewPage />}/>
                <Route path="/add-factory" element={localStorage.getItem('employee')?<FactoryAddPage />:<Navigate to='/not-authorized'/>}/>
                <Route path="/view-factory" element={localStorage.getItem('employee')?<FactoryPage />:<Navigate to='/not-authorized'/>}/>
                <Route path="/factory-details/:id" element={localStorage.getItem('employee')?<FactoryDetailsPage />:<Navigate to='/not-authorized'/>}/>
                <Route path="/add-machine" element={localStorage.getItem('employee')?<MachineAddPage />:<Navigate to='/not-authorized'/>}/>
                <Route path="/view-machine" element={localStorage.getItem('employee')?<MachinePage />:<Navigate to='/not-authorized'/>}/>
                <Route path="/machine-details/:id" element={localStorage.getItem('employee')?<MachineDetailsPage />:<Navigate to='/not-authorized'/>}/>
                <Route path="/update-machine" element={localStorage.getItem('employee')?<MachineStatsPage />:<Navigate to='/not-authorized'/>}/>
                <Route path="/order-request" element={localStorage.getItem('employee')?<OrderRequestPage />:<Navigate to='/not-authorized'/>}/>
                <Route path="/raw-insert" element={localStorage.getItem('employee')?<RawInsertPage />:<Navigate to='/not-authorized'/>}/>
                <Route path="/stats" element={localStorage.getItem('employee')?<ProductStatsPage />:<Navigate to='/not-authorized'/>}/>
                <Route path="/reports" element={localStorage.getItem('employee')?<ReportsPage />:<Navigate to='/not-authorized'/>}/>
                <Route path="/report-machine" element={localStorage.getItem('employee')?<MachineReportPage />:<Navigate to='/not-authorized'/>}/>
            </Routes>
        </BrowserRouter>  
    );
}

export default App;