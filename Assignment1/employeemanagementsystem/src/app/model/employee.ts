export interface Employee {
    id: number; // Optional as it will be generated on the server
    name: string;
    contactNumber: string;
    email: string;
    gender: 'Male' | 'Female' ;
    skills: Skill[];
  }
  
  export interface Skill {
    name: string;
    experience: string;
  }
  