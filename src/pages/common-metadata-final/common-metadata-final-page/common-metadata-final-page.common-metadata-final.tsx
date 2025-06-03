import {
  PageMeta,
} from "../../../components/index";
import { CommonMetadataFinalTable } from "../index";

export const CommonMetadataFinalTables = () => {
  return (
    <>
      <PageMeta
        title="React.js Basic Tables Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <div className="space-y-6">
          <CommonMetadataFinalTable />
      </div>
    </>
  );
};
