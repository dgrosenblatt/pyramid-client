import { Spinner } from "@chakra-ui/react";

const Loadable = ({ isLoading, spinnerSize, children }) => {
  if (isLoading) {
    return <Spinner size={spinnerSize} />;
  } else {
    return <>{children}</>;
  }
};

Loadable.defaultProps = {
  spinnerSize: "md",
};

export default Loadable;
