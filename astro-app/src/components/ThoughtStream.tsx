import React, { useState, useEffect } from 'react';
import { urlFor } from '../utils/image';
import './ThoughtStream.css';

// Re-defining Thought interface here or import it if possible. 
// For simplicity in a component file, I'll define the shape expected for props.
interface Thought {
    _type: "thought";
    body: string;
    source: "X" | "Instagram" | "Self" | "Other";
    sourceUrl?: string;
    images?: any[];
    publishedAt: string;
}

interface ThoughtStreamProps {
    thoughts: Thought[];
}

export default function ThoughtStream({ thoughts }: ThoughtStreamProps) {
    const [selectedThought, setSelectedThought] = useState<Thought | null>(null);

    // Close modal on Escape key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setSelectedThought(null);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Prevent background scroll when modal is open
    useEffect(() => {
        if (selectedThought) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [selectedThought]);

    if (!thoughts || thoughts.length === 0) {
        return <p>No thoughts available.</p>;
    }

    return (
        <div className="thought-stream">
            {thoughts.map((thought, index) => (
                <div
                    key={index}
                    className="thought-card"
                    onClick={() => setSelectedThought(thought)}
                >
                    {thought.images && thought.images.length > 0 ? (
                        <div className="thought-card-image-container">
                            <img
                                src={urlFor(thought.images[0]).width(600).url()}
                                alt="Thought"
                                className="thought-card-image"
                            />
                        </div>
                    ) : (
                        <div className="thought-card-text">{thought.body}</div>
                    )}
                    <div className="thought-card-meta">
                        <span>{new Date(thought.publishedAt).toLocaleDateString()}</span>
                        <span>•</span>
                        <span>{thought.source}</span>
                    </div>
                </div>
            ))}

            {selectedThought && (
                <div className="dialog-overlay" onClick={() => setSelectedThought(null)}>
                    <div className="dialog-content" onClick={(e) => e.stopPropagation()}>
                        <button className="close-button" onClick={() => setSelectedThought(null)}>×</button>

                        <div className="dialog-text">{selectedThought.body}</div>

                        {selectedThought.images && selectedThought.images.length > 0 && (
                            <div className="dialog-images">
                                {selectedThought.images.map((img, i) => (
                                    <img
                                        key={i}
                                        src={urlFor(img).url()}
                                        alt="Thought attachment"
                                        className="dialog-image"
                                    />
                                ))}
                            </div>
                        )}

                        <div className="dialog-footer">
                            <span>{new Date(selectedThought.publishedAt).toLocaleString()}</span>
                            {selectedThought.sourceUrl ? (
                                <a
                                    href={selectedThought.sourceUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="source-link"
                                >
                                    View on {selectedThought.source} ↗
                                </a>
                            ) : (
                                <span>Source: {selectedThought.source}</span>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
