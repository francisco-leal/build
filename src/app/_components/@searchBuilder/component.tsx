"use client";

import { FunctionComponent, useState } from "react";
import { usePathname } from "next/navigation";
import {
  Avatar,
  Button,
  CircularProgress,
  Divider,
  Input,
  Link,
  List,
  ListItem,
  Sheet,
  Stack,
  StackProps,
  Typography,
  Select,
  Option,
  Grid,
} from "@mui/joy";
import { useQuery } from "@tanstack/react-query";
import { useShareLink } from "@/app/_hooks/useShareLink";
import { useDebounce } from "@/shared/hooks/use-debounce";
import { LogoShort } from "@/shared/icons/logo-short";
import { SearchFilled } from "@/shared/icons/search-filled";
import { abbreviateWalletAddress } from "@/shared/utils/abbreviate-wallet-address";

export type SearchBuilderComponentProps = {
  date: string;
  dailyBudget?: number;
  totalBossPoints?: number;
} & StackProps;

export type SearchResponseUser = {
  address: string;
  dapp: string;
  profile_image: string;
  username: string;
  result_origin: string;
};

const SearchOptions = {
  farcaster: "Farcaster",
  talent_protocol: "Talent Protocol",
  // lens: "Lens",
  // ENS: "ENS",
} as {
  [key: string]: string;
};

export const SearchBuilderComponent: FunctionComponent<
  SearchBuilderComponentProps
> = ({ date, dailyBudget, totalBossPoints, ...props }) => {
  const [shareLink, onShareLink] = useShareLink();
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchDomain, setSearchDomain] = useState<string>("farcaster");
  const debouncedSearchValue = useDebounce(searchValue, 500);
  const pathname = usePathname();

  const searchQuery = useQuery({
    queryKey: ["search", debouncedSearchValue, searchDomain],
    enabled: debouncedSearchValue.length > 2,
    placeholderData: [],
    queryFn: async (): Promise<SearchResponseUser[]> => {
      const baseUrl = window.location.origin;
      const endpoint = new URL("/api/search", baseUrl);
      const params = { query: debouncedSearchValue, domain: searchDomain };
      endpoint.search = new URLSearchParams(params).toString();
      const data = fetch(endpoint.toString()).then((res) => res.json());
      return data as Promise<SearchResponseUser[]>;
    },
  });

  const handleSelectChange = (
    event: React.SyntheticEvent | null,
    newValue: string | null,
  ) => {
    if (!newValue) return;
    setSearchDomain(newValue);
    searchQuery.refetch();
  };

  return (
    <Stack {...props}>
      <Grid
        sx={{ display: "flex", flexDirection: "row", width: "100%", gap: 1 }}
      >
        <Select
          defaultValue={searchDomain}
          onChange={handleSelectChange}
          sx={{
            borderRadius: 0,
            minWidth: "120px",
          }}
        >
          {Object.keys(SearchOptions).map((key) => (
            <Option key={`search-option-${key}`} value={key}>
              {SearchOptions[key]}
            </Option>
          ))}
        </Select>
        <Input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value ?? "")}
          startDecorator={
            <SearchFilled sx={{ color: "neutral.500", opacity: "0.64" }} />
          }
          placeholder={`Search for builders on ${SearchOptions[searchDomain]}...`}
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
      </Grid>

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
                  onClick={onShareLink}
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
                There are no BUILDers around that go by the name &quot;
                {searchValue}&quot;
              </Typography>
            </Sheet>
          );
        }

        return (
          <Sheet
            variant="solid"
            sx={{
              flex: 1,
              width: "100%",
              mt: 2,
              overflowY: "auto",
              color: "neutral.500",
            }}
          >
            <List sx={{}}>
              {searchQuery.data.map((user) => (
                <ListItem key={user.address} sx={{ width: "100%" }}>
                  <Avatar src={user.profile_image} alt={user.username} />
                  <Stack
                    sx={{
                      alignItems: "flex-start",
                      flexGrow: 1,
                      minWidth: 0,
                    }}
                  >
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
                      {abbreviateWalletAddress(user.address)}
                    </Typography>
                  </Stack>
                  <Button
                    // Scroll is not recognized by ButtonProps, but it's part of Next Link
                    {...{ scroll: false }}
                    component={Link}
                    href={(pathname + `/nominate/${user.address}`).replace(
                      "//",
                      "/",
                    )}
                    disabled={!user.address}
                    variant="solid"
                    sx={{ height: "auto" }}
                  >
                    {user.address ? "Nominate" : "No wallet"}
                  </Button>
                </ListItem>
              ))}
            </List>
          </Sheet>
        );
      })()}
    </Stack>
  );
};
