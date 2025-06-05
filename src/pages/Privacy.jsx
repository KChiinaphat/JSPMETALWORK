import { useState } from "react";

const Privacy = () => {
    const [showMore, setShowMore] = useState(false);
    
    return (
        <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Privacy Policy</h1>
        <p className="mb-4">
            This Privacy Policy explains how we collect, use, and protect your personal information when you visit our website.
        </p>
        <p className="mb-4">
            We are committed to ensuring that your privacy is protected. Should we ask you to provide certain information by which you can be identified when using this website, then you can be assured that it will only be used in accordance with this privacy statement.
        </p>
        <button
            onClick={() => setShowMore(!showMore)}
            className="text-blue-500 hover:underline"
        >
            {showMore ? "Show Less" : "Read More"}
        </button>
        {showMore && (
            <div className="mt-4">
            <p>
                We may change this policy from time to time by updating this page. You should check this page from time to time to ensure that you are happy with any changes.
            </p>
            <p>
                This policy is effective from [Effective Date].
            </p>
            </div>
        )}
        </div>
    );
    }
    export default Privacy;