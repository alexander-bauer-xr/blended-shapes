// src/components/Story.tsx
import { useEffect, useState } from 'react';
import { StoryEntry } from '../models/StoryEntry';
import { getStories } from '../services/cmsClient';

const Story = () => {
  const [stories, setStories] = useState<StoryEntry[]>([]);

  useEffect(() => {
    getStories().then(setStories);
  }, []);

  if (!stories || stories.length === 0) {
    return null;
  }

  return (
    <section>
      <div className="content">
        {stories.map((entry, index) => (
          <div
            key={index}
            className="lead-wrapper"
            dangerouslySetInnerHTML={{ __html: entry.shortDesc }}
          ></div>
        ))}
        <a href="/story" className="button About">
          <span className="cases-icon"></span>Lerne uns kennen
        </a>
      </div>
    </section>
  );
};

export default Story;