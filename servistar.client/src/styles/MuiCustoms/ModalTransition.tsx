import { Zoom } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { forwardRef } from "react";

export const ModalTransition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Zoom ref={ref} {...props} />;
});
