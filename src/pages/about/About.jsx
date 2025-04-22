import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 bg-gradient-to-br from-gray-100 via-white to-gray-200 text-gray-800">
      <div className="max-w-4xl bg-white shadow-2xl rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-10">
        
        <img
          src="/images/phani.jpg"
          alt="My Profile"
          className="w-40 h-40 rounded-full object-cover border-4 border-indigo-500 shadow-lg"
        />
        
        <div className="text-center md:text-left">
          <h1 className="text-4xl font-extrabold text-indigo-600 mb-4">About Me</h1>
          <p className="text-lg mb-4 leading-relaxed">
            I’m reaching out to express my interest in the Full-Stack Developer role at your company and to share my background and enthusiasm for this opportunity.
          </p>
          <p className="text-lg mb-4 leading-relaxed">
            I completed a 12-month Full-Stack Developer program at <strong>Learnbay</strong>, where I was trained in Python, Data Structures & Algorithms, System Design, and the MERN stack.
            After that, I joined <strong>4Necotech</strong>, a startup in Bengaluru, where I contributed to building a URL shortener and an e-commerce platform.
          </p>
          <p className="text-lg mb-4 leading-relaxed">
            Currently, I’m working as a Full-Stack Developer at a Hyderabad-based startup. Our team built a video streaming platform and a task management system. These experiences taught me to write clean, maintainable code and structure projects effectively on both frontend and backend.
          </p>
          <p className="text-lg mb-4 leading-relaxed">
            Even before stepping into professional roles, I dedicated time to personal projects to sharpen my skills, and I continue to work on side projects to explore new technologies and apply what I learn.
          </p>
          <p className="text-lg mb-4 leading-relaxed">
            Although my professional experience might be comparatively less, I am fully committed to learning, adapting, and putting in the hard work necessary to deliver results with the same dedication and quality as an experienced candidate.
          </p>
          <p className="text-lg leading-relaxed">
            I’m genuinely passionate about development, eager to keep learning, and committed to adding real value to the team. I would be grateful for an opportunity to prove myself and I’m confident I can contribute meaningfully while growing alongside the company.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
