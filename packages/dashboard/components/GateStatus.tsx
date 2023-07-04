import CustomHead from "./Head";
import Header from "./Header";

interface Props {
  status: "not_connected" | "not_allowed" | "loading";
}

function GateStatus(props: Props) {
  const { status } = props;

  switch (status) {
    case "not_connected":
      return (
        <div className="max-w-screen bg-gradient-to-r from-[#392E75] via-black to-black h-screen">
          <CustomHead />
          <main className="flex flex-col">
            <section>
              <Header />
            </section>
            <section className="m-auto max-w-screen items-center flex-col py-10 text-slate-200 w-10/12 h-full">
              <div className="text-center">Please connect your wallet using the navbar button.</div>
            </section>
          </main>
        </div>
      );
    case "not_allowed":
      return (
        <div className="max-w-screen bg-gradient-to-r from-[#392E75] via-black to-black h-screen">
          <CustomHead />
          <main className="flex flex-col">
            <section>
              <Header />
            </section>
            <section className="m-auto max-w-screen items-center flex-col py-10 text-slate-200 w-10/12 h-full">
              <div className="text-center">You are not allowed to view this page</div>
            </section>
          </main>
        </div>
      );
    case "loading":
      return (
        <div className="max-w-screen bg-gradient-to-r from-[#392E75] via-black to-black h-screen">
          <CustomHead />
          <main className="flex flex-col">
            <section>
              <Header />
            </section>
            <section className="m-auto max-w-screen items-center flex-col py-10 text-slate-200 w-10/12 h-full">
              <div className="text-center">Loading...</div>
            </section>
          </main>
        </div>
      );
    default:
      return <></>;
  }
}

export default GateStatus;
