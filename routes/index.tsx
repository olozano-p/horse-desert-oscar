import { Head } from "$fresh/runtime.ts";
import TripCalculator from "../islands/TripCalculator.tsx";

export default function Home() {
  return (
    <>
      <Head>
        <title>Horse cart carrying nuts in a desert</title>
      </Head>
      <div class="min-h-screen bg-base-400 flex flex-col items-center p-6">
        <img src="/round-wagon.gif" alt="Horse-cart" class="w-256 h-auto mb-4" />
        <TripCalculator />
      </div>
    </>
  );
}
