import React from 'react';
import {
  Box,
  Typography,
  Avatar,
  Grid,
  Card,
  CardContent,
  IconButton,
  Divider,
} from '@mui/material';
import { LinkedIn, Email, GitHub } from '@mui/icons-material';
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
    title:
      'Professor and Associate Dean of Research and Development Cell (ADoRDC)',
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
    name: 'Abhinav Jain',
    role: 'App Developer',
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
    linkedin:
      'https://www.linkedin.com/in/aksrv09/?miniProfileUrn=urn%3Ali%3Afs_miniProfile%3AACoAADYW1fIBMl6Rv20W3184m4l75215l5J6kAA',
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
  <Card className='profile-card' elevation={3}>
    <Avatar src={image} alt={name} className='avatar' />
    <CardContent className='card-content'>
      <Typography variant='h6'>{name}</Typography>
      <Typography variant='body2' color='textSecondary'>
        {title}
      </Typography>
      <Box className='social-icons'>
        {github && (
          <IconButton href={github}>
            <GitHub />
          </IconButton>
        )}
        {linkedin && (
          <IconButton href={linkedin}>
            <LinkedIn />
          </IconButton>
        )}
        {email && (
          <IconButton href={`mailto:${email}`}>
            <Email />
          </IconButton>
        )}
      </Box>
    </CardContent>
  </Card>
);

const Team = () => {
  return (
    <Box className='team-container'>
      <img src='/images/thapar_logo.png' alt='Thapar Logo' className='logo' />
      <Typography variant='h4' className='heading'>
        Meet the PhD Monitoring Portal Team
      </Typography>
      <Typography variant='h5' className='subheading'>
        Mentors
      </Typography>
      <Grid container spacing={4} justifyContent='center'>
        {mentors.map((person) => (
          <Grid item xs={12} sm={6} md={3} key={person.name}>
            <PersonCard {...person} />
          </Grid>
        ))}
      </Grid>

      <Divider className='divider' />

      <Typography variant='h5' className='subheading'>
        Team 2025-2026
      </Typography>
      <Grid container spacing={4} justifyContent='center'>
        {team2025_2026.map((person) => (
          <Grid item xs={12} sm={6} md={3} key={person.name}>
            <PersonCard {...person} />
          </Grid>
        ))}
      </Grid>

      <Divider className='divider' />

      <Typography
        variant='body1'
        align='center'
        sx={{ mt: 4, mb: 2, fontWeight: 500 }}
      >
        For any Technical Queries, you can reach us at{' '}
        <a href='mailto:asrivastava2_be22@thapar.edu'>
          asrivastava2_be22@thapar.edu
        </a>
      </Typography>
    </Box>
  );
};

export default Team;