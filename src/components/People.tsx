// src/components/People.tsx
import { useEffect, useState } from 'react';
import { StoryEntry } from '../models/StoryEntry';
import { getStories } from '../services/cmsClient';

const People = () => {
    const [stories, setStories] = useState<StoryEntry[]>([]);

    useEffect(() => {
        getStories().then(setStories);
    }, []);

    if (!stories.length) return null;

    // Alle Personen aus allen Stories zusammenfassen
    const people = stories.flatMap(story => story.people);

    return (
        <div className="people-grid content">
            {people.map(person => (
                <div key={person.id} className="person-card">
                    {person.profilbild?.url && (
                        <img
                            src={person.profilbild.url}
                            alt={person.personenname}
                            className="person-image"
                        />
                    )}
                    <div className="person-desc">
                        <h3>{person.personenname}</h3>
                        <div
                            className="person-bio"
                            dangerouslySetInnerHTML={{ __html: person.bio }}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default People;