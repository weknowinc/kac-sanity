import React, { useState } from 'react';
import './ContactModal.css';

export default function ContactModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setStatus('idle');
        setErrorMessage('');

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Something went wrong');
            }

            setStatus('success');
            setFormData({ name: '', email: '', message: '' });
            setTimeout(() => {
                setIsOpen(false);
                setStatus('idle');
            }, 3000);
        } catch (error: any) {
            setStatus('error');
            setErrorMessage(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    return (
        <>
            <div className="contact-wrapper">
                <button
                    className="contact-button"
                    onClick={() => setIsOpen(true)}
                    aria-label="Contact Us"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect width="20" height="16" x="2" y="4" rx="2" />
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                </button>
            </div>

            <div className={`contact-modal-overlay ${isOpen ? 'open' : ''}`} onClick={(e) => {
                if (e.target === e.currentTarget) setIsOpen(false);
            }}>
                <div className="contact-modal">
                    <button className="modal-close" onClick={() => setIsOpen(false)} aria-label="Close">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 6 6 18" />
                            <path d="M6 6 18 18" />
                        </svg>
                    </button>

                    <h2 className="modal-title">Get in touch with me</h2>

                    {status === 'success' ? (
                        <div className="status-message status-success">
                            <p>Message sent successfully! We'll get back to you soon.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="name" className="form-label">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                    className="form-input"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Your Name"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    className="form-input"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="name@example.com"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="message" className="form-label">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    required
                                    className="form-textarea"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="How can I help?"
                                />
                            </div>

                            {status === 'error' && (
                                <div className="status-message status-error">
                                    {errorMessage}
                                </div>
                            )}

                            <button
                                type="submit"
                                className="submit-button"
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <div className="spinner"></div>
                                        Sending...
                                    </>
                                ) : (
                                    'Send Message'
                                )}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </>
    );
}
