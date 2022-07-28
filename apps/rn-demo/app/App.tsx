import {
  Heading,
  SporProvider,
  Stack,
  Text,
  ExpandableAlert,
  SimpleAlert,
  ClosableAlert,
} from "@vygruppen/spor-react-native";
import {
  AltTransportOutline18Icon,
  DeleteCircleOutline18Icon,
  InformationOutline18Icon,
  SuccessOutline18Icon,
  WarningOutline18Icon,
} from "@vygruppen/spor-icon-react-native";
import React from "react";
import { Linking, SafeAreaView, TouchableOpacity } from "react-native";

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
          justifyContent="space-around"
          alignItems={"center"}
        >
          <Heading color="darkGrey" variant="2xl" textAlign="center">
            Spor Demo app
          </Heading>

          <SimpleAlert
            colorScheme="yellow"
            leftIcon={<AltTransportOutline18Icon />}
          >
            Informasjon om alternativ transport for avganger som ikke går som
            normalt.
          </SimpleAlert>
          <SimpleAlert
            colorScheme="light-yellow"
            leftIcon={<WarningOutline18Icon />}
          >
            Informasjon om alternativ transport for avganger som ikke går som
            normalt.
          </SimpleAlert>
          <SimpleAlert
            colorScheme="orange"
            leftIcon={<InformationOutline18Icon />}
          >
            Informasjon om alternativ transport for avganger som ikke går som
            normalt.
          </SimpleAlert>
          <ClosableAlert
            colorScheme="red"
            title="Feilmelding"
            leftIcon={<DeleteCircleOutline18Icon />}
            onClose={() => {
              console.log("Test av lukke-knapp");
            }}
          >
            <Text>
              Informasjon om brukerfeil og når noe har gått galt i kjøpsløpet.
            </Text>
          </ClosableAlert>
          <SimpleAlert colorScheme="green" leftIcon={<SuccessOutline18Icon />}>
            Informasjon om alternativ transport for avganger som ikke går som
            normalt.
          </SimpleAlert>
          <ExpandableAlert
            colorScheme="blue"
            leftIcon={<InformationOutline18Icon />}
            title="Informasjon"
            onToggle={() => console.log("Test av onToogle")}
          >
            <Text>
              Generell positiv informasjon, som påvirker den reisende i liten og
              mellomstor betydning. {"\n"}
            </Text>
            <TouchableOpacity
              accessibilityRole="link"
              onPress={() =>
                Linking.openURL(
                  "https://spor.cloud.vy.no/ressurser/design-tokens"
                )
              }
            >
              <Text variant="xs" textDecorationLine={"underline"}>
                Link til mer informasjon
              </Text>
            </TouchableOpacity>
          </ExpandableAlert>
        </Stack>
      </SafeAreaView>
    </SporProvider>
  );
};

export default App;
