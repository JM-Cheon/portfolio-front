import { StorageControl } from "@utils/localStorage";
import { Navigate, useLocation } from "react-router-dom";

interface PrivateGuardLayoutProps {
  children: JSX.Element;
}

export function PrivateGuardLayout({ children }: PrivateGuardLayoutProps) {
  const tokenInfo = StorageControl.storageGetter("tokenInfo");
  const location = useLocation();

  if (!tokenInfo) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }
  return children;
}

export default PrivateGuardLayout;
