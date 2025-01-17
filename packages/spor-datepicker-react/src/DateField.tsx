import {
  Box,
  BoxProps,
  Flex,
  FormLabel,
  useFormControlContext,
  useMultiStyleConfig,
} from "@chakra-ui/react";
import { DateValue, GregorianCalendar } from "@internationalized/date";
import { useDateField, useDateSegment } from "@react-aria/datepicker";
import {
  DateSegment as DateSegmentType,
  useDateFieldState,
} from "@react-stately/datepicker";
import { DOMAttributes, FocusableElement } from "@react-types/shared";
import React, { forwardRef, useRef } from "react";
import { AriaDateFieldProps } from "react-aria";
import { DateFieldState } from "react-stately";
import { useCurrentLocale } from "./utils";

function createCalendar(identifier: string) {
  switch (identifier) {
    case "gregory":
      return new GregorianCalendar();
    default:
      throw new Error(`Unsupported calendar ${identifier}`);
  }
}

type DateFieldProps = AriaDateFieldProps<DateValue> & {
  label?: React.ReactNode;
  labelProps?: DOMAttributes<FocusableElement>;
  name?: string;
};
export function DateField(props: DateFieldProps) {
  const locale = useCurrentLocale();
  const styles = useMultiStyleConfig("Datepicker", {});
  const state = useDateFieldState({
    ...props,
    locale,
    createCalendar,
  });

  const ref = useRef(null);
  const { fieldProps, labelProps } = useDateField(props, state, ref);

  return (
    <Box>
      {props.label && (
        <FormLabel {...props.labelProps} {...labelProps} sx={styles.inputLabel}>
          {props.label}
        </FormLabel>
      )}
      <Flex {...fieldProps} ref={ref}>
        {state.segments.map((segment, i) => (
          <DateSegment key={i} segment={segment} state={state} />
        ))}
      </Flex>
      <input type="hidden" value={state.value?.toString()} name={props.name} />
    </Box>
  );
}
type StyledFieldProps = BoxProps & {
  variant: "simple" | "with-trigger";
};
export const StyledField = forwardRef<HTMLDivElement, StyledFieldProps>(
  ({ children, variant, ...otherProps }, ref) => {
    const { isInvalid } = useFormControlContext();
    const styles = useMultiStyleConfig("Datepicker", { variant });
    return (
      <Box
        sx={styles.wrapper}
        {...otherProps}
        ref={ref}
        aria-invalid={isInvalid}
      >
        {children}
      </Box>
    );
  }
);

type DateSegmentProps = {
  segment: DateSegmentType;
  state: DateFieldState;
};
function DateSegment({ segment, state }: DateSegmentProps) {
  const ref = useRef(null);
  const { segmentProps } = useDateSegment(segment, state, ref);
  return (
    <Box
      {...segmentProps}
      ref={ref}
      style={{
        ...segmentProps.style,
        fontVariantNumeric: "tabular-nums",
        boxSizing: "content-box",
      }}
      boxSizing="content-box"
      px="1px"
      textAlign="end"
      outline="none"
      borderRadius="xs"
      color={
        segment.isPlaceholder
          ? "osloGrey"
          : segment.isEditable
          ? "darkGrey"
          : "osloGrey"
      }
      _focus={{
        backgroundColor: "darkTeal",
        color: "white",
      }}
    >
      {segment.text}
    </Box>
  );
}
