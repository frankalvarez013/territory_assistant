// components/Card.js
import Image from 'next/image';
import map from './assets/images/map.jpg';

const Card = () => {
  return (
    <a href="#" className="relative block h-full overflow-hidden rounded-lg h-96 w-96 group">
      <Image src={map} alt="" className="w-full h-auto" layout="fill" objectFit="cover" />
      {/* Partially show the overlay */}
      <div className="absolute bottom-0 left-0 right-0 z-10 rounded-lg bg-white transition ease-in-out duration-200 transform translate-y-1/2 group-hover:translate-y-0">
        <div className="relative flex items-center gap-8 p-8 rounded-t-lg bg-white">
          <svg className="absolute bottom-full right-0 w-20 h-20 z-20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80"><path fill="white" d="M40,80c22,0,40-22,40-40V80H40Z" /></svg>
          <div>
            <h3 className="text-lg text-[#6A515E]">Jessica Parker</h3>
            <span className="text-sm text-[#D7BDCA]">1 hour ago</span>
          </div>
        </div>
        <p className="px-8 pb-8 mt-0 text-[#D7BDCA]  text-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores, blanditiis?
        </p>
      </div>
    </a>
  );
};

export default Card;
