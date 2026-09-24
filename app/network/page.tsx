import { Suspense } from "react";
import { NetworkPage } from "@/features/pages/NetworkPage";
export default function Page(){return <Suspense fallback={<div className="p-12 font-mono text-sm" role="status">Loading community…</div>}><NetworkPage/></Suspense>}
