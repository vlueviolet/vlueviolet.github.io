import styled from 'styled-components';

const Wrapper = styled.section`
  padding: 4em;
  background: papayawhip;
`;

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;
const Button = styled.button`
  /* Adapt the colors based on primary prop */
  background: ${(props) => (props.primary ? 'palevioletred' : 'white')};
  color: ${(props) => (props.primary ? 'white' : 'palevioletred')};

  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;

const TomatoButton = styled(Button)`
  color: tomato;
  border-color: tomato;
`;

export default function Home() {
  return (
    <Wrapper>
      <Title>hello world</Title>
      <Title>hello world</Title>
      <Title>hello world</Title>

      <div>
        <Button>normal</Button>
        <Button primary>primary</Button>

        <TomatoButton>Tomato Button</TomatoButton>
      </div>
    </Wrapper>
  );
}
