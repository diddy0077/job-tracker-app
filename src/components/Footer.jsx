import React from 'react';
import { motion } from 'framer-motion';

// Inline SVG for LinkedIn icon
const LinkedInIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.518-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
    </svg>
);

// Inline SVG for GitHub icon
const GitHubIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.6.111.815-.262.815-.575v-2.094c-3.23.704-3.296-1.353-3.296-1.353-.526-1.332-1.28-1.685-1.28-1.685-1.045-.716.08-.702.08-.702 1.155.082 1.768 1.189 1.768 1.189 1.025 1.755 2.693 1.246 3.344.954.1-.74.402-1.246.735-1.532-2.569-.292-5.263-1.274-5.263-5.698 0-1.258.45-2.288 1.188-3.097-.12-.292-.515-1.46.113-3.051 0 0 .97-.31 3.176 1.181.921-.255 1.895-.382 2.872-.387 2.97-.005 3.175.052 3.175.052.628 1.591.232 2.759.113 3.051.738.809 1.188 1.839 1.188 3.097 0 4.435-2.702 5.405-5.275 5.698.412.357.794 1.054.794 2.115v3.132c0 .313.212.698.818.571 4.767-1.594 8.2-6.091 8.2-11.385 0-6.627-5.374-12-12-12z"/>
    </svg>
);

// Inline SVG for Email icon
const EnvelopeIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M0 3v18h24v-18h-24zm6.623 7.929l-6.623 5.671v-13.593l6.623 7.922zm-3.842-2.483l-.781 1.785-1.603-1.874-4.225 5.247v2.923l4.225 5.247 4.225-5.247v-2.923l-4.225-5.247zm17.928 0l-4.225 5.247v2.923l4.225 5.247 4.225-5.247v-2.923l-4.225-5.247zm1.186 2.483l-6.623-7.922v13.593l6.623-5.671zm-13.676 1.392l-1.928-1.748.243-.208 4.606-4.606.012-.012.012.012 4.606 4.606.243.208-1.928 1.748-2.672-2.672-2.672 2.672z"/>
    </svg>
);


const Footer = () => {
    return (
        <motion.footer
            className="bg-slate-900 text-slate-400 py-6 border-t border-slate-700 text-center mt-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
        >
            <div className="container mx-auto px-4">
                <div className="flex justify-center items-center space-x-6 mb-4">
                    <motion.a 
                        href="https://www.linkedin.com/in/daniel-udeh-a03971350/" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        aria-label="LinkedIn profile"
                        className="hover:text-white transition-colors duration-300"
                        whileHover={{ scale: 1.2, rotate: 5 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <LinkedInIcon size={24} />
                    </motion.a>
                    <motion.a 
                        href="https://github.com/diddy0077" // Replace with your GitHub URL
                        target="_blank" 
                        rel="noopener noreferrer" 
                        aria-label="GitHub profile"
                        className="hover:text-white transition-colors duration-300"
                        whileHover={{ scale: 1.2, rotate: 5 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <GitHubIcon size={24} />
                    </motion.a>
                    <motion.a 
                        href="mailto:danieludeh007@yahoo.com" // Replace with your email address
                        aria-label="Email"
                        className="hover:text-white transition-colors duration-300"
                        whileHover={{ scale: 1.2, rotate: 5 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <EnvelopeIcon size={24} />
                    </motion.a>
                </div>
                <p className="text-sm">&copy; {new Date().getFullYear()} Job Tracker. All Rights Reserved.</p>
            </div>
        </motion.footer>
    );
};

export default Footer