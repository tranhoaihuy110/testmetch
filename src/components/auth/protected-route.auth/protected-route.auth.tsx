import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router";
import { Button } from "../../ui/button/index";

export const ProtectedRoute = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const isAuthenticated = !!localStorage.getItem("access_token");

  useEffect(() => {
    if (!isAuthenticated) {
      setErrorMessage("You need to login to access this page.");
      const timer = setTimeout(() => {
        setShouldRedirect(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated]);

  const closeDialog = () => {
    setErrorMessage(null);
    setShouldRedirect(true);
  };

  if (!isAuthenticated) {
    return (
      <>
        {errorMessage && !shouldRedirect && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-sm w-full">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                Access denied
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
                {errorMessage}
              </p>
              <Button className="w-full" size="sm" onClick={closeDialog}>
                Close
              </Button>
            </div>
          </div>
        )}
        {shouldRedirect && <Navigate to="/" replace />}
      </>
    );
  }

  return <Outlet />;
};
