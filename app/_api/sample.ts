import { HintData, Pin } from "../_utils/global.d";

export const sample: Pin[] = [
  {
    poi_id: 1,
    title: "Roppongi 1 - Day Tripper",
    description:
      "Combining elements of tables and chairs, the design of Day-Tripper is based on research on the kinds of positions people assume during the course of the day, including leaning, sitting, crouching, and so on. Emphasizing a concentration of European sensibilities and culture, this pink benches covered with printed white flowers.",
    img_url:
      "https://firebasestorage.googleapis.com/v0/b/tokyo-quest.appspot.com/o/devPhotos%2FRoppongi%2FDay%20Tripper%20(Pink%20Chair%20Sculpture).jpeg?alt=media&token=c6af5912-3d92-44ae-9798-eee9cdf78833",
    exact_latitude: 35.6594,
    exact_longitude: 139.7284,
    search_latitude: 35.65948,
    search_longitude: 139.7285,
    search_radius: 100,
  },
  {
    poi_id: 2,
    title: "Kin no Kokoro",
    description:
      "This work, commissioned to mark the 10th anniversary of Roppongi Hills and the Mori Art Museum, is poised over the Mohri Garden pond, which is rich in history. This installation is a string of gold-leaf beads that describe the arc of a heart. As one walks around the Mohri Pond, the sculpture gradually takes on the appearance of a Möbius strip. Artist JEAN-MICHEL OTHONIEL wants viewers to experience nature in Japan as it changes through the seasons and the pageant of history embodied in Mohri Garden, a history that stretches all the way back to the Edo period.",
    img_url:
      "https://firebasestorage.googleapis.com/v0/b/tokyo-quest.appspot.com/o/devPhotos%2FRoppongi%2FMohri%20Garden.jpeg?alt=media&token=7e6e2b82-25b6-410e-b54e-a74a338de76f",
    exact_latitude: 35.660337,
    exact_longitude: 139.730805,
    search_latitude: 35.6604,
    search_longitude: 139.7309,
    search_radius: 100,
  },
  {
    poi_id: 3,
    title: "Roppongi Hills Arena",
    description:
      "Located in the heart of the Roppongi Hills complex, the Roppongi Hills Arena is a multi-purpose entertainment space with a retractable roof. From live events on the circular stage to performances that use the entire area, this open-air space meets the needs of a variety of events.",
    img_url:
      "https://firebasestorage.googleapis.com/v0/b/tokyo-quest.appspot.com/o/devPhotos%2FRoppongi%2FRoppongi%20Hills%20Arena.jpeg?alt=media&token=c6319d78-4439-4650-9e03-1a9b0c1d1567",
    exact_latitude: 35.65979,
    exact_longitude: 139.7301,
    search_latitude: 35.6596,
    search_longitude: 139.728,
    search_radius: 100,
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
