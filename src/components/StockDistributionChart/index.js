import { useEffect, useRef, useState } from "react";
import { Heading, useDimensions } from "@chakra-ui/react";
import { TreeMap } from "reactochart";
import PlainBox from "../_design_system/PlainBox";
import Loadable from "../_shared/Loadable";
import * as Api from "../../api";

const StockDistributionChart = () => {
  const elementRef = useRef();
  const dimensions = useDimensions(elementRef, true);

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({ children: [] });

  useEffect(() => {
    setIsLoading(true);
    Api.getGlobalHoldingsDistribution()
      .then((response) => {
        setData({ children: response.data });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <PlainBox>
      <Heading ref={elementRef} size="md" marginBottom="1em">
        Global Share Distribution
      </Heading>
      <Loadable isLoading={isLoading}>
        <TreeMap
          ratio={1}
          data={data}
          round={true}
          getValue={(data) => data.size}
          getLabel={(node) => `${node.data.abbreviation}`}
          labelStyle={{
            textAlign: "center",
          }}
          nodeStyle={(node) => ({
            backgroundColor: node.data.color_rgb,
            border: "1px solid rgba(100, 100, 100, 0.2)",
            fontFamily: "var(--chakra-fonts-body)",
            fontSize: "12px",
            fontWeight: 600,
            textShadow: "rgb(11 11 11) 0px 1px 1px",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            // opacity: 0.9
          })}
          width={dimensions && dimensions.borderBox.width}
          height={300}
        />
      </Loadable>
    </PlainBox>
  );
};

export default StockDistributionChart;
