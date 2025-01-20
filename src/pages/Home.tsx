import {
  HeroArea, CategoriesList, ProductsRow,
} from '../components/home';

import { useAppSelector } from '../hooks';
import { Loader } from '../components/shared';

const Home = () => {
  const { homepageData: blocks = [], homepageLoading } = useAppSelector((state) => state.homepage);
  const { subCategoryData } = useAppSelector((state) => state.homepage);

  const renderBlock = (block: any) => {
    switch (block.block_type) {
      case 'banner':
        return <HeroArea key={block.id} data={block} />;
      case 'category_banner':
        return <CategoriesList key={block.id} data={subCategoryData} />;
      case 'special_deal':
        return <ProductsRow key={block.id} data={block} />;
      // case 'highlighted_promo':
      //   return <HighlightedPromo key={block.id} data={block.data} />;
      // default:
      //   return <div key={block.id}>Unknown Block Type: {block.block_type}</div>;
    }
  };

  return (
    <div className="_container">
      {homepageLoading && <Loader fullscreen />}
      {blocks && blocks.map((block: any) => renderBlock(block))}
    </div>
  );
};

export default Home;
