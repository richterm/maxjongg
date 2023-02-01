import React, { CSSProperties } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Tile } from "../components/Tile/Tile";

export default {
  title: "Tile",
  component: Tile,
  argTypes: {},
} as ComponentMeta<typeof Tile>;

const Wrapper: React.FC = ({ children }) => {
  return (
    <div
      style={
        {
          width: "500px",
          "--red": "#ff7ebd",
          "--green": "#72f1b8",
          "--orange": "#fede5d",
          "--blue": "#03edf9",
        } as CSSProperties
      }
    >
      {children}
    </div>
  );
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Tile> = (args) => (
  <Wrapper>
    <Tile {...args} />
  </Wrapper>
);

const defaults = { hinted: false, selected: false, x: 0, y: 0, z: 0 };

export const Bamboo1 = Template.bind({});
Bamboo1.args = {
  ...defaults,
  value: "Bamboo1",
};

export const Bamboo2 = Template.bind({});
Bamboo2.args = {
  ...defaults,
  value: "Bamboo2",
};
export const Bamboo3 = Template.bind({});
Bamboo3.args = {
  ...defaults,
  value: "Bamboo3",
};
export const Bamboo4 = Template.bind({});
Bamboo4.args = {
  ...defaults,
  value: "Bamboo4",
};
export const Bamboo5 = Template.bind({});
Bamboo5.args = {
  ...defaults,
  value: "Bamboo5",
};
export const Bamboo6 = Template.bind({});
Bamboo6.args = {
  ...defaults,
  value: "Bamboo6",
};
export const Bamboo7 = Template.bind({});
Bamboo7.args = {
  ...defaults,
  value: "Bamboo7",
};
export const Bamboo8 = Template.bind({});
Bamboo8.args = {
  ...defaults,
  value: "Bamboo8",
};
export const Bamboo9 = Template.bind({});
Bamboo9.args = {
  ...defaults,
  value: "Bamboo9",
};
export const Characters1 = Template.bind({});
Characters1.args = {
  ...defaults,
  value: "Characters1",
};
export const Characters2 = Template.bind({});
Characters2.args = {
  ...defaults,
  value: "Characters2",
};
export const Characters3 = Template.bind({});
Characters3.args = {
  ...defaults,
  value: "Characters3",
};
export const Characters4 = Template.bind({});
Characters4.args = {
  ...defaults,
  value: "Characters4",
};
export const Characters5 = Template.bind({});
Characters5.args = {
  ...defaults,
  value: "Characters5",
};
export const Characters6 = Template.bind({});
Characters6.args = {
  ...defaults,
  value: "Characters6",
};
export const Characters7 = Template.bind({});
Characters7.args = {
  ...defaults,
  value: "Characters7",
};
export const Characters8 = Template.bind({});
Characters8.args = {
  ...defaults,
  value: "Characters8",
};
export const Characters9 = Template.bind({});
Characters9.args = {
  ...defaults,
  value: "Characters9",
};
export const Dots1 = Template.bind({});
Dots1.args = {
  ...defaults,
  value: "Dots1",
};
export const Dots2 = Template.bind({});
Dots2.args = {
  ...defaults,
  value: "Dots2",
};
export const Dots3 = Template.bind({});
Dots3.args = {
  ...defaults,
  value: "Dots3",
};
export const Dots4 = Template.bind({});
Dots4.args = {
  ...defaults,
  value: "Dots4",
};
export const Dots5 = Template.bind({});
Dots5.args = {
  ...defaults,
  value: "Dots5",
};
export const Dots6 = Template.bind({});
Dots6.args = {
  ...defaults,
  value: "Dots6",
};
export const Dots7 = Template.bind({});
Dots7.args = {
  ...defaults,
  value: "Dots7",
};
export const Dots8 = Template.bind({});
Dots8.args = {
  ...defaults,
  value: "Dots8",
};
export const Dots9 = Template.bind({});
Dots9.args = {
  ...defaults,
  value: "Dots9",
};
export const DragonsGreen = Template.bind({});
DragonsGreen.args = {
  ...defaults,
  value: "DragonsGreen",
};
export const DragonsRed = Template.bind({});
DragonsRed.args = {
  ...defaults,
  value: "DragonsRed",
};
export const DragonsWhite = Template.bind({});
DragonsWhite.args = {
  ...defaults,
  value: "DragonsWhite",
};
export const FlowersBamboo = Template.bind({});
FlowersBamboo.args = {
  ...defaults,
  value: "FlowersBamboo",
};
export const FlowersChrysanthemum = Template.bind({});
FlowersChrysanthemum.args = {
  ...defaults,
  value: "FlowersChrysanthemum",
};
export const FlowersOrchid = Template.bind({});
FlowersOrchid.args = {
  ...defaults,
  value: "FlowersOrchid",
};
export const FlowersPlum = Template.bind({});
FlowersPlum.args = {
  ...defaults,
  value: "FlowersPlum",
};
export const SeasonsAutumn = Template.bind({});
SeasonsAutumn.args = {
  ...defaults,
  value: "SeasonsAutumn",
};
export const SeasonsSpring = Template.bind({});
SeasonsSpring.args = {
  ...defaults,
  value: "SeasonsSpring",
};
export const SeasonsSummer = Template.bind({});
SeasonsSummer.args = {
  ...defaults,
  value: "SeasonsSummer",
};
export const SeasonsWinter = Template.bind({});
SeasonsWinter.args = {
  ...defaults,
  value: "SeasonsWinter",
};
export const WindsEast = Template.bind({});
WindsEast.args = {
  ...defaults,
  value: "WindsEast",
};
export const WindsNorth = Template.bind({});
WindsNorth.args = {
  ...defaults,
  value: "WindsNorth",
};
export const WindsSouth = Template.bind({});
WindsSouth.args = {
  ...defaults,
  value: "WindsSouth",
};
export const WindsWest = Template.bind({});
WindsWest.args = {
  ...defaults,
  value: "WindsWest",
};
