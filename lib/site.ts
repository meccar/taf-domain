export const SITE = {
  email: "admin@taf.asia",
  phone: "+84936378955",
  phoneDisplay: "+84 936 378 955",
  taxId: "0105367171",
  geo: { latitude: 21.0722143, longitude: 105.9015746 },
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=21.0722143,105.9015746",
  mapEmbedUrl: "<move your existing long /maps/embed?pb=... string here>",
  hours: {
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "08:30",
    closes: "18:00",
  },
  sameAs: [
    "https://www.facebook.com/profile.php?id=61594757558743",
    "https://www.linkedin.com/company/tafviet",
    "https://zalo.me/0936378955",
  ],
} as const;
