import { Suspense } from "react";
import { SignalPage } from "@/features/pages/SignalPage";
export default function Page(){return <Suspense fallback={<div className="p-12 font-mono text-sm" role="status">Loading community…</div>}><SignalPage/></Suspense>}
