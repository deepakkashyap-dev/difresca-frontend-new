import Footer from './shared/Footer';

type Props = {
  noFooter?: boolean;
  component: React.ReactElement;
};

const Layout = ({ noFooter, component }: Props) => {
  return (
    <>
      {component}
      {!noFooter && <Footer />}
    </>
  );
};

export default Layout;
