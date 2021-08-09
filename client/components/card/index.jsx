import Image from "next/image"
import {Title,Feature,FeatureClose,FeatureText,FeatureTitle,Content,Group,Maturity} from './styles/styles'
import {SimpleGrid} from '@chakra-ui/react'
import { createContext ,useContext} from "react";
export const FeatureContext = createContext();
function Card() {
  const property = {
    imageUrl: "https://bit.ly/2Z4KKcF",
    imageAlt: "Rear view of modern home with pool",
    beds: 3,
    baths: 2,
    title: "Modern home in city center in the heart of historic Los Angeles",
    formattedPrice: "$1,900.00",
    reviewCount: 34,
    rating: 4,
  }

  return (
    <SimpleGrid minChildWidth="120px" spacing="40px">
      {/* <Image/> */}
  </SimpleGrid>
  )
}

Card.Feature = function CardFeature({handleClick,index, ref , children, category, ...restProps }) {
  console.log({restProps})
  return (
    <Feature {...restProps} src={`/images/${category}/${restProps.genre}/${restProps.slug}/large.jpg`}>
      <Content>
        <FeatureTitle>{restProps.title}</FeatureTitle>
        <FeatureText>{restProps.description}</FeatureText>
        <FeatureClose ref={ref} onClick={()=>handleClick(index,null)}>
          <img src="/images/icons/close.png" alt="Close" />
        </FeatureClose>
        <Group margin="30px 0" flexDirection="row" alignItems="center">
          <Maturity rating={restProps.maturity}>{restProps.maturity < 12 ? 'PG' : restProps.maturity}</Maturity>
          {restProps?.genre?.map(e=><FeatureText fontWeight="bold">
          {e?.charAt(0)?.toUpperCase() + e?.slice(1)}
          </FeatureText>)}
        </Group>

        {children}
      </Content>
    </Feature>
  )
};

Card.Title = function CardTitle({ children, ...restProps }) {
  return <Title {...restProps}>{children}</Title>;
};

export default Card