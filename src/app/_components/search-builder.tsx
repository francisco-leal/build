"use client";

import { FunctionComponent, useEffect, useState } from "react";
import { default as NextLink } from "next/link";
import { usePathname } from "next/navigation";
import {
  Avatar,
  Button,
  CircularProgress,
  Divider,
  Input,
  List,
  ListItem,
  Sheet,
  Stack,
  StackProps,
  Typography,
  Select,
  Option,
  Grid,
  Link,
} from "@mui/joy";
import { useQuery } from "@tanstack/react-query";
import { useShareLink } from "@/app/_hooks/useShareLink";
import { useDebounce } from "@/shared/hooks/use-debounce";
import { LogoShort } from "@/shared/icons/logo-short";
import { SearchFilled } from "@/shared/icons/search-filled";
import { abbreviateWalletAddress } from "@/shared/utils/abbreviate-wallet-address";

export type SearchBuilderProps = StackProps;

type SearchResponseUser = {
  wallet: string;
  username: string;
  userImage: string;
};

const SearchOptions: Record<string, string> = {
  farcaster: "Farcaster",
  talent_protocol: "Talent Protocol",
  // lens: "Lens",
  // ENS: "ENS",
} as const;

export const SearchBuilder: FunctionComponent<SearchBuilderProps> = (props) => {
  const [shareLink, onShareLink] = useShareLink();
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchDomain, setSearchDomain] = useState<string>("farcaster");
  const [loadingUser, setLoadingUser] = useState<string>();
  const pathname = usePathname();
  const debouncedSearchValue = useDebounce(searchValue, 500);

  const searchQuery = useQuery({
    queryKey: ["search", debouncedSearchValue, searchDomain],
    enabled: debouncedSearchValue.length >= 1,
    placeholderData: [],
    queryFn: async (): Promise<SearchResponseUser[]> => {
      const baseUrl = window.location.origin;
      const endpoint = new URL("/api/search", baseUrl);
      const params = { query: debouncedSearchValue, domain: searchDomain };
      endpoint.search = new URLSearchParams(params).toString();
      const data = await fetch(endpoint.toString()).then((res) => res.json());
      return data as SearchResponseUser[];
    },
  });

  useEffect(function clearLoadingUser() {
    if (pathname.includes("nominate"))
      setTimeout(() => setLoadingUser(undefined), 500);
  });

  return (
    <Stack
      {...props}
      sx={{ alignItems: "center", width: "100%", height: 280, ...props.sx }}
    >
      <Grid
        sx={{ display: "flex", flexDirection: "row", width: "100%", gap: 1 }}
      >
        <Select
          value={searchDomain}
          onChange={(_, v) => v && setSearchDomain(v)}
          placeholder={SearchOptions[searchDomain]}
          renderValue={(v) => SearchOptions[searchDomain].split(" ")[0]}
          sx={{
            borderRadius: 0,
            width: "180px",
          }}
        >
          {Object.keys(SearchOptions).map((key) => (
            <Option key={key} value={key} sx={{ color: "neutral.600" }}>
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

        if (searchValue.length < 1) {
          return (
            <>
              <Divider sx={{ my: 2 }}>
                <Typography level="title-lg" sx={{ color: "common.white" }}>
                  Or
                </Typography>
              </Divider>
              <Link
                href={
                  "https://buildcommunity.notion.site/BUILD-FAQ-51bd011214534fa596f15632ef788b10?pvs=74"
                }
                target="_blank"
                sx={{ color: "common.white", textDecoration: "underline" }}
              >
                Check the eligibility criteria to claim $BUILD tokens from
                Airdrop 1
              </Link>
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
            <List>
              {searchQuery.data.map((user) => (
                <ListItem
                  key={`${user.username}-${user.wallet}`}
                  sx={{ width: "100%" }}
                >
                  <Avatar src={user.userImage} alt={user.username} />
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
                      {abbreviateWalletAddress(user.wallet)}
                    </Typography>
                  </Stack>
                  <Button
                    component={NextLink}
                    scroll={false}
                    href={`/nominate/${user.wallet}`}
                    disabled={!!loadingUser && loadingUser !== user.wallet}
                    loading={loadingUser === user.wallet}
                    onClick={() => setLoadingUser(user.wallet)}
                    variant="solid"
                    sx={{ height: "auto" }}
                  >
                    Nominate
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
