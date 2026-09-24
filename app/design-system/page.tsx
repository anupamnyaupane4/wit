import { Suspense } from "react";
import { DesignSystemPage } from "@/features/pages/DesignSystemPage";
export default function Page(){return <Suspense fallback={<div className="p-12 font-mono text-sm" role="status">Loading community…</div>}><DesignSystemPage/></Suspense>}
