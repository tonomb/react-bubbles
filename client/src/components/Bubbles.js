import React, { useState, useEffect } from "react";
import { Pack,Grid } from "@potion/layout";
import { Svg, Circle } from "@potion/element";

const Bubbles = ({ colors }) => {
  const [bubbleData, setBubbleData] = useState([]);
  useEffect(() => {
    const generateBubbleData = colors.map((_, i) => ({
      value: Math.floor(Math.random() * (colors.length * 6)) + 1,
      key: `${i + 1}`
    }));
    setBubbleData(generateBubbleData);
    console.log(generateBubbleData);
  }, [colors]);

  return (
    <div className="bubble-wrap">
      <p>bubbles</p>
      <Svg width={1000} height={1000}>
        <Grid
          data={bubbleData}
          // sum={datum => datum.value}
          size={[600, 600]}
          // includeRoot={false}
          nodeEnter={d => ({ ...d, x:500, y:500 })}
          animate
        >
          {nodes =>
            nodes
              .map(({ nodeWidth, nodeHeight, x, y, key, value }, i) => {
                if (i < colors.length) {
                  return (
                    <Circle
                      key={key}
                      cx={x + nodeWidth/2}
                      cy={y + nodeHeight/2}
                      r={value}
                      fill={colors[i].code.hex}
                    />
                  );
                }
                return null;
              })
              .filter(v => v)
          }
        </Grid>
      </Svg>
    </div>
  );
};

export default Bubbles;
