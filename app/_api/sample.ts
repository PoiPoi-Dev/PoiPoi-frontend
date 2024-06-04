import { PinData, HintData } from "../_utils/global.d";

export const sample: PinData = {
  pin: [
    {
      id: 1,
      collect: true,
      latitude: 35.6586,
      longitude: 139.7454,
      radius: 130,
      title: "Tokyo Tower",
      description: "A famous landmark in Tokyo",
      img_url:
        "https://travelmate.tech/media/images/cache/tokyo_tokyo_tower_01_presentazione_jpg_1920_1080_cover_70.jpg",
      is_main_attraction: true,
      tags: ["Historical", "Tower", "Scenery", "Popular"],
    },
    {
      id: 2,
      collect: false,
      latitude: 35.6587,
      longitude: 139.7455,
      radius: 50,
      title: "JUMP shop @Tokyo tower",
      description: "JUMP official store that located on Tokyo tower",
      img_url:
        "https://japandeluxetours.com/uploads/2017/07/20170714140517_5969320d8cb5b.jpg",
      is_main_attraction: true,
      tags: ["Shopping", "Anime", "Cafe"],
    },
    {
      id: 3,
      collect: false,
      latitude: 35.6584,
      longitude: 139.7471,
      radius: 100,
      title: "Zojoji Temple",
      description: "A historic Buddhist temple in the Minato ward of Tokyo",
      img_url: "https://www.japan-guide.com/g18/3010_02.jpg",
      is_main_attraction: false,
      tags: ["Historical", "Temple"],
    },
    {
      id: 4,
      collect: false,
      latitude: 35.6607,
      longitude: 139.7451,
      radius: 100,
      title: "Atago Shrine",
      description:
        "A Shinto shrine dedicated to the kami Atago, located on Mount Atago",
      img_url:
        "https://static.gltjp.com/glt/prd/data/directory/11000/10060/20190816_121148_4a6a488a_w1920.jpg",
      is_main_attraction: true,
      tags: ["Temple", "Shrine", "Scenery"],
    },
    {
      id: 5,
      collect: true,
      latitude: 35.6595,
      longitude: 139.7469,
      radius: 50,
      title: "Shiba Toshogu",
      description:
        "A Shinto shrine that is part of the Zojoji Temple complex, dedicated to Tokugawa Ieyasu",
      img_url:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Shiba_Toshogu_07.JPG/1200px-Shiba_Toshogu_07.JPG",
      is_main_attraction: false,
      tags: ["Shrine", "Temple"],
    },
  ],
};

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
      content: "It's between Tokyo Prince Hotel and the Prince Park Tower Tokyo."
    },
    {
      poi_id: 1,
      user_id: 2,
      hint_id: 3,
      content: "It lights up at night."
    },
    {
      poi_id: 1,
      user_id: 3,
      hint_id: 4,
      content:"It is close to Akabanebashi Station."
    },
  ]
};
