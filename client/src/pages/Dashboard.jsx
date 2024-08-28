import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    console.log(tabFromUrl);
  }, [location.search]);
  return (
    <div>
      <div className="">{/* Sidebar*/}</div>
      {/* Profile*/}
    </div>
  );
}
