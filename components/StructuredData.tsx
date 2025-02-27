export function GameJamListStructuredData({ gamejams }: { gamejams: any[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          itemListElement: gamejams.map((gamejam, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
              "@type": "Event",
              name: gamejam.title,
              description: gamejam.description,
              startDate: gamejam.startDate,
              endDate: gamejam.endDate,
              eventStatus:
                new Date() > new Date(gamejam.endDate)
                  ? "EventEnded"
                  : new Date() >= new Date(gamejam.startDate)
                  ? "EventScheduled"
                  : "EventScheduled",
              organizer: {
                "@type": "Organization",
                name: gamejam.organizer,
              },
              image: gamejam.imageUrl,
              url: `https://gamejam.dogxi.me/gamejam/${gamejam.id}`,
              keywords: [
                "GameJam",
                "游戏开发",
                "游戏比赛",
                gamejam.theme,
              ].filter(Boolean),
            },
          })),
        }),
      }}
    />
  );
}

export function WebsiteStructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "GameJam 看板",
          alternateName: [
            "游戏开发比赛平台",
            "GameJam资源站",
            "独立游戏开发社区",
          ],
          url: "https://gamejam.dogxi.me",
          description:
            "浏览全球各地最新的GameJam活动、游戏制作大赛，展示您的创意，结识游戏开发者。",
          potentialAction: {
            "@type": "SearchAction",
            target: "https://gamejam.dogxi.me/search?q={search_term_string}",
            "query-input": "required name=search_term_string",
          },
          keywords: [
            "GameJam",
            "游戏开发",
            "游戏比赛",
            "游戏制作大赛",
            "独立游戏开发",
            "游戏设计",
          ],
        }),
      }}
    />
  );
}
