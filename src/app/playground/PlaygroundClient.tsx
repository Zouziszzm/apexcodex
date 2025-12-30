"use client";

import React, { useState, useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { playgroundData, PlaygroundItem } from "@/data/playground";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import PlaygroundHeader from "./components/PlaygroundHeader";
import PlaygroundFilter from "./components/PlaygroundFilter";
import PlaygroundRow from "./components/PlaygroundRow";

const PlaygroundClient = () => {
  const { language } = useLanguage();
  const t = playgroundData[language];
  const [filter, setFilter] = useState("All");
  const [displayItems, setDisplayItems] = useState<PlaygroundItem[]>(
    t.items as unknown as PlaygroundItem[]
  );

  // React to language changes
  React.useEffect(() => {
    // Reset to "local" All when language changes
    const defaultFilter = language === "jp" ? "すべて" : "All";
    setFilter(defaultFilter);
    setDisplayItems(t.items as unknown as PlaygroundItem[]);
  }, [language, t.items]);

  // Initialize with empty string - image appears on first hover
  const [activePreviewImage, setActivePreviewImage] = useState<string>("");

  const containerRef = useRef<HTMLDivElement>(null);
  const listContainerRef = useRef<HTMLDivElement>(null);

  const handleFilterChange = (newFilter: string) => {
    if (newFilter === filter) return;

    const getNewItems = (filterKey: string) => {
      const allLabel = language === "jp" ? "すべて" : "All";

      if (filterKey === "All" || filterKey === allLabel) {
        return t.items;
      }

      // Filter based on exact tag match (case-sensitive usually fine given data structure)
      // Logic: Item must have the selected tag
      return t.items.filter((item) => item.tags.includes(filterKey));
    };

    const itemElements = listContainerRef.current?.children;

    if (itemElements && itemElements.length > 0) {
      gsap.to(itemElements, {
        y: 20,
        opacity: 0,
        duration: 0.3,
        stagger: 0.05,
        ease: "power2.in",
        onComplete: () => {
          setFilter(newFilter);
          setDisplayItems(getNewItems(newFilter));
        },
      });
    } else {
      setFilter(newFilter);
      setDisplayItems(getNewItems(newFilter));
    }
  };

  useGSAP(
    () => {
      const rows = listContainerRef.current?.children;
      if (rows && rows.length > 0) {
        gsap.fromTo(
          rows,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.08,
            ease: "power3.out",
            delay: 0.1,
          }
        );
      }
    },
    { dependencies: [displayItems], scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen pt-40 px-6 lg:px-12 text-[var(--text-primary)] max-w-[1440px] mx-auto pb-40"
    >
      <div className="mb-24">
        <PlaygroundHeader
          title={t.title}
          description={t.description}
          previewImage={activePreviewImage}
        />
        <PlaygroundFilter
          filters={t.filters as unknown as string[]}
          activeFilter={filter}
          onFilterChange={handleFilterChange}
        />
      </div>

      <div ref={listContainerRef} className="flex flex-col gap-0 mt-0">
        {displayItems.map((item, index) => (
          <div key={`${language}-${item.id}`} className="playground-row">
            <PlaygroundRow
              item={item}
              index={index}
              onHover={() => setActivePreviewImage(item.image)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlaygroundClient;
