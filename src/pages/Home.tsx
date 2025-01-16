import {
  HeroArea,
  CategoriesList,
  DiscountOffers,
  FeaturedPromo,
  HighlightedPromo,
  ProductsRow,
} from '../components/home';
import Misc from '../lib/data/layout.json';
import { getHomepageBlock } from '../utils/Api/AppService/dashboardApi';
import { useEffect, useState } from 'react';

const Home = () => {
  const [blocks, setBlocks] = useState([]);

  useEffect(() => {
    const loadHomepageBlock = async () => {
      try {
        const response = await getHomepageBlock();
        if (response.data) {
          response.data.sort((a: any, b: any) => a.order - b.order);
        }
        console.log(response.data, '-response');
        setBlocks(response.data);
      } catch (error) {
        console.error('Error fetching homepage block:', error);
        throw error;
      }
    };
    loadHomepageBlock();
  }, []);

  const renderBlock = (block: any) => {
    switch (block.block_type) {
      case 'banner':
        return <HeroArea key={block.id} data={block} />;
      case 'category_banner':
        return <CategoriesList key={block.id} data={block.sub_categories} />;
      case 'special_deal':
        return <ProductsRow key={block.id} data={block} />;
      // case 'highlighted_promo':
      //   return <HighlightedPromo key={block.id} data={block.data} />;
      // default:
      //   return <div key={block.id}>Unknown Block Type: {block.block_type}</div>;
    }
  };

  const productItems: any[] = Misc.filter((item) => item.type === 77).map(
    (el) => ({
      data: el.data,
      objects: el.objects,
    })
  );
  // console.log(productItems,"-productItems")
  return (
    <div className="_container">
      {blocks.map((block: any) => renderBlock(block))}
      {/* <FeaturedPromo /> */}
      {/* <DiscountOffers /> */}
      {/* <HighlightedPromo /> */}
      {/* {productItems.map((products, i) => (
        <ProductsRow key={i} {...products} />
      ))} */}
    </div>
  );
};

export default Home;
