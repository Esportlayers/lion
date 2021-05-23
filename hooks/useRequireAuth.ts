import { BASE_API_URL } from "@/modules/streamdotaAPI";
import { useEffect } from "react";
import { useRouter } from "next/dist/client/router";

export default function useRequireAuth(): void {
  const router = useRouter();
  useEffect(() => {
    if (
      !localStorage.getItem("jwt") ||
      localStorage.getItem("jwt").length === 0
    ) {
      location.href = `${BASE_API_URL}/auth/twitchNew?callbackURL=${
        location.origin + "/api/twitchAuth"
      }`;
    }
  }, []);

  useEffect(() => {
    if (router.query["jwt"]) {
      localStorage.setItem("jwt", router.query["jwt"] as string);
      router.push("/");
    }
  }, [router.query]);
}
