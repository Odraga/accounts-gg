import { ComponentType, FC, ReactNode, useEffect, useState } from "react";

interface RouteWithNavbarI {
  element: ComponentType;
  layout: ComponentType<{ children: ReactNode }>;
}

const RouteWithNavbar: FC<RouteWithNavbarI> = ({
  element: Element,
  layout: Layout,
}) => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    /* setTimeout(() => {
      setShow(false);
    }, 1000); */
  }, []);
  return (
    <>
      {!show ? (
        <Layout>
          <Element />
        </Layout>
      ) : null}
    </>
  );
};

export default RouteWithNavbar;
