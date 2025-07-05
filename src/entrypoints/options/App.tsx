import RentalCard from "./components/RentalCard";

// Mock data for development
const mockRentals = [
  {
    id: "1",
    title: "Modern Studio near Taipei 101",
    price: 18000,
    location: "Xinyi District, Near Taipei 101 / World Trade Center Station",
    nearMrt: true,
    imgUrl:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    features: ["Utilities included", "Furnished", "No deposit", "Pet friendly"],
    postDate: "2 hours ago",
  },
  {
    id: "2",
    title: "Cozy 1BR Apartment with Balcony",
    price: 22000,
    location: "Daan District, Near Technology Building Station",
    nearMrt: true,
    imgUrl:
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    features: ["Rent subsidy eligible", "Furnished", "Balcony"],
    postDate: "1 day ago",
  },
  {
    id: "3",
    title: "Spacious 2BR with City View",
    price: 35000,
    location: "Zhongshan District, Near Zhongshan Elementary School Station",
    nearMrt: true,
    imgUrl:
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    features: ["New building", "City view", "Security", "Parking space"],
    postDate: "3 days ago",
  },
  {
    id: "4",
    title: "Traditional Taiwanese House with Garden",
    price: 45000,
    location: "Shilin District, 10 min walk to MRT",
    nearMrt: false,
    imgUrl:
      "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    features: [
      "Garden",
      "Traditional style",
      "Separate entrance",
      "Quiet area",
    ],
    postDate: "1 week ago",
  },
  {
    id: "5",
    title: "Student-friendly Shared Room",
    price: 8500,
    location: "Gongguan, Near National Taiwan University",
    nearMrt: true,
    imgUrl:
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    features: [
      "Student only",
      "Shared kitchen",
      "Utilities included",
      "Near university",
    ],
    postDate: "2 days ago",
  },
  {
    id: "6",
    title: "Luxury Penthouse with Rooftop",
    price: 80000,
    location: "Xinyi District, Near Taipei City Hall",
    nearMrt: true,
    imgUrl:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    features: [
      "Luxury",
      "Rooftop",
      "Gym",
      "Swimming pool",
      "Concierge service",
    ],
    postDate: "5 days ago",
  },
];

function App() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {mockRentals.map((rental) => (
        <RentalCard
          key={rental.id}
          features={rental.features}
          id={rental.id}
          imgUrl={rental.imgUrl}
          location={rental.location}
          nearMrt={rental.nearMrt}
          postDate={rental.postDate}
          price={rental.price}
          title={rental.title}
        />
      ))}
    </div>
  );
}

export default App;
