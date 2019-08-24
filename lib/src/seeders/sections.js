import SectionModel from '../models/section/sectionModel';

const sections = [
  {
    name: 'Web',
    description: 'Area for asking questions regarding web development.'
  },
  {
    name: 'Computer Science',
    description: 'General CS questions - how modern computing works'
  },
  {
    name: 'FE',
    description: 'Client side application development Q/A'
  },
  {
    name: 'BE',
    description: 'Client side application development Q/A'
  }
];

export const seedSections = () => {
  return SectionModel.insertMany(sections)
}