

export const Section1NominationResult = () => {
    <Sheet
        variant="solid"
        sx={{
            flex: 1,
            width: "100%",
            mt: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
        }}
    >
        <CircularProgress variant="plain" color="primary" thickness={3} sx={{ my: 2 }} />
        <Typography level="body-lg" sx={{ color: "neutral.500" }}>
            Searching for {searchValue}
        </Typography>
    </Sheet>