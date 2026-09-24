import { Suspense } from "react";
import { GatheringsPage } from "@/features/pages/GatheringsPage";
export default function Page(){return <Suspense fallback={<div className="p-12 font-mono text-sm" role="status">Loading community…</div>}><GatheringsPage/></Suspense>}
