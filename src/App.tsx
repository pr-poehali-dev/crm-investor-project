
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { DashboardPage } from "./components/DashboardPage";
import { InvestorsList } from "./pages/investors/InvestorsList";
import { CreateInvestor } from "./pages/investors/CreateInvestor";
import { InvestorDetail } from "./pages/investors/InvestorDetail";
import { ContactsList } from "./pages/contacts/ContactsList";
import { CreateContact } from "./pages/contacts/CreateContact";
import { ContactDetail } from "./pages/contacts/ContactDetail";
import { PrivateRoute } from "./components/PrivateRoute";
import { Layout } from "./components/Layout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Layout>
                  <DashboardPage />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/investors"
            element={
              <PrivateRoute>
                <Layout>
                  <InvestorsList />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/investors/new"
            element={
              <PrivateRoute>
                <Layout>
                  <CreateInvestor />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/investors/:id"
            element={
              <PrivateRoute>
                <Layout>
                  <InvestorDetail />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/investors/:investorId/contacts"
            element={
              <PrivateRoute>
                <Layout>
                  <ContactsList />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/investors/:investorId/contacts/new"
            element={
              <PrivateRoute>
                <Layout>
                  <CreateContact />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/investors/:investorId/contacts/:contactId"
            element={
              <PrivateRoute>
                <Layout>
                  <ContactDetail />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;