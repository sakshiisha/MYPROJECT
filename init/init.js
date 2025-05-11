const sampleListing = [
  {
    title: "Cozy Room Near University",
    description: "Fully furnished room with study desk, Wi-Fi, and laundry. Walking distance from campus.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
    },
    price: 5000,
    address: "Sector 62, Noida",
    city: "Noida",
  },
  {
    title: "Girls PG with Meals",
    description: "Safe PG for girls with 3 meals, AC, and 24/7 security. Close to metro station.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1709805619372-40de3f158e83?w=600&auto=format&fit=crop&q=60"
    },
    price: 7000,
    address: "Kalkaji, Delhi",
    city: "Delhi",
  },
  {
    title: "Shared Room in Student Apartment",
    description: "Shared 2BHK flat with common kitchen and high-speed internet. Male students only.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1619810230359-b2c2f61c49cd?w=600&auto=format&fit=crop&q=60"
    },
    price: 4500,
    address: "Hinjewadi Phase 1",
    city: "Pune",
  },
  {
    title: "Single Room with Balcony",
    description: "Spacious single room with attached washroom and balcony. Ideal for study.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1608198399988-341f712c3711?w=600&auto=format&fit=crop&q=60"
    },
    price: 6000,
    address: "Indira Nagar",
    city: "Lucknow",
  },
  {
    title: "Budget PG for Boys",
    description: "Basic amenities included – bed, fan, cupboard. Tiffin service available.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1709805619372-40de3f158e83?w=600&auto=format&fit=crop&q=60"
    },
    price: 3500,
    address: "Raja Bazar",
    city: "Patna",
  },
  {
    title: "Furnished Studio for Student",
    description: "Modern studio apartment with kitchenette and Wi-Fi. 10 mins walk to college.",
    image: {
      filename: "listingimage",
      url: "https://plus.unsplash.com/premium_photo-1717026785279-1b11d8255f9b?w=600&auto=format&fit=crop&q=60"
    },
    price: 8000,
    address: "Koramangala",
    city: "Bangalore",
  },
  {
    title: "Triple Sharing Room with Meals",
    description: "Economical option for students, meals included, close to coaching centers.",
    image: {
      filename: "listingimage",
      url: "https://img.freepik.com/free-photo/young-friends-hostel_52683-121727.jpg?semt=ais_hybrid&w=740"
    },
    price: 3000,
    address: "Laxmi Nagar",
    city: "Delhi",
  },
  {
    title: "Private Room in Girls Hostel",
    description: "Spacious room with attached washroom and high security. Parents allowed.",
    image: {
      filename: "listingimage",
      url: "https://img.freepik.com/free-photo/young-friends-hostel_52683-121727.jpg?semt=ais_hybrid&w=740"
    },
    price: 6500,
    address: "Gomti Nagar",
    city: "Lucknow",
  },
  {
    title: "1BHK Flat for Rent - Students Only",
    description: "Independent flat with kitchen, balcony, and parking. Ideal for 2 students.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1709805619372-40de3f158e83?w=600&auto=format&fit=crop&q=60"
    },
    price: 9000,
    address: "Baner",
    city: "Pune",
  },
  {
    title: "Budget Boys PG with Internet",
    description: "Affordable stay with free Wi-Fi and laundry. Clean and peaceful area.",
    image: {
      filename: "listingimage",
      url: "https://plus.unsplash.com/premium_photo-1717014210742-b3f268ff3b6e?w=600&auto=format&fit=crop&q=60"
    },
    price: 4000,
    address: "Ashok Nagar",
    city: "Bhopal",
  },
  {
    title: "Room near Engineering College",
    description: "Ideal for engineering students. Study-friendly environment, fast internet.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=600&auto=format&fit=crop&q=60"
    },
    price: 5500,
    address: "Knowledge Park",
    city: "Greater Noida",
  },
  {
    title: "PG with Gym and Library Access",
    description: "Premium boys PG with gym, study area, and free breakfast included.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1610019524813-fd7487ec477e?w=600&auto=format&fit=crop&q=60"
    },
    price: 7500,
    address: "Model Town",
    city: "Delhi",
  },
  {
    title: "Girls PG Near Medical College",
    description: "Walking distance to medical college, 24/7 water, meals and CCTV security.",
    image: {
      filename: "listingimage",
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-Gg5JDAjo325QVNmqyin2K-0pbWDROXFMAQ"
    },
    price: 6200,
    address: "Kankarbagh",
    city: "Patna",
  },
  {
    title: "Room near Engineering College",
    description: "Ideal for engineering students. Study-friendly environment, fast internet.",
    image: {
      filename: "listingimage",
      url: "https://img.freepik.com/free-photo/young-friends-hostel_52683-121727.jpg?semt=ais_hybrid&w=740"
    },
    price: 5500,
    address: "Knowledge Park",
    city: "Greater Noida",
  },
  {
    title: "PG with Gym and Library Access",
    description: "Premium boys PG with gym, study area, and free breakfast included.",
    image: {
      filename: "listingimage",
      url: "https://plus.unsplash.com/premium_photo-1717014211334-8ae3b98a5965?w=600&auto=format&fit=crop&q=60"
    },
    price: 7500,
    address: "Model Town",
    city: "Delhi",
  },
  {
    title: "Girls PG Near Medical College",
    description: "Walking distance to medical college, 24/7 water, meals and CCTV security.",
    image: {
      filename: "listingimage",
      url: "https://img.freepik.com/free-photo/young-friends-hostel_52683-121727.jpg?semt=ais_hybrid&w=740"
    },
    price: 6200,
    address: "Kankarbagh",
    city: "Patna",
  },
  {
    title: "Peaceful Room with Garden View",
    description: "Fully ventilated room with attached washroom and garden-facing balcony.",
    image: {
      filename: "listingimage",
      url: "https://img.freepik.com/free-photo/young-friends-hostel_52683-121727.jpg?semt=ais_hybrid&w=740"
    },
    price: 5800,
    address: "Civil Lines",
    city: "Allahabad",
  },
  {
    title: "Sharing Room in IT Hub",
    description: "Sharing room in an apartment with IT students. Near tech park and metro.",
    image: {
      filename: "listingimage",
      url: "https://img.freepik.com/free-photo/young-friends-hostel_52683-121727.jpg?semt=ais_hybrid&w=740"
    },
    price: 4800,
    address: "Gachibowli",
    city: "Hyderabad",
  }
];

module.exports = { data: sampleListing };
