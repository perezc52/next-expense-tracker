import getUserBalance from "@/app/actions/getUserBalance";
import { addCommas } from "@/lib/utils";

export default async function Balance() {
  const { balance } = await getUserBalance();
  return (
    <>
      <h4>Your Balance</h4>
      <h1>${addCommas(Number(balance?.toFixed(2)) ?? 0)}</h1>
    </>
  );
}
