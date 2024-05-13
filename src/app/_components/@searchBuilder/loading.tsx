import { DateTime } from "luxon";
import { SearchBuilderComponent } from "./component";

export default function SearchBuildersLoading() {
  const date = DateTime.now().toFormat("LLL dd");

  return (
    <SearchBuilderComponent
      date={date}
      sx={{
        mt: 1,
        alignItems: "center",
        width: "100%",
        height: 280,
      }}
    />
  );
}
