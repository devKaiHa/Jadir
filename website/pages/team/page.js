import { useEffect } from "react";
import { useRouter } from "next/router";

export default function TeamLegacyRoute() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/team");
  }, [router]);

  return null;
}
