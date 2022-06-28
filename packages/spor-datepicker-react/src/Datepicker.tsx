import React from "react";

import {
  Box,
  BoxProps,
  Popover,
  PopoverContent,
  Portal,
  StylesProvider,
  useFormControl,
  useMultiStyleConfig,
} from "@chakra-ui/react";
import { Calendar } from "./Calendar";
import { DateInput } from "./DateInput";
import {
  DatepickerControlProps,
  DatepickerProvider,
} from "./DatepickerContext";

type DatepickerProps = DatepickerControlProps &
  BoxProps & {
    size?: "sm" | "lg";
  };

/**  */
export const Datepicker = ({
  value,
  onChange,
  defaultValue,
  size,
  ...boxProps
}: DatepickerProps) => {
  const formControlProps = useFormControl(boxProps);
  const styles = useMultiStyleConfig("Datepicker", {
    size,
    ...formControlProps,
  });

  return (
    <DatepickerProvider
      value={value}
      onChange={onChange}
      defaultValue={defaultValue}
    >
      <Box {...boxProps}>
        <Popover placement="bottom-start">
          <StylesProvider value={styles}>
            <DateInput />
            <Portal>
              <PopoverContent>
                <Calendar />
              </PopoverContent>
            </Portal>
          </StylesProvider>
        </Popover>
      </Box>
    </DatepickerProvider>
  );
};
