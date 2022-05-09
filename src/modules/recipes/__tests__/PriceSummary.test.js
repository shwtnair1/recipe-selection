import React from 'react';
import PriceSummary from '../PriceSummary';
import Enzyme, { shallow,mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { parseRawPrice } from '../price';
import Text from '../../../components/Text';

Enzyme.configure({ adapter: new Adapter() });

const summary={
    items:[{id:1,name:'test1',selected:1,price:1719},{id:2,name:'test2',selected:3,price:3535}],
    shippingPrice:2525,
}

const totalPrice='$77.79';

describe('PriceSummary',()=>{
  it("renders",()=>{
      const wrapper = shallow(<PriceSummary summary={summary} totalPrice={totalPrice}/>) ;
    expect(wrapper).toMatchSnapshot();
  })

  //Displays shipping Price and total price as $0.00
  it("renders without crashing, when there is no summary/totalPrice passed",()=>{
    const wrapper = shallow(<PriceSummary />) ;
  expect(wrapper).toMatchSnapshot();

  expect(wrapper.find({"data-testid":"item-list"})).toHaveLength(0);

  expect(wrapper.find({"data-testid":"shipping-price"})).toHaveLength(1);
  let children = wrapper.find({"data-testid":"shipping-price"}).find(Text);
  expect(children.at(1).text()).toBe(parseRawPrice(0));
  
  expect(wrapper.find({"data-testid":"total-price"})).toHaveLength(1);
  children = wrapper.find({"data-testid":"total-price"}).find(Text);
  expect(children.at(1).text()).toBe(parseRawPrice(0));
})

it("renders when there is no summary Items passed",()=>{
    const wrapper = shallow(<PriceSummary summary={{shippingPrice:0}} totalPrice={0}/>) ;
  expect(wrapper.find({"data-testid":"item-list"})).toHaveLength(0);
})

it("renders when there is empty summary Items passed",()=>{
    const wrapper = shallow(<PriceSummary summary={{items:[],shippingPrice:0}} totalPrice={0}/>) ;
  expect(wrapper.find({"data-testid":"item-list"})).toHaveLength(0);
})

it("renders price summary details correctly",()=>{
    const wrapper = shallow(<PriceSummary summary={summary} totalPrice={totalPrice}/>) ;
  expect(wrapper.find({"data-testid":"item-list"})).toHaveLength(2);
  expect(wrapper.find({"data-testid":"shipping-price"})).toHaveLength(1);
  expect(wrapper.find({"data-testid":"total-price"})).toHaveLength(1);
})

it("displays price details with correct parsing",()=>{
    const wrapper = shallow(<PriceSummary summary={summary} totalPrice={totalPrice}/>) ;
    let children = wrapper.find({"data-testid":"shipping-price"}).find(Text);
    expect(children.at(1).text()).toBe(parseRawPrice(summary.shippingPrice));
    children = wrapper.find({"data-testid":"item-list"}).find(Text);
    expect(children.at(1).text()).toBe(parseRawPrice(summary.items[0].price));
})

it("displays item when selected quantity is more than 1",()=>{
    const wrapper = shallow(<PriceSummary summary={summary} totalPrice={totalPrice}/>) ;
    let children = wrapper.find({"data-testid":"item-list"}).find(Text);
    expect(children.at(0).text()).toBe(summary.items[0].name);
    expect(children.at(2).text()).toBe(`${summary.items[1].name} x ${summary.items[1].selected}`);
})
});