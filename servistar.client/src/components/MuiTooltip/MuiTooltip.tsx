import {
  Tooltip,
  TooltipProps,
  Zoom,
  styled,
  tooltipClasses,
} from "@mui/material";

const TooltipStyled = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.black,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.black,
    fontSize: "0.9rem",
    textAlign: "center",
    textWrap: "wrap",
  },
}));

export type MuiTooltipProps = {
  messageTooltip: string;
  children: any;
  placement?: "bottom" | "top" | "left" | "right";
};

export default function MuiTooltip({
  messageTooltip,
  children,
  placement = "bottom",
}: MuiTooltipProps) {
  return (
    <TooltipStyled
      title={messageTooltip}
      disableInteractive
      TransitionComponent={Zoom}
      placement={placement}
    >
      {children}
    </TooltipStyled>
  );
}
