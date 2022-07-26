import {
  Heading,
  SporProvider,
  Stack,
  Text,
  ExpandableAlert,
  SimpleAlert,
  ClosableAlert,
  Expandable,
} from "@vygruppen/spor-react-native";
import {
  AltTransportOutline18Icon,
  CloseOutline18Icon,
  DeleteCircleOutline18Icon,
  InformationOutline18Icon,
  SuccessOutline18Icon,
  WarningOutline18Icon,
} from "@vygruppen/spor-icon-react-native";
import React from "react";
import { SafeAreaView } from "react-native";

/**
 * The entry point of the Spor RN demo app
 */

const App = () => {
  return (
    <SporProvider>
      <SafeAreaView>
        <Stack
          backgroundColor="white"
          height="100%"
          width={284}
          p={2}
          justifyContent="center"
          alignItems={"center"}
        >
          <Heading color="darkGrey" variant="2xl" textAlign="center">
            Spor Demo app
          </Heading>

          <ExpandableAlert
            color="blue"
            icon={<InformationOutline18Icon />}
            title="Informasjon"
          >
            Generell positiv informasjon, som påvirker den reisende i liten og
            mellomstor betydning.{" "}
          </ExpandableAlert>
          <SimpleAlert color="yellow" icon={<AltTransportOutline18Icon />}>
            Informasjon om alternativ transport for avganger som ikke går som
            normalt.
          </SimpleAlert>
          <ClosableAlert
            color="red"
            title="Feilmelding"
            icon={<DeleteCircleOutline18Icon />}
          >
            Informasjon om brukerfeil og når noe har gått galt i kjøpsløpet.
          </ClosableAlert>
        </Stack>
      </SafeAreaView>
    </SporProvider>
  );
};

export default App;
