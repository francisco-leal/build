"use client";

import { LogoShort } from "@/shared/icons";
import { Button, Modal, ModalClose, ModalDialog, Stack, Typography } from "@mui/joy";
import { useRouter } from 'next/navigation'

export default function NominatedBuilderNotFound() {
    const router = useRouter();

    return (
        <Modal open onClose={() => router.push("../../")}>
            <ModalDialog 
                sx={{ 
                    width: "100%", 
                    maxWidth: "sm", 
                    color: "neutral.500",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <ModalClose variant="plain" sx={{ m: 1 }} />
                <LogoShort
                    sx={{
                        width: "40px",
                        height: "40px",
                        color: "neutral.500",
                        mt: 12,
                    }}
                />
                <Typography color="neutral" level="body-lg" sx={{ mb: 6 }}>
                    Builder not found
                </Typography>
                <Stack sx={{ flexDirection: "row", justifyContent: "end", gap: 1, width: "100%" }}>
                        <Button
                            variant="outlined"
                            color="neutral"
                            onClick={() => router.push("../../")}
                            sx={{ color: "neutral.500", borderColor: "neutral.500" }}
                        >
                            Cancel
                        </Button>
                    
                    </Stack>
            </ModalDialog>
        </Modal>
    );
} 