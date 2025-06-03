import { BrowserRouter as Router, Routes, Route } from "react-router";
import {
  SignIn,
  SignUp,
  NotFound,
  UserProfiles,
  PartnerTables,
  CategoryTables,
  ServiceTables,
  AppConfigTables,
  AppUserTables,
  LeadsPropertyTable,
  LeadTables,
  CommonFaqTables,
  ApiLogsTable,
  CommonMetadataTables,
  EntityFileMappingTables,
  CommonMetadataFinalTables,
  LeadActivityTables,
  CommonBranchPostcodeTables,
  MartPotentialLeadTables,
  SfMartLeadsTables,
  AppUserPendingTables,
  OwnersTables,
  MartPotentialLeadOrderTables,
  RentalsTables,
  PropertyOwnerShipTables,
  LeadPropertyFloorsTable,
  PropertiesTable,
  UserProfileUrlMapTable,
  UserNotificationsTable,
  PotentialLeadHistoryTable,
  UserFcmTokensTables,
  LeadsourcesTables,
  LeadNotesTables,
  LeadAssignmentTables,
  LeadsReferPartnerActivityTables,
  LeadsReferPartnerTables,
  PotentialLeadActionTables,
  LeadsPropertyRoomsTables
} from "./pages/index";
import { AppLayout } from "./layout/index";
import { ScrollToTop } from "./components/index";
import { ProtectedRoute } from "./components/index";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ProvideAuth } from "./components";

export const App = () => {
  return (
    <ProvideAuth>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route element={<ProtectedRoute />}>
            <Route element={<AppLayout />}>
              <Route path="/profile" element={<UserProfiles />} />
              <Route path="/category-tables" element={<CategoryTables />} />
              <Route path="/service-tables" element={<ServiceTables />} />
              <Route path="/partner-tables" element={<PartnerTables />} />
              <Route path="/appconfig" element={<AppConfigTables />} />
              <Route path="/appuser" element={<AppUserTables />} />
              <Route
                path="/leads_property_table"
                element={<LeadsPropertyTable />}
              />
              <Route path="/lead_tables" element={<LeadTables />} />
              <Route path="/commonfaq" element={<CommonFaqTables />} />
              <Route path="/apilogs" element={<ApiLogsTable />} />
              <Route
                path="/commonmetadata"
                element={<CommonMetadataTables />}
              />
              <Route
                path="/entityfilemapping"
                element={<EntityFileMappingTables />}
              />
              <Route
                path="/common_metadata_final"
                element={<CommonMetadataFinalTables />}
              />
              <Route path="/lead-activities" element={<LeadActivityTables />} />
              <Route
                path="/commonbranchpostcode"
                element={<CommonBranchPostcodeTables />}
              />
              <Route
                path="/martpotentiallead"
                element={<MartPotentialLeadTables />}
              />
              <Route path="/sfmartleads" element={<SfMartLeadsTables />} />
              <Route
                path="/appuserpending"
                element={<AppUserPendingTables />}
              />
              <Route path="/owner" element={<OwnersTables />} />
              <Route
                path="/mart-potential-lead-orders"
                element={<MartPotentialLeadOrderTables />}
              />
              <Route path="/rental" element={<RentalsTables />} />
              <Route
                path="/PropertyOwnerShipTables"
                element={<PropertyOwnerShipTables />}
              />
              <Route
                path="/leadPropertyfloors"
                element={<LeadPropertyFloorsTable />}
              />
              <Route path="/properties" element={<PropertiesTable />} />
              <Route
                path="/userprofileurlmap"
                element={<UserProfileUrlMapTable />}
              />
              <Route
                path="/usernotifications"
                element={<UserNotificationsTable />}
              />
              <Route
                path="/userPotentialLeadHistorySearch"
                element={<PotentialLeadHistoryTable />}
              />
              <Route path="/userfcmtokens" element={<UserFcmTokensTables />} />
              <Route path="/leadsourcestable" element={<LeadsourcesTables />} />
              <Route path="/LeadNotesTables" element={<LeadNotesTables />} />
              <Route
                path="/LeadAssignmentTables"
                element={<LeadAssignmentTables />}
              />
              <Route
                path="/PropertyOwnerShipTables"
                element={<PropertyOwnerShipTables />}
              />
              <Route
                path="/LeadActivitysTables"
                element={<LeadActivityTables />}
              />
              <Route
                path="/leadsReferPartnerActivity"
                element={<LeadsReferPartnerActivityTables />}
              />
              <Route
                path="/leadsReferPartnerTables"
                element={<LeadsReferPartnerTables />}
              />
              <Route
                path="/PotentialLeadActionTables"
                element={<PotentialLeadActionTables />}
              />
              <Route
                path="/LeadsPropertyRoomsTables"
                element={<LeadsPropertyRoomsTables />}
              />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ToastContainer
          position="top-right"
          className="custom-toast-body z-[99999]"
          autoClose={1000}
        />
      </Router>
    </ProvideAuth>
  );
};

export default App;
