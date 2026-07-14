import { FlowViewer } from "@/components/FlowViewer";

export const dynamic = "force-dynamic";

export default function FlowPage() {
  return (
    <>
      <div className="page-head">
        <span className="tag">Live</span>
        <h1>Agent flow</h1>
        <div className="source">
          Your agent&apos;s key actions, mapped in real time while you answer the design
          questions in Claude Code.
        </div>
      </div>
      <FlowViewer />
    </>
  );
}
