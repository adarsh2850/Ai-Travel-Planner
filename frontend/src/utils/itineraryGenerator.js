// Rich content banks for top destinations, customized by vibe and budget
const DESTINATION_DATA = {
  agra: {
    name: 'Agra, Uttar Pradesh, India',
    image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&q=80',
    mapUrl: 'https://maps.google.com/maps?q=Taj%20Mahal,%20Agra&t=&z=13&ie=UTF8&iwloc=&output=embed',
    hotels: {
      'Eco-Zen': {
        Economy: { name: 'Coral Tree Homestay', cost: 35, desc: 'Eco-friendly homestay with a beautiful garden, solar-powered water heating.', eco: true, reason: 'Solar heated water' },
        Balanced: { name: 'Manya Palace Green Stay', cost: 75, desc: 'Sustainable hotel close to Taj Mahal, zero-waste initiatives.', eco: true, reason: 'Zero single-use plastic' },
        Premium: { name: 'The Oberoi Amarvilas (Eco-concept)', cost: 450, desc: 'Ultra-luxury hotel with Taj views, utilizing solar energy and rainwater harvesting.', eco: true, reason: 'Rainwater harvesting' }
      },
      'Modern Luxury': {
        Economy: { name: 'Howard Plaza The Fern', cost: 50, desc: 'Modern hotel with eco-friendly features and close proximity to historical monuments.', eco: false },
        Balanced: { name: 'Taj Hotel & Convention Centre Agra', cost: 120, desc: 'Contemporary luxury with rooftop infinity pool looking over the Taj Mahal.', eco: false },
        Premium: { name: 'The Oberoi Amarvilas', cost: 600, desc: 'Unmatched luxury where every room offers uninterrupted views of the Taj Mahal.', eco: false }
      },
      'Vibrant Culture': {
        Economy: { name: 'Friends Home Stay', cost: 30, desc: 'Experience true Indian hospitality with local home-cooked Mughal meals.', eco: false },
        Balanced: { name: 'Crystal Sarovar Premiere', cost: 80, desc: 'Charming rooms with local art displays and traditional Rajasthani/Mughalai restaurants.', eco: false },
        Premium: { name: 'ITC Mughal', cost: 250, desc: 'Sprawling luxury resort celebrating Mughal architecture and royal heritage spa treatments.', eco: false }
      },
      'Adventure & Sport': {
        Economy: { name: 'Joey\'s Hostel Agra', cost: 20, desc: 'Social backpacker base offering heritage cycle tours and walking trips.', eco: false },
        Balanced: { name: 'Radisson Hotel Agra', cost: 90, desc: 'Active hotel offering indoor sports, fitness studio, and early morning jogging maps.', eco: false },
        Premium: { name: 'DoubleTree by Hilton Agra', cost: 180, desc: 'Premium stay with fully equipped fitness center and guided adventure trails in Yamuna ravine.', eco: false }
      }
    },
    activities: {
      'Eco-Zen': [
        { title: 'Morning Walk in Taj Nature Walk', desc: 'A quiet walk in the 180-hectare green belt around the Taj Mahal.', cost: 5, icon: 'nature_people', eco: true, reason: 'Urban green belt protection' },
        { title: 'Lunch at Sheroes Hangout', desc: 'A remarkable cafe run by acid attack survivors, serving organic and local foods.', cost: 15, icon: 'restaurant', eco: true, reason: 'Social empowerment & organic' },
        { title: 'Electric Rickshaw Tour to Agra Fort', desc: 'Visit the historic fort using eco-friendly zero-emission electric rickshaws.', cost: 10, icon: 'electric_car', eco: true, reason: 'Electric transit' },
        { title: 'Sunset stargazing at Mehtab Bagh', desc: 'Enjoy the view of the Taj from green gardens across the river.', cost: 8, icon: 'nights_stay', eco: true, reason: 'Eco garden park fee' }
      ],
      'Modern Luxury': [
        { title: 'VIP Guided Taj Mahal Tour', desc: 'Private guide with golf cart transfers and fast-track entry.', cost: 45, icon: 'auto_awesome', eco: false },
        { title: 'Royal Dinner at Peshawri', desc: 'Award-winning dining celebrating robust tandoori and Mughal flavors.', cost: 70, icon: 'restaurant', eco: false },
        { title: 'Private Shopping for Marble Inlays', desc: 'Exclusive demonstration of traditional Pietra Dura marble inlay work.', cost: 25, icon: 'shopping_bag', eco: false },
        { title: 'Rooftop Cocktails overlooking Taj', desc: 'Sip custom cocktails with a perfect view of the illuminated white dome.', cost: 30, icon: 'local_bar', eco: false }
      ],
      'Vibrant Culture': [
        { title: 'Agra Heritage Old City Walk', desc: 'Walk through narrow alleys, historic mosques, and ancient spice markets.', cost: 12, icon: 'directions_walk', eco: false },
        { title: 'Lunch at Pinch of Spice', desc: 'Traditional northern Indian curries and tandoori breads.', cost: 20, icon: 'restaurant', eco: false },
        { title: 'Taj Mahotsav Cultural Performance', desc: 'Enjoy traditional folk music and kathak dances by local artists.', cost: 15, icon: 'theater_comedy', eco: false },
        { title: 'Mughal Heritage Walk in Kachhpura', desc: 'Community-led walk showing rural life, Mughal history, and local crafts.', cost: 18, icon: 'history_edu', eco: true, reason: 'Community tourism' }
      ],
      'Adventure & Sport': [
        { title: 'Sunrise Cycling Tour along Yamuna', desc: 'Cycle through rural paths with views of the river and monuments.', cost: 15, icon: 'pedal_bike', eco: true, reason: 'Zero emission transport' },
        { title: 'Wildlife SOS Elephant Sanctuary Visit', desc: 'Visit the ethical rescue facility for abused elephants.', cost: 40, icon: 'cruelty_free', eco: true, reason: 'Animal welfare support' },
        { title: 'Boating on Yamuna River', desc: 'Rowboat ride near the Taj Mahal at sunset.', cost: 25, icon: 'waves', eco: false },
        { title: 'Adventure Trek in Ravines', desc: 'Hike through the rugged Chambal ravines nearby.', cost: 35, icon: 'terrain', eco: false }
      ]
    }
  },
  goa: {
    name: 'Goa, India',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
    mapUrl: 'https://maps.google.com/maps?q=Calangute%20Beach,%20Goa&t=&z=13&ie=UTF8&iwloc=&output=embed',
    hotels: {
      'Eco-Zen': {
        Economy: { name: 'Olaulim Backyards', cost: 40, desc: 'Eco-retreat in backwaters, composting waste, protecting local bird habitats.', eco: true, reason: 'Wildlife conservation stay' },
        Balanced: { name: 'Wildernest Nature Resort', cost: 110, desc: 'Eco-cottages in Chorla Ghats, rain-water harvesting and local hiring.', eco: true, reason: 'Bio-reserve preservation' },
        Premium: { name: 'Alila Diwa Goa (Eco)', cost: 280, desc: 'Eco-certified luxury resort in South Goa, utilizing local materials and water filters.', eco: true, reason: 'EarthCheck gold certified' }
      },
      'Modern Luxury': {
        Economy: { name: 'Ibis Styles Goa Calangute', cost: 60, desc: 'Modern bright hotel with dynamic pool decks and high-tech amenities.', eco: false },
        Balanced: { name: 'Taj Exotica Resort & Spa', cost: 220, desc: 'Mediterranean-style luxury villa resort overlooking the Arabian Sea.', eco: false },
        Premium: { name: 'The Leela Goa', cost: 450, desc: 'Palatial luxury estate on 75 acres with private beach access and golf courses.', eco: false }
      },
      'Vibrant Culture': {
        Economy: { name: 'The Hostel Crowd - Prison Hostel', cost: 25, desc: 'Lively backpackers hub in Anjuna, displaying local street art and organizing heritage talks.', eco: false },
        Balanced: { name: 'Panjim Inn', cost: 85, desc: 'Historic 130-year-old Portuguese mansion in Fontainhas Heritage Quarter.', eco: false },
        Premium: { name: 'Cidade de Goa', cost: 180, desc: 'Designed by Charles Correa, capturing traditional Goan village culture and architecture.', eco: false }
      },
      'Adventure & Sport': {
        Economy: { name: 'Jungle Hostel Vagator', cost: 22, desc: 'Active hostel in lush setting, offering surf lessons and scooter hire.', eco: false },
        Balanced: { name: 'Arambol Beach Surf Lodge', cost: 70, desc: 'Beachfront resort specializing in surf coaching and stand-up paddleboarding.', eco: false },
        Premium: { name: 'Grand Hyatt Goa', cost: 320, desc: 'Luxury resort offering sailing, speed boating, and aerial adventure courses.', eco: false }
      }
    },
    activities: {
      'Eco-Zen': [
        { title: 'Dr. Salim Ali Bird Sanctuary Tour', desc: 'Paddled canoe tour through local mangrove habitats to spot rare migratory birds.', cost: 12, icon: 'cruelty_free', eco: true, reason: 'Protected mangrove reserve' },
        { title: 'Organic Meal at Tanshikar Spice Farm', desc: 'Traditional farm tour and lunch prepared with organic crops harvested on-site.', cost: 18, icon: 'restaurant', eco: true, reason: 'Organic farm-to-table' },
        { title: 'Kayaking in Sal Backwaters', desc: 'Explore silent estuaries and watch local fishermen cast nets using non-motorized transport.', cost: 25, icon: 'kayaking', eco: true, reason: 'Zero carbon boating' },
        { title: 'Yoga and Meditation on Mandrem Beach', desc: 'Quiet early morning breathing sessions on the secluded sands of North Goa.', cost: 10, icon: 'spa', eco: true, reason: 'Natural beach conservation' }
      ],
      'Modern Luxury': [
        { title: 'Private Yacht Charter from Miramar', desc: 'Charter a luxury boat for a sunset cruise with wine and local appetizers.', cost: 150, icon: 'directions_boat', eco: false },
        { title: 'Gourmet Seafood Dinner at Mum\'s Kitchen', desc: 'Exquisite, high-end Goan-Portuguese fusion dinner with signature curries.', cost: 45, icon: 'restaurant', eco: false },
        { title: 'Casino Night at Majestic Pride', desc: 'High-end gaming and dining aboard a modern river cruiser on Mandovi river.', cost: 60, icon: 'casino', eco: false },
        { title: 'Helicopter Ride over Goa Coast', desc: 'Scenic flight over historic forts and pristine white-sand beaches.', cost: 120, icon: 'flight', eco: false }
      ],
      'Vibrant Culture': [
        { title: 'Fontainhas Latin Quarter Walking Tour', desc: 'Explore the narrow streets lined with brightly painted Portuguese houses.', cost: 8, icon: 'palette', eco: false },
        { title: 'Spicy Fish Curry Lunch in Panaji', desc: 'Enjoy authentic Goan fish-thali with local red rice at a heritage diner.', cost: 15, icon: 'restaurant', eco: false },
        { title: 'Visit to Basilica of Bom Jesus', desc: 'Explore the UNESCO World Heritage site housing the remains of St. Francis Xavier.', cost: 5, icon: 'church', eco: false },
        { title: 'Traditional Goan Fado Music Concert', desc: 'An evening of nostalgic, soulful acoustic singing in an old colonial salon.', cost: 20, icon: 'music_note', eco: false }
      ],
      'Adventure & Sport': [
        { title: 'Scuba Diving at Grande Island', desc: 'PADI guided dive exploring coral reefs and local shipwrecks.', cost: 55, icon: 'water', eco: true, reason: 'Marine awareness support' },
        { title: 'Trek to Dudhsagar Waterfalls', desc: 'Hike through the Western Ghats jungle to see the four-tiered white waterfall.', cost: 25, icon: 'terrain', eco: true, reason: 'National park conservation fee' },
        { title: 'Windsurfing Lessons at Baga Beach', desc: 'Learn to navigate the waves with certified trainers.', cost: 30, icon: 'surfing', eco: false },
        { title: 'ATV Ride through Jungle Trails', desc: 'Off-road quad biking session in the forest trails of Ponda.', cost: 40, icon: 'minor_crash', eco: false }
      ]
    }
  },
  jaipur: {
    name: 'Jaipur, Rajasthan, India',
    image: 'https://images.unsplash.com/photo-1477584308802-e9c3788ee417?w=800&q=80',
    mapUrl: 'https://maps.google.com/maps?q=Hawa%20Mahal,%20Jaipur&t=&z=13&ie=UTF8&iwloc=&output=embed',
    hotels: {
      'Eco-Zen': {
        Economy: { name: 'Anuraag Villa', cost: 30, desc: 'Eco-conscious hotel with extensive gardens, harvesting rainwater and using organic vegetables.', eco: true, reason: 'Rainwater harvesting' },
        Balanced: { name: 'Shahpura House', cost: 95, desc: 'Boutique heritage hotel prioritizing low-energy systems and local cultural preservation.', eco: true, reason: 'Cultural conservation' },
        Premium: { name: 'The Raj Palace (Eco-Heritage)', cost: 320, desc: 'Restored royal palace operating with low carbon footprint and solar heating.', eco: true, reason: 'Historic building restoration' }
      },
      'Modern Luxury': {
        Economy: { name: 'Red Fox Hotel Jaipur', cost: 40, desc: 'Modern budget hotel with smart keycard access and vibrant designer rooms.', eco: false },
        Balanced: { name: 'ITC Rajputana', cost: 130, desc: 'Luxury hotel inspired by royal Haveli architecture, featuring modern premium amenities.', eco: false },
        Premium: { name: 'Rambagh Palace', cost: 750, desc: 'Known as the "Jewel of Jaipur", a legendary palace offering unparalleled royal luxury.', eco: false }
      },
      'Vibrant Culture': {
        Economy: { name: 'Chhoti Haveli Homestay', cost: 28, desc: 'Charming homestay near Hawa Mahal offering traditional Rajasthani cooking lessons.', eco: false },
        Balanced: { name: 'Alsisar Haveli', cost: 110, desc: 'Heritage mansion in the heart of old city, showing historic weapons and paintings.', eco: false },
        Premium: { name: 'Samode Palace', cost: 260, desc: 'Spectacular royal retreat famous for its mirror-tiled halls and mural-adorned walls.', eco: false }
      },
      'Adventure & Sport': {
        Economy: { name: 'Zostel Jaipur', cost: 18, desc: 'Backpacker hostel offering walking excursions, cycle rental, and desert runs.', eco: false },
        Balanced: { name: 'Umaid Bhawan Hotel', cost: 75, desc: 'Heritage hotel offering swimming pool, camel rides, and early morning fort treks.', eco: false },
        Premium: { name: 'Fairmont Jaipur', cost: 240, desc: 'Luxury resort offering hot air ballooning, custom desert safaris, and quad biking.', eco: false }
      }
    },
    activities: {
      'Eco-Zen': [
        { title: 'Morning Forest Walk in Jhalana Leopard Reserve', desc: 'Eco-safari in the reserve, supporting local wildlife tracking programs.', cost: 20, icon: 'spa', eco: true, reason: 'Wildlife habitat preservation' },
        { title: 'Organic Rajasthani Meal at Chokhi Dhani', desc: 'Locally sourced vegetarian items made with cold-pressed mustard oils.', cost: 25, icon: 'restaurant', eco: true, reason: 'Traditional organic menu' },
        { title: 'E-Rickshaw Tour of Pink City Gates', desc: 'Silent, pollution-free electric rickshaw ride through the medieval gates.', cost: 12, icon: 'electric_car', eco: true, reason: 'Electric zero emission transit' },
        { title: 'Sunset Meditation at Sagar Lake', desc: 'Yoga and mindfulness overlooking the ancient lake behind Amer Fort.', cost: 8, icon: 'wb_sunny', eco: true, reason: 'Eco park conservation support' }
      ],
      'Modern Luxury': [
        { title: 'VIP Tour of City Palace Private Rooms', desc: 'Exclusive access to royal chambers (Chandra Mahal) with private curator.', cost: 45, icon: 'auto_awesome', eco: false },
        { title: 'Royal Dinner at 1135 AD inside Amer Fort', desc: 'Dine like royalty in a gold-plated, candle-lit private chamber with live music.', cost: 80, icon: 'restaurant', eco: false },
        { title: 'Private Gemstone Shopping in Johari Bazaar', desc: 'Custom consultation with generational jewelry designers and precious gem carvers.', cost: 35, icon: 'shopping_bag', eco: false },
        { title: 'Hot Air Balloon Ride over Forts', desc: 'Spectacular aerial view of the desert landscape and historic palaces.', cost: 160, icon: 'flight', eco: false }
      ],
      'Vibrant Culture': [
        { title: 'Hawa Mahal & Jantar Mantar Observatory', desc: 'Discover the Palace of Winds and the ancient, massive stone sundial instruments.', cost: 10, icon: 'museum', eco: false },
        { title: 'Traditional Block Printing Workshop in Bagru', desc: 'Learn block-carving and print your own scarf using natural plant dyes.', cost: 30, icon: 'palette', eco: true, reason: 'Biodegradable vegetable dyes' },
        { title: 'Rajasthani Puppet Show & Folk Dance', desc: 'Evening show at Bhartiya Lok Kala Mandir presenting local folk dances.', cost: 15, icon: 'theater_comedy', eco: false },
        { title: 'Amer Fort elephant-free Heritage Walk', desc: 'Walk the ancient pathways of the royal garrison to learn medieval history.', cost: 12, icon: 'history_edu', eco: false }
      ],
      'Adventure & Sport': [
        { title: 'Nahargarh Fort Cycling Trail', desc: 'Cycle uphill through the Aravali forest hills to reach the fort gate.', cost: 18, icon: 'pedal_bike', eco: true, reason: 'Zero emissions transit' },
        { title: 'Trek to Hathni Kund Waterfall', desc: 'Hike through desert hills passing ancient temples to a hidden green pool.', cost: 15, icon: 'terrain', eco: true, reason: 'Aravalli trail conservation' },
        { title: 'Zip-line (Flying Fox) at Neemrana Fort', desc: 'Glide over royal battlements and hills on an exciting zip-line tour.', cost: 45, icon: 'height', eco: false },
        { title: 'Jeep Safari in Aravali Hills', desc: 'Off-road exploration of ancient ruins and tribal villages.', cost: 35, icon: 'directions_car', eco: false }
      ]
    }
  },
  munnar: {
    name: 'Munnar, Kerala, India',
    image: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=800&q=80',
    mapUrl: 'https://maps.google.com/maps?q=Munnar%20Tea%20Gardens,%20Kerala&t=&z=13&ie=UTF8&iwloc=&output=embed',
    hotels: {
      'Eco-Zen': {
        Economy: { name: 'Misty Mountain Eco Resort', cost: 35, desc: 'Eco-certified hotel utilizing solar power, smart waste management, and organic farming.', eco: true, reason: 'Solar powered operation' },
        Balanced: { name: 'Windermere Estate', cost: 120, desc: 'Quiet retreat on a working cardamom and tea plantation, preserving forest canopies.', eco: true, reason: 'Agroforestry preservation' },
        Premium: { name: 'Tall Trees Resort', cost: 240, desc: 'Luxury cottages built under 600 wild forest trees, maintaining native ecosystems.', eco: true, reason: 'Native forest conservation' }
      },
      'Modern Luxury': {
        Economy: { name: 'Bella Vista Resort', cost: 50, desc: 'Modern cottages with panoramic valley views and comfortable amenities.', eco: false },
        Balanced: { name: 'Blanket Hotel & Spa', cost: 140, desc: 'Luxury resort by Attukad waterfalls, offering scenic views and premium spa treatments.', eco: false },
        Premium: { name: 'Elixir Hills Suites', cost: 300, desc: 'Secluded luxury suites inside deep rainforests with private pools and high-end services.', eco: false }
      },
      'Vibrant Culture': {
        Economy: { name: 'Green Spaces Munnar', cost: 40, desc: 'Charming wood-paneled guesthouse offering organic food and local village walks.', eco: false },
        Balanced: { name: 'Scenic Mansion Heritage', cost: 95, desc: 'Historic planters estate with old furniture, serving traditional Kerala spices.', eco: false },
        Premium: { name: 'Spiceland Heritage Resort', cost: 200, desc: 'Boutique heritage rooms showcasing traditional Kathakali and Kalaripayattu elements.', eco: false }
      },
      'Adventure & Sport': {
        Economy: { name: 'Munnar Backpacker Camp', cost: 22, desc: 'Tented camp setup providing hiking equipment, ropes, and local mountain guides.', eco: false },
        Balanced: { name: 'Deshadan Mountain Resort', cost: 80, desc: 'Kerala\'s highest resort, ideal for early morning climbs and paragliding runs.', eco: false },
        Premium: { name: 'Fragrant Nature Munnar', cost: 220, desc: 'Premium hillside retreat with advanced gym, climbing walls, and custom forest safaris.', eco: false }
      }
    },
    activities: {
      'Eco-Zen': [
        { title: 'Trek in Eravikulam National Park', desc: 'Mindful walk to spot the endangered Nilgiri Tahr mountain goats in grasslands.', cost: 8, icon: 'nature_people', eco: true, reason: 'National park protection fee' },
        { title: 'Organic Tea Tasting at Lockhart Tea Museum', desc: 'Learn historic tea processing and sip organic teas handpicked on the hills.', cost: 12, icon: 'emoji_food_beverage', eco: true, reason: 'Certified organic estates' },
        { title: 'Canoeing in Kundala Lake', desc: 'Silent, paddle-powered rowboat trip on the calm waters bordered by pine forests.', cost: 15, icon: 'sailing', eco: true, reason: 'Zero carbon boating' },
        { title: 'Sunset Meditation at Top Station', desc: 'Breathtaking yoga practice at Munnar\'s highest point above the valley clouds.', cost: 10, icon: 'spa', eco: true, reason: 'Eco park preservation' }
      ],
      'Modern Luxury': [
        { title: 'Private Helicopter Tour of Western Ghats', desc: 'A spectacular 30-minute aerial ride over tea estates and waterfalls.', cost: 280, icon: 'flight', eco: false },
        { title: 'Gourmet Spice-Infused Dinner at The Tea Pavilion', desc: 'Fine dining celebrating local cardamoms, pepper, and coconut delicacies.', cost: 50, icon: 'restaurant', eco: false },
        { title: 'Private Tea Estate Picnic with Butler', desc: 'Scenic table setup in the middle of a high-altitude tea hill with custom catering.', cost: 90, icon: 'dining', eco: false },
        { title: 'Ayurvedic Marma Massage at Premium Spa', desc: 'A luxury 3-hour rejuvenating massage using organic herbal hot oils.', cost: 110, icon: 'spa', eco: false }
      ],
      'Vibrant Culture': [
        { title: 'Kathakali Dance & Kalaripayattu Martial Arts Show', desc: 'Watch Kerala\'s iconic classical dance-drama and ancient martial arts performance.', cost: 15, icon: 'theater_comedy', eco: false },
        { title: 'Traditional Sadhya Feast on Banana Leaf', desc: 'Taste 24 vegetarian curries served in traditional style with local red rice.', cost: 20, icon: 'restaurant', eco: false },
        { title: 'Spices plantation walk in Munnar', desc: 'Guided stroll through plantations growing nutmeg, cloves, vanilla, and ginger.', cost: 10, icon: 'grass', eco: true, reason: 'Sustainable spice farming' },
        { title: 'Knanaya Community Craft Weaving Center', desc: 'Learn how traditional Kerala handloom Kasavu sarees are woven by villagers.', cost: 18, icon: 'history_edu', eco: false }
      ],
      'Adventure & Sport': [
        { title: 'Climbing Meesapulimala Peak', desc: 'Scenic trek through rhododendron forests to Kerala\'s second highest peak.', cost: 25, icon: 'terrain', eco: true, reason: 'Mountain ecosystem protection' },
        { title: 'Mountain Biking along Chithirapuram Trails', desc: 'Ride off-road dirt bikes along steep paths passing tea estates.', cost: 30, icon: 'pedal_bike', eco: true, reason: 'Zero emission transport' },
        { title: 'Bamboo Rafting in Muthirapuzha River', desc: 'Guided rafting using traditional eco-friendly hand-woven bamboo rafts.', cost: 35, icon: 'waves', eco: true, reason: 'Natural materials & human power' },
        { title: 'Rock Climbing at Fun Forest Adventure Park', desc: 'Challenge yourself with natural rock climbing routes and rope walks.', cost: 20, icon: 'fitness_center', eco: false }
      ]
    }
  }
};

const FALLBACK_DESTINATION = {
  name: 'Global Explorer Destination',
  image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80',
  mapUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC-VgzWes3JoGP7ooxk7xOkkvGbd8zHNjtbJ377j2iySf-96qlToQeDF6ohqtChqAyIMr0l93Kl5n5VwAh_olOzHWLvfzz24uss8MEHl6VFT3vvLSTNou3WymZLpBe3XTBLrEOsAzYkPwki8VhUx4yVk9nh6P6IpwVMgtIghxEuuJCChPkf5eZvznEPzhenrf-IYSMuvPZtzwGraJbDq-dM1oFqnoGRN-ykPaCsk-hdpovZoPTmNYXM32LFuS4VhLrOrKvHKd3VC1qy', // Paris map fallback
  hotels: {
    'Eco-Zen': {
      Economy: { name: 'Green Oasis Hostel', cost: 45, desc: 'Eco-certified property offering recycling, water filters, and shared solar-heated baths.', eco: true, reason: 'Solar hot water systems' },
      Balanced: { name: 'Eco-Boutique Lodge', cost: 100, desc: 'Beautifully crafted green hotel built with recycled local stone and organic beddings.', eco: true, reason: 'Recycled build materials' },
      Premium: { name: 'Bio-Luxury Estate', cost: 300, desc: 'Zero-waste luxury reserve nestled in nature, serving estate-grown organic meals.', eco: true, reason: 'Zero-waste cert' }
    },
    'Modern Luxury': {
      Economy: { name: 'Smart City Pods', cost: 50, desc: 'Sleek capsules with check-in kiosks, digital mirrors, and smart environment panels.', eco: false },
      Balanced: { name: 'Apex High-Rise Hotel', cost: 140, desc: 'Premium modern tower with sky infinity pool and floor-to-ceiling city views.', eco: false },
      Premium: { name: 'Grand Regent Palace', cost: 500, desc: 'World-class luxury hotel with helicopter pad, butler service, and private spa decks.', eco: false }
    },
    'Vibrant Culture': {
      Economy: { name: 'Old Town Hostel', cost: 35, desc: 'Historic brick guest chambers located in the old town square, walking distances.', eco: false },
      Balanced: { name: 'The Heritage Inn', cost: 95, desc: 'Boutique rooms inside a restored monument building, displaying historic artifacts.', eco: false },
      Premium: { name: 'Palazzo Grand Hotel', cost: 350, desc: 'Exquisite heritage palace, decorated with original historic furniture and art pieces.', eco: false }
    },
    'Adventure & Sport': {
      Economy: { name: 'Backpackers Base Camp', cost: 30, desc: 'Social lodge offering maps, equipment lockers, and active tour guide matching.', eco: false },
      Balanced: { name: 'Peak View Resort', cost: 110, desc: 'Active sports resort with indoor climbing, pool, and bike rental facilities.', eco: false },
      Premium: { name: 'Wilderness Vista Club', cost: 400, desc: 'Premium nature villas with private access to trails, rivers, and outdoor tracks.', eco: false }
    }
  },
  activities: {
    'Eco-Zen': [
      { title: 'Mindful Botanical Garden Tour', desc: 'Stroll through native seed greenhouses and learn about local ecosystem preservation.', cost: 10, icon: 'eco', eco: true, reason: 'Biodiversity conservation' },
      { title: 'Lunch at Green Earth Cafe', desc: 'A zero-waste local cafe cooking seasonal harvests and composting all organic matter.', cost: 15, icon: 'restaurant', eco: true, reason: 'Zero-waste kitchen' },
      { title: 'Community Forest Restoration', desc: 'Join local eco-activists planting saplings to restore native forest canopies.', cost: 20, icon: 'forest', eco: true, reason: 'Reforestation donation' },
      { title: 'Solar Boat Lake Navigation', desc: 'Silent electric boat sailing to watch birds and native shoreline species.', cost: 30, icon: 'solar_power', eco: true, reason: 'Electric solar motors' }
    ],
    'Modern Luxury': [
      { title: 'Digital Art Immersive Exhibition', desc: 'Skip-the-line VIP entry to state-of-the-art sensory projection rooms.', cost: 35, icon: 'auto_awesome', eco: false },
      { title: 'Gastronomy Rooftop Dinner', desc: 'Chef-curated degustation menu using high-end ingredients with sky-deck skyline view.', cost: 130, icon: 'restaurant', eco: false },
      { title: 'VIP Shopping & Private Lounge', desc: 'Curated shopping trail with styling consultants and private showroom access.', cost: 80, icon: 'shopping_bag', eco: false },
      { title: 'Cocktail Crafting at Skyline Bar', desc: 'Award-winning molecular mixology drinks at the top of the highest skyscraper.', cost: 45, icon: 'wine_bar', eco: false }
    ],
    'Vibrant Culture': [
      { title: 'Historical Walking Tour', desc: 'Explore monumental gates, temples, and historic administrative courts with local guides.', cost: 15, icon: 'history', eco: false },
      { title: 'Traditional Pottery Crafting Workshop', desc: 'Learn centuries-old clay throwing techniques from native pottery families.', cost: 30, icon: 'palette', eco: false },
      { title: 'Museum of Fine Arts and Archaeology', desc: 'Explore historical archives, royal armors, and classical oil painting galleries.', cost: 18, icon: 'museum', eco: false },
      { title: 'Local Folk Dance & Live Music Show', desc: 'A colorful evening of historical dancing, theater stories, and traditional music instruments.', cost: 25, icon: 'theater_comedy', eco: false }
    ],
    'Adventure & Sport': [
      { title: 'Scenic Bike Trail Navigation', desc: 'Eco-adventure bicycling along historical riversides, paths, and local routes.', cost: 25, icon: 'pedal_bike', eco: true, reason: 'Zero emission transport' },
      { title: 'White Water Kayak Descent', desc: 'Action-packed descent of mountain river sections with experienced rafters.', cost: 45, icon: 'kayaking', eco: true, reason: 'Human powered transit' },
      { title: 'Rock Bouldering & Outdoor Climbing', desc: 'Learn belaying and basic climbing routes on scenic natural stone rock cliffs.', cost: 40, icon: 'terrain', eco: false },
      { title: 'Sunset Paragliding Experience', desc: 'Tandem paraglider flight over valleys with spectacular panoramic sunset captures.', cost: 120, icon: 'paragliding', eco: false }
    ]
  }
};

// Generates a complete itinerary structure
export function generateItinerary({ destination, duration, vibe, budget }) {
  // Normalize destination name for key lookups
  const key = destination.toLowerCase().trim();
  let cityData = DESTINATION_DATA[key];
  let cityName = destination;
  
  if (!cityData) {
    // If not one of the curated cities, try to match by substring
    const matchKey = Object.keys(DESTINATION_DATA).find(k => key.includes(k) || k.includes(key));
    if (matchKey) {
      cityData = DESTINATION_DATA[matchKey];
      cityName = cityData.name;
    } else {
      cityData = FALLBACK_DESTINATION;
      cityName = destination.charAt(0).toUpperCase() + destination.slice(1);
    }
  } else {
    cityName = cityData.name;
  }

  // Get hotel based on vibe and budget
  const rawHotel = cityData.hotels[vibe]?.[budget] || cityData.hotels['Eco-Zen']['Balanced'];
  const selectedHotel = { ...rawHotel, cost: rawHotel.cost * 80 };
  
  // Get all activities available for this vibe
  const availableActivities = cityData.activities[vibe] || cityData.activities['Eco-Zen'];
  
  const days = [];
  let currentActivityIndex = 0;
  
  // Create daily itineraries
  for (let d = 1; d <= duration; d++) {
    const dayActivities = [];
    
    // 1. Hotel check-in / start (Only for day 1, others are morning starts)
    dayActivities.push({
      time: '08:00 AM',
      title: d === 1 ? `Check-in & Stay at ${selectedHotel.name}` : `Stay at ${selectedHotel.name}`,
      description: d === 1 ? `Arrive at your destination and check-in to your room. ${selectedHotel.desc}` : `Daily stay and morning breakfast at ${selectedHotel.name}.`,
      cost: selectedHotel.cost, // Pay hotel cost per day/night
      type: 'hotel',
      image: selectedHotel.image || null,
      ecoFriendly: selectedHotel.eco || false,
      ecoReason: selectedHotel.eco ? selectedHotel.reason : null
    });

    // 2. Morning Activity
    const act1 = availableActivities[currentActivityIndex % availableActivities.length];
    dayActivities.push({
      time: '10:00 AM',
      title: act1.title,
      description: act1.desc,
      cost: adjustCost(act1.cost * 80, budget),
      type: 'activity',
      image: act1.image || act1.img || null,
      ecoFriendly: act1.ecoFriendly || false,
      ecoReason: act1.ecoReason || null
    });
    currentActivityIndex++;

    // 3. Lunch / Midday Rest (Eco-Zen vibe defaults to restaurant, others standard)
    const lunchAct = availableActivities[(currentActivityIndex) % availableActivities.length];
    dayActivities.push({
      time: '01:00 PM',
      title: lunchAct.type === 'restaurant' ? lunchAct.title : `Lunch at Local Organic Eatery`,
      description: lunchAct.type === 'restaurant' ? lunchAct.desc : `A curated spot serving regional specialities and seasonal ingredients.`,
      cost: budget === 'Economy' ? 800 : budget === 'Balanced' ? 1800 : 4500,
      type: 'restaurant',
      image: lunchAct.type === 'restaurant' ? (lunchAct.image || lunchAct.img || null) : null,
      ecoFriendly: vibe === 'Eco-Zen' || lunchAct.ecoFriendly || false,
      ecoReason: vibe === 'Eco-Zen' ? 'Organic regional ingredients' : null
    });
    currentActivityIndex++;

    // 4. Afternoon Activity
    const act2 = availableActivities[currentActivityIndex % availableActivities.length];
    dayActivities.push({
      time: '03:30 PM',
      title: act2.title,
      description: act2.desc,
      cost: adjustCost(act2.cost * 80, budget),
      type: 'activity',
      image: act2.image || act2.img || null,
      ecoFriendly: act2.ecoFriendly || false,
      ecoReason: act2.ecoReason || null
    });
    currentActivityIndex++;

    // 5. Evening Activity / Dinner
    const eveningAct = availableActivities[(currentActivityIndex) % availableActivities.length];
    dayActivities.push({
      time: '07:30 PM',
      title: eveningAct.title.includes('Dinner') ? eveningAct.title : `Gourmet Dinner & Local Music`,
      description: eveningAct.title.includes('Dinner') ? eveningAct.desc : `Relax at a hand-picked spot matching your trip theme.`,
      cost: budget === 'Economy' ? 1200 : budget === 'Balanced' ? 2800 : 8500,
      type: 'restaurant',
      image: eveningAct.title.includes('Dinner') ? (eveningAct.image || eveningAct.img || null) : null,
      ecoFriendly: eveningAct.ecoFriendly || false,
      ecoReason: eveningAct.ecoReason || null
    });
    currentActivityIndex++;

    // Calculate day theme / title
    let dayTheme = 'Exploration and Sightseeing';
    if (vibe === 'Eco-Zen') dayTheme = d === 1 ? 'Nature Walks & Local Flavors' : d === 2 ? 'Marine Gardens & Meditation' : 'Wellness & Forest Trails';
    else if (vibe === 'Modern Luxury') dayTheme = d === 1 ? 'Fine Art & High Fashion' : d === 2 ? 'Exclusive Skyline Views' : 'Rooftops & Private Tastings';
    else if (vibe === 'Vibrant Culture') dayTheme = d === 1 ? 'Heritage Walks & Craft Markets' : d === 2 ? 'Local Workshops & Folk Art' : 'Historic Dynasties & Music';
    else if (vibe === 'Adventure & Sport') dayTheme = d === 1 ? 'Cycle Trails & Climbing Gyms' : d === 2 ? 'Volcano Ascents & Canyons' : 'River Rapids & Surf Classes';

    days.push({
      dayNumber: d,
      theme: dayTheme,
      activities: dayActivities
    });
  }

  // Calculate stats
  let totalCost = 0;
  let ecoFriendlyCount = 0;
  let totalActivitiesCount = 0;
  
  days.forEach(d => {
    d.activities.forEach(a => {
      totalCost += a.cost;
      totalActivitiesCount++;
      if (a.ecoFriendly) ecoFriendlyCount++;
    });
  });

  // Dynamic calculations based on parameters
  const ecoScore = Math.min(
    98, 
    Math.max(40, (vibe === 'Eco-Zen' ? 85 : 45) + Math.round((ecoFriendlyCount / totalActivitiesCount) * 20))
  );
  
  // Calculate relative carbon savings (e.g. standard car vs electric/cycling)
  const co2Saved = Math.round(duration * (vibe === 'Eco-Zen' ? 14.5 : vibe === 'Adventure & Sport' ? 11.2 : 4.2) * 10) / 10;

  return {
    destination: cityName,
    duration,
    vibe,
    budget,
    totalBudget: budget === 'Economy' ? duration * 10000 : budget === 'Balanced' ? duration * 25000 : duration * 75000,
    spentBudget: totalCost,
    ecoScore,
    co2Saved,
    mapUrl: cityData.mapUrl,
    image: cityData.image || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80',
    hotel: selectedHotel,
    days
  };
}

// Adjust costs based on selected budget tier
function adjustCost(baseCost, budget) {
  if (budget === 'Economy') return Math.round(baseCost * 0.5);
  if (budget === 'Premium') return Math.round(baseCost * 1.8);
  return baseCost;
}
