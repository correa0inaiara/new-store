import GlobalError from "../global-error";
import NotFound from "../not-found";

export default function Home() {
  return (
    <div>
        <div className="bg-red-500 size-40">red</div>
        <div className="bg-green-500 size-40">green</div>
        <div className="bg-blue-500 size-40">blue</div>
      {/* <GlobalError /> */}
      {/* <NotFound /> */}
    </div>
  );
}
