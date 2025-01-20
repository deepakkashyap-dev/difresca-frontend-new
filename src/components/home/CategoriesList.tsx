import { Link } from 'react-router-dom';
import { getCategoryLink } from '../../utils/helper';

const CategoriesList = ({ data }: any) => {
  return (
    <section className="my-4 xl:pt-4">
      <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 my-2 gap-4">
        {data.length > 0 && data.map((item: any) => (
          <Link to={getCategoryLink(item)} key={item.id} className="flex flex-col items-center">
            <>
              <div className="h-24 w-24 p-4 bg-gray-50 rounded-xl flex items-center justify-center mb-2">
                <img
                  src={item.image}
                  className="w-16 h-16 object-contain"
                  alt={item.title}
                />
              </div>
              <div className="text-base leading-5 text-gray-900 text-center font-medium">
                {item.title.includes('&') ? (
                  <>
                    {item.title.split('&')[0]}
                    <br />
                    {item.title.split('&')[1]}
                  </>
                ) : (
                  <>
                    {item.title.split(' ')[0]}
                    <br />
                    {item.title.split(' ').slice(1).join(' ')}
                  </>
                )}
              </div>
            </>
          </Link>
        ))}
      </div>
    </section >
  );
};

export default CategoriesList;
