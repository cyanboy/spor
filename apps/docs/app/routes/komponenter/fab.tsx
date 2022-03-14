import {
  Box,
  BoxProps,
  Stack,
  Text,
} from "@vygruppen/spor-react";
import { ComponentDocs } from "~/features/component-docs/ComponentDocs";
import { ComponentPlayground } from "~/features/component-playground/ComponentPlayground";
import { usePlaygroundProps } from "~/features/component-playground/usePlaygroundProps";
import { toPropsString } from "~/features/component-playground/utils";
import { LinkableHeading } from "~/features/linkable-heading/LinkableHeading";

export default function FloatingActionButtonPage() {
  return (
    <ComponentDocs
      title="Floating action button"
      description="Chips gjør det mulig å skru av og på funksjonalitet, eller velge et eller flere alternativer."
    >
      <DemoArea />
      <Guidelines />
    </ComponentDocs>
  );
}

const DemoArea = (props: BoxProps) => {
  const { currentProps, propList, onPropsChange } = usePlaygroundProps([
    {
      name: "colorScheme",
      defaultValue: "dark",
      type: "select",
      values: ["dark", "light", "green"],
    },

    { name: "children", defaultValue: "Kontroll", type: "input" },
  ]);
  const code = `
    <FloatingActionButton 
      icon={<TicketControlFill30Icon /> }
      ${toPropsString(currentProps)}
    />`;
  return (
    <Box {...props}>
      <ComponentPlayground
        code={code}
        propList={propList}
        currentProps={currentProps}
        onPropsChange={onPropsChange}
      />
    </Box>
  );
};

const Guidelines = (props: BoxProps) => {
  return (
    <Stack {...props} spacing={8}>
      <Stack spacing={3}>
        <LinkableHeading as="h2" textStyle="xl-display">
          Retningslinjer
        </LinkableHeading>
        <Stack spacing={2}>
          <LinkableHeading as="h3" textStyle="xs" fontWeight="bold">
            Choice chips
          </LinkableHeading>
          <Text>
            Dette er knapper som ofte brukes til å definere et resultat. Du skal
            kunne skru av og på samtlige choice chips og få resultater deretter,
            som for eksempel et reisesøk hvor du kun ønsker å se buss og
            togreiser fra kun en leverandør. Ett annet eksempel er muligheten
            til å velge flere kategorier i tilbakemeldingsmodalen. Det skal
            helst være flere valg-alternativer før man bruker Choice chips.
          </Text>
          <LinkableHeading as="h3" textStyle="xs" fontWeight="bold">
            Filter chips
          </LinkableHeading>
          <Text>
            Når man aktivt skal vise filtrering av resultatene som gis kan det
            være lurt å bruke Filter chips. Her tydeliggjør man at valgene man
            har tatt kan krysses ut og resultatet vil endre seg. Designer man et
            keyword søk eller har et navigasjonsmønster som endrer seg etter
            valgte kategorier kan det være lurt å bruke Filter chips. Et god
            eksempel er filtrering av Turtips, hvor du først får et valg om
            sted, deretter får du et valg om vanskelighetsgrad og type tur du
            ønsker å ta. Med Filter chips kan du enkelt velge bort deler eller
            alle valgene du har gjort.
          </Text>
          <LinkableHeading as="h3" textStyle="xs" fontWeight="bold">
            Icon chips
          </LinkableHeading>
          <Text>
            Disse brukes i hovedsak for å tydeliggjøre valgene du har gjort i en
            oversikt som henger sammen med resultatene du ser. De brukes der det
            er viktig å bruke liten plass, men samtidig visualisere valgene du
            har gjort og raskt ta deg tilbake til f.eks. modalen eller skuffen
            med valg-alternativene.
          </Text>
        </Stack>
      </Stack>
      <Stack spacing={2}>
        <LinkableHeading as="h3" textStyle="md" fontWeight="bold">
          Design
        </LinkableHeading>
        <Text>
          Knappene kommer i fire størrelser, lg, md, sm og xs . Valg av
          størrelse skal passe flyt og andre elementer Alle størrelsene finnes i
          en dynamisk og en kompakt variant. Dynamisk skal følge skjermstørrelse
          eller størrelsen på elementet den er i, og har variabel padding på
          sidene. Kompakt skal følge lengden på innholdet i knappen, og har
          fastsatt padding på begge sider. Alle størrelsene finnes i tre ulike
          layout versjoner. En med kun tekst, en med venstrestilt ikon og en med
          høyrestilt ikon. Det eneste unntaket er Tilleggsknapp som har en
          ekstra layoutvariant med venstre og høyrestilt ikon.
        </Text>
      </Stack>
    </Stack>
  );
};
