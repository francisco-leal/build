import { FunctionComponent } from "react";
import { Sheet, SheetProps } from "@mui/joy";

export type BlockyCardProps = SheetProps;

export const BlockyCard: FunctionComponent<SheetProps> = ({
  variant = "outlined",
  ...props
}) => (
  <Sheet
    {...props}
    variant={variant}
    sx={{
      flex: 1,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      p: 5,
      gap: 1,

      "& svg": {
        color: "primary.500",
        width: 48,
        height: 48,
      },

      ...props.sx,
    }}
  />
);
