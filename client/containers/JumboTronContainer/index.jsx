import Jumbotron from '../../components/jumbotron/index';
import JumbotronData from '../../fixtures/jumbo.json';
import React from 'react'
export default function JumboTronContainer() {
  return (
    <Jumbotron.Container>
      {JumbotronData.map((item) => (
        <Jumbotron key={item.id} direction={item.direction}>
          <Jumbotron.Pane>
            <Jumbotron.Title>{item.title}</Jumbotron.Title>
            <Jumbotron.SubTitle>{item.subTitle}</Jumbotron.SubTitle>
          </Jumbotron.Pane>
          <Jumbotron.Pane>
            <Jumbotron.Image src={item.image} alt={item.alt} />
          </Jumbotron.Pane>
        </Jumbotron>
      ))}
    </Jumbotron.Container>
  );
}
