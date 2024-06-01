import { PinData } from "../_utils/global.d";

export const sample: PinData = {
  pin: [
    {
      id: 1,
      latitude: 35.6586,
      longitude: 139.7454,
      radius: 50,
      title: "Tokyo Tower",
      description: "A famous landmark in Tokyo",
      img_url: "https://example.com/tokyo-tower.jpg",
      is_main_attraction: true,
      tags: ["Historical", "Tower", "Scenery"],
    },
    {
      id: 2,
      latitude: 35.6587,
      longitude: 139.7455,
      radius: 50,
      title: "JUMP shop @Tokyo tower",
      description: "JUMP official store that located on Tokyo tower",
      img_url: "https://example.com/tokyo-tower.jpg",
      is_main_attraction: true,
      tags: ["Shopping", "Anime", "Cafe"],
    },
    {
      id: 3,
      latitude: 35.6584,
      longitude: 139.7471,
      radius: 50,
      title: "Zojoji Temple",
      description: "A historic Buddhist temple in the Minato ward of Tokyo",
      img_url: "https://example.com/tokyo-tower.jpg",
      is_main_attraction: false,
      tags: ["Historical", "Temple"],
    },
    {
      id: 4,
      latitude: 35.6607,
      longitude: 139.7451,
      radius: 50,
      title: "Atago Shrine",
      description:
        "A Shinto shrine dedicated to the kami Atago, located on Mount Atago",
      img_url: "https://example.com/tokyo-tower.jpg",
      is_main_attraction: true,
      tags: ["Temple", "Shrine", "Scenery"],
    },
    {
      id: 5,
      latitude: 35.6595,
      longitude: 139.7469,
      radius: 50,
      title: "Shiba Toshogu",
      description:
        "A Shinto shrine that is part of the Zojoji Temple complex, dedicated to Tokugawa Ieyasu",
      img_url: "https://example.com/tokyo-tower.jpg",
      is_main_attraction: false,
      tags: ["Shrine", "Temple"],
    },
  ],
};
