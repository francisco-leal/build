import { DateTime } from "luxon";
import { NominateBuilderComponent } from "./component";

export default function NominateBuilderLoading() {
  const date = DateTime.now().toFormat("LLL dd");
  return <NominateBuilderComponent state="LOADING" date={date} />;
}
