import React from 'react';
import './Team.css';

const mentors = [
  {
    name: 'Dr. N. Tejo Prakash',
    title: 'Professor and Dean of Research and Development Cell (DoRDC)',
    image: '/images/tejo.jpg',
    linkedin: 'https://www.linkedin.com/in/tejoprakashnagaraja/',
    email: 'ntejoprakash@thapar.edu',
  },
  {
    name: 'Dr. Bhupendrakumar Chudasama',
    title: 'Professor and Associate Dean of Research and Development Cell (ADoRDC)',
    image: '/images/bhup.jpg',
    linkedin: 'https://www.linkedin.com/in/bnchudasama/',
    email: 'bnchudasama@thapar.edu',
  },
  {
    name: 'Dr. Tarunpreet Bhatia',
    title: 'Associate Professor, CSED',
    image: '/images/tarun.jpg',
    linkedin: 'https://www.linkedin.com/in/tarunpreet-bhatia30/',
    email: 'tarunpreet@thapar.edu',
  },
];

const team2025_2026 = [
    {
        name: 'Aadi Jain',
        role: '   UI and UX Designer   ',
        image: '/images/aadi.png',
        github: 'https://github.com/nandinnijainn',
        linkedin: 'https://www.linkedin.com/in/aadi-jain-3732b4247/',
        email: 'ajain6_be21@thapar.edu',
      },
  {
    name: 'Abhinav Jain',
    role: 'Mobile App Developer',
    image: '/images/abhinav.jpeg',
    github: 'https://github.com/AbhinavJain1234',
    linkedin: 'https://www.linkedin.com/in/abhinavjain30/',
    email: 'abhinav4subs@gmail.com',
  },
  {
    name: 'Akarsh Srivastava',
    role: 'Backend Developer',
    image: '/images/akarsh.jpeg',
    github: 'https://github.com/akarsh911',
    linkedin: 'https://www.linkedin.com/in/aksrv09/',
    email: 'asrivastava2_be22@thapar.edu',
  },
  {
    name: 'Gurman Kaur',
    role: 'Frontend Developer',
    image: '/images/gurman.jpeg',
    github: 'https://github.com/GurmanKD',
    linkedin: 'https://www.linkedin.com/in/gurmankd/',
    email: 'gkaur5_be22@thapar.edu',
  },
  {
    name: 'Nandini Jain',
    role: 'Frontend Developer',
    image: '/images/nandini.jpeg',
    github: 'https://github.com/nandinnijainn',
    linkedin: 'https://www.linkedin.com/in/nandini-jain-446271267/',
    email: 'nandini1904jain@gmail.com',
  },
  
];

const PersonCard = ({ name, title, image, github, linkedin, email }) => (
  <div className='person-card'>
    <img src={image} alt={name} className='avatar' />
    <div className='card-content'>
      <h3>{name}</h3>
      <p className='title'>{title}</p>
      <div className='social-icons'>
        {github && (
          <a href={github} target='_blank' rel='noopener noreferrer'>
            <i class="fa fa-github" aria-hidden="true"></i>
          </a>
        )}
        {linkedin && (
          <a href={linkedin} target='_blank' rel='noopener noreferrer'>
            <i class="fa fa-linkedin-square" aria-hidden="true"></i>
          </a>
        )}
        {email && (
          <a href={`mailto:${email}`}>
           <i class="fa fa-envelope" aria-hidden="true"></i>
          </a>
        )}
      </div>
    </div>
  </div>
);

const Team = () => {
  return (
    <div className='team-container'>
      <img src='/images/tiet_logo.png' alt='Thapar Logo' className='logo' />
      <h1 className='heading'>Meet the PhD Monitoring Portal Team</h1>

      <h2 className='subheading'>Mentors</h2>
      <div className='grid'>
        {mentors.map((person) => (
          <PersonCard key={person.name} {...person} />
        ))}
      </div>

      <hr className='divider' />

      <h2 className='subheading'>Team 2025-2026</h2>
      <div className='grid'>
        {team2025_2026.map((person) => (
          <PersonCard key={person.name} {...person} title={person.role}/>
        ))}
      </div>

      <p className='contact'>
        For queries, you can reach us at{' '}
        <a href='mailto:asrivastava2_be22@thapar.edu'>
          asrivastava2_be22@thapar.edu
        </a>
      </p>
    </div>
  );
};

export default Team;
