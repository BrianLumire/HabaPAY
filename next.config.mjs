// next.config.mjs
export default {
    async headers() {
      return [
        {
          source: "/login",
          headers: [
            {
              key: "Cross-Origin-Opener-Policy",
              value: "unsafe-none",
            },
          ],
        },
      ];
    },
  };