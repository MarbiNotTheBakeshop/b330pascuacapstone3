import Banner from '../components/Banner.js';
import Highlights from '../components/Highlights.js';
import FeaturedCoffees from '../components/FeaturedCoffees.js';

export default function Home(){
	const data = {
	    title: "MA.COFFEE flavors",
	    content: "Flavors that will wake and make your day!",
	    destination: "/coffees",
	    label: " Order now"
	}

	return(
		<>
			<Banner data = {data}/>
			<Highlights />
			<FeaturedCoffees />
		</>
		)
}