"use client";
import { useDebounce } from "@/shared/hooks/use-debounce";
import { useDisclose } from "@/shared/hooks/use-disclose";
import { useMediaQuery } from "@/shared/hooks/use-media-query";
import { SearchFilled } from "@/shared/icons";
import { Box, Button, CircularProgress, Divider, Input, Link, List, ListItem, ListItemButton, Modal, ModalClose, ModalDialog, ModalOverflow, Sheet, Stack, StackProps, Typography, useTheme } from "@mui/joy"
import { useQuery } from "@tanstack/react-query";

import { FunctionComponent, useState } from "react";

export type Section1NominationsProps = StackProps;

const mockData = ["gil", "leal", "filipe", "pedro", "pupo", "ricardo", "chouriço", "Alberto"];

export const Section1Nominations: FunctionComponent<Section1NominationsProps> = (props) => {
    const [selectedUser, setSelectedUser] = useState<string>();
    const [searchValue, setSearchValue] = useState<string>("");

    const debouncedSearchValue = useDebounce(searchValue, 500);

    const theme = useTheme();
    const isMediumScreen = useMediaQuery(theme.breakpoints.up("md"));
    const modal = useDisclose();

    const searchQuery = useQuery({
        queryKey: ['search', debouncedSearchValue],
        enabled: debouncedSearchValue.length > 2,
        placeholderData: [],
        queryFn: async () => {
            const baseUrl = window.location.origin;
            const endpoint = new URL('/api/search', baseUrl);
            const params = { query: debouncedSearchValue };
            endpoint.search = new URLSearchParams(params).toString();
            return fetch(endpoint.toString()).then((res) => res.json());
        }
    });

    const handleUserSelect = (user: string) => {
        setSelectedUser(user);
        modal.open();
    };

    const handleCancel = () => {
        setSelectedUser(undefined);
        modal.close();
    };

    return (
        <Stack {...props}>
            <Input
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value ?? "")}
                startDecorator={
                    <SearchFilled sx={{ color: "neutral.500", opacity: "0.64" }} />
                }
                placeholder="Search for builders with Farcaster, Talent Protocol, Lens or ENS..."
                sx={{
                    py: 1,
                    px: 2,
                    fontSize: "16px",
                    borderRadius: 0,
                    width: "100%",
                    "&::placeholder": {
                        color: "primary.500",
                        opacity: "0.64",
                        fontSize: "16px",
                    },
                }}
            />

            {(() => {
                const isTyping = debouncedSearchValue !== searchValue;
                const isRetrying = searchQuery.isFetching && searchQuery.failureCount > 2;
                const isLoading = searchQuery.isFetching || isTyping;

                if (searchValue.length < 3) return (
                    <>
                        <Divider sx={{ my: 2 }} >
                            <Typography level="title-lg" sx={{ color: "common.white" }}>Or</Typography>
                        </Divider>

                        <Link href="#" sx={{ color: "common.white", textDecoration: "underline" }}>
                            Share your nomination link
                        </Link>
                    </>
                )

                if (isLoading) return (
                    <Sheet
                        variant="solid"
                        sx={{
                            flex: 1,
                            width: "100%",
                            mt: 2,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <CircularProgress variant="plain" color="primary" thickness={3} sx={{ mt: 6, mb: 2 }} />
                        <Typography level="body-lg" sx={{ color: "neutral.500" }}>
                            Searching for {searchValue}
                        </Typography>
                        {isRetrying && (
                            <Typography level="body-sm" sx={{ color: "neutral.500" }}>
                             (Taking a bit longer than expected)
                        </Typography>
                        )}
                    </Sheet>
                )

                if (searchQuery.isError) return (
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
                        <Typography level="body-lg" color="danger">
                           An error occurred while searching for {searchValue}. 
                        </Typography>
                        <Typography color="neutral">
                          Please check your internet connection, and try to refresh the page.
                        </Typography>
                    </Sheet>
                )

                if (searchQuery.data) return (
                    <Sheet variant="solid" sx={{ flex: 1, width: "100%", mt: 2, overflowY: "auto" }}>
                        <List sx={{  }}>
                            {searchQuery.data.map((user) => (
                                <ListItem key={user} sx={{ justifyContent: "space-between" }}>

                                        <Typography>{user}</Typography>
                                        <Button
                                            variant="solid"
                                            sx={{ height: "auto" }}
                                            onClick={() => handleUserSelect(user)}
                                           
                                        >
                                            Nominate
                                        </Button>

                                </ListItem>
                            ))}
                        </List>
                    </Sheet>
                )
            })()}


            <Modal
                open={modal.isOpen}
                onClose={() => modal.close()}
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <ModalOverflow>
                    <ModalDialog layout={isMediumScreen ? "center" : "fullscreen"}>
                        <Sheet
                            variant="plain"
                            sx={{
                                borderRadius: 0,
                                display: "flex",
                                flexDirection: "column",
                                width: { sx: "100%", md: "600px" },
                                p: 3,
                                gap: 3,
                            }}
                        >
                            <ModalClose variant="plain" sx={{ m: 1 }} />

                            <Typography level="h4">Confirm Nomination</Typography>

                            <Stack sx={{ alignItems: "center" }}>
                                <Typography>{selectedUser}</Typography>
                            </Stack>

                            <Stack sx={{ gap: 2, width: "100%" }}>
                                <Box
                                    sx={{
                                        backgroundColor: "common.black",
                                        opacity: "0.3",
                                        height: "1px",
                                        width: "100%",
                                    }}
                                />

                                <Stack
                                    sx={{
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <Typography sx={{ fontSize: "14px", color: "neutral.500" }}>
                                        Date
                                    </Typography>
                                    <Typography sx={{ fontSize: "14px" }}>May 09</Typography>
                                </Stack>

                                <Stack
                                    sx={{
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <Typography sx={{ fontSize: "14px", color: "neutral.500" }}>
                                        My Daily Budget
                                    </Typography>
                                    <Typography sx={{ fontSize: "14px" }}>100</Typography>
                                </Stack>

                                <Stack
                                    sx={{
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <Typography sx={{ fontSize: "14px", color: "neutral.500" }}>
                                        BOSS Points Sent
                                    </Typography>
                                    <Typography sx={{ fontSize: "14px" }}>90</Typography>
                                </Stack>

                                <Stack
                                    sx={{
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <Typography sx={{ fontSize: "14px", color: "neutral.500" }}>
                                        BOSS Points Earned
                                    </Typography>
                                    <Typography sx={{ fontSize: "14px" }}>10</Typography>
                                </Stack>

                                <Box
                                    sx={{
                                        backgroundColor: "common.black",
                                        opacity: "0.3",
                                        height: "1px",
                                        width: "100%",
                                    }}
                                />

                                <Stack
                                    sx={{
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <Typography sx={{ fontSize: "14px", color: "neutral.500" }}>
                                        My BOSS Points
                                    </Typography>
                                    <Typography sx={{ fontSize: "16px", fontWeight: "600" }}>
                                        1.150
                                    </Typography>
                                </Stack>
                            </Stack>

                            <Stack
                                sx={{ flexDirection: "row", justifyContent: "end", gap: 1 }}
                            >
                                <Button
                                    variant="outlined"
                                    color="neutral"
                                    onClick={handleCancel}
                                    sx={{ color: "neutral.500", borderColor: "neutral.500" }}
                                >
                                    Cancel
                                </Button>
                                <Button variant="solid">Connect wallet</Button>
                            </Stack>
                        </Sheet>
                    </ModalDialog>
                </ModalOverflow>
            </Modal>
        </Stack>
    )
}