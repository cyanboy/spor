import {
  Box,
  BoxProps,
  Card,
  ComponentsOutline30Icon,
  Container,
  Flex,
  GuidelinesOutline30Icon,
  Heading,
  HomeOutline30Icon,
  IconsOutline30Icon,
  SettingsX1Outline30Icon,
  SimpleGrid,
  Text,
  TokensOutline30Icon,
} from "@vygruppen/spor-react";
import { Link } from "remix";

type LinkItem = {
  to: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  iconColor: string;
};

// These are the links that are rendered in the action links section.
const links: LinkItem[] = [
  {
    to: "/ressurser/kom-i-gang",
    title: "Kom i gang",
    description: "Sett opp Spor i ditt prosjekt på få minutter",
    icon: HomeOutline30Icon,
    iconColor: "alias.lightBlue",
  },
  {
    to: "/komponenter",
    title: "Komponenter",
    description:
      "Se byggeklossene du har tilgjengelig for å bygge brukergrensesnitt",
    icon: ComponentsOutline30Icon,
    iconColor: "alias.champagne",
  },
  {
    to: "/ressurser/design-tokens",
    title: "Design Tokens",
    description:
      "Se farger, størrelser og de andre atomene Spor er bygget opp av",
    icon: TokensOutline30Icon,
    iconColor: "alias.champagne",
  },
  {
    to: "/ressurser/profil",
    title: "Profil",
    description:
      "Lær mer om den visuelle profilen til Vy, og hva den inneholder",
    icon: GuidelinesOutline30Icon,
    iconColor: "alias.seaMist",
  },
  {
    to: "/ressurser/ikoner",
    title: "Ikoner",
    description: "Utfork Spor sitt ikonbibliotek",
    icon: IconsOutline30Icon,
    iconColor: "alias.primrose",
  },
  {
    to: "/ressurser/api",
    title: "API",
    description: "Utforsk APIene til Vy",
    icon: SettingsX1Outline30Icon,
    iconColor: "alias.silver",
  },
];

export function ActionLinks() {
  return (
    <Container maxWidth="container.lg">
      <SimpleGrid
        position="relative"
        top={["-62px", -8]}
        columns={[1, 2, 3]}
        spacing={[3, 4]}
      >
        {links.map((link) => (
          <ActionLinkCard key={link.to} to={link.to}>
            <IconCircle backgroundColor={link.iconColor} icon={link.icon} />
            <Box>
              <Heading as="h2" textStyle="md" mb={1.5} fontWeight="bold">
                {link.title}
              </Heading>
              <Text textStyle="sm">{link.description}</Text>
            </Box>
          </ActionLinkCard>
        ))}
      </SimpleGrid>
    </Container>
  );
}

type ActionLinkCardProps = {
  to: string;
  children: React.ReactNode;
};
function ActionLinkCard({ to, children }: ActionLinkCardProps) {
  return (
    <Card
      as={Link}
      to={to}
      p={4}
      variant="elevated"
      display="flex"
      flexDirection={["row", "column"]}
      gap={[3, 4]}
    >
      {children}
    </Card>
  );
}

type IconCircleProps = {
  backgroundColor: string;
  icon: React.ComponentType<BoxProps>;
};
function IconCircle({ backgroundColor, icon: Icon }: IconCircleProps) {
  return (
    <Flex
      width={["52px", "90px"]}
      height={["52px", "90px"]}
      flex={["0 0 52px", "0 0 90px"]}
      alignItems="center"
      justifyContent="center"
      borderRadius="round"
      backgroundColor={backgroundColor}
    >
      <Icon width={["30px", "60px"]} height={["30px", "60px"]} />
    </Flex>
  );
}