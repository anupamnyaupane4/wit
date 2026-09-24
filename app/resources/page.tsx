import { Suspense } from "react";
import { ResourcesPage } from "@/features/pages/ResourcesPage";
export default function Page(){return <Suspense fallback={<div className="p-12 font-mono text-sm" role="status">Loading community…</div>}><ResourcesPage/></Suspense>}
