import { Suspense } from "react";
import AllFacilities from "./AllFacilities";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AllFacilities />
    </Suspense>
  );
}