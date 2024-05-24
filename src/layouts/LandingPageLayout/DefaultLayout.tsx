import { FC, ReactNode } from "react";
import Navigationbar from "../../components/common/Navigationbar";

interface DefaultLayoutI {
  children: ReactNode;
}

const DefaultLayout: FC<DefaultLayoutI> = ({ children }) => {
  return (
    <div>
      <Navigationbar />
      {children}
    </div>
  );
};

export default DefaultLayout;
