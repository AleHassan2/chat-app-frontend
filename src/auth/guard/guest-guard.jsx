import { useEffect, useCallback } from "react";
import { useAuthContext } from "../../hooks/use-auth-context";
import { useRouter } from "../../hooks/use-router";
import { useSearchParams } from "../../hooks/use-search-params";
import { paths } from "../../routes/sections/path";
import LoadingScreen from "../../components/common/LoadingScreen";

// ----------------------------------------------------------------------

export default function GuestGuard({ children }) {
  const { loading } = useAuthContext();

  return (
    <>{loading ? <LoadingScreen /> : <Container> {children}</Container>}</>
  );
}

// ----------------------------------------------------------------------

function Container({ children }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const returnTo = searchParams.get("returnTo") || paths.dashboard.root;

  const { authenticated } = useAuthContext();

  const check = useCallback(() => {
    if (authenticated) {
      router.replace(returnTo);
    }
  }, [authenticated, returnTo, router]);

  useEffect(() => {
    check();
  }, [check]);

  return <>{children}</>;
}
