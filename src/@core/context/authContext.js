import { useRouter } from "next/router";
import React, { useEffect } from "react";

function Authentication(props) {
  let UserToken;
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== undefined) {
      UserToken = localStorage.getItem('token')
      if (router.pathname.includes("/admin")) {
        if (!UserToken) {
          if (router.pathname == "/admin/retreats") {
            router.push("/admin/login");
          } else if (router.pathname == "/admin/addretreat") {
            router.push("/admin/login");
          } else if (router.pathname == "/account-settings") {
            router.push("/admin/login");
          } else {
            router.push("/admin/login");
          }
        } else if (UserToken) {
          if (router.pathname == "/admin") {
            router.push("/admin");
          } else if (router.pathname == "/admin/login") {
            router.push("/admin");
          }
        }
      }
    }
  }, []);
  return <>{props.children}</>;
}

export default Authentication;