import {
  Box,
  InputGroup,
  Popover,
  PopoverAnchor,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  ResponsiveValue,
  useBreakpointValue,
} from "@chakra-ui/react";
import { DateValue } from "@internationalized/date";
import { useDatePicker } from "@react-aria/datepicker";
import { useDatePickerState } from "@react-stately/datepicker";
import { CalendarOutline24Icon } from "@vygruppen/spor-icon-react";
import React, { useRef } from "react";
import { AriaDatePickerProps, I18nProvider } from "react-aria";
import { Calendar } from "./Calendar";
import { CalendarTriggerButton } from "./CalendarTriggerButton";
import { DateField, StyledField } from "./DateField";
import { useCurrentLocale } from "./utils";

type DatePickerProps = AriaDatePickerProps<DateValue> & {
  variant: ResponsiveValue<"simple" | "with-trigger">;
};
/**
 * A date picker component.
 *
 * There are two versions of this component – a simple one, and one with a trigger button for showing the calendar. Use whatever fits your design.
 *
 * ```tsx
 * <DatePicker label="Dato" variant="simple" />
 * ```
 */
export function DatePicker({ variant, ...props }: DatePickerProps) {
  const state = useDatePickerState({
    ...props,
    shouldCloseOnSelect: true,
  });
  const ref = useRef(null);
  const {
    groupProps,
    labelProps,
    fieldProps,
    buttonProps,
    dialogProps,
    calendarProps,
  } = useDatePicker(props, state, ref);

  const responsiveVariant =
    useBreakpointValue(typeof variant === "string" ? [variant] : variant) ??
    "simple";

  const locale = useCurrentLocale();

  const handleEnterClick = (e: React.KeyboardEvent) => {
    if (responsiveVariant === "simple" && e.key === "Enter" && !state.isOpen) {
      // Don't submit the form
      e.stopPropagation();
      state.setOpen(true);
    }
  };

  const onFieldClick = () => {
    if (!hasTrigger) {
      state.setOpen(true);
    }
  };

  const hasTrigger = responsiveVariant === "with-trigger";

  return (
    <I18nProvider locale={locale}>
      <Box position="relative" display="inline-flex" flexDirection="column">
        <Popover
          {...dialogProps}
          isOpen={state.isOpen}
          onClose={() => state.setOpen(false)}
          onOpen={() => state.setOpen(true)}
          closeOnBlur
          closeOnEsc
          returnFocusOnClose
        >
          <InputGroup
            {...groupProps}
            ref={ref}
            width="auto"
            display="inline-flex"
          >
            <PopoverAnchor>
              <StyledField
                variant={responsiveVariant}
                onClick={onFieldClick}
                onKeyPress={handleEnterClick}
              >
                {!hasTrigger && (
                  <CalendarOutline24Icon mr={2} alignSelf="center" />
                )}
                <DateField
                  label={props.label}
                  labelProps={labelProps}
                  {...fieldProps}
                />
              </StyledField>
            </PopoverAnchor>
            {hasTrigger && <CalendarTriggerButton {...buttonProps} />}
          </InputGroup>
          {state.isOpen && (
            <PopoverContent
              backgroundColor="alias.white"
              color="alias.darkGrey"
              boxShadow="md"
            >
              <PopoverArrow backgroundColor="white" />
              <PopoverBody>
                <Calendar {...calendarProps} />
              </PopoverBody>
            </PopoverContent>
          )}
        </Popover>
      </Box>
    </I18nProvider>
  );
}