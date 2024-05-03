import { SearchNomination } from "@/shared/components/search-nominations";
import { Typography } from "@mui/joy";

export default function NominateBuilder() {
    return (
        <>
            <Typography level="h1">
                Nominate the best builders you know
            </Typography>

            <Typography level="title-lg">
                Name the builders breaking the corporate mold, and receive an airdrop of
                $BOSS. Search their name or share your custom link.
            </Typography>

            <SearchNomination
                sx={{
                    alignItems: "center",
                    width: "100%",
                    height: 280
                }}
            />
        </>
    )
}