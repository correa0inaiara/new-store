import Image from "next/image";
import { Footer } from "./components/footer";
import { Hero } from "./components/hero";
import { BestDeals } from "./components/best-deals";
import { TodaysDeals } from "./components/todays-deals";
import Link from "next/link";
import GlobalError from "./global-error";

export default async function Home() {
  return (
    <>
      <Hero />
      <Link href="/categories">Categories</Link>
      <BestDeals />
      <TodaysDeals />
    </>
  );
}
