import React from 'react';
import Box from '../../components/Box';
import Flex from '../../components/Flex';
import Text from '../../components/Text';
import { parseRawPrice } from './price';

let hrStyle={
  borderTopColor:'#E4E4E4',
  borderTopWidth:'1px',
  borderTopStyle:'solid'
};
// Create PriceSummary user interface
const PriceSummary = ({ summary, totalPrice }) => {
  return(
  <Box width={['290px', '450px']} padding='16px'>
      {summary.items.map((item)=>{
        return<Flex key={item.id} justifyContent='space-between' marginBottom='8px' fontSize='16px' lineHeight='27px'>
            <Text fontWeight={400}>{item.name} {item.selected > 1 ? 'x '+item.selected:''}</Text>
            <Text>{parseRawPrice(item.price)}</Text>
          </Flex>
      })}
      <Flex justifyContent='space-between' marginTop='8px' fontSize='16px' lineHeight='27px'>
            <Text fontWeight={400} >Shipping</Text>
            <Text>{parseRawPrice(summary.shippingPrice)}</Text>
      </Flex>
      <hr style={hrStyle}/>
      <Flex justifyContent='space-between' marginTop='8px' fontSize='16px' lineHeight='27px'>
            <Text fontWeight={600}>Total</Text>
            <Text fontWeight={600}>{parseRawPrice(summary.total)}</Text>
      </Flex>
  </Box>
)
};

export default PriceSummary;
