import { StorageControl } from "@utils/localStorage";
import { Navigate, useLocation } from "react-router-dom";

interface PublicGuardLayoutProps {
  children: JSX.Element;
}

export function PublicGuardLayout({ children }: PublicGuardLayoutProps) {
  const tokenInfo = StorageControl.storageGetter("tokenInfo");
  const location = useLocation();

  if (tokenInfo) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
}

export default PublicGuardLayout;
