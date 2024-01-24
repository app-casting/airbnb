import { useContext, useState } from "react";
import { UserContext } from "../userContext";
import { Navigate, useParams, redirect } from "react-router-dom";
import PlacesPage from "./PlacesPage";
import axios from "axios";

import AccountPageComponents from "../subcomponents/AccountPageComponents";

const Profile = () => {
  const { user, ready, setUser } = useContext(UserContext);
  const [logoutRedirect, setLogoutRedirect] = useState(null);
  let subpage = useParams().subpage;

  const Logout = async () => {
    await axios.post("/logout");
    setUser(null);
    setLogoutRedirect("/");
  };

  if (!ready) {
    return "loading...";
  }
  if (ready && !user && !redirect) {
    return <Navigate to={"/login"} />;
  }

  if (subpage === undefined) {
    subpage = "profile";
  }

  if (logoutRedirect) {
    return <Navigate to={logoutRedirect} />;
  }

  return (
    <div>
      <AccountPageComponents />
      {subpage === "profile" && (
        <div className="text-center max-w-lg mx-auto ">
          Logged in as {user.name} ({user.email}) <br />
          <button onClick={Logout} className="primary max-w-sm mt-2">
            Logout
          </button>
        </div>
      )}

      {subpage === "places" && <PlacesPage />}
    </div>
  );
};

export default Profile;
