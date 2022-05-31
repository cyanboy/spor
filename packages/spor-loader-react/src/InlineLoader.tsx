import { Box, BoxProps, Center } from "@chakra-ui/react";
import React from "react";
import { inlineLoaderData } from "@vygruppen/spor-loader";
import { ClientOnly } from "./ClientOnly";
import Lottie from "./Lottie";

export type InlineLoaderProps = Exclude<BoxProps, "children">;
/**
 * Loading component that works well in bounded contexts, like inside a button.
 */
export const InlineLoader = ({
  width,
  maxWidth,
  ...props
}: InlineLoaderProps) => {
  return (
    <Center {...props}>
      <Box width={width} maxWidth={maxWidth}>
        <ClientOnly>
          {() => <Lottie animationData={inlineLoaderData} />}
        </ClientOnly>
      </Box>
    </Center>
  );
};