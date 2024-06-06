import { HintData, Pin } from "../_utils/global.d";

export const sample: Pin[] = [
  {
    id: 1,
    is_completed: true,
    exact_latitude: 35.6586,
    exact_longitude: 139.7454,
    search_radius: 130,
    title: "Tokyo Tower",
    description: "A famous landmark in Tokyo",
    img_url:
      "https://travelmate.tech/media/images/cache/tokyo_tokyo_tower_01_presentazione_jpg_1920_1080_cover_70.jpg",
    search_latitude: 35.6588,
    search_longitude: 139.7452,
  },
  {
    id: 2,
    is_completed: false,
    exact_latitude: 35.6584,
    exact_longitude: 139.7471,
    search_radius: 100,
    title: "Zojoji Temple",
    description: "A historic Buddhist temple in the Minato ward of Tokyo",
    img_url: "https://www.japan-guide.com/g18/3010_02.jpg",
    search_latitude: 35.6588,
    search_longitude: 139.7475,
  },
  {
    id: 3,
    is_completed: false,
    exact_latitude: 35.6607,
    exact_longitude: 139.7451,
    search_radius: 100,
    title: "Atago Shrine",
    description:
      "A Shinto shrine dedicated to the kami Atago, located on Mount Atago",
    img_url:
      "https://static.gltjp.com/glt/prd/data/directory/11000/10060/20190816_121148_4a6a488a_w1920.jpg",
    search_latitude: 35.6602,
    search_longitude: 139.7451,
  },
  {
    id: 4,
    is_completed: true,
    exact_latitude: 35.6595,
    exact_longitude: 139.7469,
    search_radius: 50,
    title: "Shiba Toshogu",
    description:
      "A Shinto shrine that is part of the Zojoji Temple complex, dedicated to Tokugawa Ieyasu",
    img_url:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Shiba_Toshogu_07.JPG/1200px-Shiba_Toshogu_07.JPG",
    search_latitude: 35.659,
    search_longitude: 139.7471,
  },
];

export const hintSample: HintData = {
  hints: [
    {
      poi_id: 1,
      user_id: 1,
      hint_id: 1,
      content: "It's very tall, in red and white.",
    },
    {
      poi_id: 2,
      user_id: 3,
      hint_id: 2,
      content:
        "It's between Tokyo Prince Hotel and the Prince Park Tower Tokyo.",
    },
    {
      poi_id: 1,
      user_id: 2,
      hint_id: 3,
      content: "It lights up at night.",
    },
    {
      poi_id: 1,
      user_id: 3,
      hint_id: 4,
      content: "It is close to Akabanebashi Station.",
    },
  ],
};
