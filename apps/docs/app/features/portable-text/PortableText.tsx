import { ListItem, OrderedList, UnorderedList } from "@chakra-ui/react";
import {
  PortableText,
  PortableTextComponentsProvider as SanityPortableTextComponentsProvider,
  PortableTextReactComponents,
} from "@portabletext/react";
import {
  Box,
  Button,
  Divider,
  Flex,
  Image,
  Link,
  SimpleGrid,
  Stack,
  Text,
} from "@vygruppen/spor-react";
import React from "react";
import { Link as InternalLink } from "remix";
import { urlBuilder } from "~/utils/sanity/utils";
import { LinkableHeading } from "../linkable-heading/LinkableHeading";

const components: Partial<PortableTextReactComponents> = {
  marks: {
    link: ({ value, children }) => {
      const isExternal = value.href.startsWith("http");
      if (isExternal) {
        return (
          <Link variant="primary" href={value.href}>
            {children}
          </Link>
        );
      }

      return (
        <Link variant="primary" as={InternalLink} to={value.href}>
          {children}
        </Link>
      );
    },
  },
  block: {
    h2: ({ children }) => (
      <LinkableHeading as="h2" textStyle="lg" fontWeight="bold" mt={6} mb={-1}>
        {children}
      </LinkableHeading>
    ),
    h3: ({ children }) => (
      <LinkableHeading as="h3" textStyle="md" fontWeight="bold" mt={2}>
        {children}
      </LinkableHeading>
    ),
    h4: ({ children }) => (
      <LinkableHeading as="h4" textStyle="sm" fontWeight="bold" mt={2}>
        {children}
      </LinkableHeading>
    ),
    h5: ({ children }) => (
      <LinkableHeading as="h5" textStyle="xs" fontWeight="bold" mt={2}>
        {children}
      </LinkableHeading>
    ),
    h6: ({ children }) => (
      <LinkableHeading as="h6" textStyle="xs" mt={2}>
        {children}
      </LinkableHeading>
    ),
    normal: ({ children }) => {
      const arrayChildren = React.Children.toArray(children);
      if (!arrayChildren.length || arrayChildren.join("") === "") {
        return null;
      }
      return (
        <Text textStyle="sm" mt={3}>
          {children}
        </Text>
      );
    },
  },
  list: {
    bullet: ({ children }) => (
      <UnorderedList mt={6} textStyle="sm">
        {children}
      </UnorderedList>
    ),
    number: ({ children }) => (
      <OrderedList mt={6} textStyle="sm">
        {children}
      </OrderedList>
    ),
  },
  listItem: ({ children }) => <ListItem>{children}</ListItem>,
  types: {
    buttonLink: ({ value }) => {
      const isExternal = value.url.startsWith("/");
      const linkProps: any = isExternal
        ? { as: "a", href: value.url }
        : { as: Link, to: value.url };
      return (
        <Box mt={3}>
          <Button variant={value.variant} size={value.size} {...linkProps}>
            {value.text}
          </Button>
        </Box>
      );
    },
    divider: () => <Divider height="1px" mt={6} />,
    introduction: ({ value }) => {
      return (
        <Stack spacing={3}>
          <PortableText
            value={value.content}
            components={{
              block: {
                normal: ({ children }) => (
                  <Text textStyle="md">{children}</Text>
                ),
              },
            }}
          />
        </Stack>
      );
    },
    grid: ({ value }) => (
      <SimpleGrid columns={[1, 2, value.maxNumberOfColumns]} gap={6} mt={6}>
        {value.content.map((item: any) => (
          <PortableText value={item} key={item._key} />
        ))}
      </SimpleGrid>
    ),
    gridCell: ({ value }) => {
      const alignmentMap = {
        top: "flex-start",
        center: "center",
        bottom: "flex-end",
      };
      const alignItems =
        alignmentMap[value.verticalAlignment as keyof typeof alignmentMap] ??
        "flex-start";
      return (
        <Flex justifyContent="center" alignItems={alignItems}>
          <Box>
            <PortableText value={value.content} />
          </Box>
        </Flex>
      );
    },
    imageWithCaption: ({ value }) => (
      <Stack spacing={2}>
        {value.image && (
          <Box>
            <Image
              src={urlBuilder
                .image(value.image)
                .width(924)
                .fit("max")
                .auto("format")
                .url()}
              alt={value.alt || ""}
              mx="auto"
              mt={2}
              borderRadius="md"
            />
          </Box>
        )}
        {value.caption && (
          <Stack textStyle="sm" color="alias.osloGrey">
            <PortableText value={value.caption} />
          </Stack>
        )}
      </Stack>
    ),
    image: ({ value }) => (
      <Image
        src={urlBuilder
          .image(value.image)
          .width(924)
          .fit("max")
          .auto("format")
          .url()}
        alt={value.alt}
        mx="auto"
        mt={2}
        borderRadius="md"
      />
    ),
  },
};

type PortableTextProps = { children: React.ReactNode };
export const PortableTextProvider = ({ children }: PortableTextProps) => {
  return (
    <SanityPortableTextComponentsProvider components={components}>
      {children}
    </SanityPortableTextComponentsProvider>
  );
};