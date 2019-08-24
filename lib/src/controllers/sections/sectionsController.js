import sectionsServices from '../../services/sections/sectionsServices';

export const getSections = async (_, res) => {
  const sections = await sectionsServices.getSections();
  res.json({ sections });
}