import {Box, Flex, Text} from 'native-base';

interface IList {
  list: TItem[];
}

type TItem = {
  label: string;
  value: number;
};

const HomeAnalysis = ({list}: IList) => {
  return (
    <Flex direction="row" flexWrap="wrap">
      {list.map((item, item_index) => (
        <HomeAnalysisItem key={item_index} {...item} />
      ))}
    </Flex>
  );
};
const HomeAnalysisItem = ({label, value}: TItem) => {
  return (
    <Box width="1/2" my={1}>
      <Text textAlign="center">{label}</Text>
      <Text textAlign="center">{value}</Text>
    </Box>
  );
};

export default HomeAnalysis;
