import { Box, Flex, Grid, Text } from '@radix-ui/themes';
import HourField from './components/HourField';
import { hourlyWageAtom, midnightTimeAtom, monthlyWageAtom, totalTimeAtom, wageAtom } from './stores';
import { useAtomValue } from 'jotai';

export default function App() {
  const wage = useAtomValue(wageAtom);
  const monthlyWage = useAtomValue(monthlyWageAtom);

  return (
    <Flex height="100vh" width="100vw" justify="center" align="center">
      <Box>
        <Flex p="4" gap="1" direction="column">
          <HourField name="合計" unit="時間" atom={totalTimeAtom} />
          <HourField name="深夜" unit="時間" atom={midnightTimeAtom} />
          <HourField name="時給" unit="円" atom={hourlyWageAtom} />
        </Flex>

        <Grid rows="2" columns="2" p="2">
          <Text as="p" size="4" align="left">
            現在
          </Text>
          <Text as="p" size="6" align="right">
            {wage}円
          </Text>

          <Text as="p" size="4" align="left">
            推定
          </Text>
          <Text as="p" size="6" align="right">
            {monthlyWage}円
          </Text>
        </Grid>
      </Box>
    </Flex>
  );
}
