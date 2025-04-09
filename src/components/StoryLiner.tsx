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
        <>
            {stories.map((entry: StoryEntry, index: number) => (
                <div
                    key={index}
                    className="lead-wrapper"
                    dangerouslySetInnerHTML={{ __html: entry.shortDesc }}
                ></div>
            ))}
        </>
    );
};

export default Story;