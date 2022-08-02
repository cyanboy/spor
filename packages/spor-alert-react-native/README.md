# Alert (React Native)


## Installation

```bash
$ npm install @vygruppen/spor-alert-react-native
```

## Usage

Alerts comes in three different variants: `<SimpleAlert>`, `<ClosableAlert>` and `<ExpandableAlert>`

`SimpleAlert`: a simple alert with no heading, and mandatory props: **children**, **colorScheme** and **leftIcon**. <br>
`ClosableAlert`: an alert with a closeButton. Mandatory props: **children**, **colorScheme**, **leftIcon**, **heading**, **onClose**. <br>
`ExpandableAlert`: an alert with expandable content and optional onToogle. Mandatory props: **children**, **colorScheme**, **leftIcon**, **heading**,
(optional props: defaultExpanded, onToogle)

`colorScheme` is either `yellow`, `light-yellow`, `orange`, `red`, `green` or `blue`,

```tsx
import {SimpleAlert, ClosableAlert, ExpandableAlert} from "@vygruppen/spor-alert-react-native";




example:

<SimpleAlert colorScheme="green" leftIcon={<SuccessOutline18Icon />}>
  Informasjon om alternativ transport for avganger som ikke går som normalt.
</SimpleAlert>


<ClosableAlert
  colorScheme="red"
  heading="Feilmelding"
  leftIcon={<DeleteCircleOutline18Icon />}
  onClose={() => {
    console.log("Test av lukke-knapp");
  }}
>
  <Text>Informasjon om brukerfeil og når noe har gått galt i kjøpsløpet.</Text>
</ClosableAlert>


<ExpandableAlert
  colorScheme="blue"
  leftIcon={<InformationOutline18Icon />}
  heading="Informasjon">
  <Text>
    Generell positiv informasjon, som påvirker den reisende i liten og
    mellomstor betydning. {"\n"}
  </Text>
</ExpandableAlert>;
```

## Development

Please refer to the root readme for development notes.