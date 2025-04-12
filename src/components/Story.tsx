// src/components/Story.tsx
import { useEffect, useState } from 'react';
import { StoryEntry } from '../models/StoryEntry';
import { getStories } from '../services/cmsClient';
import { Link } from 'react-router-dom';
import Storyliner from '../components/StoryLiner';

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
        <Storyliner />
        <Link to="/story">
        <span className="cases-icon"></span>
          <div className="button About">
            Lerne mich kennen
          </div>
        </Link>
      </div>
    </section>
  );
};

export default Story;