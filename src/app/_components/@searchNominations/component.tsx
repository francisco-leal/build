"use client";
import { useDebounce } from "@/shared/hooks/use-debounce";
import { useDisclose } from "@/shared/hooks/use-disclose";
import { useMediaQuery } from "@/shared/hooks/use-media-query";
import { LogoShort, SearchFilled } from "@/shared/icons";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Divider,
  Input,
  Link,
  List,
  ListItem,
  ListItemButton,
  Modal,
  ModalClose,
  ModalDialog,
  ModalOverflow,
  Sheet,
  Stack,
  StackProps,
  Typography,
  useTheme,
} from "@mui/joy";
import { useQuery } from "@tanstack/react-query";

import { FunctionComponent, useState } from "react";

export type SearchNominationComponentProps = {
  shareLink?: string;
  date?: string;
  dailyBudget?: string;
  bossPointsSent?: string;
  bossPointsEarned?: string;
  totalBossPoints?: string;
} & StackProps;

export type SearchResponseUser = {
  address: string;
  dapp: string;
  profile_image: string;
  username: string;
};

export const SearchNominationsComponent: FunctionComponent<SearchNominationComponentProps> = ({
  shareLink,
  date,
  dailyBudget,
  bossPointsEarned,
  bossPointsSent,
  totalBossPoints,
  ...props
}) => {
  const [selectedUser, setSelectedUser] = useState<SearchResponseUser>();
  const [searchValue, setSearchValue] = useState<string>("");

  const debouncedSearchValue = useDebounce(searchValue, 500);

  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.up("md"));
  const modal = useDisclose();

  const searchQuery = useQuery({
    queryKey: ["search", debouncedSearchValue],
    enabled: debouncedSearchValue.length > 2,
    placeholderData: [],
    queryFn: async (): Promise<SearchResponseUser[]> => {
      const baseUrl = window.location.origin;
      const endpoint = new URL("/api/search", baseUrl);
      const params = { query: debouncedSearchValue };
      endpoint.search = new URLSearchParams(params).toString();
      const data = fetch(endpoint.toString()).then((res) => res.json());
      return data as Promise<SearchResponseUser[]>;
    },
  });

  const handleUserSelect = (user: SearchResponseUser) => {
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
        const isLoading = searchQuery.isFetching || isTyping;
        const isRetrying =
          searchQuery.isFetching && searchQuery.failureCount > 2;
        const isError =
          searchQuery.isError || typeof searchQuery.data === "undefined";

        if (searchValue.length < 3) {
          return (
            <>
              <Divider sx={{ my: 2 }}>
                <Typography level="title-lg" sx={{ color: "common.white" }}>
                  Or
                </Typography>
              </Divider>
              {shareLink ? (
                <Link
                  href={shareLink}
                  sx={{ color: "common.white", textDecoration: "underline" }}
                >
                  Share your nomination link
                </Link>
              ) : (
                <Typography level="body-lg" sx={{ color: "common.white" }}>
                  Connect your wallet to share your nomination link
                </Typography>
              )}
            </>
          );
        }

        if (isLoading) {
          return (
            <Sheet
              variant="solid"
              sx={{
                flex: 1,
                width: "100%",
                mt: 2,
              }}
            >
              <CircularProgress
                variant="plain"
                color="primary"
                thickness={3}
                sx={{ mt: 6, mb: 2 }}
              />
              <Typography level="body-lg" sx={{ color: "neutral.500" }}>
                Searching for {searchValue}
              </Typography>
              {isRetrying && (
                <Typography color="neutral" level="body-sm">
                  (Taking a bit longer than expected)
                </Typography>
              )}
            </Sheet>
          );
        }

        if (isError) {
          return (
            <Sheet
              variant="solid"
              sx={{
                flex: 1,
                width: "100%",
                mt: 2,
              }}
            >
              <LogoShort
                sx={{
                  width: "40px",
                  height: "40px",
                  color: "neutral.500",
                  mt: 6,
                }}
              />
              <Typography color="neutral" level="body-lg">
                Ups, something went wrong
              </Typography>
              <Typography color="neutral" level="body-sm">
                Unable to find &quot;{searchValue}&quot;
                <br />
                Try again Later
              </Typography>
            </Sheet>
          );
        }

        if (searchQuery.data?.length === 0) {
          return (
            <Sheet
              variant="solid"
              sx={{ flex: 1, width: "100%", mt: 2, overflowY: "auto" }}
            >
              <LogoShort
                sx={{
                  width: "40px",
                  height: "40px",
                  color: "neutral.500",
                  mt: 6,
                }}
              />
              <Typography color="neutral" level="body-lg">
                There are no BOSSes around that go by the name &quot;
                {searchValue}&quot;
              </Typography>
            </Sheet>
          );
        }

        return (
          <Sheet
            variant="solid"
            sx={{ flex: 1, width: "100%", mt: 2, overflowY: "auto", color: "neutral.500" }}
          >
            <List sx={{}}>
              {searchQuery.data.map((user) => (
                <ListItem
                  key={user.address}
                  sx={{ width: "100%" }}
                >
                  <Avatar src={user.address} alt={user.username} />
                  <Stack sx={{
                    alignItems: "flex-start",
                    flexGrow: 1,
                    minWidth: 0,
                  }}>
                    <Typography>{user.username}</Typography>
                    <Typography
                      level="body-sm"
                      sx={{
                        textAlign: "left",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        width: "100%",
                      }}
                    >
                      {user.address}
                    </Typography>
                  </Stack>
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
        );
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
          <ModalDialog 
            variant="solid"
            sx={{ width: "100%", maxWidth: "sm", color: "neutral.500" }}
            layout={isMediumScreen ? "center" : "fullscreen"} 
          >
              <ModalClose variant="plain" sx={{ m: 1 }} />

              <Typography level="h4">Confirm Nomination</Typography>
              
              <Stack sx={{ alignItems: "center" }}>
                <Avatar 
                  sx={{ width: "48px", height: "48px", mb: 1 }}
                  src={selectedUser?.profile_image} 
                  alt={selectedUser?.username} 
                />
                <Typography level="title-lg" textColor="common.black">{selectedUser?.username}</Typography>
                <Typography level="body-sm">{selectedUser?.address}</Typography>
              </Stack>

              <Stack sx={{ gap: 1.5, width: "100%", my: 3 }}>
                <Divider sx={{ backgroundColor: "neutral.400" }} />

                <Stack direction="row">
                  <Typography level="body-sm">
                    Date
                  </Typography>
                  <LogoShort sx={{ ml: "auto", mr: 0.5 }} color={date ? "primary" : "neutral"} />
                  <Typography level="body-sm" textColor="common.black">{date ?? "--"}</Typography>
                </Stack>

                <Stack direction="row">
                  <Typography level="body-sm">
                    My Daily Budget
                  </Typography>
                  <LogoShort sx={{ ml: "auto", mr: 0.5 }} color={date ? "primary" : "neutral"} />
                  <Typography level="body-sm" textColor="common.black">{dailyBudget ?? "--"}</Typography>
                </Stack>

                <Stack direction="row">
                  <Typography level="body-sm">
                    BOSS Points Sent
                    </Typography>
                  <LogoShort sx={{ ml: "auto", mr: 0.5 }} color={date ? "primary" : "neutral"} />
                  <Typography level="body-sm" textColor="common.black">{bossPointsSent ?? "--"}</Typography>
                </Stack>

                <Stack direction="row">
                  <Typography level="body-sm">
                    BOSS Points Earned
                  </Typography>
                  <LogoShort sx={{ ml: "auto", mr: 0.5 }} color={date ? "primary" : "neutral"} />
                  <Typography level="body-sm" textColor="common.black">{bossPointsEarned ?? "--"}</Typography>
                </Stack>

                <Divider sx={{ backgroundColor: "neutral.400" }} />

                <Stack direction="row" justifyContent="space-between">
                  <Typography level="body-sm">
                    My BOSS Points
                  </Typography>
                  <LogoShort sx={{ ml: "auto", mr: 0.5 }} color={date ? "primary" : "neutral"} />
                  <Typography level="title-md" textColor="common.black">{totalBossPoints ?? "--"}</Typography>
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
          </ModalDialog>
        </ModalOverflow>
      </Modal>
    </Stack>
  );
};
